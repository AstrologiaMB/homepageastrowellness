# Active Context

## Current Work

The primary focus has been on setting up the foundational navigation and layout structure of the Astrowellness application using Next.js App Router and shadcn/ui components. This involved implementing a shared layout, dynamic routing for key sections, a dynamic breadcrumb, and refining the sidebar navigation behavior, particularly for collapsed states.

## Recent Changes

*   **`.clinerules` Files Created:** Documented project overview, frontend guidelines, authentication rules, and PWA setup in `.clinerules/` directory.
*   **Sidebar Menu Updated:** Modified `components/app-sidebar.tsx` to update menu items ("Cartas" sub-options, "Models" renamed to "Horas Planetarias", "Documentation" removed) and their corresponding URLs to align with the new routing structure. Added the `isHomepage` prop to `AppSidebar`.
*   **Collapsed Sidebar Flyout Implemented:** Created `components/sidebar-flyout.tsx` and integrated it into `components/nav-main.tsx` to provide hover-triggered flyout menus for sidebar items with sub-options when the sidebar is collapsed.
*   **"Calendario General" Component (Phase 1):** Implemented the basic layout, week navigation, "Back to Today" functionality, and date selection menu (month/week selection with correct sequential numbering) in `components/calendario-general.tsx`. Created `lib/date-utils.ts` for date calculations. Ensured vertical scrolling for the week display on both mobile and desktop.
*   **Welcome View Implemented:** Updated `app/page.tsx` to display a welcome message card as the default view for the root route (`/`).
*   **Dynamic Routing Structure Created:** Created nested directories and placeholder `page.tsx` files for key sections like Calendario (`app/calendario/general/page.tsx`, `app/calendario/personal/page.tsx`) and Cartas (`app/cartas/horaria/page.tsx`, `app/cartas/tropica/page.tsx`, `app/cartas/draconica/page.tsx`). Integrated the `CalendarioGeneral` component into `app/calendario/general/page.tsx`.
*   **Dynamic Breadcrumb Implemented:** Created `components/breadcrumb-dynamic.tsx` and integrated it into the header within the shared layout.
*   **Shared Layout Implemented:** Created `app/layout.tsx` to define the persistent layout (sidebar, header, main content area) that wraps all routes. Implemented conditional rendering in `app/layout.tsx` using `usePathname` to hide the `SidebarTrigger` and `DynamicBreadcrumb` on the homepage and control the sidebar's initial expanded state. Added intermediate `layout.tsx` files in `app/calendario/` and `app/cartas/` to ensure the main layout is applied to section routes.
*   **Addressed Persistent Sidebar Trigger on Homepage:** Removed a potentially conflicting `SidebarTrigger` from `AppSidebar.tsx` based on the consultant's diagnosis, relying on the `SidebarTrigger` in `app/layout.tsx` for toggling.

## Next Steps

*   Verify the correct application of the shared layout and the visibility/behavior of the sidebar, header, and breadcrumb on both the homepage and section pages in the browser.
*   Confirm that the hover-triggered flyout menus for collapsed sidebar items are working correctly.
*   Address the `disableToggle` functionality for the sidebar on the homepage if it's deemed necessary and requires modification of the `SidebarProvider` component.
*   Proceed with the next phases of the "Calendario General" implementation (defining the event card, reading CSV data, rendering events) once the event card design is ready.
*   Migrate other functional components to their respective route files following the established pattern and the provided checklist.
