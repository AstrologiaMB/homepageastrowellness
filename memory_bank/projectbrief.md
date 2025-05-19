# Project Brief: Astrowellness

## Objective

Develop a modern web application for astrological services that provides both general astrological events and personalized astrological charts and interpretations. The application should be user-friendly, mobile-responsive, and integrate Next.js frontend with Python-based astrological calculations.

## Core Requirements

1. **User Authentication**
   - Google OAuth integration
   - User profile with birth data (date, time, location)
   - Different access levels for authenticated and non-authenticated users

2. **Astrological Features**
   - General astrological events calendar
   - Personalized astrological events
   - Multiple chart types (tropical, draconic, horary)
   - Additional services (astrogematria, planetary hours, chart rectification)

3. **Technical Requirements**
   - Mobile-first responsive design
   - PWA capabilities for installation on mobile devices
   - Integration between Next.js frontend and Python calculation backend
   - Efficient caching system for astrological calculations
   - Timezone handling for accurate event display

## Key Integrations

1. **Frontend-Backend Integration**
   - Next.js frontend with React components
   - FastAPI Python backend for astrological calculations
   - Script adapter pattern to maintain original Python programs
   - Caching system to optimize performance

2. **Data Flow**
   - User data stored in database via Prisma ORM
   - Astrological calculations performed by Python programs
   - Results cached in database for performance
   - Dynamic rendering of charts and events in frontend

## Success Criteria

1. **User Experience**
   - Intuitive navigation with sidebar and breadcrumbs
   - Fast loading times for astrological data
   - Consistent experience across devices
   - Clear visualization of astrological charts and events

2. **Technical Performance**
   - Efficient caching to minimize redundant calculations
   - Smooth integration between Next.js and Python
   - Proper error handling and fallbacks
   - Secure authentication and data handling

3. **Scalability**
   - Architecture that supports adding new astrological features
   - Ability to handle increasing user base
   - Maintainable codebase with clear patterns

## Implementation Approach

The project follows an incremental development approach:

1. **Foundation Phase**
   - Basic Next.js structure with App Router
   - Authentication system with NextAuth
   - Core UI components and navigation

2. **Feature Development Phase**
   - Calendar views for astrological events
   - Chart visualization components
   - User profile and data management

3. **Integration Phase**
   - FastAPI backend setup
   - Python script adaptation
   - Next.js-FastAPI communication
   - Caching implementation

4. **Refinement Phase**
   - Performance optimization
   - UI/UX improvements
   - Advanced features implementation
   - Production deployment preparation
