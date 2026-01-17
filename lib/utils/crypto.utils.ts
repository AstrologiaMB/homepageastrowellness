/**
 * Crypto Utilities
 * 
 * Utility functions for cryptographic operations.
 * 
 * @module lib/utils/crypto.utils
 */

import { randomBytes, createHash, createHmac } from 'crypto';

/**
 * Generate random bytes as hex string
 * 
 * @param length - Number of bytes to generate (default: 32)
 * @returns Hex string of random bytes
 */
export function randomHex(length: number = 32): string {
  return randomBytes(length).toString('hex');
}

/**
 * Generate random bytes as base64 string
 * 
 * @param length - Number of bytes to generate (default: 24)
 * @returns Base64 string of random bytes
 */
export function randomBase64(length: number = 24): string {
  return randomBytes(length).toString('base64');
}

/**
 * Generate random alphanumeric string
 * 
 * @param length - Length of string to generate (default: 16)
 * @returns Random alphanumeric string
 */
export function randomString(length: number = 16): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = randomBytes(length);
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars[bytes[i] % chars.length];
  }
  return result;
}

/**
 * Generate random URL-safe string
 * 
 * @param length - Length of string to generate (default: 16)
 * @returns Random URL-safe string
 */
export function randomUrlSafeString(length: number = 16): string {
  return randomBase64(length)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
    .substring(0, length);
}

/**
 * Generate UUID v4
 * 
 * @returns UUID v4 string
 */
export function generateUUID(): string {
  const bytes = randomBytes(16);
  
  // Set version to 0100xxxx (v4)
  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  
  // Set variant to 10xxxxxx
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  
  const hex = bytes.toString('hex');
  
  return [
    hex.substring(0, 8),
    hex.substring(8, 12),
    hex.substring(12, 16),
    hex.substring(16, 20),
    hex.substring(20, 32)
  ].join('-');
}

/**
 * Generate a unique token
 * 
 * @param length - Length of token to generate (default: 32)
 * @returns Unique token string
 */
export function generateToken(length: number = 32): string {
  return randomHex(length);
}

/**
 * Hash a string using SHA-256
 * 
 * @param data - Data to hash
 * @returns Hex string of hash
 */
export function sha256(data: string): string {
  return createHash('sha256').update(data).digest('hex');
}

/**
 * Hash a string using SHA-512
 * 
 * @param data - Data to hash
 * @returns Hex string of hash
 */
export function sha512(data: string): string {
  return createHash('sha512').update(data).digest('hex');
}

/**
 * Hash a string using MD5 (not recommended for security)
 * 
 * @param data - Data to hash
 * @returns Hex string of hash
 */
export function md5(data: string): string {
  return createHash('md5').update(data).digest('hex');
}

/**
 * Create HMAC using SHA-256
 * 
 * @param key - Secret key
 * @param data - Data to sign
 * @returns Hex string of HMAC
 */
export function hmacSha256(key: string, data: string): string {
  return createHmac('sha256', key).update(data).digest('hex');
}

/**
 * Create HMAC using SHA-512
 * 
 * @param key - Secret key
 * @param data - Data to sign
 * @returns Hex string of HMAC
 */
export function hmacSha512(key: string, data: string): string {
  return createHmac('sha512', key).update(data).digest('hex');
}

/**
 * Create a hash with salt
 * 
 * @param data - Data to hash
 * @param salt - Salt to use
 * @param algorithm - Hash algorithm to use (default: 'sha256')
 * @returns Hex string of hash
 */
export function hashWithSalt(data: string, salt: string, algorithm: string = 'sha256'): string {
  return createHash(algorithm).update(salt + data).digest('hex');
}

/**
 * Generate a secure random integer
 * 
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (inclusive)
 * @returns Random integer in range
 */
export function randomInt(min: number, max: number): number {
  const range = max - min + 1;
  const bytesNeeded = Math.ceil(Math.log2(range) / 8);
  const cutoff = Math.floor((256 ** bytesNeeded) / range) * range;
  let value;
  
  do {
    value = 0;
    const bytes = randomBytes(bytesNeeded);
    for (let i = 0; i < bytesNeeded; i++) {
      value = (value << 8) + bytes[i];
    }
  } while (value >= cutoff);
  
  return min + (value % range);
}

/**
 * Generate a secure random float
 * 
 * @param min - Minimum value (inclusive)
 * @param max - Maximum value (exclusive)
 * @returns Random float in range
 */
export function randomFloat(min: number, max: number): number {
  return min + (randomBytes(4).readUInt32LE(0) / 0xFFFFFFFF) * (max - min);
}

/**
 * Generate a random boolean
 * 
 * @returns Random boolean value
 */
export function randomBoolean(): boolean {
  return randomBytes(1)[0] < 128;
}

/**
 * Shuffle an array cryptographically
 * 
 * @param arr - Array to shuffle
 * @returns Shuffled array
 */
export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = randomInt(0, i);
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Generate a random color
 * 
 * @returns Random hex color
 */
export function randomColor(): string {
  return '#' + randomBytes(3).toString('hex');
}

/**
 * Generate a random password
 * 
 * @param length - Length of password (default: 16)
 * @param options - Options for password generation
 * @returns Random password string
 */
export function generatePassword(
  length: number = 16,
  options: {
    uppercase?: boolean;
    lowercase?: boolean;
    numbers?: boolean;
    symbols?: boolean;
  } = {}
): string {
  const {
    uppercase = true,
    lowercase = true,
    numbers = true,
    symbols = true,
  } = options;
  
  let chars = '';
  if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz';
  if (numbers) chars += '0123456789';
  if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  if (chars.length === 0) {
    throw new Error('At least one character type must be enabled');
  }
  
  const bytes = randomBytes(length);
  let password = '';
  for (let i = 0; i < length; i++) {
    password += chars[bytes[i] % chars.length];
  }
  
  return password;
}

/**
 * Generate a random OTP (one-time password)
 * 
 * @param length - Length of OTP (default: 6)
 * @returns Random OTP string
 */
export function generateOTP(length: number = 6): string {
  const bytes = randomBytes(length);
  let otp = '';
  for (let i = 0; i < length; i++) {
    otp += bytes[i] % 10;
  }
  return otp;
}

/**
 * Generate a random API key
 * 
 * @param prefix - Optional prefix for the API key
 * @param length - Length of the random part (default: 32)
 * @returns Random API key string
 */
export function generateAPIKey(prefix: string = '', length: number = 32): string {
  const randomPart = randomUrlSafeString(length);
  return prefix ? `${prefix}_${randomPart}` : randomPart;
}

/**
 * Generate a random session ID
 * 
 * @returns Random session ID string
 */
export function generateSessionId(): string {
  return randomUrlSafeString(32);
}

/**
 * Generate a random CSRF token
 * 
 * @returns Random CSRF token string
 */
export function generateCSRFToken(): string {
  return randomUrlSafeString(32);
}

/**
 * Generate a random nonce for CSP
 * 
 * @returns Random nonce string
 */
export function generateNonce(): string {
  return randomBase64(16);
}

/**
 * Generate a random state parameter for OAuth
 * 
 * @returns Random state string
 */
export function generateOAuthState(): string {
  return randomUrlSafeString(32);
}

/**
 * Generate a random verification code
 * 
 * @param length - Length of code (default: 6)
 * @returns Random verification code string
 */
export function generateVerificationCode(length: number = 6): string {
  return randomString(length);
}

/**
 * Generate a random invite code
 * 
 * @param length - Length of code (default: 8)
 * @returns Random invite code string
 */
export function generateInviteCode(length: number = 8): string {
  return randomString(length).toUpperCase();
}

/**
 * Generate a random filename
 * 
 * @param extension - File extension (without dot)
 * @returns Random filename string
 */
export function generateFilename(extension: string = ''): string {
  const base = randomUrlSafeString(16);
  return extension ? `${base}.${extension}` : base;
}

/**
 * Generate a random slug
 * 
 * @param length - Length of slug (default: 8)
 * @returns Random slug string
 */
export function generateSlug(length: number = 8): string {
  return randomString(length).toLowerCase();
}

/**
 * Generate a random order ID
 * 
 * @returns Random order ID string
 */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36);
  const random = randomString(8).toUpperCase();
  return `${timestamp}-${random}`;
}

/**
 * Generate a random transaction ID
 * 
 * @returns Random transaction ID string
 */
export function generateTransactionId(): string {
  const timestamp = Date.now().toString(36);
  const random = randomString(12).toUpperCase();
  return `TXN-${timestamp}-${random}`;
}

/**
 * Generate a random reference number
 * 
 * @param prefix - Prefix for the reference number
 * @returns Random reference number string
 */
export function generateReferenceNumber(prefix: string = 'REF'): string {
  const timestamp = Date.now().toString(36);
  const random = randomString(6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Generate a random tracking ID
 * 
 * @returns Random tracking ID string
 */
export function generateTrackingId(): string {
  const timestamp = Date.now().toString(36);
  const random = randomString(10).toUpperCase();
  return `TRK-${timestamp}-${random}`;
}

/**
 * Generate a random coupon code
 * 
 * @param length - Length of code (default: 8)
 * @returns Random coupon code string
 */
export function generateCouponCode(length: number = 8): string {
  return randomString(length).toUpperCase();
}

/**
 * Generate a random promo code
 * 
 * @param length - Length of code (default: 10)
 * @returns Random promo code string
 */
export function generatePromoCode(length: number = 10): string {
  return randomString(length).toUpperCase();
}

/**
 * Generate a random secret key
 * 
 * @param length - Length of key in bytes (default: 32)
 * @returns Random secret key as hex string
 */
export function generateSecretKey(length: number = 32): string {
  return randomHex(length);
}

/**
 * Generate a random public/private key pair (simplified)
 * Note: This is a placeholder. For production use, use proper crypto libraries.
 * 
 * @returns Object with publicKey and privateKey
 */
export function generateKeyPair(): { publicKey: string; privateKey: string } {
  // This is a simplified version. For production, use proper crypto libraries
  // like node-forge, crypto-js, or the native crypto module's keygen functions
  return {
    publicKey: randomHex(32),
    privateKey: randomHex(64),
  };
}

/**
 * Generate a random salt
 * 
 * @param length - Length of salt in bytes (default: 16)
 * @returns Random salt as hex string
 */
export function generateSalt(length: number = 16): string {
  return randomHex(length);
}

/**
 * Generate a random IV (initialization vector)
 * 
 * @param length - Length of IV in bytes (default: 16)
 * @returns Random IV as hex string
 */
export function generateIV(length: number = 16): string {
  return randomHex(length);
}

/**
 * Generate a random nonce for cryptographic operations
 * 
 * @param length - Length of nonce in bytes (default: 12)
 * @returns Random nonce as hex string
 */
export function generateCryptoNonce(length: number = 12): string {
  return randomHex(length);
}
