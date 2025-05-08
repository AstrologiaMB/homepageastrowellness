# Active Context

## Current Work

The primary focus has been on setting up the foundational navigation and layout structure of the Astrowellness application using Next.js App Router and shadcn/ui components. This involved implementing a shared layout, dynamic routing for key sections, a dynamic breadcrumb, and refining the sidebar navigation behavior, particularly for collapsed states.

## Recent Changes

*   **`.clinerules` Files Created:** Documented project overview, frontend guidelines, authentication rules, and PWA setup in `.clinerules/` directory.
*   **Sidebar Menu Updated:** Modified `components/app-sidebar.tsx` to update menu items ("Cartas" sub-options, "Models" renamed to "Horas Planetarias", "Documentation" removed) and their corresponding URLs to align with the new routing structure. Added the `isHomepage` prop to `AppSidebar`.
*   **Collapsed Sidebar Flyout Implemented:** Created `components/sidebar-flyout.tsx` and integrated it into `components/nav-main.tsx` to provide hover-triggered flyout menus for sidebar items with sub-options when the sidebar is collapsed.
*   **"Calendario General" Component (Phase 1):** Implemented the basic layout, week navigation, "Back to Today" functionality, and date selection menu (month/week selection with correct sequential numbering) in `components/calendario-general.tsx`. Created `lib/date-utils.ts` for date calculations. Ensured vertical scrolling for the week display on both mobile and desktop.
*   **Implementación de tarjetas de eventos astrológicos:** Creado el componente `EventoAstrologico` que muestra cada evento con su tipo, hora y descripción en un formato compacto y legible. El diseño optimiza el espacio mostrando "Tipo de evento a las HH:MM" en una sola línea.
*   **Integración de datos JSON:** Creada la carpeta `/data` y configurada la importación del archivo JSON con eventos astrológicos. Añadido archivo de declaración de tipos para TypeScript.
*   **Mejora del componente CalendarioGeneral:** Actualizado para mostrar eventos astrológicos reales desde el archivo JSON, con scroll horizontal para días con múltiples eventos. Implementada la lógica para filtrar eventos por día.
*   **Funciones de conversión de timezone:** Añadidas funciones en `lib/date-utils.ts` para convertir fechas UTC a hora local del dispositivo del usuario.
*   **Documentación de manejo de zonas horarias:** Creado `cline_docs/timezone-handling.md` para documentar la implementación actual y propuestas futuras para un manejo más robusto de zonas horarias.
*   **Welcome View Implemented:** Updated `app/page.tsx` to display a welcome message card as the default view for the root route (`/`).
*   **Dynamic Routing Structure Created:** Created nested directories and placeholder `page.tsx` files for key sections like Calendario (`app/calendario/general/page.tsx`, `app/calendario/personal/page.tsx`) and Cartas (`app/cartas/horaria/page.tsx`, `app/cartas/tropica/page.tsx`, `app/cartas/draconica/page.tsx`). Integrated the `CalendarioGeneral` component into `app/calendario/general/page.tsx`.
*   **Dynamic Breadcrumb Implemented:** Created `components/breadcrumb-dynamic.tsx` and integrated it into the header within the shared layout.
*   **Shared Layout Implemented:** Created `app/layout.tsx` to define the persistent layout (sidebar, header, main content area) that wraps all routes. Implemented conditional rendering in `app/layout.tsx` using `usePathname` to hide the `SidebarTrigger` and `DynamicBreadcrumb` on the homepage and control the sidebar's initial expanded state. Added intermediate `layout.tsx` files in `app/calendario/` and `app/cartas/` to ensure the main layout is applied to section routes.
*   **Addressed Persistent Sidebar Trigger on Homepage:** Removed a potentially conflicting `SidebarTrigger` from `AppSidebar.tsx` based on the consultant's diagnosis, relying on the `SidebarTrigger` in `app/layout.tsx` for toggling.
*   **Google Authentication Implemented:** Integrated Google OAuth using NextAuth v5. This involved installing `next-auth`, creating the API route handler (`app/api/auth/[...nextauth]/route.ts`), configuring Google credentials and `NEXTAUTH_SECRET` in `.env.local`, creating a login page (`app/login/page.tsx`), and updating the `NavUser` component (`components/nav-user.tsx`) to display user info or a login button based on session status.
*   **Logout Redirection Fixed:** Modified the `NavUser` component to redirect users to the homepage (`/`) after logging out using `useRouter` and `router.push('/')` after `signOut()`.
*   **Route Protection Implemented (Per-Page):** Implemented route protection on specific pages (`/calendario/general`, `/calendario/personal`, `/cartas/tropica`, `/cartas/draconica`, `/cartas/horaria`) using `getServerSession()` and `redirect()` within each page component. This approach was adopted instead of middleware due to compatibility issues encountered with NextAuth v5. The `middleware.ts` file was removed. The `authOptions` object was exported from `app/api/auth/[...nextauth]/route.ts` to support `getServerSession()`.
*   **Corrección del formato de fecha en la API de actualización de usuario:** Implementada la conversión adecuada de la fecha de nacimiento al formato ISO-8601 que requiere Prisma, resolviendo errores de validación al guardar datos.
*   **Mejora del formulario de completar datos:** Añadidos campos para hora y minuto de nacimiento, junto con un checkbox para indicar si el usuario conoce su hora exacta de nacimiento, mejorando la precisión de los datos astrológicos.
*   **Creación de endpoint para perfil de usuario:** Implementado un nuevo endpoint en `app/api/user/profile/route.ts` que devuelve los datos del usuario autenticado para su uso en formularios y perfiles.
*   **Precarga de datos en el formulario:** Modificado el formulario de completar datos para cargar y mostrar los datos existentes del usuario cuando ya los ha ingresado previamente, mejorando la experiencia de usuario al editar información.

## Next Steps

*   Refinar la implementación del "Calendario General" con posibles mejoras visuales y de usabilidad basadas en feedback de usuarios.
*   Migrate other functional components to their respective route files following the established pattern and the provided checklist.
*   Apply route protection using `getServerSession()` and `redirect()` to other private pages as they are developed.
*   Implemented the authentication fix by creating `components/session-handler.tsx` and `components/session-wrapper.tsx`, and modifying `app/layout.tsx` to use these components and remove the direct `getServerSession` call.
*   Implemented the consultant's simplified `components/session-wrapper.tsx`.
*   Modified `components/session-handler.tsx` to remove the use of `headers()` as recommended by the consultant, which also removed the pathname-based redirection logic.
*   Updated `tsconfig.json` with optimized settings for App Router, Prisma, and absolute imports.
*   Added a technical summary of the authentication system to `cline_docs/systemPatterns.md`.
*   Implemented a middleware centralizado (`middleware.ts`) para manejar todas las redirecciones basadas en autenticación y estado de datos del usuario.
*   Mejorado NextAuth con callbacks `jwt` y `session` para incluir información sobre datos completos en el token y la sesión.
*   Simplificado la estructura de layouts eliminando el layout específico de `/completar-datos` para evitar redirecciones infinitas.
*   Mejorado el botón de login con manejo de errores y logging para proporcionar mejor feedback al usuario.
*   Actualizada la API de actualización de usuario para devolver información sobre el estado de los datos del usuario.
*   Resuelto conflictos de dependencias actualizando date-fns a la versión 3.6.0 y usando `--legacy-peer-deps` para compatibilidad con React 19.
*   Implementar mejoras adicionales en el formulario de datos personales, como validaciones más robustas y mensajes de error más descriptivos.
*   Considerar la implementación de un sistema de notificaciones para informar al usuario sobre el estado de sus acciones (guardado exitoso, errores, etc.).
*   Address the `disableToggle` functionality for the sidebar on the homepage if it's deemed necessary and requires modification of the `SidebarProvider` component.
