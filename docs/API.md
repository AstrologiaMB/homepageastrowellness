# API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Response Format](#response-format)
4. [Error Handling](#error-handling)
5. [API Endpoints](#api-endpoints)
   - [Authentication](#authentication-endpoints)
   - [Charts](#charts-endpoints)
   - [Calendar](#calendar-endpoints)
   - [Astro-Gematria](#astro-gematria-endpoints)
   - [User](#user-endpoints)
   - [Subscription](#subscription-endpoints)
   - [Admin](#admin-endpoints)
6. [Rate Limiting](#rate-limiting)
7. [Pagination](#pagination)

---

## Overview

The Astrowellness API provides RESTful endpoints for accessing astrology services. All API endpoints follow a consistent structure and return standardized responses.

### Base URL
```
https://astrowellness.com/api
```

### API Version
Current version: v1 (implicit in all endpoints)

---

## Authentication

### Authentication Methods

The API uses NextAuth.js for authentication. There are two ways to authenticate requests:

1. **Session-based authentication** (for web clients)
   - Uses session cookies
   - Automatically handled by NextAuth.js

2. **Bearer token authentication** (for API clients)
   - Uses JWT tokens
   - Include token in `Authorization` header

### Headers

```http
Authorization: Bearer <token>
Content-Type: application/json
```

### Session Management

Sessions are managed by NextAuth.js and include:
- User ID
- User role
- Subscription status
- Session expiration

---

## Response Format

### Success Response

```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
  timestamp: string;
}
```

### Error Response

```typescript
interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  };
  timestamp: string;
}
```

### Example Success Response

```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "message": "User retrieved successfully",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

### Example Error Response

```json
{
  "success": false,
  "error": {
    "code": "INVALID_CREDENTIALS",
    "message": "Invalid email or password",
    "details": {
      "field": "password"
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Error Handling

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_REQUEST` | 400 | Invalid request parameters |
| `UNAUTHORIZED` | 401 | Authentication required |
| `FORBIDDEN` | 403 | Insufficient permissions |
| `NOT_FOUND` | 404 | Resource not found |
| `VALIDATION_ERROR` | 422 | Input validation failed |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Internal server error |
| `SERVICE_UNAVAILABLE` | 503 | Service temporarily unavailable |

### Error Response Structure

All errors follow the same structure:

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {
      "additional": "context"
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## API Endpoints

### Authentication Endpoints

#### Login
```http
POST /api/auth/[...nextauth]
```

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com"
    },
    "session": {
      "token": "jwt_token_here",
      "expiresAt": "2024-01-02T12:00:00Z"
    }
  }
}
```

#### Register
```http
POST /api/auth/register
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "123",
      "name": "John Doe",
      "email": "user@example.com"
    }
  },
  "message": "Registration successful"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
```

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset email sent"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
```

**Request Body:**
```json
{
  "token": "reset_token_here",
  "password": "new_password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successful"
}
```

---

### Charts Endpoints

#### Calculate Tropical Chart
```http
POST /api/cartas/tropical
```

**Authentication:** Required

**Request Body:**
```json
{
  "birthDate": "1990-01-01T12:00:00Z",
  "location": "New York, NY",
  "options": {
    "includeAspects": true,
    "includeHouses": true
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chart": {
      "planets": [...],
      "aspects": [...],
      "houses": [...]
    },
    "interpretation": "..."
  }
}
```

#### Calculate Draconic Chart
```http
POST /api/cartas/draconica
```

**Authentication:** Required

**Request Body:**
```json
{
  "birthDate": "1990-01-01T12:00:00Z",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chart": {
      "planets": [...],
      "aspects": [...],
      "houses": [...]
    },
    "interpretation": "..."
  }
}
```

#### Calculate Horary Chart
```http
POST /api/cartas/horaria
```

**Authentication:** Required

**Request Body:**
```json
{
  "question": "Will I get the job?",
  "location": "New York, NY",
  "timestamp": "2024-01-01T12:00:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "chart": {
      "planets": [...],
      "aspects": [...],
      "houses": [...]
    },
    "interpretation": "..."
  }
}
```

#### Calculate Synastry Chart
```http
POST /api/cartas/cruzada
```

**Authentication:** Required (Premium)

**Request Body:**
```json
{
  "person1": {
    "birthDate": "1990-01-01T12:00:00Z",
    "location": "New York, NY"
  },
  "person2": {
    "birthDate": "1995-05-15T14:30:00Z",
    "location": "Los Angeles, CA"
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "synastry": {
      "aspects": [...],
      "compatibility": "..."
    },
    "interpretation": "..."
  }
}
```

#### Get Chart Interpretation
```http
POST /api/interpretaciones
```

**Authentication:** Required

**Request Body:**
```json
{
  "chartData": {...},
  "type": "natal"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "interpretation": "..."
  }
}
```

---

### Calendar Endpoints

#### Get Personal Calendar
```http
GET /api/calendario-personal
```

**Authentication:** Required

**Query Parameters:**
- `year` (optional): Year to retrieve
- `month` (optional): Month to retrieve

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "date": "2024-01-15",
        "type": "transit",
        "description": "..."
      }
    ]
  }
}
```

#### Get Lunar Calendar
```http
GET /api/journal/lunar
```

**Authentication:** Required

**Query Parameters:**
- `year` (optional): Year to retrieve
- `month` (optional): Month to retrieve

**Response:**
```json
{
  "success": true,
  "data": {
    "phases": [
      {
        "date": "2024-01-11",
        "phase": "new",
        "sign": "Capricorn"
      }
    ]
  }
}
```

#### Get General Calendar
```http
GET /api/cycles
```

**Authentication:** Not Required

**Query Parameters:**
- `year` (optional): Year to retrieve

**Response:**
```json
{
  "success": true,
  "data": {
    "events": [
      {
        "date": "2024-01-20",
        "type": "ingress",
        "planet": "Sun",
        "sign": "Aquarius"
      }
    ]
  }
}
```

---

### Astro-Gematria Endpoints

#### Calculate Astro-Gematria
```http
POST /api/astrogematria/calcular
```

**Authentication:** Required (Premium)

**Request Body:**
```json
{
  "birthDate": "1990-01-01T12:00:00Z",
  "location": "New York, NY"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "numbers": {
      "lifePath": 5,
      "expression": 3,
      "soulUrge": 7
    },
    "interpretation": "..."
  }
}
```

#### Get Remedies
```http
POST /api/astrogematria/remedios
```

**Authentication:** Required (Premium)

**Request Body:**
```json
{
  "numbers": {
    "lifePath": 5,
    "expression": 3,
    "soulUrge": 7
  }
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "remedies": [
      {
        "type": "crystal",
        "name": "Amethyst",
        "description": "..."
      }
    ]
  }
}
```

---

### User Endpoints

#### Get User Profile
```http
GET /api/user/profile
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": "premium",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User Profile
```http
PUT /api/user/update
```

**Authentication:** Required

**Request Body:**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "message": "Profile updated successfully"
}
```

#### Get Natal Data
```http
GET /api/user/natal-data
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "birthDate": "1990-01-01T12:00:00Z",
    "location": "New York, NY",
    "latitude": 40.7128,
    "longitude": -74.0060
  }
}
```

#### Save Natal Data
```http
POST /api/user/carta-natal
```

**Authentication:** Required

**Request Body:**
```json
{
  "birthDate": "1990-01-01T12:00:00Z",
  "location": "New York, NY",
  "latitude": 40.7128,
  "longitude": -74.0060
}
```

**Response:**
```json
{
  "success": true,
  "message": "Natal data saved successfully"
}
```

---

### Subscription Endpoints

#### Create Checkout Session
```http
POST /api/stripe/checkout
```

**Authentication:** Required

**Request Body:**
```json
{
  "priceId": "price_1234567890",
  "successUrl": "https://astrowellness.com/success",
  "cancelUrl": "https://astrowellness.com/cancel"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "checkoutUrl": "https://checkout.stripe.com/..."
  }
}
```

#### Get Subscription Status
```http
GET /api/stripe/subscription
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "active",
    "plan": "premium",
    "currentPeriodEnd": "2024-02-01T00:00:00Z",
    "cancelAtPeriodEnd": false
  }
}
```

#### Update Subscription
```http
POST /api/stripe/subscription/update
```

**Authentication:** Required

**Request Body:**
```json
{
  "priceId": "price_0987654321"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription updated successfully"
}
```

#### Get Customer Portal
```http
POST /api/stripe/portal
```

**Authentication:** Required

**Response:**
```json
{
  "success": true,
  "data": {
    "portalUrl": "https://billing.stripe.com/..."
  }
}
```

---

### Admin Endpoints

#### Get All Users
```http
GET /api/admin/users
```

**Authentication:** Required (Admin)

**Query Parameters:**
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "users": [
      {
        "id": "123",
        "name": "John Doe",
        "email": "john@example.com",
        "subscription": "premium"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5
    }
  }
}
```

#### Get User by ID
```http
GET /api/admin/users/:id
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "subscription": "premium",
    "createdAt": "2024-01-01T00:00:00Z"
  }
}
```

#### Update User Subscription
```http
PUT /api/admin/users/:id/subscription
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "subscription": "premium"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Subscription updated successfully"
}
```

#### Verify User Email
```http
POST /api/admin/users/:id/verify-email
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Email verified successfully"
}
```

#### Reset User Password
```http
POST /api/admin/users/:id/reset-password
```

**Authentication:** Required (Admin)

**Request Body:**
```json
{
  "newPassword": "new_password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Password reset successfully"
}
```

#### Clear User Cache
```http
POST /api/admin/users/:id/cache
```

**Authentication:** Required (Admin)

**Response:**
```json
{
  "success": true,
  "message": "Cache cleared successfully"
}
```

---

## Rate Limiting

### Rate Limiting Rules

- **Anonymous requests**: 60 requests per minute
- **Authenticated requests**: 300 requests per minute
- **Admin requests**: 600 requests per minute

### Rate Limit Headers

```http
X-RateLimit-Limit: 300
X-RateLimit-Remaining: 299
X-RateLimit-Reset: 1609459200
```

### Rate Limit Response

When rate limit is exceeded:

```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests",
    "details": {
      "retryAfter": 60
    }
  },
  "timestamp": "2024-01-01T12:00:00Z"
}
```

---

## Pagination

### Pagination Parameters

- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 20, max: 100)

### Pagination Response

```json
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrevious": false
    }
  }
}
```

---

## Webhooks

### Stripe Webhooks

```http
POST /api/webhooks/stripe
```

**Authentication:** Stripe signature verification

**Events:**
- `checkout.session.completed`
- `customer.subscription.created`
- `customer.subscription.updated`
- `customer.subscription.deleted`

---

## Related Documentation

- [Architecture Documentation](./ARCHITECTURE.md)
- [Database Documentation](./DATABASE.md)
- [Development Guide](./DEVELOPMENT.md)
- [Coding Standards](./CODING_STANDARDS.md)
