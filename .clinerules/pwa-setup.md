# Configuración PWA para Astrowellness

## Objetivo
- Permitir que Astrowellness pueda instalarse como una app en dispositivos móviles.

## Reglas de implementación
- Usar `next-pwa` o similar para configurar el manifest y service workers.
- Manifest debe incluir:
  - Nombre de la app: Astrowellness
  - Short name: Astrowellness
  - Background color: #202020 (oscuro)
  - Theme color: #9c7ddf (violeta)
  - Iconos adaptados para varios tamaños.
- Permitir modo standalone en mobile.

## Performance
- Priorizar carga rápida (lazy load donde sea posible).
- Minimizar tamaño de los bundles.
- Hacer que las rutas principales estén disponibles offline.

## Testing
- Usar Lighthouse para validar PWA.
- Testear en Chrome y Safari móvil.
