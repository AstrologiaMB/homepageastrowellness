/**
 * Database mock data
 * Mock data for database operations
 */

import { PrismaClient } from '@prisma/client';
import { vi } from 'vitest';

/**
 * Mock Prisma Client
 * Used for testing database operations without a real database
 */
export const mockPrismaClient = {
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    upsert: vi.fn(),
    count: vi.fn(),
  },
  account: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  session: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  verificationToken: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  subscription: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    upsert: vi.fn(),
  },
  natalData: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    upsert: vi.fn(),
  },
  chartCache: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
    findFirst: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  $transaction: vi.fn(),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
  $use: vi.fn(),
  $on: vi.fn(),
  $extends: vi.fn(),
};

/**
 * Mock user records
 */
export const mockUserRecords = [
  {
    id: '1',
    email: 'john@example.com',
    emailVerified: new Date('2024-01-01'),
    name: 'John Doe',
    password: '$2a$10$hashedpassword',
    image: null,
    role: 'USER',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'jane@example.com',
    emailVerified: new Date('2024-01-02'),
    name: 'Jane Smith',
    password: '$2a$10$hashedpassword',
    image: null,
    role: 'ADMIN',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
  },
];

/**
 * Mock account records
 */
export const mockAccountRecords = [
  {
    id: '1',
    userId: '1',
    type: 'oauth',
    provider: 'google',
    providerAccountId: 'google_123',
    refresh_token: 'refresh_token',
    access_token: 'access_token',
    expires_at: 1234567890,
    token_type: 'Bearer',
    scope: 'openid profile email',
    id_token: 'id_token',
    session_state: 'session_state',
  },
];

/**
 * Mock session records
 */
export const mockSessionRecords = [
  {
    id: '1',
    sessionToken: 'session_token_1',
    userId: '1',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
];

/**
 * Mock verification token records
 */
export const mockVerificationTokenRecords = [
  {
    identifier: 'john@example.com',
    token: 'verification_token_1',
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
  },
];

/**
 * Mock subscription records
 */
export const mockSubscriptionRecords = [
  {
    id: '1',
    userId: '1',
    stripeCustomerId: 'cus_test_1',
    stripeSubscriptionId: 'sub_test_1',
    stripePriceId: 'price_premium',
    status: 'ACTIVE',
    currentPeriodEnd: new Date('2024-02-01'),
    cancelAtPeriodEnd: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock natal data records
 */
export const mockNatalDataRecords = [
  {
    id: '1',
    userId: '1',
    birthDate: new Date('1990-01-01T12:00:00Z'),
    location: 'New York, NY',
    latitude: 40.7128,
    longitude: -74.006,
    timezone: 'America/New_York',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
  },
];

/**
 * Mock chart cache records
 */
export const mockChartCacheRecords = [
  {
    id: '1',
    userId: '1',
    chartType: 'TROPICAL',
    chartData: {
      planets: [],
      aspects: [],
      houses: [],
    },
    interpretation: 'Sample interpretation',
    createdAt: new Date('2024-01-01'),
    expiresAt: new Date('2024-02-01'),
  },
];

/**
 * Reset all mock functions
 * Call this before each test to reset mock state
 */
export function resetAllMocks() {
  mockPrismaClient.user.findUnique.mockReset();
  mockPrismaClient.user.findMany.mockReset();
  mockPrismaClient.user.findFirst.mockReset();
  mockPrismaClient.user.create.mockReset();
  mockPrismaClient.user.update.mockReset();
  mockPrismaClient.user.delete.mockReset();
  mockPrismaClient.user.upsert.mockReset();
  mockPrismaClient.user.count.mockReset();

  mockPrismaClient.account.findUnique.mockReset();
  mockPrismaClient.account.findMany.mockReset();
  mockPrismaClient.account.create.mockReset();
  mockPrismaClient.account.update.mockReset();
  mockPrismaClient.account.delete.mockReset();

  mockPrismaClient.session.findUnique.mockReset();
  mockPrismaClient.session.findMany.mockReset();
  mockPrismaClient.session.create.mockReset();
  mockPrismaClient.session.update.mockReset();
  mockPrismaClient.session.delete.mockReset();

  mockPrismaClient.verificationToken.findUnique.mockReset();
  mockPrismaClient.verificationToken.findMany.mockReset();
  mockPrismaClient.verificationToken.create.mockReset();
  mockPrismaClient.verificationToken.update.mockReset();
  mockPrismaClient.verificationToken.delete.mockReset();

  mockPrismaClient.subscription.findUnique.mockReset();
  mockPrismaClient.subscription.findMany.mockReset();
  mockPrismaClient.subscription.findFirst.mockReset();
  mockPrismaClient.subscription.create.mockReset();
  mockPrismaClient.subscription.update.mockReset();
  mockPrismaClient.subscription.delete.mockReset();
  mockPrismaClient.subscription.upsert.mockReset();

  mockPrismaClient.natalData.findUnique.mockReset();
  mockPrismaClient.natalData.findMany.mockReset();
  mockPrismaClient.natalData.findFirst.mockReset();
  mockPrismaClient.natalData.create.mockReset();
  mockPrismaClient.natalData.update.mockReset();
  mockPrismaClient.natalData.delete.mockReset();
  mockPrismaClient.natalData.upsert.mockReset();

  mockPrismaClient.chartCache.findUnique.mockReset();
  mockPrismaClient.chartCache.findMany.mockReset();
  mockPrismaClient.chartCache.findFirst.mockReset();
  mockPrismaClient.chartCache.create.mockReset();
  mockPrismaClient.chartCache.update.mockReset();
  mockPrismaClient.chartCache.delete.mockReset();

  mockPrismaClient.$transaction.mockReset();
  mockPrismaClient.$connect.mockReset();
  mockPrismaClient.$disconnect.mockReset();
}

/**
 * Mock Prisma Client instance
 * Use this in tests instead of the real Prisma Client
 */
export const prisma = mockPrismaClient as unknown as PrismaClient;
