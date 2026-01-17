# Coding Standards

## Table of Contents

1. [Language](#language)
2. [Naming Conventions](#naming-conventions)
3. [File Organization](#file-organization)
4. [Code Style](#code-style)
5. [TypeScript Best Practices](#typescript-best-practices)
6. [React Best Practices](#react-best-practices)
7. [API Standards](#api-standards)
8. [Testing Standards](#testing-standards)
9. [Documentation Standards](#documentation-standards)
10. [Git Commit Standards](#git-commit-standards)

---

## Language

### Code Language
- **All code must be written in English**
- Variable names, function names, class names, and comments must be in English
- Only user-facing text should be internationalized

### User-Facing Text
- User-facing text should be defined in translation files (`locales/en.json`, `locales/es.json`)
- Use the `t()` function from `lib/i18n.ts` to retrieve translations
- Never hardcode user-facing text in components

### Example
```typescript
// ✅ Good - English code with i18n
const errorMessage = t('auth.login.errors.invalidCredentials');

// ❌ Bad - Spanish code
const mensajeError = 'Credenciales inválidas';
```

---

## Naming Conventions

### Variables and Functions
- **camelCase**: `userName`, `calculateChart`, `isValid`
- Descriptive and meaningful names
- Avoid abbreviations unless widely understood

### Constants
- **UPPER_SNAKE_CASE**: `MAX_RETRIES`, `DEFAULT_LOCALE`, `API_BASE_URL`
- Define constants at the top of files or in dedicated constant files

### Types, Interfaces, and Enums
- **PascalCase**: `User`, `ChartData`, `ApiResponse`
- Use `I` prefix for interfaces is **NOT** required
- Prefer `type` for unions and `interface` for object shapes

### Components
- **PascalCase**: `LoginForm`, `CartaNatal`, `Sidebar`
- File names should match component names

### File Names
- **kebab-case**: `auth.service.ts`, `user-utils.ts`, `api-response.ts`
- Component files use PascalCase: `LoginForm.tsx`, `CartaNatal.tsx`

### Example
```typescript
// ✅ Good
const MAX_RETRIES = 3;
const DEFAULT_LOCALE = 'en' as const;

interface UserData {
  id: string;
  name: string;
  email: string;
}

function calculateChart(birthDate: Date, location: string): ChartData {
  // ...
}

// ❌ Bad
const maxRetries = 3;
const defaultLocale = 'en';

interface userData {
  id: string;
  nombre: string;
}

function calcChart(date: Date, loc: string): any {
  // ...
}
```

---

## File Organization

### Directory Structure
```
app/
  api/           # API routes
  auth/          # Auth pages
  cartas/        # Chart pages
  components/    # Components
    ui/          # Reusable UI components
    features/    # Feature-specific components
    layout/      # Layout components
    providers/   # Context providers
auth/            # Auth logic
lib/             # Utility libraries
  utils/         # Utility functions
  errors/        # Error handling
  constants/     # Constants
  validation/    # Validation schemas
hooks/           # Custom React hooks
services/        # Business logic services
middleware/      # Middleware functions
types/           # TypeScript type definitions
locales/         # Translation files
tests/           # Test files
docs/            # Documentation
```

### File Grouping
- Related files should be grouped together
- Use index.ts files for barrel exports
- Keep files focused and single-purpose

### Example
```typescript
// services/index.ts
export { authService } from './auth.service';
export { subscriptionService } from './subscription.service';
export { astrologyService } from './astrology.service';
export { userService } from './user.service';
```

---

## Code Style

### Indentation
- **2 spaces** for indentation
- No tabs

### Line Length
- Maximum **100 characters** per line
- Break long lines logically

### Semicolons
- Always use semicolons

### Quotes
- Use **single quotes** for strings
- Use **double quotes** for JSX attributes

### Trailing Commas
- Use trailing commas in multi-line arrays, objects, and function parameters

### Example
```typescript
// ✅ Good
const user = {
  id: '123',
  name: 'John Doe',
  email: 'john@example.com',
};

function calculate(
  param1: string,
  param2: number,
  param3: boolean,
): Result {
  // ...
}

// ❌ Bad
const user = {id: '123', name: 'John Doe', email: 'john@example.com'}

function calculate(param1: string, param2: number, param3: boolean): Result {
  // ...
}
```

---

## TypeScript Best Practices

### Type Safety
- Avoid `any` type
- Use `unknown` instead of `any` when the type is truly unknown
- Use type guards for runtime type checking

### Type Definitions
- Define types in dedicated files
- Export types from barrel files
- Use strict mode in tsconfig.json

### Example
```typescript
// ✅ Good
interface ChartData {
  planets: Planet[];
  aspects: Aspect[];
  houses: House[];
}

function processChart(data: unknown): ChartData | null {
  if (isChartData(data)) {
    return data;
  }
  return null;
}

function isChartData(data: unknown): data is ChartData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'planets' in data &&
    'aspects' in data
  );
}

// ❌ Bad
function processChart(data: any): any {
  // ...
}
```

### Null and Undefined
- Use strict null checks
- Use optional chaining (`?.`) and nullish coalescing (`??`)
- Define nullable types explicitly

### Example
```typescript
// ✅ Good
interface User {
  id: string;
  name: string | null;
  email?: string;
}

function getUserName(user: User | null): string {
  return user?.name ?? 'Unknown';
}

// ❌ Bad
function getUserName(user: any): string {
  return user.name || 'Unknown';
}
```

---

## React Best Practices

### Components
- Use functional components with hooks
- Define component props as interfaces
- Use TypeScript for prop types

### Hooks
- Follow Rules of Hooks
- Custom hooks should start with `use`
- Keep hooks focused and reusable

### Example
```typescript
// ✅ Good
interface LoginFormProps {
  onSuccess: () => void;
  redirectTo?: string;
}

export function LoginForm({ onSuccess, redirectTo }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(email, password);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
    </form>
  );
}

// ❌ Bad
export function LoginForm(props: any) {
  const [state, setState] = useState({});

  const handleSubmit = () => {
    // ...
  };

  return <form>{/* ... */}</form>;
}
```

### Component Organization
- Keep components small and focused
- Extract reusable logic into custom hooks
- Use composition over inheritance

### State Management
- Use local state for component-specific state
- Use context for global state
- Consider state management libraries for complex state

---

## API Standards

### API Routes
- Use RESTful conventions
- Return consistent response format
- Use appropriate HTTP status codes

### Response Format
```typescript
// Success response
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

// Error response
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
}
```

### HTTP Status Codes
- `200 OK` - Successful GET, PUT, PATCH
- `201 Created` - Successful POST
- `204 No Content` - Successful DELETE
- `400 Bad Request` - Invalid input
- `401 Unauthorized` - Not authenticated
- `403 Forbidden` - Not authorized
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Example
```typescript
// ✅ Good
export async function GET(request: NextRequest) {
  try {
    const data = await getData();
    return NextResponse.json<ApiResponse<Data>>({
      success: true,
      data,
    });
  } catch (error) {
    return NextResponse.json<ApiError>(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An error occurred',
        },
      },
      { status: 500 },
    );
  }
}

// ❌ Bad
export async function GET(request: NextRequest) {
  try {
    const data = await getData();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Error' }, { status: 500 });
  }
}
```

---

## Testing Standards

### Test Organization
- Group tests by functionality
- Use descriptive test names
- Follow Arrange-Act-Assert pattern

### Test Files
- Place test files next to source files with `.test.ts` or `.spec.ts` suffix
- Use `__tests__` directory for integration tests

### Example
```typescript
// ✅ Good
describe('AuthService', () => {
  describe('login', () => {
    it('should return user data with valid credentials', async () => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };

      // Act
      const result = await authService.login(credentials);

      // Assert
      expect(result).toBeDefined();
      expect(result.email).toBe(credentials.email);
    });

    it('should throw error with invalid credentials', async () => {
      // Arrange
      const credentials = {
        email: 'test@example.com',
        password: 'wrong-password',
      };

      // Act & Assert
      await expect(authService.login(credentials)).rejects.toThrow(
        AuthError,
      );
    });
  });
});
```

---

## Documentation Standards

### JSDoc Comments
- Add JSDoc comments to all public functions
- Document parameters, return values, and usage examples

### Example
```typescript
// ✅ Good
/**
 * Calculates the natal chart for a given birth data
 * @param birthDate - The date and time of birth
 * @param location - The location of birth (city, country or lat/lon)
 * @param options - Optional calculation options
 * @returns The calculated chart data
 * @throws {ValidationError} When birth data is invalid
 * @throws {CalculationError} When chart calculation fails
 *
 * @example
 * ```typescript
 * const chart = await calculateNatalChart(
 *   new Date('1990-01-01T12:00:00Z'),
 *   'New York, NY',
 *   { includeAspects: true }
 * );
 * ```
 */
export async function calculateNatalChart(
  birthDate: Date,
  location: string,
  options?: CalculationOptions,
): Promise<ChartData> {
  // ...
}

// ❌ Bad
export async function calculateNatalChart(
  birthDate: Date,
  location: string,
  options?: CalculationOptions,
): Promise<ChartData> {
  // ...
}
```

### Component Documentation
- Document component props with JSDoc
- Add usage examples
- Document component behavior

---

## Git Commit Standards

### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Example
```
feat(auth): add password reset functionality

- Add forgot password page
- Implement password reset email
- Add reset password API endpoint

Closes #123
```

---

## Additional Resources

- [TypeScript Style Guide](https://typescript-eslint.io/rules/)
- [React Documentation](https://react.dev)
- [Next.js Documentation](https://nextjs.org/docs)
- [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
