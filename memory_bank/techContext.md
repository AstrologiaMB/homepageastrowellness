# Technical Context

## Technologies Used

### Frontend
- **Next.js 14 (App Router)**
- **React 19.1.0**
- **TypeScript**
- **Tailwind CSS 3.4**
- **shadcn/ui**
- **Lucide-react**
- **date-fns 3.6.0**
- **react-day-picker 8.10.1**
- **next-auth v5** (for authentication)
- **@astrodraw/astrochart** (for rendering astrological charts)

### Backend
- **FastAPI**: Python framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI
- **Pydantic**: Data validation and settings management
- **Python-dotenv**: Environment variable management

### Database
- **Prisma ORM**: For database access and management
- **SQLite** (development) / **PostgreSQL** (production)

### Python Astrological Calculation
- **Custom Python programs**: For calculating astrological charts and events
- **Script Adapter**: Bridge between FastAPI and existing Python programs

## Development Setup

- **Package Manager**: npm/pnpm (based on lock files)
- **Environment Variables**: Used for sensitive information like API keys and secrets (`.env.local`)
- **Project Structure**:
  - `/Users/apple/sidebar-fastapi`: Next.js application
  - `/Users/apple/calculo-carta-natal-api`: Python programs and FastAPI server

## Technical Constraints

- **Mobile-first design approach**
- **Compatibility with existing Python programs**
- **Performance optimization for astrological calculations**
- **Caching strategy for reducing redundant calculations**
- **Handling of timezone differences**
