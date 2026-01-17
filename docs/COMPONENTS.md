# Components Documentation

## Table of Contents

1. [Overview](#overview)
2. [Component Structure](#component-structure)
3. [UI Components](#ui-components)
4. [Feature Components](#feature-components)
5. [Layout Components](#layout-components)
6. [Provider Components](#provider-components)
7. [Component Patterns](#component-patterns)
8. [Best Practices](#best-practices)

---

## Overview

The Astrowellness application follows a component-based architecture using React and TypeScript. Components are organized by their purpose and reusability.

### Component Categories

- **UI Components**: Reusable, design-system components
- **Feature Components**: Domain-specific components
- **Layout Components**: Page layout and structure
- **Provider Components**: Context providers and state management

---

## Component Structure

### Directory Structure

```
components/
├── ui/                    # Reusable UI components
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   └── ...
├── features/              # Feature-specific components
│   ├── auth/
│   │   ├── login-form.tsx
│   │   ├── register-form.tsx
│   │   └── ...
│   ├── astrology/
│   │   ├── chart-display.tsx
│   │   ├── planet-info.tsx
│   │   └── ...
│   └── subscription/
│       ├── subscription-card.tsx
│       └── ...
├── layout/                # Layout components
│   ├── header.tsx
│   ├── sidebar.tsx
│   └── footer.tsx
└── providers/             # Context providers
    ├── auth-provider.tsx
    ├── theme-provider.tsx
    └── ...
```

### Component File Template

```typescript
/**
 * Component description
 * @param props - Component props
 */

'use client';

import { useState } from 'react';

interface ComponentNameProps {
  // Define props here
  title: string;
  onAction?: () => void;
}

export function ComponentName({ title, onAction }: ComponentNameProps) {
  const [state, setState] = useState('');

  const handleClick = () => {
    if (onAction) {
      onAction();
    }
  };

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={handleClick}>Action</button>
    </div>
  );
}
```

---

## UI Components

UI components are reusable, design-system components that can be used throughout the application.

### Button

```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

export function Button({ variant = 'default', size = 'default', children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium',
        {
          'bg-primary text-primary-foreground hover:bg-primary/90': variant === 'default',
          'bg-destructive text-destructive-foreground hover:bg-destructive/90': variant === 'destructive',
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground': variant === 'outline',
          'bg-secondary text-secondary-foreground hover:bg-secondary/80': variant === 'secondary',
          'hover:bg-accent hover:text-accent-foreground': variant === 'ghost',
        },
        {
          'h-10 px-4 py-2': size === 'default',
          'h-9 rounded-md px-3': size === 'sm',
          'h-11 rounded-md px-8': size === 'lg',
          'h-10 w-10': size === 'icon',
        }
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

**Usage:**
```typescript
<Button variant="default" onClick={() => console.log('Clicked')}>
  Click me
</Button>
```

### Card

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: CardProps) {
  return (
    <h3 className={cn('text-2xl font-semibold leading-none tracking-tight', className)}>
      {children}
    </h3>
  );
}

export function CardContent({ children, className }: CardProps) {
  return (
    <div className={cn('p-6 pt-0', className)}>
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card content goes here</p>
  </CardContent>
</Card>
```

### Input

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, type, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm',
        'ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium',
        'placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2',
        'focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...props}
    />
  );
}
```

**Usage:**
```typescript
<Input
  type="email"
  placeholder="Enter your email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
```

---

## Feature Components

Feature components are domain-specific components that implement business logic for specific features.

### Auth Components

#### LoginForm

```typescript
interface LoginFormProps {
  onSuccess?: () => void;
  redirectTo?: string;
}

export function LoginForm({ onSuccess, redirectTo }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await signIn('credentials', { email, password, redirectTo });
      onSuccess?.();
    } catch (err) {
      setError(t('auth.login.errors.invalidCredentials'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        placeholder={t('auth.login.email')}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        type="password"
        placeholder={t('auth.login.password')}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {error && <p className="text-red-500">{error}</p>}
      <Button type="submit" disabled={isLoading}>
        {isLoading ? t('common.loading') : t('auth.login.submit')}
      </Button>
    </form>
  );
}
```

### Astrology Components

#### ChartDisplay

```typescript
interface ChartDisplayProps {
  chartData: ChartData;
  interpretation?: string;
}

export function ChartDisplay({ chartData, interpretation }: ChartDisplayProps) {
  return (
    <div className="chart-display">
      <div className="planets">
        {chartData.planets.map((planet) => (
          <PlanetInfo key={planet.name} planet={planet} />
        ))}
      </div>
      {interpretation && (
        <div className="interpretation">
          <h3>Interpretation</h3>
          <p>{interpretation}</p>
        </div>
      )}
    </div>
  );
}
```

#### PlanetInfo

```typescript
interface PlanetInfoProps {
  planet: Planet;
}

export function PlanetInfo({ planet }: PlanetInfoProps) {
  return (
    <div className="planet-info">
      <h4>{planet.name}</h4>
      <p>Sign: {planet.sign}</p>
      <p>Degree: {planet.degree}°</p>
      <p>House: {planet.house}</p>
    </div>
  );
}
```

### Subscription Components

#### SubscriptionCard

```typescript
interface SubscriptionCardProps {
  plan: SubscriptionPlan;
  onSelect: (planId: string) => void;
  isSelected?: boolean;
}

export function SubscriptionCard({ plan, onSelect, isSelected }: SubscriptionCardProps) {
  return (
    <Card className={cn('cursor-pointer transition-all', isSelected && 'ring-2 ring-primary')}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <p className="text-2xl font-bold">{plan.price}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-center gap-2">
              <CheckIcon className="h-4 w-4 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
        <Button
          className="w-full mt-4"
          onClick={() => onSelect(plan.id)}
          variant={isSelected ? 'default' : 'outline'}
        >
          {isSelected ? 'Selected' : 'Select Plan'}
        </Button>
      </CardContent>
    </Card>
  );
}
```

---

## Layout Components

Layout components provide the structure for pages and shared layout elements.

### Header

```typescript
interface HeaderProps {
  user?: User | null;
}

export function Header({ user }: HeaderProps) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <Navigation />
        <UserMenu user={user} />
      </div>
    </header>
  );
}
```

### Sidebar

```typescript
interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <aside className={cn('sidebar', isOpen && 'open')}>
      <nav>
        <SidebarItem icon={<HomeIcon />} label="Home" href="/" />
        <SidebarItem icon={<ChartIcon />} label="Charts" href="/cartas" />
        <SidebarItem icon={<CalendarIcon />} label="Calendar" href="/calendario" />
      </nav>
    </aside>
  );
}
```

### Footer

```typescript
export function Footer() {
  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
              Your personal astrology guide
            </p>
          </div>
          <div>
            <h4>Product</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/cartas">Charts</a></li>
              <li><a href="/calendario">Calendar</a></li>
            </ul>
          </div>
          <div>
            <h4>Company</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/about">About</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4>Legal</h4>
            <ul className="mt-2 space-y-1">
              <li><a href="/legal">Terms</a></li>
              <li><a href="/privacy">Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Astrowellness. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
```

---

## Provider Components

Provider components wrap the application to provide context and state management.

### AuthProvider

```typescript
interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}
```

### ThemeProvider

```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: string;
}

export function ThemeProvider({ children, defaultTheme = 'system' }: ThemeProviderProps) {
  const [theme, setTheme] = useState(defaultTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

---

## Component Patterns

### Compound Components

Compound components allow you to share state between related components.

```typescript
interface TabsContextValue {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextValue | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex border-b">
      {children}
    </div>
  );
}

export function TabsTrigger({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab, setActiveTab } = useContext(TabsContext)!;

  return (
    <button
      className={cn(
        'px-4 py-2 border-b-2 transition-colors',
        activeTab === value ? 'border-primary' : 'border-transparent'
      )}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: React.ReactNode }) {
  const { activeTab } = useContext(TabsContext)!;

  if (activeTab !== value) return null;

  return (
    <div className="p-4">
      {children}
    </div>
  );
}
```

**Usage:**
```typescript
<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">Content 1</TabsContent>
  <TabsContent value="tab2">Content 2</TabsContent>
</Tabs>
```

### Render Props

Render props allow you to pass a function as a child to customize rendering.

```typescript
interface DataFetcherProps<T> {
  fetchFn: () => Promise<T>;
  children: (data: T | null, isLoading: boolean, error: Error | null) => React.ReactNode;
}

export function DataFetcher<T>({ fetchFn, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    fetchFn()
      .then(setData)
      .catch(setError)
      .finally(() => setIsLoading(false));
  }, [fetchFn]);

  return <>{children(data, isLoading, error)}</>;
}
```

**Usage:**
```typescript
<DataFetcher fetchFn={() => fetchUser(userId)}>
  {(user, isLoading, error) => {
    if (isLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage error={error} />;
    return <UserProfile user={user} />;
  }}
</DataFetcher>
```

---

## Best Practices

### Component Design

1. **Keep components small and focused**
   - Single responsibility principle
   - Extract complex logic into custom hooks

2. **Use TypeScript for type safety**
   - Define props interfaces
   - Avoid `any` types

3. **Use meaningful component names**
   - Descriptive and clear
   - Follow naming conventions

4. **Add JSDoc comments**
   - Document component purpose
   - Document props and usage

### Performance

1. **Use React.memo for expensive components**
   ```typescript
   export const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }: Props) {
     // ...
   });
   ```

2. **Lazy load components**
   ```typescript
   const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
     loading: () => <LoadingSpinner />,
   });
   ```

3. **Avoid unnecessary re-renders**
   - Use useCallback for event handlers
   - Use useMemo for expensive calculations

### Accessibility

1. **Use semantic HTML**
   - Use proper HTML elements
   - Include ARIA attributes when needed

2. **Keyboard navigation**
   - Ensure all interactive elements are keyboard accessible
   - Provide focus indicators

3. **Screen reader support**
   - Include alt text for images
   - Use proper heading hierarchy

### Testing

1. **Write unit tests for components**
   ```typescript
   describe('Button', () => {
     it('renders with correct text', () => {
       render(<Button>Click me</Button>);
       expect(screen.getByText('Click me')).toBeInTheDocument();
     });
   });
   ```

2. **Test component interactions**
   ```typescript
   it('calls onClick when clicked', () => {
     const handleClick = vi.fn();
     render(<Button onClick={handleClick}>Click me</Button>);
     fireEvent.click(screen.getByText('Click me'));
     expect(handleClick).toHaveBeenCalled();
   });
   ```

---

## Related Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [API Documentation](./API.md)
- [Development Guide](./DEVELOPMENT.md)
- [Coding Standards](./CODING_STANDARDS.md)
