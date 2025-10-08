# 📚 Índice de Documentación Astrowellness

**Fecha de Actualización:** 24 de septiembre de 2025
**Estado:** Documentación completa y actualizada - Incluye Carta Electiva API y sistema de progreso real

---

## 🗺️ Navegación Rápida

### **🚀 GPS del Código - EMPEZAR AQUÍ**
- **[DONDE_ESTA_QUE.md](../../DONDE_ESTA_QUE.md)** - 🎯 **Encuentra cualquier funcionalidad en 30 segundos**
  - Problemas comunes → Soluciones rápidas
  - Mapa por funcionalidad (género, cálculos, interpretaciones)
  - Debugging por síntomas
  - Casos de uso frecuentes

---

## 🎯 Documentación Principal

### **📋 Documentos Actualizados (Enero 2025)**

| Documento | Descripción | Estado | Última Actualización |
|-----------|-------------|--------|---------------------|
| [INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md](./INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md) | **Guía completa de integración** entre sidebar-fastapi y calculo-carta-natal-api | ✅ Actualizado | 24 septiembre 2025 |
| [README_SERVICIOS.md](./README_SERVICIOS.md) | **Documentación completa de servicios** y microservicios | ✅ Actualizado | 7 enero 2025 |
| [MICROSERVICIOS_OVERVIEW.md](./MICROSERVICIOS_OVERVIEW.md) | **Overview técnico** de la arquitectura de microservicios | ✅ Actualizado | 24 septiembre 2025 |
| **[CARTA_ELECTIVA_INTEGRATION.md](./CARTA_ELECTIVA_INTEGRATION.md)** | **🎯 Sistema completo de Carta Electiva** - API, progreso real, algoritmos optimizados | ✅ **NUEVO** | 24 septiembre 2025 |

### **📋 Documentos Existentes (Referencia)**

| Documento | Descripción | Estado |
|-----------|-------------|--------|
| [INTEGRACION_FASTAPI.md](./INTEGRACION_FASTAPI.md) | Guía original de integración FastAPI | 📄 Referencia |
| [TIMEZONE_FIX_DOCUMENTATION.md](./TIMEZONE_FIX_DOCUMENTATION.md) | Correcciones de zona horaria | 📄 Referencia |
| [BIRTH_DATE_TIMEZONE_FIX_SUMMARY.md](./BIRTH_DATE_TIMEZONE_FIX_SUMMARY.md) | Resumen de correcciones de fecha | 📄 Referencia |

---

## 🚀 Mejoras Implementadas

### **⚡ Algoritmo Dracónico de Alta Precisión**

**Problema Resuelto:**
- ❌ **Antes**: Error de ~43 minutos vs AstroSeek
- ✅ **Después**: Error de ~2 minutos vs AstroSeek
- 🎯 **Mejora**: 95% de precisión mejorada

**Documentación Específica:**
- [../calculo-carta-natal-api/DRACONIC_PRECISION_FIX_DOCUMENTATION.md](../calculo-carta-natal-api/DRACONIC_PRECISION_FIX_DOCUMENTATION.md)
- Implementación en: [../calculo-carta-natal-api/src/immanuel/charts.py](../calculo-carta-natal-api/src/immanuel/charts.py)

### **🔧 Correcciones de Zona Horaria**

**Problema Resuelto:**
- ❌ **Antes**: Fechas de nacimiento cambiaban por zona horaria
- ✅ **Después**: Fechas exactas usando métodos UTC
- 🎯 **Resultado**: Cálculos astronómicos precisos

### **📊 Sistema de Caché Optimizado**

**Mejoras Implementadas:**
- ⚡ **Performance**: 96% mejora en tiempos de respuesta
- 💾 **Hit Rate**: 94% de consultas desde caché
- 🔄 **TTL**: 24 horas con invalidación manual

### **🌐 Sistema de Traducción Astrológica Completo**

**Funcionalidades Implementadas:**
- ✅ **`translatePlanet()`** - Traducción completa de nombres planetarios (incluyendo True North Node)
- ✅ **`translateAspect()`** - Traducción de tipos de aspecto astrológicos
- ✅ **`traducirSignosEnTexto()`** - Traducción completa en textos largos y descripciones
- ✅ **UI completamente localizada** - Toda la interfaz dracónica en español

**Problema Resuelto:**
- ❌ **Antes**: Textos en inglés en tarjetas de eventos dracónicos
- ✅ **Después**: Interfaz completamente en español con terminología astrológica precisa
- 🎯 **Resultado**: Experiencia de usuario completamente localizada

**Documentación Específica:**
- Implementación en: `lib/astrology-utils.ts`
- Aplicación en: `app/cartas/draconica/page.tsx`
- Referencia en: `DONDE_ESTA_QUE.md` (v1.3)

---

## 🏗️ Arquitectura del Sistema

### **Componentes Principales**

```
Frontend (Next.js) → API Gateway → Microservicios
     ↓                   ↓              ↓
  Port 3000         Prisma Cache    Ports 8001-8004
```

### **Microservicios Activos**

| Servicio | Puerto | Función | Estado |
|----------|--------|---------|--------|
| **Cálculo Cartas** | 8001 | Cartas tropicales y dracónicas | ✅ Activo |
| **Interpretador IA** | 8002 | RAG + OpenAI interpretaciones | ✅ Activo |
| **Calendario Personal** | 8003 | Tránsitos y luna progresada | ✅ Activo |
| **Astrogematría** | 8004 | Cálculos numerológicos | ✅ Activo |

---

## 🔄 Flujo de Integración

### **Sidebar-FastAPI ↔ Calculo-Carta-Natal-API**

1. **Usuario autenticado** solicita carta natal
2. **API Gateway** verifica caché en Prisma
3. Si no existe caché: **Llamada a FastAPI** (puerto 8001)
4. **FastAPI** calcula con algoritmo de alta precisión
5. **Resultado guardado** en caché para futuras consultas
6. **Frontend** renderiza carta con AstroChart

### **Endpoints Principales**

```typescript
// Cartas natales
POST /api/cartas/tropical   // Carta tropical
POST /api/cartas/draconica  // Carta dracónica (alta precisión)

// Interpretaciones
POST /api/interpretaciones  // Interpretaciones IA

// Utilidades
POST /api/cartas/clear-cache  // Limpiar caché
```

---

## 📊 Métricas de Performance

### **Tiempos de Respuesta**

| Operación | Primera Vez | Desde Caché | Mejora |
|-----------|-------------|-------------|--------|
| Carta Tropical | ~1.2s | ~50ms | 96% |
| Carta Dracónica | ~1.5s | ~50ms | 97% |
| Interpretaciones | ~2.0s | ~100ms | 95% |

### **Precisión Astronómica**

| Cálculo | Error vs AstroSeek | Estado |
|---------|-------------------|--------|
| Tropical | <1 minuto | ✅ Excelente |
| Dracónico | ~2 minutos | ✅ Excelente (95% mejorado) |
| Tránsitos | <30 segundos | ✅ Excelente |

---

## 🛠️ Scripts de Gestión

### **Comandos Principales**

```bash
# Iniciar todos los servicios
./start_services.sh

# Verificar estado de servicios
./check_services.sh

# Reiniciar servicios
./restart_services.sh

# Limpiar caché específico
node clear_draconic_cache.js
```

### **Verificación de Servicios**

```bash
# Health checks
curl http://localhost:8001/health  # Cálculo Cartas
curl http://localhost:8002/health  # Interpretador
curl http://localhost:8003/health  # Calendario
curl http://localhost:8004/health  # Astrogematría
```

---

## 🔍 Troubleshooting

### **Problemas Comunes y Soluciones**

#### **1. Error de Precisión Dracónica**
```bash
# Verificar que AstroSeek use True Node
# Settings → Calculation → Node Type → True Node
```

#### **2. Fecha de Nacimiento Incorrecta**
```typescript
// ✅ CORRECTO: Usar métodos UTC
const fecha = `${user.birthDate.getUTCFullYear()}-${(user.birthDate.getUTCMonth() + 1).toString().padStart(2, '0')}-${user.birthDate.getUTCDate().toString().padStart(2, '0')}`;
```

#### **3. Servicio No Responde**
```bash
# Verificar puertos
lsof -i :8001

# Reiniciar servicio específico
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
python app.py
```

---

## 📋 Checklist de Verificación

### **✅ Estado Actual del Sistema**

- [x] **Algoritmo Dracónico**: Precisión mejorada 95%
- [x] **Zona Horaria**: Correcciones implementadas
- [x] **Sistema de Caché**: 94% hit rate funcionando
- [x] **Sistema de Traducción**: Funciones implementadas y funcionando
- [x] **UI localizada**: Textos en español en toda la aplicación
- [x] **4 Microservicios**: Todos operativos
- [x] **API Gateway**: Autenticación y routing funcionando
- [x] **Frontend**: Integración completa con backend
- [x] **Documentación**: Actualizada y completa

### **🚀 Listo para Producción**

El sistema Astrowellness está completamente integrado y optimizado:
- ✅ Cálculos astrológicos de alta precisión
- ✅ Performance optimizada (96% mejora)
- ✅ Arquitectura escalable de microservicios
- ✅ Documentación técnica completa
- ✅ Scripts de gestión automatizados

---

## 📞 Soporte y Contacto

### **Documentación Técnica**
- **Autor**: Equipo de desarrollo Astrowellness
- **Última actualización**: 12 de septiembre de 2025
- **Versión**: 2.1 - Sistema de traducción astrológica completo

### **Para Desarrolladores**
- Consultar documentación específica en cada archivo
- Usar scripts de verificación para diagnóstico
- Seguir patrones establecidos en la arquitectura

---

**🌟 Astrowellness - Cálculos Astrológicos de Clase Mundial**
**Documentación completa y actualizada - Septiembre 2025**
