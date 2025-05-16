# System Patterns

## Architecture

The application is built using Next.js 14 with the App Router. The frontend utilizes React 18.2 for components, Tailwind CSS 3.4 for styling, shadcn/ui for reusable UI components, and Lucide-react for icons.

## Route Protection

Route protection is now implemented using a centralized middleware approach. The `middleware.ts` file in the root of the project handles all redirection logic based on authentication status and user data completeness. This replaces the previous per-page approach that used `getServerSession()` and `redirect()` within each page component.

The middleware checks:
1. If the user is trying to access a protected route without authentication (redirects to `/login`)
2. If the authenticated user has incomplete data and is trying to access a protected route (redirects to `/completar-datos`)

This centralized approach makes the code more maintainable and consistent across the application.

## Styling

Styling follows a mobile-first approach using Tailwind CSS utility classes. shadcn/ui components are used for consistent UI elements.

## Component Organization

Components are organized in clear folders such as `/components` and `/components/ui`.

## Authentication System (NextAuth + Prisma + App Router)

### General Flow
1. The user clicks the Sign In / Register button.
2. `signIn("google")` launches the OAuth flow to Google.
3. Upon return, NextAuth creates or retrieves the user.
4. The JWT token is enhanced with information about whether the user has completed their data.
5. The middleware checks this information and redirects to `/completar-datos` if needed.
6. After completing data, the user can access all personalized services.
7. The menu shows "My Profile" and "Sign Out" if logged in.

### Key File Structure

| File                                   | Purpose                                                              |
| :------------------------------------- | :------------------------------------------------------------------- |
| `app/api/auth/[...nextauth]/route.ts`  | NextAuth configuration for Google login with JWT and session callbacks |
| `middleware.ts`                        | Centralized middleware for route protection and redirection logic    |
| `lib/prisma.ts`                        | Prisma singleton client                                              |
| `lib/geocode.ts`                       | Gets lat/lon from city and country via OpenCage                      |
| `components/nav-user.tsx`              | User menu with signIn / signOut and error handling                   |
| `components/session-handler.tsx`       | Server Component that validates session and redirects                |
| `components/session-wrapper.tsx`       | Passes the pathname as a header for the server component             |
| `app/layout.tsx`                       | General layout with SessionProvider, sidebar, and header             |
| `app/completar-datos/page.tsx`         | Natal data form with hour/minute selection and data preloading       |
| `app/api/user/update/route.ts`         | API endpoint for updating user data with status information          |
| `app/api/user/profile/route.ts`        | API endpoint for retrieving user data for forms and profiles         |
| `app/api/auth/refresh-token/route.ts`  | API endpoint for verifying user data completeness status             |

### Libraries Used
* next-auth
* @prisma/client
* tz-lookup
* react-hook-form
* tailwindcss, shadcn/ui
* date-fns 3.6.0

### Key Behaviors

| Case                                  | Behavior                                                                 |
| :------------------------------------ | :----------------------------------------------------------------------- |
| Unauthenticated user                  | Can view homepage. When going to `/calendario/*`, must log in            |
| Authenticated user but without data   | Automatically redirected to `/completar-datos`                           |
| User with complete profile            | Freely accesses the system                                               |
| User logs out                         | Session is deleted and returns to visitor state                          |
| User edits profile data               | Form is pre-populated with existing data                                 |

## Patrón de Carga y Visualización de Datos de Usuario

### Flujo General
1. El usuario navega a un formulario que requiere mostrar datos existentes (ej. `/completar-datos`).
2. Al montar el componente, se hace una petición al endpoint de perfil (`/api/user/profile`).
3. Los datos recibidos se utilizan para prellenar los campos del formulario.
4. El usuario puede modificar solo los campos que desea cambiar.
5. Al enviar el formulario, solo se actualizan los campos modificados.
6. Después de guardar, se actualiza el token JWT para reflejar el nuevo estado de los datos.

### Manejo de Fechas
Para asegurar la compatibilidad con Prisma y el formato ISO-8601:

1. **En el cliente (formulario)**: 
   - Se recibe la fecha en formato YYYY-MM-DD para el input type="date"
   - Se seleccionan hora y minuto en componentes select

2. **En el servidor (API)**: 
   - Se construye un objeto DateTime completo combinando fecha, hora y minuto
   - Se convierte a formato ISO-8601 para almacenamiento en la base de datos
   - Se maneja la zona horaria adecuadamente (UTC para almacenamiento)

3. **Al recuperar datos**:
   - Se convierte de ISO-8601 a formato de fecha simple para el input type="date"
   - Se extraen hora y minuto para los selectores correspondientes

## Patrón de Visualización de Datos Astrológicos

Para la visualización de datos astrológicos complejos como cartas natales, se sigue el siguiente patrón:

1. **Componente de Renderizado:** Un componente cliente que utiliza bibliotecas especializadas (como @astrodraw/astrochart).
2. **Wrapper con Carga Dinámica:** Un componente wrapper que utiliza `dynamic import` con `{ ssr: false }` para evitar problemas de renderizado en el servidor.
3. **Datos Estructurados:** Datos en formato JSON con una estructura específica para cada tipo de visualización.
4. **Página Protegida:** Páginas que requieren autenticación y datos de usuario completos.

### Implementación para Cartas Natales

| Componente                    | Propósito                                                                |
| :---------------------------- | :----------------------------------------------------------------------- |
| `components/carta-natal.tsx`  | Renderiza la carta natal usando la biblioteca @astrodraw/astrochart      |
| `components/carta-natal-wrapper.tsx` | Carga dinámicamente el componente principal con `{ ssr: false }`  |
| `data/cartas/*.json`          | Almacena los datos de posiciones planetarias y cúspides de casas         |
| `app/cartas/*/page.tsx`       | Páginas protegidas que muestran diferentes tipos de cartas astrológicas  |

Este patrón permite:
- Evitar problemas de renderizado en el servidor con bibliotecas que manipulan el DOM
- Cargar los datos de manera eficiente
- Reutilizar componentes para diferentes tipos de cartas (trópica, dracónica, etc.)
- Proteger el acceso a las visualizaciones según el estado de autenticación del usuario

## Patrón de Navegación y Manejo de Claves en Listas

Para la navegación lateral y los menús desplegables, se sigue un patrón específico para evitar problemas con claves duplicadas en React:

### Componentes de Navegación

| Componente                      | Propósito                                                                |
| :------------------------------ | :----------------------------------------------------------------------- |
| `components/app-sidebar.tsx`    | Contenedor principal de la barra lateral con datos de navegación         |
| `components/nav-main.tsx`       | Renderiza los elementos principales del menú de navegación               |
| `components/sidebar-flyout.tsx` | Muestra menús desplegables al pasar el cursor sobre ítems colapsados     |

### Patrón de Claves Únicas

Para evitar el error "Encountered two children with the same key" en listas de React, especialmente cuando hay URLs duplicadas como "#", se implementa el siguiente patrón:

1. **Claves Compuestas:** Se utilizan claves compuestas que combinan múltiples propiedades del elemento:
   ```jsx
   key={`${item.title}-${item.url}-${index}`}
   ```

2. **Inclusión del Índice:** Se incluye el índice del elemento en la clave para garantizar unicidad incluso cuando otras propiedades son idénticas:
   ```jsx
   {items.map((item, index) => (
     <Component key={`${item.property}-${index}`} />
   ))}
   ```

3. **Consistencia en Componentes Anidados:** Este patrón se aplica de manera consistente en todos los componentes que renderizan listas, incluyendo submenús y elementos anidados.

Este enfoque garantiza que cada elemento tenga una clave única, lo que permite a React mantener correctamente la identidad de los componentes durante las actualizaciones y evita problemas de renderizado y comportamiento inesperado.
