import { withSentryConfig } from '@sentry/nextjs';
import withBundleAnalyzer from '@next/bundle-analyzer';

/** @type {import('next').NextConfig} */

const nextConfig = {
  // Output mode for Docker deployment
  output: 'standalone',

  // Enable strict mode for better error detection
  reactStrictMode: true,

  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'warn'],
          }
        : false,
  },

  // ESLint configuration
  eslint: {
    // Enable ESLint during builds for better code quality
    ignoreDuringBuilds: false,
    dirs: ['app', 'components', 'lib', 'hooks', 'services'],
  },

  // TypeScript configuration
  typescript: {
    // Enable TypeScript checking during builds
    ignoreBuildErrors: false,
  },

  // Image optimization
  images: {
    // Enable image optimization for better performance
    unoptimized: false,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Experimental features for performance
  experimental: {
    // Optimize package imports - reduces bundle size by only importing used modules
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      'recharts',
      'cmdk',
      // Additional optimizations
      'react-markdown',
      '@astrodraw/astrochart',
      'radix-ui',
      'react-day-picker',
      // Form and validation
      '@hookform/resolvers',
      'zod',
      // UI utilities
      'sonner',
      'next-themes',
    ],
    // Enable server actions
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Turbopack configuration for faster dev builds
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json'],
    },
  },

  // Aggressive tree-shaking for lucide-react icons
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Webpack configuration for chunk splitting
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          // Vendor chunk for all node_modules
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // Separate chunk for recharts (large charting library ~110KB)
          recharts: {
            test: /[\\/]node_modules[\\/]recharts[\\/]/,
            name: 'recharts',
            chunks: 'all',
            priority: 20,
          },
          // Separate chunk for Google Maps related packages
          maps: {
            test: /[\\/]node_modules[\\/](@vis\.gl|@react-google-maps)[\\/]/,
            name: 'maps',
            chunks: 'all',
            priority: 20,
          },
          // Separate chunk for Sentry (~150KB) - only loads on errors
          sentry: {
            test: /[\\/]node_modules[\\/]@sentry[\\/]/,
            name: 'sentry',
            chunks: 'all',
            priority: 25,
          },
          // Separate chunk for react-markdown and deps (~30KB)
          markdown: {
            test: /[\\/]node_modules[\\/](react-markdown|remark-|unified|bail|ccount|comma-separated-tokens|decode-named-character-reference|devlop|escape-string-regexp|hast-|is-|mdast-|micromark|myst|periscopic|property-information|space-separated-tokens|stringify-|trim-lines|trough|unist-|vfile|web-namespaces|zwitch)[\\/]/,
            name: 'markdown',
            chunks: 'all',
            priority: 20,
          },
          // Separate chunk for Radix UI components
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            chunks: 'all',
            priority: 20,
          },
          // Separate chunk for form libraries (react-hook-form, zod)
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|@hookform|zod)[\\/]/,
            name: 'forms',
            chunks: 'all',
            priority: 20,
          },
        },
      };
    }
    return config;
  },

  // Headers for security and caching
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=30',
          },
          {
            key: 'X-Accel-Buffering',
            value: 'no',
          },
        ],
      },
      {
        source: '/api/auth/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate',
          },
          {
            key: 'Pragma',
            value: 'no-cache',
          },
        ],
      },
      {
        source: '/api/cartas/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/api/interpretaciones/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=300, stale-while-revalidate=60',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
    ];
  },

  // Redirects for SEO and user experience
  async redirects() {
    return [];
  },

  // Rewrites for API proxying
  async rewrites() {
    return [];
  },

  // Logging configuration
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  // Production source maps for debugging
  productionBrowserSourceMaps: false,

  // Power header for better performance
  poweredByHeader: false,

  // Compression
  compress: true,

  // Generate ETags
  generateEtags: true,

  // On-demand entries for development
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Page extensions
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
};

// Bundle analyzer wrapper for analyzing build output
const withAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

export default withSentryConfig(withAnalyzer(nextConfig), {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: 'aaamb',

  project: 'javascript-nextjs',

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  webpack: {
    // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
    // See the following for more information:
    // https://docs.sentry.io/product/crons/
    // https://vercel.com/docs/cron-jobs
    automaticVercelMonitors: true,

    // Tree-shaking options for reducing bundle size
    treeshake: {
      // Automatically tree-shake Sentry logger statements to reduce bundle size
      removeDebugLogging: true,
    },
  },
});
