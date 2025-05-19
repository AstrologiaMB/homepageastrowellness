# Active Context

## Current Work

Estamos trabajando en la integración de la aplicación Next.js (sidebar-fastapi) con los programas Python de cálculo astrológico (calculo-carta-natal-api) mediante una API FastAPI. Esta integración permitirá que la aplicación web obtenga datos astrológicos dinámicamente calculados en lugar de usar archivos JSON estáticos.

## Recent Changes

*   **Análisis de Formatos de Datos:** Hemos analizado los formatos de datos actuales y los requeridos por los componentes de la aplicación, confirmando que el formato generado por el programa Python (`carta_astrochart_tropical_*.json`) es compatible con el componente CartaNatal.
*   **Diseño de Arquitectura de Integración:** Hemos diseñado una arquitectura que utiliza FastAPI como puente entre Next.js y los programas Python, con un script adaptador para mantener los programas originales intactos.
*   **Plan de Implementación:** Hemos definido un plan de implementación por fases para minimizar riesgos, comenzando con la carta natal trópica como primer caso de uso.
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

## Implementación de Carta Natal

* **Biblioteca Utilizada:** @astrodraw/astrochart versión 3.0.2 para renderizar cartas natales en SVG.
* **Componentes Creados:**
  - `components/carta-natal.tsx`: Componente principal que utiliza la API de Chart de AstroChart para renderizar la carta natal.
  - `components/carta-natal-wrapper.tsx`: Wrapper que carga el componente CartaNatal dinámicamente con `dynamic import` y `{ ssr: false }` para evitar problemas de renderizado en el servidor.
* **Estructura de Datos:** Los datos de la carta natal se proporcionan en formato JSON con la siguiente estructura:
  - `planets`: Objeto con posiciones planetarias en grados (0-359) y flags de retrogradación (-0.1).
  - `cusps`: Array de 12 valores numéricos representando las cúspides de las casas.
* **Integración:** Implementada en `app/cartas/tropica/page.tsx` con datos de ejemplo desde `data/cartas/carta_natal_ejemplo.json`.
* **Protección de Ruta:** La página de carta natal está protegida y requiere autenticación y datos de usuario completos.

## Corrección de Errores de Claves Duplicadas en Navegación

Se ha resuelto un problema crítico relacionado con claves duplicadas en los componentes de navegación:

* **Problema Identificado:** Error "Encountered two children with the same key, `#`" en la consola del navegador, causado por elementos con la misma URL "#" utilizados como claves en React.
* **Componentes Afectados:** 
  - `components/nav-main.tsx`: Utilizaba `item.title` como clave para elementos del menú.
  - `components/sidebar-flyout.tsx`: Utilizaba `item.href` como clave para enlaces en menús desplegables.
* **Solución Implementada:**
  - Modificados ambos componentes para usar claves compuestas que combinan múltiples propiedades: título, URL e índice.
  - Añadido el parámetro `index` a las funciones de mapeo para utilizarlo en las claves.
  - Documentado el patrón en `cline_docs/systemPatterns.md` para su uso consistente en futuros componentes.
* **Resultado:** La navegación ahora funciona correctamente sin errores de claves duplicadas, mejorando la estabilidad y el rendimiento de la aplicación.

## Next Steps

1. **Configurar el entorno FastAPI**
   - Crear estructura de directorios y archivos básicos
   - Configurar entorno virtual y dependencias
   - Implementar configuración básica (CORS, logging)

2. **Crear script adaptador para el programa Python**
   - Analizar el programa Python original
   - Implementar script que actúe como puente
   - Probar el script con datos de prueba

3. **Implementar endpoints en FastAPI**
   - Crear endpoint para carta natal trópica
   - Implementar lógica para ejecutar el script adaptador
   - Probar el endpoint con herramientas como curl o Postman

4. **Actualizar el esquema Prisma**
   - Añadir modelo para caché de cartas natales
   - Aplicar migración a la base de datos

5. **Crear API endpoint en Next.js**
   - Implementar endpoint que se comunique con FastAPI
   - Implementar verificación de caché
   - Implementar almacenamiento en caché

6. **Modificar componentes de la aplicación**
   - Actualizar componente de carta natal para usar el nuevo endpoint
   - Implementar manejo de errores y fallback a datos locales
   - Probar la integración completa

7. **Refinar la implementación del "Calendario General"** con posibles mejoras visuales y de usabilidad basadas en feedback de usuarios.
8. **Migrate other functional components** to their respective route files following the established pattern and the provided checklist.
9. **Apply route protection** using `getServerSession()` and `redirect()` to other private pages as they are developed.
10. **Implemented the authentication fix** by creating `components/session-handler.tsx` and `components/session-wrapper.tsx`, and modifying `app/layout.tsx` to use these components and remove the direct `getServerSession` call.
11. **Implemented the consultant's simplified** `components/session-wrapper.tsx`.
12. **Modified `components/session-handler.tsx`** to remove the use of `headers()` as recommended by the consultant, which also removed the pathname-based redirection logic.
13. **Updated `tsconfig.json`** with optimized settings for App Router, Prisma, and absolute imports.
14. **Added a technical summary** of the authentication system to `cline_docs/systemPatterns.md`.
15. **Implemented a middleware centralizado** (`middleware.ts`) para manejar todas las redirecciones basadas en autenticación y estado de datos del usuario.
16. **Mejorado NextAuth** con callbacks `jwt` y `session` para incluir información sobre datos completos en el token y la sesión.
17. **Simplificado la estructura de layouts** eliminando el layout específico de `/completar-datos` para evitar redirecciones infinitas.
18. **Mejorado el botón de login** con manejo de errores y logging para proporcionar mejor feedback al usuario.
19. **Actualizada la API de actualización de usuario** para devolver información sobre el estado de los datos del usuario.
20. **Resuelto conflictos de dependencias** actualizando date-fns a la versión 3.6.0 y usando `--legacy-peer-deps` para compatibilidad con React 19.
21. **Implementar mejoras adicionales** en el formulario de datos personales, como validaciones más robustas y mensajes de error más descriptivos.
22. **Considerar la implementación** de un sistema de notificaciones para informar al usuario sobre el estado de sus acciones (guardado exitoso, errores, etc.).
23. **Address the `disableToggle` functionality** for the sidebar on the homepage if it's deemed necessary and requires modification of the `SidebarProvider` component.
24. **Continuar aplicando el patrón de claves únicas** en futuros componentes que rendericen listas de elementos.

## Decisiones Activas

- **Enfoque de Integración:** Utilizaremos un script adaptador en lugar de modificar el programa Python original para minimizar riesgos y mantener una referencia funcional.
- **Sistema de Caché:** Implementaremos un sistema de caché en la base de datos Prisma para evitar recálculos innecesarios, con identificación de usuarios a través del modelo Prisma.
- **Compatibilidad de Formatos:** Aprovecharemos la compatibilidad directa entre el formato generado por Python (`carta_astrochart_tropical_*.json`) y el requerido por el componente CartaNatal.
- **Manejo de Errores:** Implementaremos un sistema de fallback a datos locales en caso de error en la API.
- **Enfoque Incremental:** Comenzaremos con la carta natal trópica como primer caso de uso y luego extenderemos a otros tipos de cartas.

## Aprendizajes del Proyecto

- El formato de datos generado por el programa Python (`carta_astrochart_tropical_*.json`) es compatible con el componente CartaNatal, lo que simplifica la integración.
- La identificación de usuarios en el caché se manejará a través del modelo Prisma, no a través de nombres de archivo.
- Un script adaptador proporciona una separación clara de responsabilidades y minimiza los riesgos de modificar el programa original.
- El enfoque incremental permite validar la arquitectura con un caso de uso simple antes de extenderla a casos más complejos.
