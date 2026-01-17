/**
 * User Service
 *
 * Business logic for user-related operations including profile management,
 * data updates, and user information retrieval.
 *
 * @module services/user.service
 */

import { PASSWORD_REQUIREMENTS } from '@/lib/constants/auth.constants';
import { ValidationError } from '@/lib/errors/ValidationError';
import { logger } from '@/lib/logger';
import prisma from '@/lib/prisma';
import type { UpdateProfileData, UserProfile } from '@/types/auth.types';
import bcrypt from 'bcryptjs';

/**
 * Get user by ID
 *
 * @param userId - User ID
 * @returns Promise resolving to user data or null
 */
export async function getUserById(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      birthDate: true,
      birthCity: true,
      birthCountry: true,
      birthHour: true,
      birthMinute: true,
      knowsBirthTime: true,
      gender: true,
      residenceCity: true,
      residenceCountry: true,
      timezone: true,
      birthDataChangeCount: true,
      termsAccepted: true,
      termsAcceptedAt: true,
      createdAt: true,
      updatedAt: true,
      stripeCustomerId: true,
      subscription: {
        select: {
          id: true,
          status: true,
          stripeSubscriptionId: true,
          stripePriceId: true,
          stripeCurrentPeriodEnd: true,
          hasBaseBundle: true,
          hasLunarCalendar: true,
          hasAstrogematria: true,
          hasElectiveChart: true,
        },
      },
    },
  });

  return user;
}

/**
 * Get user by email
 *
 * @param email - User email
 * @returns Promise resolving to user data or null
 */
export async function getUserByEmail(email: string) {
  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() },
  });

  return user;
}

/**
 * Get user profile
 *
 * @param userId - User ID
 * @returns Promise resolving to user profile data
 * @throws {ValidationError} If user not found
 */
export async function getUserProfile(userId: string): Promise<UserProfile> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      birthDate: true,
      birthCity: true,
      birthCountry: true,
      birthHour: true,
      birthMinute: true,
      knowsBirthTime: true,
      gender: true,
      residenceCity: true,
      residenceCountry: true,
      birthDataChangeCount: true,
      termsAccepted: true,
      termsAcceptedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) {
    throw new ValidationError('User not found', 'userId');
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name ?? undefined,
    image: user.image ?? undefined,
    birthDate: user.birthDate,
    birthCity: user.birthCity ?? undefined,
    birthCountry: user.birthCountry ?? undefined,
    birthHour: user.birthHour ?? undefined,
    birthMinute: user.birthMinute ?? undefined,
    knowsBirthTime: user.knowsBirthTime,
    gender: user.gender ?? undefined,
    residenceCity: user.residenceCity ?? undefined,
    residenceCountry: user.residenceCountry ?? undefined,
    birthDataChangeCount: user.birthDataChangeCount,
    termsAccepted: user.termsAccepted ?? undefined,
    termsAcceptedAt: user.termsAcceptedAt ?? undefined,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

/**
 * Update user profile
 *
 * @param userId - User ID
 * @param data - Profile data to update
 * @returns Promise resolving to updated user profile
 * @throws {ValidationError} If validation fails or user not found
 */
export async function updateUserProfile(
  userId: string,
  data: UpdateProfileData
): Promise<UserProfile> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ValidationError('User not found', 'userId');
  }

  // Prepare update data
  const updateData: any = {};

  // Only update fields that are provided
  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  if (data.image !== undefined) {
    updateData.image = data.image;
  }
  if (data.birthDate !== undefined) {
    updateData.birthDate = data.birthDate;
  }
  if (data.birthCity !== undefined) {
    updateData.birthCity = data.birthCity;
  }
  if (data.residenceCity !== undefined) {
    updateData.residenceCity = data.residenceCity;
  }
  if (data.gender !== undefined) {
    updateData.gender = data.gender;
  }

  // Check if birth data is being changed
  const isBirthDataChange =
    data.birthDate !== undefined || data.birthCity !== undefined || data.birthCountry !== undefined;

  if (isBirthDataChange) {
    updateData.birthDataChangeCount = (user.birthDataChangeCount || 0) + 1;
  }

  // Update hasCompletedData flag
  const hasCompletedData =
    user.birthDate !== null && user.birthCity !== null && user.birthCountry !== null;

  if (hasCompletedData) {
    updateData.hasCompletedData = true;
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: updateData,
    select: {
      id: true,
      email: true,
      name: true,
      image: true,
      birthDate: true,
      birthCity: true,
      birthCountry: true,
      birthHour: true,
      birthMinute: true,
      knowsBirthTime: true,
      gender: true,
      residenceCity: true,
      residenceCountry: true,
      birthDataChangeCount: true,
      termsAccepted: true,
      termsAcceptedAt: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  logger.info('User profile updated', { userId, updatedFields: Object.keys(updateData) });

  return {
    id: updatedUser.id,
    email: updatedUser.email,
    name: updatedUser.name ?? undefined,
    image: updatedUser.image ?? undefined,
    birthDate: updatedUser.birthDate,
    birthCity: updatedUser.birthCity ?? undefined,
    birthCountry: updatedUser.birthCountry ?? undefined,
    birthHour: updatedUser.birthHour ?? undefined,
    birthMinute: updatedUser.birthMinute ?? undefined,
    knowsBirthTime: updatedUser.knowsBirthTime,
    gender: updatedUser.gender ?? undefined,
    residenceCity: updatedUser.residenceCity ?? undefined,
    residenceCountry: updatedUser.residenceCountry ?? undefined,
    birthDataChangeCount: updatedUser.birthDataChangeCount,
    termsAccepted: updatedUser.termsAccepted ?? undefined,
    termsAcceptedAt: updatedUser.termsAcceptedAt ?? undefined,
    createdAt: updatedUser.createdAt,
    updatedAt: updatedUser.updatedAt,
  };
}

/**
 * Update user password
 *
 * @param userId - User ID
 * @param currentPassword - Current password
 * @param newPassword - New password
 * @returns Promise resolving when password is updated
 * @throws {ValidationError} If validation fails or user not found
 */
export async function updateUserPassword(
  userId: string,
  currentPassword: string,
  newPassword: string
): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      password: true,
    },
  });

  if (!user) {
    throw new ValidationError('User not found', 'userId');
  }

  if (!user.password) {
    throw new ValidationError('User does not have a password (likely OAuth user)', 'userId');
  }

  // Verify current password
  const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);

  if (!isCurrentPasswordValid) {
    throw new ValidationError('Current password is incorrect', 'currentPassword');
  }

  // Validate new password
  if (!newPassword || newPassword.length < PASSWORD_REQUIREMENTS.MIN_LENGTH) {
    throw new ValidationError(
      `Password must be at least ${PASSWORD_REQUIREMENTS.MIN_LENGTH} characters`,
      'newPassword'
    );
  }

  if (newPassword.length > PASSWORD_REQUIREMENTS.MAX_LENGTH) {
    throw new ValidationError(
      `Password must not exceed ${PASSWORD_REQUIREMENTS.MAX_LENGTH} characters`,
      'newPassword'
    );
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword },
  });

  logger.info('User password updated', { userId });
}

/**
 * Update user email
 *
 * @param userId - User ID
 * @param newEmail - New email address
 * @returns Promise resolving when email is updated
 * @throws {ValidationError} If validation fails or user not found
 */
export async function updateUserEmail(userId: string, newEmail: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ValidationError('User not found', 'userId');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(newEmail)) {
    throw new ValidationError('Invalid email format', 'newEmail');
  }

  const normalizedEmail = newEmail.toLowerCase().trim();

  // Check if email is already taken
  const existingUser = await prisma.user.findUnique({
    where: { email: normalizedEmail },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new ValidationError('Email already in use', 'newEmail');
  }

  await prisma.user.update({
    where: { id: userId },
    data: { email: normalizedEmail },
  });

  logger.info('User email updated', { userId, newEmail: normalizedEmail });
}

/**
 * Delete user account
 *
 * @param userId - User ID
 * @returns Promise resolving when user is deleted
 * @throws {ValidationError} If user not found
 */
export async function deleteUser(userId: string): Promise<void> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ValidationError('User not found', 'userId');
  }

  await prisma.user.delete({
    where: { id: userId },
  });

  logger.info('User account deleted', { userId });
}

/**
 * Check if user has completed birth data
 *
 * @param userId - User ID
 * @returns Promise resolving to completion status
 */
export async function checkBirthDataCompletion(userId: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      birthDate: true,
      birthCity: true,
      birthCountry: true,
    },
  });

  if (!user) {
    return false;
  }

  return user.birthDate !== null && user.birthCity !== null && user.birthCountry !== null;
}

/**
 * Get all users (admin only)
 *
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of users per page
 * @returns Promise resolving to paginated users
 */
export async function getAllUsers(page: number = 1, pageSize: number = 20) {
  const skip = (page - 1) * pageSize;

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        birthCity: true,
        createdAt: true,
        updatedAt: true,
        subscription: {
          select: {
            id: true,
            status: true,
            stripeSubscriptionId: true,
            stripeCurrentPeriodEnd: true,
            hasBaseBundle: true,
          },
        },
      },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: users,
    pagination: {
      page,
      pageSize,
      totalItems: totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}

/**
 * Search users by email or name (admin only)
 *
 * @param query - Search query
 * @param page - Page number (1-indexed)
 * @param pageSize - Number of users per page
 * @returns Promise resolving to paginated users
 */
export async function searchUsers(query: string, page: number = 1, pageSize: number = 20) {
  const skip = (page - 1) * pageSize;
  const normalizedQuery = query.toLowerCase().trim();

  const [users, totalCount] = await Promise.all([
    prisma.user.findMany({
      where: {
        OR: [
          { email: { contains: normalizedQuery, mode: 'insensitive' } },
          { name: { contains: normalizedQuery, mode: 'insensitive' } },
        ],
      },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        email: true,
        name: true,
        birthDate: true,
        birthCity: true,
        createdAt: true,
        updatedAt: true,
      },
    }),
    prisma.user.count({
      where: {
        OR: [
          { email: { contains: normalizedQuery, mode: 'insensitive' } },
          { name: { contains: normalizedQuery, mode: 'insensitive' } },
        ],
      },
    }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return {
    data: users,
    pagination: {
      page,
      pageSize,
      totalItems: totalCount,
      totalPages,
      hasNext: page < totalPages,
      hasPrevious: page > 1,
    },
  };
}
