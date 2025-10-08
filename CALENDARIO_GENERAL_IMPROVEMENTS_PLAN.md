# 📅 Calendario General - Plan de Mejoras 2025

## 🎯 **Visión General**
Documento roadmap para mejorar la UX y calidad de código del calendario general de Astrowellness, implementando mejoras de forma incremental con enfoque en impacto/tiempo.

**Estado Actual**: Componente funcional pero con problemas críticos de UX móvil y arquitectura compleja.

---

## 🔥 **FASE 1: CRÍTICA - Mejoras de Alto Impacto (2-3 horas)**

### ✅ **Paso 1.1: Eliminar Scroll Horizontal Móvil** ⭐⭐⭐⭐⭐
- **Estado**: ❌ Pendiente
- **Impacto**: Crítico para UX móvil
- **Problema**: Scroll horizontal es anti-patrón en móviles
- **Solución**: Stack vertical en móvil, horizontal en desktop con Accordion para múltiples eventos
- **Archivos**: `components/calendario-general.tsx`, `components/evento-astrologico.tsx`
- **Componentes shadcn**: `Accordion` para colapsar eventos múltiples
- **Tiempo estimado**: 1 hora
- **Testing**: Verificar responsive design y accesibilidad

### ✅ **Paso 1.2: Estados de Loading y Error** ⭐⭐⭐⭐⭐
- **Estado**: ❌ Pendiente
- **Impacto**: UX esencial faltante
- **Implementar**:
  - Loading skeletons durante carga de eventos
  - Error states con retry functionality
  - Estados vacíos informativos
- **Archivos**: `components/calendario-general.tsx`
- **Componentes shadcn**: `Skeleton`, `Alert`, `Button`
- **Tiempo estimado**: 45 minutos
- **Testing**: Testear carga fallida y reconexión

### ✅ **Paso 1.3: Limpieza de Código de Producción** ⭐⭐⭐⭐⭐
- **Estado**: ❌ Pendiente
- **Impacto**: Profesionalismo y performance
- **Cambios**:
  - Remover todos los `console.log`
  - Limpiar código no utilizado
  - Agregar PropTypes faltantes
- **Archivos**: `components/calendario-general.tsx`
- **Tiempo estimado**: 20 minutos
- **Testing**: Verificar logs en consola de producción

---

## 🚀 **FASE 2: ARQUITECTURA - Refactorización (3-4 horas)**

### 📋 **Paso 2.1: Descomponer Componente Principal**
- **Estado**: ❌ Pendiente
- **Impacto**: Mantenibilidad y testing
- **Sub-componentes a crear**:
  ```typescript
  // components/calendario/
  - WeekNavigator.tsx (botones anterior/siguiente)
  - DateSelector.tsx (popover/sheet con calendario)
  - YearSelector.tsx (dropdown de años)
  - DayEventList.tsx (lista responsiva de eventos)
  - CalendarHeader.tsx (título y navegación)
  ```
- **Beneficios**: Componentes testeables, reutilizables, legibles
- **Archivos**: Crear 5+ nuevos componentes
- **Tiempo estimado**: 2 horas
- **Testing**: Unit tests por componente

### 📋 **Paso 2.2: Custom Hooks para Lógica**
- **Estado**: ❌ Pendiente
- **Impacto**: Reutilización y testing
- **Hooks a crear**:
  ```typescript
  // hooks/
  - useCalendarEvents.ts (carga y gestión de eventos)
  - useWeekNavigation.ts (navegación semanal)
  - useResponsiveCalendar.ts (detección mobile/desktop)
  ```
- **Beneficios**: Lógica compartida, fácil testing
- **Archivos**: Crear 3 hooks custom
- **Tiempo estimado**: 1.5 horas
- **Testing**: Tests unitarios para lógica

---

## 🎨 **FASE 3: UX POLISH - Interacción y Accesibilidad (2-3 horas)**

### 🎯 **Paso 3.1: Accesibilidad Básica (A11y)**
- **Estado**: ❌ Pendiente
- **Impacto**: Inclusividad y cumplimiento WCAG
- **Implementar**:
  - ARIA labels apropiados
  - Navegación por teclado (Tab, Enter, Escape)
  - Focus management
  - Screen reader support
- **Componentes shadcn**: Aprovechar accesibilidad built-in
- **Tiempo estimado**: 1 hora
- **Testing**: Lighthouse accessibility audit

### 🎯 **Paso 3.2: Estados Vacíos Mejorados**
- **Estado**: ❌ Pendiente
- **Impacto**: Mejor UX informativa
- **Implementar**:
  - Estados vacíos contextuales (no genéricos)
  - Mensajes útiles con sugerencias de acción
  - Iconografía apropiada
- **Ejemplos**:
  - "No hay eventos astrológicos este día 🌙"
  - "Explora otros días con eventos importantes"
- **Componentes shadcn**: `Empty` (si existe) + custom
- **Tiempo estimado**: 30 minutos
- **Testing**: Casos edge (dias sin eventos, carga fallida)

### 🎯 **Paso 3.3: Tooltips y Previews Interactivos**
- **Estado**: ❌ Pendiente
- **Impacto**: Mejor discovery de información
- **Implementar**:
  - Tooltips para previews rápidos
  - No modales grandes para info básica
  - Interacciones hover/touch apropiadas
- **Casos de uso**:
  - Preview de eventos en hover/tap
  - Info contextual de planetas/casas
- **Componentes shadcn**: `Tooltip`, `HoverCard`
- **Tiempo estimado**: 45 minutos
- **Testing**: Usabilidad en touch devices

---

## ⚡ **FASE 4: PERFORMANCE & POLISH (1-2 horas - Opcional)**

### 🔧 **Paso 4.1: Optimizaciones de Performance**
- **Estado**: ❌ Pendiente
- **Impacto**: Mejor responsiveness
- **Implementar**:
  - `useMemo` para filtrado de eventos
  - `useCallback` para event handlers
  - Virtualización para listas grandes
  - Lazy loading adicional
- **Tiempo estimado**: 1 hora
- **Testing**: React DevTools Profiler

### ✨ **Paso 4.2: Micro-interacciones**
- **Estado**: ❌ Pendiente
- **Impacto**: Polish y engagement
- **Implementar**:
  - Transiciones suaves entre semanas
  - Loading states animados
  - Hover states sutiles
  - Feedback visual para acciones
- **Tecnologías**: CSS animations + `framer-motion` (si aplica)
- **Tiempo estimado**: 45 minutos
- **Testing**: Core Web Vitals

---

## 📊 **Métricas de Éxito por Fase**

### **Fase 1 - Crítica**
- ✅ Scroll horizontal eliminado en móvil
- ✅ No más console.logs en producción
- ✅ Estados loading/error implementados
- 📊 Lighthouse Score: +10-15 puntos

### **Fase 2 - Arquitectura**
- ✅ Componente principal < 200 líneas
- ✅ Cobertura de tests: >80%
- ✅ Reutilización confirmada (shared logic)
- 📊 Code maintainability: Mucho mejor

### **Fase 3 - UX Polish**
- ✅ Accesibilidad: WCAG AA compliant
- ✅ Navegación por teclado completa
- ✅ Estados vacíos informativos
- 📊 UX Score (usuarios): Muy positivo

### **Fase 4 - Performance**
- ✅ First Content Paint: <1.5s
- ✅ No re-renders innecesarios
- ✅ Mobile performance: 90+ score
- 📊 Core Web Vitals: All green

---

## 🛠️ **Estrategia de Implementación**

### **Orden de Trabajo Recomendado**
1. **COMPLETAR FASE 1** (Alta prioridad, impacto inmediato)
2. **COMPLETAR FASE 2** (Mejora mantenibilidad)
3. **COMPLETAR FASE 3** (Mejora UX)
4. **OPCIONAL FASE 4** (Performance si tiempo permite)

### **Control de Calidad por Paso**
- ✅ **Visual Testing**: Verificar funcionamiento
- ✅ **Responsive Testing**: Mobile/Desktop/Tablet
- ✅ **Accessibility Testing**: Lighthouse + manual
- ✅ **Performance Testing**: DevTools + CWV
- ✅ **Regression Testing**: Funcionalidad existente intacta

### **Branching Strategy**
```
main
├── feature/fase1-scroll-mobile ✓
├── feature/fase1-loading-states ✓
├── feature/fase1-prod-cleanup ✓
├── feature/fase2-components-refactor
├── feature/fase2-custom-hooks
├── feature/fase3-accessibility
├── feature/fase3-empty-states
└── feature/fase3-tooltips
```

### **Rollback Safety**
- Crear branch por feature importante
- Mantener versiones estables funcionales
- Documentar breaking changes

---

## 📝 **Checklist de Implementación Detallada**

Cada paso tiene su checklist específico que se completará durante la implementación, con referencias a commits y testing realizado.

**Próximo Paso**: 👉 **Comenzar con Paso 1.1 - Eliminar Scroll Horizontal**
