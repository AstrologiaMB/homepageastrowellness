# 🚂 Railway Deployment Strategy - Astrochat

**Proyecto:** Astrochat
**Versión:** 1.1
**Fecha:** Noviembre 2025
**Autor:** Equipo Astrochat
**Objetivo:** Deploy escalable y migration-ready

---

## 📋 Tabla de Contenidos

1. [Filosofía y Visión](#filosofía-y-visión)
2. [Arquitectura General](#arquitectura-general)
3. [Architecture Decision Records (ADRs)](#architecture-decision-records-adrs)
4. [Prompts de Implementación para Cline](#prompts-de-implementación-para-cline)
5. [Diagramas de Arquitectura](#diagramas-de-arquitectura)
6. [Checklists de Validación](#checklists-de-validación)
7. [Migration Paths](#migration-paths)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Filosofía y Visión

### **Principios Core**

```yaml
Platform-Agnostic:
  - Código funciona en Railway, Vercel, VPS, AWS
  - No vendor lock-in
  - Variables de entorno como única dependencia

Migration-Ready:
  - Railway → Vercel: 2 horas
  - Railway → VPS: 1 día
  - Sin refactoring masivo necesario

Scalable by Design:
  - Microservicios independientes
  - Repos separados
  - Networking flexible
```

### **Stack Tecnológico**

```yaml
Frontend: Next.js 14 (Node.js)
Backend: 5 microservicios FastAPI (Python 3.11+)
Database: PostgreSQL (Prisma ORM)
Hosting Inicial: Railway (Todo en uno)
Hosting Futuro: Vercel (Frontend) + Railway (Backend)
```

---

## 🏗️ Arquitectura General

### **Componentes del Sistema**

```
Astrochat Platform
├── Frontend (sidebar-fastapi) - Next.js
├── API Cálculos (calculo-carta-natal-api) - FastAPI ✅ DEPLOYED
├── API Interpretaciones (astro_interpretador_rag_fastapi) - FastAPI ✅ DEPLOYED
├── API Calendario (astro-calendar-personal-fastapi) - FastAPI
├── API Astrogematría (astrogematria_fastapi) - FastAPI
├── API Carta Electiva (carta-electiva-api) - FastAPI
└── PostgreSQL Database
```

### **Flujo de Datos**

```
Usuario
  ↓
Frontend (Next.js)
  ↓ (HTTP/REST)
  ├─→ API Cálculos ──→ PostgreSQL
  ├─→ API Interpretaciones ──→ OpenAI
  ├─→ API Calendario ──→ PostgreSQL
  ├─→ API Astrogematría
  └─→ API Carta Electiva
```

### **Repositorios**

```yaml
Estrategia: Polyrepo (Repositorios Separados)

Repositorios:
  - sidebar-fastapi (Frontend)
  - calculo-carta-natal-api ✅ DEPLOYED
  - astro_interpretador_rag_fastapi ✅ DEPLOYED
  - astro-calendar-personal-fastapi
  - astrogematria_fastapi
  - carta-electiva-api

Ubicación Actual:
  - /Users/apple/sidebar-fastapi
  - /Users/apple/calculo-carta-natal-api
  - /Users/apple/astro_interpretador_rag_fastapi
  - /Users/apple/astro-calendar-personal-fastapi
  - /Users/apple/astrogematria_fastapi
  - /Users/apple/carta-electiva-api
```

---

## 📝 Architecture Decision Records (ADRs)

### **ADR-001: Por Qué Repositorios Separados**

**Contexto:**
Tenemos 6 servicios independientes que podrían estar en un monorepo o en repos separados.

**Decisión:**
Mantener repositorios separados (polyrepo).

**Consecuencias:**
- ✅ Deploy independiente de cada servicio
- ✅ Versionado separado (semver por servicio)
- ✅ Teams pueden trabajar en paralelo
- ✅ Migración gradual (un servicio a la vez)
- ⚠️ Más complejidad de coordinación
- ⚠️ Duplicación de configuración

**Alternativas Consideradas:**
- Monorepo: Rechazado por complejidad de setup y tooling

---

### **ADR-002: Por Qué Variables de Entorno Centralizadas**

**Contexto:**
Servicios necesitan descubrirse entre sí y configurarse según ambiente.

**Decisión:**
Strategy Pattern para variables de entorno con nomenclatura estandarizada.

**Consecuencias:**
- ✅ Migration-ready desde día 1
- ✅ Un cambio de URL afecta solo env vars
- ✅ Fácil replicar en nuevos ambientes
- ⚠️ Requiere disciplina de naming

**Implementación:**
```typescript
// Strategy Pattern
const ENV_CONFIG = {
  development: {
    CALCULOS_API_URL: "http://localhost:8001",
    // ...
  },
  railway: {
    CALCULOS_API_URL: process.env.CALCULOS_INTERNAL_URL,
    // ...
  },
  vercel: {
    CALCULOS_API_URL: "https://api.astrochat.online/calculos",
    // ...
  }
}
```

---

### **ADR-003: Por Qué PostgreSQL Managed en Railway**

**Contexto:**
Necesitamos persistencia de datos para usuarios, cartas natales, subscripciones.

**Decisión:**
PostgreSQL managed de Railway (no local).

**Consecuencias:**
- ✅ Backups automáticos
- ✅ Conexión interna rápida (<1ms latency)
- ✅ SSL out of the box
- ⚠️ Costo adicional ~$10/mes
- ⚠️ Dependencia de Railway para DB

**Alternativas Consideradas:**
- Supabase: Rechazado por complejidad de setup
- PlanetScale: Rechazado por costo

---

### **ADR-004: Por Qué Railway First (No Vercel Directo)**

**Contexto:**
Necesitamos hospedar 6 servicios (5 FastAPI + 1 Next.js).

**Decisión:**
Comenzar con Railway para TODO.

**Consecuencias:**
- ✅ Setup simple (2-4 horas)
- ✅ Un solo dashboard
- ✅ Networking interno automático
- ✅ PostgreSQL incluido
- ⚠️ No hay CDN global (latencia internacional)
- ⚠️ Costos variables

**Plan de Migración:**
```
Fase 1 (Ahora): Railway TODO → $50-80/mes
Fase 2 (6 meses): Vercel (Frontend) + Railway (Backend) → $70-100/mes
Fase 3 (12+ meses): Vercel + VPS/AWS → $100-200/mes
```

---

### **ADR-005: Por Qué Subdominios en Lugar de Paths**

**Contexto:**
Necesitamos exponer APIs públicamente.

**Decisión:**
Usar subdominios (mvp.astrochat.online) en lugar de paths (/api/v1).

**Consecuencias:**
- ✅ CORS más simple
- ✅ Aislamiento de servicios
- ✅ Fácil migración a servidores separados
- ⚠️ Más configuración DNS

**Ejemplo:**
```
✅ Subdominios:
- mvp.astrochat.online (Frontend)
- api-calculos.astrochat.online
- api-interpretaciones.astrochat.online

❌ Paths:
- astrochat.online/api/calculos
- astrochat.online/api/interpretaciones
```

---

### **ADR-006: Por Qué Incluir Archivos .md en Deploy**

**Contexto:**
API de Interpretaciones necesita archivos .md para RAG (interpretaciones dracónicas/tropicales).

**Decisión:**
Incluir carpetas `src/services/data/draco/` y `src/services/data/tropical/` en deploy.

**Consecuencias:**
- ✅ Servicio autocontenido
- ✅ No depende de storage externo
- ⚠️ Aumenta tamaño del deploy (~50MB)
- ⚠️ Actualizar interpretaciones requiere redeploy

**Alternativas Consideradas:**
- S3/CloudStorage: Rechazado por complejidad y costo
- Database: Rechazado por performance (RAG necesita filesystem)

---

### **ADR-007: Por Qué GitHub como Source of Truth**

**Contexto:**
Todos los repositorios de Astrochat ya están en GitHub con sus respectivas réplicas actualizadas.

**Decisión:**
Usar GitHub como source of truth para Railway deployments, conectando directamente cada repositorio.

**Consecuencias:**
- ✅ Deploy automático con cada `git push`
- ✅ Rollback instantáneo a commits anteriores
- ✅ No requiere Railway CLI para deploys
- ✅ CI/CD automático incluido
- ✅ Preview environments por branch
- ✅ Historial completo de deployments
- ⚠️ Requiere disciplina con commits limpios
- ⚠️ Main branch debe estar siempre estable

**Implementación:**
```yaml
Railway Workflow:
1. Connect GitHub account a Railway (una vez)
2. For each service:
   - New Service → Deploy from GitHub
   - Select repository
   - Railway auto-detecta framework
   - Auto-deploy habilitado

Updates:
1. git push origin main
2. Railway detecta push automáticamente
3. Rebuild y redeploy (2-5 min)
4. Listo
```

**Ventajas sobre método manual:**
```
Setup inicial:
  - Sin GitHub: 2-4 horas
  - Con GitHub: 30-60 min

Deploy updates:
  - Sin GitHub: 15-30 min manual
  - Con GitHub: 2-5 min automático

Rollback:
  - Sin GitHub: 30-60 min
  - Con GitHub: 30 segundos (1 click)
```

---

### **ADR-008: Por Qué Email Services Duales (AWS SES + Resend)**

**Contexto:**
Necesitamos enviar emails de registro y recuperación de contraseña tanto en desarrollo local como en producción Railway.

**Decisión:**
Implementar lógica condicional que use AWS SES para desarrollo local y Resend para Railway producción.

**Consecuencias:**
- ✅ Desarrollo local funciona sin cambios (AWS SES)
- ✅ Producción Railway tiene emails operativos (Resend)
- ✅ Migration-ready sin código adicional
- ✅ Fallback seguro (no envía emails si no hay configuración)
- ⚠️ Requiere configuración de ambas APIs

**Implementación:**
```typescript
// Si tiene AWS configurado → usa AWS SES (desarrollo local)
if (process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY) {
  // AWS SES implementation
}

// Si tiene Resend configurado → usa Resend (Railway producción)
else if (process.env.RESEND_API_KEY) {
  // Resend implementation
}

// Si no hay ninguno → no envía emails pero no falla
else {
  console.log('No email service configured - skipping email')
}
```

**Variables de Entorno Requeridas:**
```bash
# Desarrollo Local (.env.local)
AWS_ACCESS_KEY_ID=your-aws-key
AWS_SECRET_ACCESS_KEY=your-aws-secret
AWS_REGION=us-east-1

# Railway Producción
RESEND_API_KEY=your-resend-key

# Común
FROM_EMAIL=noreply@astrochat.online
```

---

## 🤖 Prompts de Implementación para Cline

### **PROMPT-001: Preparación de Repositorios**

**Objetivo:** Verificar que cada repositorio está listo para Railway.

**Contexto:**
- 6 repositorios separados
- Cada uno debe ser deployable independientemente
- Variables de entorno deben estar documentadas

**Tareas para Cline:**

```markdown
Para cada repositorio FastAPI (5 repositorios):
1. Verificar que existe `requirements.txt`
2. Verificar que existe entrypoint claro (`main.py` o `app.py`)
3. Crear `.env.example` con todas las variables necesarias
4. Verificar que no hay secrets hardcodeados
5. Crear `railway.json` con configuración básica

Para el repositorio Frontend (sidebar-fastapi):
1. Verificar `package.json` y `package-lock.json`
2. Verificar que Prisma está configurado
3. Crear `.env.example` con:
   - DATABASE_URL
   - NEXTAUTH_SECRET
   - NEXTAUTH_URL
   - URLs de los 5 microservicios
4. Verificar `next.config.js` permite env vars en runtime

Resultado Esperado:
- Cada repo tiene documentación de variables
- Cada repo puede arrancar con `npm start` o `uvicorn`
- No hay errores de dependencias faltantes
```

**Validación:**
```bash
# Para cada servicio FastAPI
cd [servicio-api]
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
# Debería arrancar sin errores

# Para frontend
cd sidebar-fastapi
npm install
npm run dev
# Debería arrancar sin errores
```

---

## 📐 Diagramas de Arquitectura

### **Arquitectura Actual: Railway (En Progreso)**

```
┌─────────────────────────────────────────────────────────────────┐
│                    Railway Project: astrochat-mvp               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐         ┌──────────────────────┐     │
│  │   PostgreSQL DB      │◄────────┤   Frontend           │     │
│  │   (Managed)          │         │   Next.js            │     │
│  │   Port: 5432         │         │   Port: 3000         │     │
│  └──────────────────────┘         └──────┬───────────────┘     │
│           ▲                               │                     │
│           │                               │ HTTP/REST           │
│           │                      ┌────────┴────────┐            │
│           │                      │                 │            │
│           │              ┌───────▼──────┐  ┌──────▼─────┐      │
│           │              │ API Cálculos │  │ API Interp │      │
│           └──────────────┤ FastAPI      │  │ FastAPI    │      │
│                          │ ✅ DEPLOYED  │  │ ✅ DEPLOYED │      │
│                          │ Port: 8080   │  │ Port: 8080 │      │
│                          └──────────────┘  └────────────┘      │
│                                                                 │
│                          ┌───────────────┐  ┌─────────────┐    │
│                          │ API Calendario│  │ API Astro   │    │
│                          │ FastAPI       │  │ FastAPI     │    │
│                          │ Port: 8003    │  │ Port: 8004  │    │
│                          └───────────────┘  └─────────────┘    │
│                                                                 │
│                          ┌──────────────────────┐              │
│                          │ API Carta Electiva   │              │
│                          │ FastAPI              │              │
│                          │ Port: 8005           │              │
│                          └──────────────────────┘              │
│                                                                 │
│  Networking: Railway Internal URLs (privadas)                  │
│  SSL: Automático para dominios custom                          │
│  Backups: Automáticos (PostgreSQL)                             │
│                                                                 │
│  Costo Estimado: $50-80/mes                                    │
│  Latencia: 50-100ms (usuarios LATAM)                           │
└─────────────────────────────────────────────────────────────────┘

URLs de Acceso:
┌─────────────────────────────────────────────────────┐
│ Frontend: Pendiente                                 │
│ APIs Deployadas:                                    │
│ - Cálculos: https://calculo-carta-natal-api...     │
│ - Interpretaciones: https://astrointerpretador...  │
│ - Calendario: Pendiente                             │
│ - Astrogematría: Pendiente                          │
│ - Carta Electiva: Pendiente                         │
└─────────────────────────────────────────────────────┘
```

---

## ✅ Estado Actual del Deployment

```
╔═══════════════════════════════════════════════╣
║   🚀 DEPLOYMENT COMPLETADO - 5/6 SERVICIOS   ║
║                                               ║
║   ✅ 5/6 servicios deployados (83%)           ║
║   ✅ API Cálculos: PRODUCCIÓN ACTIVA         ║
║   ✅ API Interpretaciones: PRODUCCIÓN ACTIVA ║
║   ✅ API Calendario: PRODUCCIÓN ACTIVA       ║
║   ✅ API Astrogematría: PRODUCCIÓN ACTIVA    ║
║   ✅ API Carta Electiva: PRODUCCIÓN ACTIVA   ║
║   ⏳ 1 servicio pendiente (Frontend)          ║
║                                               ║
║   📚 TODOS LOS BACKENDS DEPLOYADOS           ║
║   ⚡ Próximo: Frontend (último paso)          ║
╚═══════════════════════════════════════════════╝
```

**Progreso:** 83% completo (5/6 servicios)
**Tiempo invertido:** ~6 horas (aprendizaje + 5 deploys)
**Tiempo estimado restante:** ~30-45 minutos (Frontend)

**Último deployment exitoso:** API Carta Electiva (10 Nov 2025)
- ✅ Servicio más complejo de todos con algoritmos SCC
- ✅ Background tasks con progreso real operativo
- ✅ Sistema de búsqueda electiva funcionando
- ✅ Timeout extendido (5 minutos) configurado correctamente

**Próxima acción:** Deployar Frontend (sidebar-fastapi) - ÚLTIMO SERVICIO

---

## 🎓 Aprendizajes Clave

### **Lecciones de Arquitectura**

1. **Polyrepo > Monorepo para microservicios independientes**
   - Deploy independiente es crucial
   - Versionado separado simplifica releases
   - Coordinación requiere disciplina

2. **Variables de entorno como única fuente de configuración**
   - Permite migration sin código
   - Strategy Pattern para múltiples ambientes
   - Documentar en .env.example siempre

3. **Health checks son críticos**
   - Railway los usa para saber si el servicio funciona
   - Deben ser rápidos (<100ms)
   - No deben depender de DB si es posible

4. **CORS debe configurarse correctamente desde día 1**
   - Frontend en un dominio, APIs en otro
   - Wildcard (*) es inseguro
   - Especificar origins exactos

### **Lecciones de Performance**

1. **Railway interno es más rápido que público**
   - Usar .railway.internal cuando sea posible
   - Networking interno: <1ms latency
   - Networking público: 50-100ms latency

2. **PostgreSQL managed vale la pena**
   - Backups automáticos
   - No preocuparse por updates
   - $10/mes es razonable

3. **CDN es necesario para audiencia global**
   - Railway no tiene CDN
   - Vercel sí (incluido)
   - Diferencia: 100ms vs 20ms para usuarios internacionales

### **Lecciones de Costos**

1. **Railway es excelente para MVP**
   - Setup rápido (2-4 horas)
   - Todo en un lugar
   - $50-80/mes es razonable

2. **Vercel para frontend es upgrade natural**
   - $0-20/mes
   - Performance superior
   - Migration simple (2 horas)

3. **VPS es para cuando escales mucho**
   - Control total
   - Costos predecibles
   - Requiere tiempo de DevOps

---

## 📚 Recursos Adicionales

### **Documentación del Proyecto**
- **RAILWAY_DEPLOYMENT_STRATEGY.md** - Guía completa de deploy
- **RAILWAY_LESSONS_LEARNED.md** - Experiencia real de deployments
- **RAILWAY_REPOS_STATUS.md** - Estado actual de repositorios
- **INSTRUCCIONES_ARRANQUE_COMPLETO.md** - Setup local
- **docs/current/MICROSERVICIOS_OVERVIEW.md** - Arquitectura

### **Documentación Oficial**
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [FastAPI Docs](https://fastapi.tiangolo.com)
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)

### **Herramientas Útiles**
- [Railway CLI](https://docs.railway.app/develop/cli)
- [Vercel CLI](https://vercel.com/docs/cli)
- [Docker Compose](https://docs.docker.com/compose/)
- [Nginx Config Generator](https://nginxconfig.io)

### **Comunidades**
- [Railway Discord](https://discord.gg/railway)
- [Vercel Discord](https://vercel.com/discord)
- [FastAPI Discord](https://discord.gg/fastapi)

---

## ✅ Conclusión

Este documento proporciona una estrategia completa para desplegar **Astrochat** en Railway con visión de futuro escalable.

**Key Takeaways:**

1. ✅ **ADRs documentan decisiones arquitectónicas** - Por qué, no solo cómo
2. ✅ **Prompts para Cline** - Contextualizados y ejecutables
3. ✅ **Arquitectura migration-ready** - Railway → Vercel → VPS
4. ✅ **Checklists de validación** - Pre, durante, post deploy
5. ✅ **Troubleshooting documentado** - Problemas comunes y soluciones

**Estado de Repositorios:**

✅ **5/6 servicios deployados exitosamente en Railway** (ver RAILWAY_REPOS_STATUS.md)
- API Cálculos: ✅ Producción activa
- API Interpretaciones RAG: ✅ Producción activa
- API Calendario Personal: ✅ Producción activa
- API Astrogematría: ✅ Producción activa
- API Carta Electiva: ✅ Producción activa
- Próximo: Frontend (último servicio)

**Próximos Pasos:**

1. ✅ ~~Deploy API Cálculos~~ (COMPLETADO - 3 horas)
2. ✅ ~~Deploy API Interpretaciones RAG~~ (COMPLETADO - 30 min)
3. ✅ ~~Deploy API Calendario~~ (COMPLETADO - 20 min)
4. ✅ ~~Deploy API Astrogematría~~ (COMPLETADO - 15 min)
5. ✅ ~~Deploy API Carta Electiva~~ (COMPLETADO - 25 min)
6. Deploy Frontend (30-45 min - último servicio)
7. Verificar integración completa

**Tiempo Estimado Restante:** ~45 minutos

**¡Buena suerte con el deploy!** 🚀

---

*Documento creado: Noviembre 2025*
*Última actualización: 10 de Noviembre 2025*
*Versión: 1.1 - 2/6 servicios deployados*
