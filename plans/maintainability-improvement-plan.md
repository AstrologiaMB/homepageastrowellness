# Code Maintainability & Developer Experience Improvement Plan

## Executive Summary

This plan outlines a comprehensive refactoring strategy to improve code maintainability and developer experience for the Astrowellness astrology platform. The focus is on **preserving all current behaviors** while improving code quality, type safety, and developer productivity.

**Key Principles:**
- ✅ Zero behavior changes - all features must work exactly as before
- ✅ Incremental refactoring - one step at a time
- ✅ Backward compatible - no breaking changes
- ✅ Test-driven - add tests before refactoring
- ✅ Documented - all changes must be documented

---

## Phase 1: Foundation & Infrastructure (Week 1-2)

### 1.1 Environment Configuration & Validation

**Issues Identified:**
- No validation of required environment variables
- Hardcoded values (e.g., admin email in [`authOptions`](app/api/auth/[...nextauth]/route.ts:87))
- Magic strings scattered throughout codebase

**Actions:**
1. Create centralized environment validation
   - Create `lib/env.ts` with environment schema using Zod
   - Validate all required environment variables at startup
   - Provide clear error messages for missing variables
   - Export typed environment variables

2. Centralize constants
   - Create `lib/constants/` directory
   - Move all hardcoded values (Stripe price IDs, admin emails, etc.)
   - Create feature-specific constant files (e.g., `stripe.constants.ts`, `auth.constants.ts`)
   - Export typed constants

**Files to Create:**
- `lib/env.ts` - Environment validation
- `lib/constants/index.ts` - Constants barrel
- `lib/constants/auth.constants.ts` - Auth-related constants
- `lib/constants/stripe.constants.ts` - Stripe-related constants
- `lib/constants/api.constants.ts` - API-related constants

**Files to Modify:**
- `app/api/auth/[...nextauth]/route.ts` - Use constants instead of hardcoded values
- `lib/stripe.ts` - Use constants from `stripe.constants.ts`
- All API routes - Use centralized constants

---

### 1.2 Type Safety Improvements

**Issues Identified:**
- Use of `@ts-ignore` in [`authOptions`](app/api/auth/[...nextauth]/route.ts:116)
- Excessive use of `any` types (e.g., [`user as any`](app/api/auth/[...nextauth]/route.ts:16))
- Missing type definitions for API responses
- Inline interfaces scattered throughout codebase

**Actions:**
1. Create shared type definitions
   - Create `types/` directory at root level
   - Organize types by domain (auth, subscription, astrology, etc.)
   - Create `types/index.ts` as barrel file
   - Move all inline interfaces to type files

2. Eliminate `@ts-ignore` and `any` types
   - Replace `@ts-ignore` with proper type definitions
   - Create proper types for NextAuth session extensions
   - Use type guards for runtime type checking
   - Add strict null checks where appropriate

3. Create API response types
   - Standardize API response structure
   - Create success/error response types
   - Add pagination types where needed
   - Create validation schemas using Zod

**Files to Create:**
- `types/index.ts` - Type definitions barrel
- `types/auth.types.ts` - Auth-related types (extend existing)
- `types/api.types.ts` - API response/request types
- `types/subscription.types.ts` - Subscription-related types
- `types/astrology.types.ts` - Astrology-related types
- `types/errors.types.ts` - Error types

**Files to Modify:**
- `auth/types/auth.types.ts` - Consolidate with new types
- All API routes - Use proper types instead of `any`
- All components - Use proper types

---

### 1.3 Error Handling Standardization

**Issues Identified:**
- Inconsistent error handling across API routes
- Mix of Spanish and English error messages
- No standardized error response format
- Console.log scattered throughout code

**Actions:**
1. Create error handling utilities
   - Create `lib/errors/` directory
   - Create custom error classes (AppError, ValidationError, AuthError, etc.)
   - Create error response formatter
   - Create error logging utility

2. Standardize error responses
   - Define consistent error response structure
   - Create error codes and messages
   - Add error type to responses
   - Support internationalization (i18n) foundation

3. Replace console.log with proper logging
   - Create `lib/logger.ts` with structured logging
   - Use appropriate log levels (error, warn, info, debug)
   - Add request IDs for tracing
   - Consider integrating with external logging service

**Files to Create:**
- `lib/errors/index.ts` - Error handling barrel
- `lib/errors/AppError.ts` - Base error class
- `lib/errors/ValidationError.ts` - Validation error
- `lib/errors/AuthError.ts` - Authentication error
- `lib/errors/ApiError.ts` - API error
- `lib/errors/error-handler.ts` - Error handler utility
- `lib/errors/error-response.ts` - Error response formatter
- `lib/logger.ts` - Structured logging utility

**Files to Modify:**
- All API routes - Use standardized error handling
- All utility functions - Use proper logging

---

## Phase 2: Code Organization & Structure (Week 2-3)

### 2.1 API Route Refactoring

**Issues Identified:**
- Business logic mixed with route handlers
- Code duplication across similar routes
- Inconsistent response formats
- No input validation

**Actions:**
1. Create service layer
   - Create `services/` directory at root level
   - Extract business logic from API routes
   - Create service files by domain (auth, subscription, astrology, etc.)
   - Use dependency injection pattern where appropriate

2. Create middleware for common functionality
   - Create `middleware/` directory at root level
   - Create authentication middleware
   - Create authorization middleware
   - Create validation middleware
   - Create error handling middleware

3. Standardize API responses
   - Create response utility functions
   - Define consistent response structure
   - Add pagination support
   - Add caching headers where appropriate

4. Add input validation
   - Create Zod schemas for all API inputs
   - Validate requests before processing
   - Return clear validation errors
   - Document validation rules

**Files to Create:**
- `services/index.ts` - Services barrel
- `services/auth.service.ts` - Auth business logic
- `services/subscription.service.ts` - Subscription business logic
- `services/astrology.service.ts` - Astrology business logic
- `services/user.service.ts` - User business logic
- `middleware/auth.middleware.ts` - Auth middleware
- `middleware/authorization.middleware.ts` - Authorization middleware
- `middleware/validation.middleware.ts` - Validation middleware
- `middleware/error.middleware.ts` - Error middleware
- `lib/api-response.ts` - API response utilities
- `lib/validation/` - Validation schemas directory
- `lib/validation/auth.validation.ts` - Auth validation schemas
- `lib/validation/subscription.validation.ts` - Subscription validation schemas

**Files to Modify:**
- `app/api/auth/[...nextauth]/route.ts` - Extract business logic
- `app/api/cartas/tropical/route.ts` - Use service layer
- `app/api/interpretaciones/route.ts` - Use service layer
- All other API routes - Refactor to use services

---

### 2.2 Component Organization

**Issues Identified:**
- Components scattered across multiple directories
- Mixed client/server components without clear separation
- Duplicate component logic
- No clear component hierarchy

**Actions:**
1. Reorganize component structure
   - Create clear separation between UI components and feature components
   - Create `components/ui/` for reusable UI components (already exists)
   - Create `components/features/` for feature-specific components
   - Create `components/layout/` for layout components
   - Create `components/providers/` for context providers

2. Extract shared logic into custom hooks
   - Review existing hooks in `hooks/`
   - Create additional hooks for common patterns
   - Ensure hooks are properly typed
   - Add JSDoc comments for all hooks

3. Create component composition patterns
   - Identify repeated component patterns
   - Create compound components where appropriate
   - Use render props or children props for flexibility
   - Document component APIs

**Files to Create:**
- `components/features/` directory
- `components/features/auth/` - Auth-related components
- `components/features/astrology/` - Astrology-related components
- `components/features/subscription/` - Subscription-related components
- `components/layout/` directory (if not exists)
- `components/providers/` directory
- `hooks/use-api.ts` - Generic API hook
- `hooks/use-cached-data.ts` - Caching hook
- `hooks/use-form-validation.ts` - Form validation hook

**Files to Modify:**
- Move feature components from root `components/` to `components/features/`
- Update all imports to reflect new structure
- Refactor components to use custom hooks

---

### 2.3 Utility Functions Organization

**Issues Identified:**
- Utility functions scattered across multiple files
- No clear categorization of utilities
- Some utilities are domain-specific but in general utils
- Missing utility functions for common operations

**Actions:**
1. Reorganize utility functions
   - Create `lib/utils/` directory
   - Categorize utilities by domain (astrology, date, string, etc.)
   - Create barrel file for easy imports
   - Add JSDoc comments for all utilities

2. Create missing utility functions
   - Date/time utilities (beyond existing)
   - String manipulation utilities
   - Number formatting utilities
   - Array/object manipulation utilities
   - Type guard utilities

3. Standardize utility function signatures
   - Use consistent parameter ordering
   - Use consistent return types
   - Add proper error handling
   - Add unit tests for all utilities

**Files to Create:**
- `lib/utils/index.ts` - Utilities barrel
- `lib/utils/date.utils.ts` - Date/time utilities
- `lib/utils/string.utils.ts` - String utilities
- `lib/utils/number.utils.ts` - Number utilities
- `lib/utils/array.utils.ts` - Array utilities
- `lib/utils/object.utils.ts` - Object utilities
- `lib/utils/type-guards.ts` - Type guard utilities
- `lib/utils/validation.utils.ts` - Validation utilities

**Files to Modify:**
- `lib/utils.ts` - Move to `lib/utils/` and categorize
- `lib/astrology-utils.ts` - Keep in `lib/` or move to `lib/utils/astrology.utils.ts`
- All files importing utilities - Update import paths

---

## Phase 3: Code Quality & Standards (Week 3-4)

### 3.1 Language Consistency

**Issues Identified:**
- Mixed Spanish and English in comments and error messages
- Inconsistent naming conventions
- Some variables named in Spanish, others in English

**Actions:**
1. Standardize code language to English
   - Translate all Spanish comments to English
   - Translate all Spanish variable names to English
   - Translate all Spanish error messages to English
   - Create i18n foundation for user-facing text

2. Create internationalization (i18n) foundation
   - Install and configure next-intl or similar
   - Create translation files for user-facing text
   - Create translation utility functions
   - Document translation guidelines

3. Standardize naming conventions
   - Use camelCase for variables and functions
   - Use PascalCase for types, interfaces, and components
   - Use UPPER_SNAKE_CASE for constants
   - Use kebab-case for file names (except components)

**Files to Create:**
- `locales/en.json` - English translations
- `locales/es.json` - Spanish translations
- `lib/i18n.ts` - Internationalization utilities
- `docs/CODING_STANDARDS.md` - Coding standards document

**Files to Modify:**
- All files with Spanish comments - Translate to English
- All files with Spanish variable names - Rename to English
- All files with Spanish error messages - Use i18n or translate

---

### 3.2 Code Documentation

**Issues Identified:**
- Inconsistent documentation across files
- Missing JSDoc comments for functions
- No architecture documentation
- No API documentation

**Actions:**
1. Add JSDoc comments to all functions
   - Document function purpose
   - Document parameters with types
   - Document return values
   - Add usage examples where appropriate

2. Create architecture documentation
   - Create `docs/ARCHITECTURE.md` - System architecture overview
   - Create `docs/API.md` - API documentation
   - Create `docs/DATABASE.md` - Database schema documentation
   - Create `docs/DEVELOPMENT.md` - Development guide

3. Create component documentation
   - Document component props
   - Document component usage
   - Document component behavior
   - Add Storybook or similar for UI components

4. Create migration guide
   - Document all changes made
   - Provide migration steps for existing code
   - Document breaking changes (should be none)
   - Provide rollback procedures

**Files to Create:**
- `docs/ARCHITECTURE.md` - Architecture overview
- `docs/API.md` - API documentation
- `docs/DATABASE.md` - Database documentation
- `docs/DEVELOPMENT.md` - Development guide
- `docs/COMPONENTS.md` - Component documentation
- `docs/MIGRATION_GUIDE.md` - Migration guide
- `docs/CODING_STANDARDS.md` - Coding standards

**Files to Modify:**
- All TypeScript/JavaScript files - Add JSDoc comments
- All component files - Add prop documentation

---

### 3.3 Testing Infrastructure

**Issues Identified:**
- No test files visible in codebase
- No testing framework configured
- No test coverage reporting
- No CI/CD testing pipeline

**Actions:**
1. Set up testing framework
   - Install and configure Jest and React Testing Library
   - Install and configure Vitest for faster tests
   - Configure test environment
   - Add test scripts to package.json

2. Create test utilities
   - Create test setup files
   - Create test helpers and fixtures
   - Create mock data factories
   - Create test database utilities

3. Add tests for critical paths
   - Test authentication flow
   - Test subscription logic
   - Test API routes
   - Test utility functions

4. Set up test coverage reporting
   - Configure coverage thresholds
   - Generate coverage reports
   - Add coverage to CI/CD pipeline

**Files to Create:**
- `jest.config.js` - Jest configuration
- `vitest.config.ts` - Vitest configuration
- `tests/setup.ts` - Test setup
- `tests/helpers/` - Test helpers
- `tests/mocks/` - Mock data
- `tests/unit/` - Unit tests
- `tests/integration/` - Integration tests
- `tests/e2e/` - End-to-end tests

**Files to Modify:**
- `package.json` - Add test scripts
- `tsconfig.json` - Add test configuration

---

## Phase 4: Developer Experience (Week 4-5)

### 4.1 Code Quality Tools

**Issues Identified:**
- ESLint configured but not enforced
- No Prettier configuration
- No pre-commit hooks
- No code formatting automation

**Actions:**
1. Configure ESLint rules
   - Review and update ESLint configuration
   - Add custom rules for project-specific patterns
   - Ensure strict type checking
   - Add import ordering rules

2. Configure Prettier
   - Create Prettier configuration
   - Define code formatting rules
   - Integrate with ESLint
   - Add format-on-save configuration

3. Set up pre-commit hooks
   - Install and configure Husky
   - Install and configure lint-staged
   - Add pre-commit hooks for linting and formatting
   - Add pre-push hooks for testing

4. Create VS Code settings
   - Create `.vscode/settings.json` - Project-specific settings
   - Create `.vscode/extensions.json` - Recommended extensions
   - Create `.vscode/launch.json` - Debug configurations
   - Document VS Code setup

**Files to Create:**
- `.eslintrc.js` - ESLint configuration (update if exists)
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Prettier ignore file
- `.husky/pre-commit` - Pre-commit hook
- `.husky/pre-push` - Pre-push hook
- `.lintstagedrc.json` - Lint-staged configuration
- `.vscode/settings.json` - VS Code settings
- `.vscode/extensions.json` - VS Code extensions
- `.vscode/launch.json` - VS Code debug configuration

**Files to Modify:**
- `package.json` - Add scripts and dependencies

---

### 4.2 Build & Development Tools

**Issues Identified:**
- No build optimization
- No development tooling for debugging
- No performance monitoring
- No error tracking

**Actions:**
1. Optimize build process
   - Review and optimize Next.js configuration
   - Add build analysis tools
   - Optimize bundle size
   - Add code splitting strategies

2. Set up debugging tools
   - Configure source maps
   - Add debugging utilities
   - Create debug configurations
   - Document debugging procedures

3. Add performance monitoring
   - Add performance monitoring utilities
   - Add API response time tracking
   - Add database query tracking
   - Create performance dashboards

4. Add error tracking
   - Integrate error tracking service (e.g., Sentry)
   - Configure error reporting
   - Add error context
   - Create error reporting dashboard

**Files to Create:**
- `next.config.optimized.mjs` - Optimized Next.js config
- `lib/performance.ts` - Performance monitoring utilities
- `lib/debug.ts` - Debugging utilities
- `docs/DEBUGGING.md` - Debugging guide
- `docs/PERFORMANCE.md` - Performance guide

**Files to Modify:**
- `next.config.mjs` - Optimize configuration
- `package.json` - Add performance monitoring dependencies

---

### 4.3 Documentation & Onboarding

**Issues Identified:**
- No onboarding guide for new developers
- Inconsistent documentation
- No troubleshooting guide
- No contribution guidelines

**Actions:**
1. Create onboarding guide
   - Create `docs/ONBOARDING.md` - Developer onboarding guide
   - Document setup process
   - Document development workflow
   - Document common tasks

2. Create troubleshooting guide
   - Create `docs/TROUBLESHOOTING.md` - Common issues and solutions
   - Document error scenarios
   - Document debugging procedures
   - Document recovery procedures

3. Create contribution guidelines
   - Create `CONTRIBUTING.md` - Contribution guidelines
   - Document code review process
   - Document commit message conventions
   - Document pull request process

4. Create FAQ
   - Create `docs/FAQ.md` - Frequently asked questions
   - Document common questions
   - Document solutions to common problems
   - Document best practices

**Files to Create:**
- `docs/ONBOARDING.md` - Onboarding guide
- `docs/TROUBLESHOOTING.md` - Troubleshooting guide
- `docs/DEBUGGING.md` - Debugging guide
- `docs/PERFORMANCE.md` - Performance guide
- `CONTRIBUTING.md` - Contribution guidelines
- `docs/FAQ.md` - FAQ

---

## Phase 5: Cleanup & Optimization (Week 5-6)

### 5.1 Remove Dead Code

**Issues Identified:**
- Unused imports in multiple files
- Unused variables and functions
- Commented out code blocks
- Duplicate code

**Actions:**
1. Remove unused imports
   - Use ESLint to identify unused imports
   - Remove all unused imports
   - Organize imports consistently

2. Remove unused code
   - Identify unused functions and variables
   - Remove dead code
   - Remove commented out code
   - Remove duplicate code

3. Clean up root directory
   - Move documentation files to `docs/`
   - Move scripts to `scripts/`
   - Move configuration files to appropriate locations
   - Remove unnecessary files

**Files to Modify:**
- All files with unused imports - Remove unused imports
- All files with unused code - Remove unused code
- Root directory - Reorganize files

---

### 5.2 Optimize Database Queries

**Issues Identified:**
- Potential N+1 query issues
- No query optimization
- No database indexing strategy documented
- No query performance monitoring

**Actions:**
1. Review database queries
   - Identify N+1 query issues
   - Optimize queries with proper includes
   - Add database indexes where needed
   - Document query patterns

2. Create database utilities
   - Create query builder utilities
   - Create pagination utilities
   - Create caching utilities for database queries
   - Create query performance monitoring

3. Document database schema
   - Document all tables and relationships
   - Document indexes and constraints
   - Document query patterns
   - Document migration procedures

**Files to Create:**
- `lib/database/` directory
- `lib/database/query-builder.ts` - Query builder utilities
- `lib/database/pagination.ts` - Pagination utilities
- `lib/database/cache.ts` - Database caching utilities
- `docs/DATABASE.md` - Database documentation

**Files to Modify:**
- All files with database queries - Optimize queries
- `prisma/schema.prisma` - Add indexes if needed

---

### 5.3 Optimize API Performance

**Issues Identified:**
- No caching strategy documented
- No rate limiting
- No request optimization
- No response compression

**Actions:**
1. Implement caching strategy
   - Document caching strategy
   - Implement API response caching
   - Implement database query caching
   - Implement client-side caching headers

2. Add rate limiting
   - Implement rate limiting middleware
   - Configure rate limits per endpoint
   - Document rate limits
   - Add rate limit headers to responses

3. Optimize requests
   - Implement request compression
   - Optimize payload sizes
   - Implement request batching where appropriate
   - Add request validation

4. Optimize responses
   - Implement response compression
   - Optimize response sizes
   - Add response caching headers
   - Implement pagination for large datasets

**Files to Create:**
- `middleware/rate-limit.middleware.ts` - Rate limiting middleware
- `lib/cache/` directory
- `lib/cache/api-cache.ts` - API caching utilities
- `lib/cache/db-cache.ts` - Database caching utilities
- `docs/CACHING.md` - Caching documentation
- `docs/RATE_LIMITING.md` - Rate limiting documentation

**Files to Modify:**
- API routes - Add caching and rate limiting
- `next.config.mjs` - Add compression

---

## Implementation Strategy

### Incremental Approach

1. **Start with Foundation (Phase 1)**
   - Environment configuration and validation
   - Type safety improvements
   - Error handling standardization

2. **Move to Structure (Phase 2)**
   - API route refactoring
   - Component organization
   - Utility functions organization

3. **Focus on Quality (Phase 3)**
   - Language consistency
   - Code documentation
   - Testing infrastructure

4. **Enhance DX (Phase 4)**
   - Code quality tools
   - Build and development tools
   - Documentation and onboarding

5. **Finish with Cleanup (Phase 5)**
   - Remove dead code
   - Optimize database queries
   - Optimize API performance

### Testing Strategy

1. **Before Refactoring**
   - Add tests for critical paths
   - Ensure all tests pass
   - Document current behavior

2. **During Refactoring**
   - Run tests after each change
   - Ensure no behavior changes
   - Update tests as needed

3. **After Refactoring**
   - Run full test suite
   - Verify all features work
   - Performance testing

### Rollback Strategy

1. **Git Strategy**
   - Create feature branches for each phase
   - Use descriptive commit messages
   - Tag releases before major changes

2. **Backup Strategy**
   - Backup database before schema changes
   - Backup configuration files
   - Document rollback procedures

3. **Monitoring**
   - Monitor application performance
   - Monitor error rates
   - Monitor user feedback

---

## Success Metrics

### Code Quality Metrics
- Reduce TypeScript errors to 0
- Reduce ESLint warnings to 0
- Achieve 80%+ test coverage
- Reduce code duplication by 50%

### Developer Experience Metrics
- Reduce onboarding time by 50%
- Reduce time to add new features by 30%
- Reduce time to fix bugs by 40%
- Increase developer satisfaction

### Performance Metrics
- Maintain or improve API response times
- Maintain or improve page load times
- Maintain or improve database query performance
- Maintain or improve build times

---

## Risk Assessment

### Low Risk
- Adding documentation
- Reorganizing files
- Adding type definitions
- Creating utility functions

### Medium Risk
- Refactoring API routes
- Reorganizing components
- Changing error handling
- Adding tests

### High Risk
- Changing database schema
- Modifying authentication flow
- Changing subscription logic
- Modifying payment processing

**Mitigation Strategies:**
- Comprehensive testing before changes
- Incremental implementation
- Feature flags for risky changes
- Rollback procedures documented

---

## Next Steps

1. **Review this plan** with the team
2. **Prioritize phases** based on team capacity
3. **Create detailed task lists** for each phase
4. **Set up tracking** for progress
5. **Begin implementation** with Phase 1

---

## Appendix: Detailed File Structure

### Proposed Directory Structure

```
homepageastrowellness/
├── app/                          # Next.js app directory
│   ├── api/                      # API routes
│   │   ├── auth/                 # Auth endpoints
│   │   ├── cartas/               # Chart endpoints
│   │   ├── interpretaciones/     # Interpretation endpoints
│   │   ├── stripe/               # Stripe endpoints
│   │   └── webhooks/             # Webhook endpoints
│   ├── auth/                     # Auth pages
│   ├── calendario/               # Calendar pages
│   ├── cartas/                   # Chart pages
│   └── components/               # Server components
├── components/                   # Client components
│   ├── features/                # Feature-specific components
│   │   ├── auth/                # Auth components
│   │   ├── astrology/           # Astrology components
│   │   └── subscription/        # Subscription components
│   ├── layout/                  # Layout components
│   ├── providers/              # Context providers
│   └── ui/                      # Reusable UI components
├── docs/                        # Documentation
│   ├── ARCHITECTURE.md          # Architecture overview
│   ├── API.md                   # API documentation
│   ├── DATABASE.md              # Database documentation
│   ├── DEVELOPMENT.md           # Development guide
│   ├── ONBOARDING.md            # Onboarding guide
│   ├── TROUBLESHOOTING.md       # Troubleshooting guide
│   ├── DEBUGGING.md             # Debugging guide
│   ├── PERFORMANCE.md           # Performance guide
│   ├── CACHING.md               # Caching documentation
│   ├── RATE_LIMITING.md         # Rate limiting documentation
│   ├── CODING_STANDARDS.md      # Coding standards
│   └── FAQ.md                   # FAQ
├── hooks/                       # Custom React hooks
├── lib/                         # Utility libraries
│   ├── cache/                   # Caching utilities
│   ├── constants/               # Constants
│   ├── database/                # Database utilities
│   ├── errors/                  # Error handling
│   ├── services/                # Business logic services
│   ├── utils/                   # Utility functions
│   ├── validation/              # Validation schemas
│   ├── api-config.ts            # API configuration
│   ├── api-response.ts          # API response utilities
│   ├── env.ts                   # Environment validation
│   ├── logger.ts                # Logging utility
│   └── prisma.ts                # Prisma client
├── middleware/                  # Custom middleware
│   ├── auth.middleware.ts       # Auth middleware
│   ├── authorization.middleware.ts  # Authorization middleware
│   ├── error.middleware.ts      # Error middleware
│   ├── rate-limit.middleware.ts # Rate limiting middleware
│   └── validation.middleware.ts # Validation middleware
├── services/                    # Business logic services
│   ├── auth.service.ts          # Auth service
│   ├── subscription.service.ts  # Subscription service
│   ├── astrology.service.ts     # Astrology service
│   └── user.service.ts          # User service
├── tests/                       # Tests
│   ├── unit/                    # Unit tests
│   ├── integration/             # Integration tests
│   ├── e2e/                     # End-to-end tests
│   ├── helpers/                 # Test helpers
│   ├── mocks/                   # Mock data
│   └── setup.ts                 # Test setup
├── types/                       # Type definitions
│   ├── auth.types.ts            # Auth types
│   ├── api.types.ts             # API types
│   ├── subscription.types.ts    # Subscription types
│   ├── astrology.types.ts       # Astrology types
│   ├── errors.types.ts          # Error types
│   └── index.ts                 # Type barrel
├── locales/                     # Internationalization
│   ├── en.json                  # English translations
│   └── es.json                  # Spanish translations
├── prisma/                      # Prisma ORM
│   ├── schema.prisma            # Database schema
│   └── migrations/              # Database migrations
├── scripts/                     # Utility scripts
├── .vscode/                     # VS Code configuration
├── .eslintrc.js                 # ESLint configuration
├── .prettierrc                  # Prettier configuration
├── .husky/                      # Git hooks
├── next.config.mjs              # Next.js configuration
├── tsconfig.json                # TypeScript configuration
├── package.json                 # Dependencies
├── CONTRIBUTING.md              # Contribution guidelines
└── README.md                    # Project README
```

---

## Conclusion

This comprehensive plan provides a roadmap for significantly improving code maintainability and developer experience while preserving all current behaviors. The incremental approach ensures minimal risk and allows for continuous delivery of improvements.

**Key Benefits:**
- ✅ Better code organization
- ✅ Improved type safety
- ✅ Standardized error handling
- ✅ Comprehensive documentation
- ✅ Better testing coverage
- ✅ Improved developer experience
- ✅ Easier onboarding for new developers
- ✅ Reduced technical debt

**Estimated Timeline:** 6 weeks for full implementation
**Estimated Effort:** Medium-High (depending on team size)
**Risk Level:** Low-Medium (incremental approach with testing)
