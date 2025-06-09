# Frontend Guidelines para Astrowellness

## Frameworks y librerías
- Utilizar **Next.js 14** y **React 18.2** como base del frontend.
- Utilizar **Tailwind CSS 3.4** para todo el estilizado.
- Utilizar **shadcn/ui** para componentes UI reutilizables.
- Utilizar **lucide-react** para íconos.

## Estilo y buenas prácticas
- Mobile-first: priorizar la vista en dispositivos móviles.
- Utilizar el sistema de clases de Tailwind de forma limpia (sin repetición innecesaria).
- Componentes organizados en carpetas claras: `/components`, `/ui`, `/services`.

## Diseño UI
- Seguir la inspiración en X.com (antes Twitter): sidebar en desktop, menú inferior en mobile.
- Usar `tailwindcss-animate`, `clsx`, `tailwind-merge` para mejoras de usabilidad.

## Estructura
- `/app/page.tsx` es la página principal.
- Layout general: Sidebar + Main Content.

## Reglas de commits
- Mantener commits claros y descriptivos.
- Evitar mezclar cambios de estilos y de funcionalidad en un mismo commit.
