## 🚀 **Funcionalidades Recientes**

### **📅 Calendario Astral Multi-Año - Mejorado**
- **Selector dinámico de años**: Cambiar entre 2024-2030
- **Implementación robusta**: Hardcoded años disponibles + carga dinamica con errores graceful
- **Mantenimiento simple**: Agregar 2031 requiere solo editar una constante
- **Nunca se cuelga**: Maneja años faltantes mostrando calendario vacío
- **Performance óptima**: Carga lazy de JSON por año seleccionado

### **🗓️ Estructura de Archivos JSON**
```
data/eventos_astrologicos_UTC_2026.json
├── Calendario completo Enero-Diciembre 2026
└── Formato: fecha_utc, hora_utc, tipo_evento, descripcion...
```

### **💡 Arquitectura**
- **Constante AVAILABLE_YEARS**: Lista clara de años soportados
- **Función loadYearData**: Import dinámico con logging + error handling
- **useEffect**: Recarga automática al cambiar año
- **Código mantenible**: Una línea por año nuevo
