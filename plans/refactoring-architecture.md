# Refactoring Architecture Diagrams

## Current vs Proposed Architecture

### Current Architecture Issues

```mermaid
graph TB
    subgraph Current Issues
        A[API Routes] -->|Mixed Logic| B[Business Logic]
        A -->|No Validation| C[Direct DB Access]
        A -->|Inconsistent| D[Error Handling]
        B -->|Scattered| E[No Service Layer]
        F[Components] -->|Mixed| G[UI + Logic]
        F -->|No Types| H[Any Types]
        I[Utilities] -->|Disorganized| J[Mixed Files]
    end

    style A fill:#ff6b6b
    style B fill:#ff6b6b
    style C fill:#ff6b6b
    style D fill:#ff6b6b
    style E fill:#ff6b6b
    style F fill:#ff6b6b
    style G fill:#ff6b6b
    style H fill:#ff6b6b
    style I fill:#ff6b6b
    style J fill:#ff6b6b
```

### Proposed Architecture

```mermaid
graph TB
    subgraph Frontend Layer
        A[Client Components]
        B[UI Components]
        C[Custom Hooks]
    end

    subgraph API Layer
        D[API Routes]
        E[Middleware]
        F[Validation]
    end

    subgraph Service Layer
        G[Auth Service]
        H[Subscription Service]
        I[Astrology Service]
        J[User Service]
    end

    subgraph Data Layer
        K[Prisma ORM]
        L[Database]
    end

    subgraph Utilities
        M[Error Handling]
        N[Logging]
        O[Cache]
        P[Type Definitions]
    end

    A --> D
    B --> A
    C --> A
    D --> E
    E --> F
    F --> G
    F --> H
    F --> I
    F --> J
    G --> K
    H --> K
    I --> K
    J --> K
    K --> L
    D --> M
    D --> N
    D --> O
    All --> P

    style D fill:#4ecdc4
    style E fill:#4ecdc4
    style F fill:#4ecdc4
    style G fill:#45b7d1
    style H fill:#45b7d1
    style I fill:#45b7d1
    style J fill:#45b7d1
    style M fill:#96ceb4
    style N fill:#96ceb4
    style O fill:#96ceb4
    style P fill:#96ceb4
```

## Refactoring Flow

```mermaid
flowchart LR
    A[Phase 1: Foundation] --> B[Phase 2: Structure]
    B --> C[Phase 3: Quality]
    C --> D[Phase 4: Developer Experience]
    D --> E[Phase 5: Cleanup]

    subgraph Phase 1
        A1[Environment Config]
        A2[Type Safety]
        A3[Error Handling]
    end

    subgraph Phase 2
        B1[API Refactoring]
        B2[Component Organization]
        B3[Utility Organization]
    end

    subgraph Phase 3
        C1[Language Consistency]
        C2[Documentation]
        C3[Testing]
    end

    subgraph Phase 4
        D1[Code Quality Tools]
        D2[Build Tools]
        D3[Documentation]
    end

    subgraph Phase 5
        E1[Remove Dead Code]
        E2[Optimize DB Queries]
        E3[Optimize API Performance]
    end

    A --> A1
    A --> A2
    A --> A3
    B --> B1
    B --> B2
    B --> B3
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3
    E --> E1
    E --> E2
    E --> E3
```

## API Request Flow (Proposed)

```mermaid
sequenceDiagram
    participant Client
    participant Middleware
    participant Validation
    participant API Route
    participant Service
    participant Database
    participant Cache

    Client->>Middleware: Request
    Middleware->>Middleware: Auth Check
    Middleware->>Middleware: Rate Limit
    Middleware->>Validation: Forward
    Validation->>Validation: Validate Input
    Validation->>API Route: Validated Data
    API Route->>Cache: Check Cache
    alt Cache Hit
        Cache-->>API Route: Cached Data
        API Route-->>Client: Response
    else Cache Miss
        API Route->>Service: Business Logic Call
        Service->>Database: Query
        Database-->>Service: Data
        Service->>Service: Process Data
        Service-->>API Route: Result
        API Route->>Cache: Store in Cache
        API Route-->>Client: Response
    end
```

## Error Handling Flow (Proposed)

```mermaid
flowchart TD
    A[Error Occurs] --> B{Error Type?}
    B -->|Validation Error| C[ValidationError]
    B -->|Auth Error| D[AuthError]
    B -->|API Error| E[ApiError]
    B -->|Unknown Error| F[AppError]

    C --> G[Log Error]
    D --> G
    E --> G
    F --> G

    G --> H{Is Development?}
    H -->|Yes| I[Return Detailed Error]
    H -->|No| J[Return Generic Error]

    I --> K[Format Error Response]
    J --> K

    K --> L[Send to Client]
    K --> M[Send to Error Tracking]

    style C fill:#ff6b6b
    style D fill:#ff6b6b
    style E fill:#ff6b6b
    style F fill:#ff6b6b
    style G fill:#4ecdc4
    style I fill:#45b7d1
    style J fill:#45b7d1
    style K fill:#96ceb4
```

## Component Organization (Proposed)

```mermaid
graph TB
    subgraph components/
        A[features/]
        B[layout/]
        C[providers/]
        D[ui/]
    end

    subgraph features/
        A1[auth/]
        A2[astrology/]
        A3[subscription/]
    end

    subgraph auth/
        A1a[LoginForm]
        A1b[RegisterForm]
        A1c[ForgotPassword]
    end

    subgraph astrology/
        A2a[CartaNatal]
        A2b[CartaDraconica]
        A2c[Interpretacion]
    end

    subgraph subscription/
        A3a[SubscriptionCard]
        A3b[UpgradeModal]
        A3c[PricingTable]
    end

    subgraph layout/
        B1[Header]
        B2[Sidebar]
        B3[Footer]
        B4[Layout]
    end

    subgraph providers/
        C1[AuthProvider]
        C2[ThemeProvider]
        C3[QueryProvider]
    end

    subgraph ui/
        D1[Button]
        D2[Card]
        D3[Input]
        D4[Modal]
    end

    A --> A1
    A --> A2
    A --> A3
    A1 --> A1a
    A1 --> A1b
    A1 --> A1c
    A2 --> A2a
    A2 --> A2b
    A2 --> A2c
    A3 --> A3a
    A3 --> A3b
    A3 --> A3c
    B --> B1
    B --> B2
    B --> B3
    B --> B4
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3
    D --> D4

    style A fill:#4ecdc4
    style B fill:#4ecdc4
    style C fill:#4ecdc4
    style D fill:#4ecdc4
```

## Type System Organization (Proposed)

```mermaid
graph LR
    subgraph types/
        A[auth.types.ts]
        B[api.types.ts]
        C[subscription.types.ts]
        D[astrology.types.ts]
        E[errors.types.ts]
        F[index.ts]
    end

    subgraph auth.types.ts
        A1[User]
        A2[Session]
        A3[Credentials]
    end

    subgraph api.types.ts
        B1[ApiResponse]
        B2[ApiError]
        B3[Pagination]
    end

    subgraph subscription.types.ts
        C1[Subscription]
        C2[Entitlements]
        C3[Plan]
    end

    subgraph astrology.types.ts
        D1[Chart]
        D2[Planet]
        D3[Aspect]
    end

    subgraph errors.types.ts
        E1[AppError]
        E2[ValidationError]
        E3[AuthError]
    end

    A --> A1
    A --> A2
    A --> A3
    B --> B1
    B --> B2
    B --> B3
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3
    E --> E1
    E --> E2
    E --> E3

    F --> A
    F --> B
    F --> C
    F --> D
    F --> E

    style A fill:#4ecdc4
    style B fill:#4ecdc4
    style C fill:#4ecdc4
    style D fill:#4ecdc4
    style E fill:#4ecdc4
    style F fill:#96ceb4
```

## Service Layer Organization (Proposed)

```mermaid
graph TB
    subgraph services/
        A[auth.service.ts]
        B[subscription.service.ts]
        C[astrology.service.ts]
        D[user.service.ts]
        E[index.ts]
    end

    subgraph auth.service.ts
        A1[login]
        A2[register]
        A3[logout]
        A4[resetPassword]
    end

    subgraph subscription.service.ts
        B1[createSubscription]
        B2[updateSubscription]
        B3[cancelSubscription]
        B4[checkEntitlement]
    end

    subgraph astrology.service.ts
        C1[calculateChart]
        C2[getInterpretation]
        C3[getCalendar]
    end

    subgraph user.service.ts
        D1[getUser]
        D2[updateUser]
        D3[deleteUser]
    end

    A --> A1
    A --> A2
    A --> A3
    A --> A4
    B --> B1
    B --> B2
    B --> B3
    B --> B4
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    D --> D3

    E --> A
    E --> B
    E --> C
    E --> D

    style A fill:#4ecdc4
    style B fill:#4ecdc4
    style C fill:#4ecdc4
    style D fill:#4ecdc4
    style E fill:#96ceb4
```

## Testing Strategy (Proposed)

```mermaid
graph TB
    subgraph tests/
        A[unit/]
        B[integration/]
        C[e2e/]
        D[helpers/]
        E[mocks/]
        F[setup.ts]
    end

    subgraph unit/
        A1[utils.test.ts]
        A2[services.test.ts]
        A3[hooks.test.ts]
    end

    subgraph integration/
        B1[api.test.ts]
        B2[database.test.ts]
        B3[auth.test.ts]
    end

    subgraph e2e/
        C1[auth-flow.test.ts]
        C2[subscription-flow.test.ts]
        C3[astrology-flow.test.ts]
    end

    subgraph helpers/
        D1[test-utils.ts]
        D2[render-utils.ts]
    end

    subgraph mocks/
        E1[api-mocks.ts]
        E2[db-mocks.ts]
    end

    A --> A1
    A --> A2
    A --> A3
    B --> B1
    B --> B2
    B --> B3
    C --> C1
    C --> C2
    C --> C3
    D --> D1
    D --> D2
    E --> E1
    E --> E2

    F --> A
    F --> B
    F --> C
    F --> D
    F --> E

    style A fill:#4ecdc4
    style B fill:#4ecdc4
    style C fill:#4ecdc4
    style D fill:#96ceb4
    style E fill:#96ceb4
    style F fill:#45b7d1
```

## CI/CD Pipeline (Proposed)

```mermaid
flowchart LR
    A[Push to Branch] --> B[Lint Check]
    B --> C{Lint Passed?}
    C -->|No| D[Fail Build]
    C -->|Yes| E[Type Check]
    E --> F{Type Check Passed?}
    F -->|No| D
    F -->|Yes| G[Unit Tests]
    G --> H{Tests Passed?}
    H -->|No| D
    H -->|Yes| I[Integration Tests]
    I --> J{Tests Passed?}
    J -->|No| D
    J -->|Yes| K[Build]
    K --> L{Build Passed?}
    L -->|No| D
    L -->|Yes| M[Deploy to Staging]
    M --> N{Staging Tests Passed?}
    N -->|No| D
    N -->|Yes| O[Deploy to Production]

    style B fill:#4ecdc4
    style E fill:#4ecdc4
    style G fill:#4ecdc4
    style I fill:#4ecdc4
    style K fill:#4ecdc4
    style M fill:#45b7d1
    style O fill:#96ceb4
    style D fill:#ff6b6b
```

## Migration Path

```mermaid
timeline
    title Refactoring Timeline (6 Weeks)
    section Week 1-2
        Phase 1: Foundation & Infrastructure
        : Environment Config & Validation
        : Type Safety Improvements
        : Error Handling Standardization
    section Week 2-3
        Phase 2: Code Organization & Structure
        : API Route Refactoring
        : Component Organization
        : Utility Functions Organization
    section Week 3-4
        Phase 3: Code Quality & Standards
        : Language Consistency
        : Code Documentation
        : Testing Infrastructure
    section Week 4-5
        Phase 4: Developer Experience
        : Code Quality Tools
        : Build & Development Tools
        : Documentation & Onboarding
    section Week 5-6
        Phase 5: Cleanup & Optimization
        : Remove Dead Code
        : Optimize Database Queries
        : Optimize API Performance
```

## Risk Mitigation Strategy

```mermaid
graph TB
    A[Risk Identified] --> B{Risk Level?}
    B -->|Low| C[Standard Process]
    B -->|Medium| D[Enhanced Process]
    B -->|High| E[Special Process]

    subgraph Standard Process
        C1[Write Tests]
        C2[Make Changes]
        C3[Run Tests]
        C4[Deploy]
    end

    subgraph Enhanced Process
        D1[Write Comprehensive Tests]
        D2[Create Feature Branch]
        D3[Make Changes]
        D4[Code Review]
        D5[Run Full Test Suite]
        D6[Deploy with Monitoring]
    end

    subgraph Special Process
        E1[Write Extensive Tests]
        E2[Create Feature Branch]
        E3[Make Changes in Small Steps]
        E4[Code Review + Security Review]
        E5[Run Full Test Suite]
        E6[Staging Deployment]
        E7[Load Testing]
        E8[Production Deployment with Rollback Ready]
    end

    C --> C1
    C --> C2
    C --> C3
    C --> C4
    D --> D1
    D --> D2
    D --> D3
    D --> D4
    D --> D5
    D --> D6
    E --> E1
    E --> E2
    E --> E3
    E --> E4
    E --> E5
    E --> E6
    E --> E7
    E --> E8

    style C fill:#96ceb4
    style D fill:#45b7d1
    style E fill:#ff6b6b
```
