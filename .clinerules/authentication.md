# Data Sources en Astrowellness

## Fuentes de datos
- Los eventos astrológicos provienen de **archivos CSV** generados por un programa propio en Python.
- Cada CSV contiene eventos generales o eventos personalizados.

## Manejo de datos
- Leer archivos CSV utilizando librerías en JavaScript o parsers como `papaparse`.
- Convertir la información de eventos en objetos para ser renderizados dinámicamente.
- Implementar scroll horizontal para mostrar múltiples eventos en un mismo día.

## Reglas para eventos
- Si el usuario no está autenticado, solo mostrar eventos generales.
- Si el usuario está autenticado y tiene servicios pagos, mostrar eventos personales también.

## Localización
- Mostrar eventos en hora local según la zona horaria seleccionada por el usuario.
