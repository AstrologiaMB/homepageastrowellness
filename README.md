# 🌟 Astrowellness - Plataforma Astrológica de Alta Precisión

**Versión:** 2.0 - Algoritmo dracónico optimizado  
**Estado:** Producción - Todos los servicios operativos

---

## 🎯 Descripción

Astrowellness es una plataforma web moderna de astrología que ofrece cálculos astronómicos de alta precisión, interpretaciones personalizadas con IA, y un ecosistema completo de microservicios astrológicos.

### **🚀 Características Principales**

- **Cartas Natales de Alta Precisión**: Algoritmos optimizados con Swiss Ephemeris
- **Algoritmo Dracónico Mejorado**: 95% de precisión mejorada vs versiones anteriores
- **Interpretaciones IA**: Sistema RAG + OpenAI para interpretaciones naturales
- **Microservicios Escalables**: Arquitectura moderna y mantenible
- **PWA Ready**: Optimizado para dispositivos móviles

---

## 📚 Documentación

### **📋 Documentación Actual (Enero 2025)**

| Documento | Descripción | Ubicación |
|-----------|-------------|-----------|
| **[Índice de Documentación](./docs/current/DOCUMENTACION_INDICE.md)** | 📚 **INICIO AQUÍ** - Índice maestro de toda la documentación | `docs/current/` |
| **[Guía de Integración](./docs/current/INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md)** | Integración completa sidebar-fastapi ↔ calculo-carta-natal-api | `docs/current/` |
| **[Servicios Completos](./docs/current/README_SERVICIOS.md)** | Documentación de todos los microservicios | `docs/current/` |
| **[Overview Técnico](./docs/current/MICROSERVICIOS_OVERVIEW.md)** | Arquitectura técnica detallada | `docs/current/` |

### **📂 Estructura de Documentación**

```
docs/
├── current/          # 📄 Documentación actualizada (USAR ESTA)
│   ├── DOCUMENTACION_INDICE.md
│   ├── INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md
│   ├── README_SERVICIOS.md
│   └── MICROSERVICIOS_OVERVIEW.md
├── deprecated/       # 🗂️ Documentación obsoleta (solo referencia)
│   └── INTEGRACION_FASTAPI.md
└── reference/        # 📖 Documentación histórica de referencia
    ├── TIMEZONE_FIX_DOCUMENTATION.md
    └── BIRTH_DATE_TIMEZONE_FIX_SUMMARY.md
```

---

## 🚀 Inicio Rápido

### **1. Iniciar Todos los Servicios**

```bash
# Iniciar ecosistema completo
./start_services.sh

# Verificar estado
./check_services.sh
```

### **2. Servicios Disponibles**

| Servicio | Puerto | URL | Función |
|----------|--------|-----|---------|
| **Frontend** | 3000 | http://localhost:3000 | Interfaz principal |
| **Cálculo Cartas** | 8001 | http://localhost:8001 | Cartas tropicales y dracónicas |
| **Interpretador IA** | 8002 | http://localhost:8002 | Interpretaciones con RAG + OpenAI |
| **Calendario Personal** | 8003 | http://localhost:8003 | Tránsitos y luna progresada |
| **Astrogematría** | 8004 | http://localhost:8004 | Cálculos numerológicos |

### **3. Verificación Rápida**

```bash
# Health checks
curl http://localhost:8001/health  # Cálculo Cartas
curl http://localhost:8002/health  # Interpretador
curl http://localhost:8003/health  # Calendario
curl http://localhost:8004/health  # Astrogematría
```

---

## 🏗️ Arquitectura

### **Tecnologías Principales**

- **Frontend**: Next.js 14 + React 18.2 + TypeScript + Tailwind CSS
- **Backend**: FastAPI + Python 3.11+ (4 microservicios)
- **Base de Datos**: PostgreSQL + Prisma ORM
- **Cálculos**: Immanuel Library + Swiss Ephemeris
- **IA**: OpenAI GPT-4 + Sistema RAG

### **Flujo de Datos**

```
Usuario → Frontend (Next.js) → API Gateway → Microservicios → Cálculos Astronómicos
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

## 🔧 Desarrollo

### **Requisitos**

- Node.js 18+
- Python 3.11+
- PostgreSQL
- Git

### **Instalación**

```bash
# Clonar repositorio
git clone https://github.com/AstrologiaMB/homepageastrowellness.git
cd sidebar-fastapi

# Instalar dependencias
npm install

# Configurar base de datos
npx prisma migrate dev
npx prisma generate

# Iniciar servicios
./start_services.sh
```

### **Scripts Útiles**

```bash
# Gestión de servicios
./start_services.sh      # Iniciar todos los servicios
./check_services.sh      # Verificar estado
./restart_services.sh    # Reiniciar servicios

# Desarrollo
npm run dev              # Desarrollo frontend
npm run build            # Build producción
npm run lint             # Linting

# Base de datos
npx prisma studio        # Interface gráfica DB
npx prisma migrate dev   # Aplicar migraciones
```

---

## 🎯 Mejoras Recientes (Enero 2025)

### **⚡ Algoritmo Dracónico Optimizado**
- **Antes**: Error de ~43 minutos vs AstroSeek
- **Después**: Error de ~2 minutos vs AstroSeek
- **Mejora**: 95% de precisión mejorada

### **🔧 Correcciones de Zona Horaria**
- Fechas de nacimiento exactas usando métodos UTC
- Cálculos astronómicos precisos

### **📊 Sistema de Caché Inteligente**
- 96% mejora en tiempos de respuesta
- 94% hit rate en consultas

---

## 📞 Soporte

### **Documentación**
- **Inicio**: [docs/current/DOCUMENTACION_INDICE.md](./docs/current/DOCUMENTACION_INDICE.md)
- **Integración**: [docs/current/INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md](./docs/current/INTEGRACION_SIDEBAR_CALCULO_API_ACTUALIZADA.md)
- **Servicios**: [docs/current/README_SERVICIOS.md](./docs/current/README_SERVICIOS.md)

### **Troubleshooting**
- Consultar documentación en `docs/current/`
- Usar scripts de verificación: `./check_services.sh`
- Revisar logs de servicios individuales

---

## 📄 Licencia

Proyecto privado - Astrowellness Team

---

**🌟 Astrowellness - Cálculos Astrológicos de Clase Mundial**  
**Documentación actualizada: Enero 2025**
