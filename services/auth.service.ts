/**
 * Authentication Service
 *
 * Business logic for authentication operations including user registration,
 * login, password reset, and session management.
 *
 * @module services/auth.service
 */

import {
  ADMIN_EMAILS,
  ADMIN_ENTITLEMENTS,
  DEFAULT_ENTITLEMENTS,
  JWT_EXPIRATION,
  PASSWORD_REQUIREMENTS,
} from '@/lib/constants/auth.constants';
import { AuthError, ValidationError } from '@/lib/errors';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import type {
  PasswordResetData,
  PasswordResetRequest,
  PasswordResetTokenPayload,
  RegisterData,
  User,
} from '@/types/auth.types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Resend } from 'resend';

/**
 * Email service configuration
 */
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Register a new user
 *
 * @param data - Registration data including email, password, and name
 * @returns Promise resolving to the created user
 * @throws {ValidationError} If validation fails
 * @throws {AuthError} If user already exists or registration fails
 */
export async function registerUser(data: RegisterData): Promise<User> {
  const { email, password, name } = data;

  // Validate required fields
  if (!email || !password || !name) {
    throw new ValidationError('All fields are required');
  }

  // Validate password length
  if (password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    throw new ValidationError(
      `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format');
  }

  const normalizedEmail = email.toLowerCase().trim();
  const normalizedName = name.trim();

  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser) {
    throw AuthError.emailExists();
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Create user
  const user = await prisma.user.create({
    data: {
      email: normalizedEmail,
      name: normalizedName,
      password: hashedPassword,
      emailVerified: new Date(),
      termsAccepted: true,
      termsAcceptedAt: new Date(),
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
    },
  });

  logger.info('User registered successfully', { userId: user.id, email: user.email });

  // Send welcome email (non-blocking)
  sendWelcomeEmail(normalizedEmail, normalizedName).catch((error) => {
    logger.error('Failed to send welcome email', { error, email: normalizedEmail });
  });

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    role: 'user',
    hasCompletedData: false,
  };
}

/**
 * Authenticate user credentials
 *
 * @param email - User email
 * @param password - User password
 * @returns Promise resolving to authenticated user
 * @throws {AuthError} If authentication fails
 */
export async function authenticateUser(email: string, password: string): Promise<User> {
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  const normalizedEmail = email.toLowerCase().trim();

  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (!user || !user.password) {
    throw AuthError.invalidCredentials();
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw AuthError.invalidCredentials();
  }

  logger.info('User authenticated successfully', { userId: user.id, email: user.email });

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    role: 'user',
    hasCompletedData: user.birthDate !== null && user.birthCity !== null,
  };
}

/**
 * Request password reset
 *
 * @param data - Password reset request data with email
 * @returns Promise resolving when reset email is sent
 * @throws {ValidationError} If email is invalid
 */
export async function requestPasswordReset(data: PasswordResetRequest): Promise<void> {
  const { email } = data;

  if (!email || !email.trim()) {
    throw new ValidationError('Email is required');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    throw new ValidationError('Invalid email format');
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Find user by email
  const user = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  // Don't reveal if user exists or not for security
  if (!user || !user.password) {
    logger.info('Password reset requested for non-existent or OAuth user', {
      email: normalizedEmail,
    });
    return;
  }

  // Generate reset token
  const resetToken = jwt.sign(
    { userId: user.id, email: user.email } as PasswordResetTokenPayload,
    process.env.JWT_SECRET!,
    { expiresIn: JWT_EXPIRATION.PASSWORD_RESET }
  );

  const resetTokenExpiry = new Date(Date.now() + JWT_EXPIRATION.PASSWORD_RESET * 1000);

  // Save token to database
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken,
      resetTokenExpiry,
    },
  });

  logger.info('Password reset token generated', { userId: user.id, email: normalizedEmail });

  // Send reset email (non-blocking)
  sendResetPasswordEmail(normalizedEmail, user.name || 'Usuario', resetToken).catch((error) => {
    logger.error('Failed to send password reset email', { error, email: normalizedEmail });
  });
}

/**
 * Reset password with token
 *
 * @param data - Password reset data with token and new password
 * @returns Promise resolving when password is reset
 * @throws {ValidationError} If validation fails
 * @throws {AuthError} If token is invalid or expired
 */
export async function resetPassword(data: PasswordResetData): Promise<void> {
  const { token, password } = data;

  if (!token) {
    throw new ValidationError('Reset token is required');
  }

  if (!password || password.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    throw new ValidationError(
      `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`
    );
  }

  // Verify token
  let payload: PasswordResetTokenPayload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET!) as PasswordResetTokenPayload;
  } catch {
    throw AuthError.invalidToken();
  }

  // Find user
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
  });

  if (!user) {
    throw AuthError.userNotFound();
  }

  // Verify token matches
  if (user.resetToken !== token) {
    throw AuthError.invalidToken();
  }

  // Verify token not expired
  if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    throw AuthError.invalidToken();
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 12);

  // Update password and clear reset token
  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  logger.info('Password reset successfully', { userId: user.id, email: user.email });
}

/**
 * Validate reset token
 *
 * @param token - Password reset token
 * @returns Promise resolving to validation result
 */
export async function validateResetToken(
  token: string
): Promise<{ valid: boolean; userId?: string }> {
  if (!token) {
    return { valid: false };
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as PasswordResetTokenPayload;

    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
    });

    if (!user || user.resetToken !== token) {
      return { valid: false };
    }

    if (!user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
      return { valid: false };
    }

    return { valid: true, userId: user.id };
  } catch {
    return { valid: false };
  }
}

/**
 * Get user entitlements based on subscription and admin status
 *
 * @param email - User email
 * @returns Promise resolving to user entitlements
 */
export async function getUserEntitlements(
  email: string
): Promise<import('@/types/auth.types').UserEntitlements> {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
    include: { subscription: true },
  });

  if (!user) {
    return DEFAULT_ENTITLEMENTS;
  }

  // Admin users get full access
  if (ADMIN_EMAILS.includes(user.email as any)) {
    return ADMIN_ENTITLEMENTS;
  }

  // Check subscription status
  const subscription = user.subscription;
  const status = subscription?.status || 'free';

  // Build entitlements based on subscription
  const entitlements: import('@/types/auth.types').UserEntitlements = {
    hasBaseBundle: false,
    hasLunarCalendar: false,
    hasAstrogematria: false,
    hasElectiveChart: false,
    hasDraconicAccess: false,
    status: status as any,
  };

  if (subscription && subscription.status === 'active') {
    entitlements.hasBaseBundle = true;

    // Check for add-ons
    if (subscription.hasLunarCalendar) {
      entitlements.hasLunarCalendar = true;
    }
    if (subscription.hasAstrogematria) {
      entitlements.hasAstrogematria = true;
    }
    if (subscription.hasElectiveChart) {
      entitlements.hasElectiveChart = true;
    }
    // Note: hasDraconicAccess is not in the Prisma subscription model
    // It should be added to the schema if needed
    // For now, we'll set it based on a custom check or leave it false
    // if ((subscription as any).hasDraconicAccess) {
    //   entitlements.hasDraconicAccess = true;
    // }
  }

  return entitlements;
}

/**
 * Check if user is admin
 *
 * @param email - User email
 * @returns True if user is admin
 */
export function isAdmin(email: string): boolean {
  return ADMIN_EMAILS.includes(email.toLowerCase() as any);
}

/**
 * Send welcome email to new user
 *
 * @param email - User email
 * @param name - User name
 */
async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const fromEmail = process.env.FROM_EMAIL || 'info@astrochat.online';
  const appUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Welcome to Astrochat, ${name}!</h1>

      <p style="color: #666; line-height: 1.6;">
        Thank you for registering with Astrochat. Your account has been created successfully.
      </p>

      <p style="color: #666; line-height: 1.6;">
        You now have access to all our astrological services:
      </p>

      <ul style="color: #666; line-height: 1.6;">
        <li>High precision natal charts</li>
        <li>AI-powered interpretations</li>
        <li>Personal calendars</li>
        <li>Astrogematria</li>
      </ul>

      <p style="color: #666; line-height: 1.6;">
        Start your astrological journey now!
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${appUrl}"
           style="background-color: #007bff; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Explore Astrochat
        </a>
      </div>

      <p style="color: #999; font-size: 12px; text-align: center;">
        If you did not create this account, you can ignore this email.
      </p>
    </div>
  `;

  if (resend) {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Welcome to Astrochat!',
      html: htmlContent,
    });
  } else {
    logger.info('No email service configured - skipping welcome email');
  }
}

/**
 * Send password reset email
 *
 * @param email - User email
 * @param name - User name
 * @param resetToken - Password reset token
 */
async function sendResetPasswordEmail(
  email: string,
  name: string,
  resetToken: string
): Promise<void> {
  const resetUrl = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/auth/reset-password/${resetToken}`;
  const fromEmail = process.env.FROM_EMAIL || 'info@astrochat.online';

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Reset Your Password</h1>

      <p style="color: #666; line-height: 1.6;">
        Hello ${name},
      </p>

      <p style="color: #666; line-height: 1.6;">
        We have received a request to reset your password in Astrochat.
        If you did not request this change, you can ignore this email.
      </p>

      <p style="color: #666; line-height: 1.6;">
        To reset your password, click on the following link:
      </p>

      <div style="text-align: center; margin: 30px 0;">
        <a href="${resetUrl}"
           style="background-color: #007bff; color: white; padding: 12px 24px;
                  text-decoration: none; border-radius: 5px; display: inline-block;">
          Reset Password
        </a>
      </div>

      <p style="color: #666; line-height: 1.6;">
        This link will expire in 1 hour for security.
      </p>

      <p style="color: #666; line-height: 1.6;">
        If the button does not work, copy and paste this URL into your browser:
        <br>
        <span style="word-break: break-all; color: #007bff;">${resetUrl}</span>
      </p>

      <p style="color: #999; font-size: 12px; text-align: center; margin-top: 30px;">
        If you did not request this change, your password will remain unchanged.
      </p>
    </div>
  `;

  if (resend) {
    await resend.emails.send({
      from: fromEmail,
      to: email,
      subject: 'Reset Your Password - Astrochat',
      html: htmlContent,
    });
  } else {
    logger.info('No email service configured - skipping password reset email');
  }
}
