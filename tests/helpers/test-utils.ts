/**
 * Test utilities
 * Helper functions for testing
 */

import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';

/**
 * Custom render function that includes providers
 * @param ui - The component to render
 * @param options - Additional render options
 * @returns The render result
 */
export function renderWithProviders(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) {
  // Add providers here as needed
  // Example: <AuthProvider><ThemeProvider>{ui}</ThemeProvider></AuthProvider>
  return render(ui, options);
}

/**
 * Create a mock user object
 * @param overrides - Properties to override
 * @returns A mock user object
 */
export function createMockUser(overrides = {}) {
  return {
    id: '1',
    name: 'Test User',
    email: 'test@example.com',
    emailVerified: new Date(),
    image: null,
    role: 'USER',
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Create a mock session object
 * @param overrides - Properties to override
 * @returns A mock session object
 */
export function createMockSession(overrides = {}) {
  return {
    user: createMockUser(),
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock chart data object
 * @param overrides - Properties to override
 * @returns A mock chart data object
 */
export function createMockChartData(overrides = {}) {
  return {
    id: '1',
    birthDate: new Date('1990-01-01T12:00:00Z'),
    location: 'New York, NY',
    planets: [
      {
        name: 'Sun',
        sign: 'Capricorn',
        degree: 10.5,
        house: 1,
      },
      {
        name: 'Moon',
        sign: 'Pisces',
        degree: 15.2,
        house: 3,
      },
    ],
    aspects: [],
    houses: [],
    interpretation: 'Sample interpretation',
    ...overrides,
  };
}

/**
 * Create a mock subscription object
 * @param overrides - Properties to override
 * @returns A mock subscription object
 */
export function createMockSubscription(overrides = {}) {
  return {
    id: '1',
    userId: '1',
    stripeCustomerId: 'cus_test',
    stripeSubscriptionId: 'sub_test',
    stripePriceId: 'price_test',
    status: 'ACTIVE',
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    cancelAtPeriodEnd: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides,
  };
}

/**
 * Wait for a specified amount of time
 * @param ms - Milliseconds to wait
 * @returns A promise that resolves after the specified time
 */
export function waitFor(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a mock API response
 * @param data - The data to return
 * @param delay - Optional delay in milliseconds
 * @returns A promise that resolves to the mock response
 */
export function mockApiResponse<T>(data: T, delay = 0): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
}

/**
 * Create a mock API error
 * @param message - The error message
 * @param code - The error code
 * @param delay - Optional delay in milliseconds
 * @returns A promise that rejects with the mock error
 */
export function mockApiError(
  message: string,
  code = 'INTERNAL_ERROR',
  delay = 0,
): Promise<never> {
  return new Promise((_, reject) => {
    setTimeout(() => reject(new Error(message)), delay);
  });
}
