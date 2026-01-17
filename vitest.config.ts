/**
 * Vitest configuration
 * Configures Vitest for fast unit and integration testing
 */
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/unit/**/*.test.{js,jsx,ts,tsx}', 'tests/integration/**/*.test.{js,jsx,ts,tsx}'],
    exclude: [
      'node_modules',
      'dist',
      '.next',
      'tests/e2e',
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/coverage/**',
        '**/.next/**',
        '**/dist/**',
        '**/lib/generated/**',
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70,
      },
    },
    testTimeout: 10000,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
      '@/components': path.resolve(__dirname, './components'),
      '@/lib': path.resolve(__dirname, './lib'),
      '@/hooks': path.resolve(__dirname, './hooks'),
      '@/services': path.resolve(__dirname, './services'),
      '@/types': path.resolve(__dirname, './types'),
      '@/app': path.resolve(__dirname, './app'),
      '@/auth': path.resolve(__dirname, './auth'),
      '@/middleware': path.resolve(__dirname, './middleware'),
      '@/prisma': path.resolve(__dirname, './prisma'),
    },
  },
});
