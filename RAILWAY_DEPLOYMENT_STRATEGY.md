# 🚂 Railway Deployment Strategy - Astrochat

**Proyecto:** Astrochat  
**Versión:** 1.0  
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
├── API Cálculos (calculo-carta-natal-api) - FastAPI
├── API Interpretaciones (astro_interpretador_rag_fastapi) - FastAPI
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
  - calculo-carta-natal-api
  - astro_interpretador_rag_fastapi
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

### **PROMPT-002: Configuración de Variables de Entorno**

**Objetivo:** Estandarizar variables de entorno entre todos los servicios.

**Contexto:**
- Frontend necesita URLs de 5 APIs
- APIs necesitan DATABASE_URL (algunas)
- API Interpretaciones necesita OPENAI_API_KEY
- Networking interno de Railway usa variables especiales

**Tareas para Cline:**

```markdown
1. En sidebar-fastapi/.env.example, crear template:
```env
# Database
DATABASE_URL=postgresql://user:password@host:5432/astrochat

# Auth
NEXTAUTH_SECRET=cambiar-esto-en-produccion
NEXTAUTH_URL=http://localhost:3000

# APIs (Railway internal URLs)
NEXT_PUBLIC_CALCULOS_API_URL=http://localhost:8001
NEXT_PUBLIC_INTERPRETACIONES_API_URL=http://localhost:8002
NEXT_PUBLIC_CALENDARIO_API_URL=http://localhost:8003
NEXT_PUBLIC_ASTROGEMATRIA_API_URL=http://localhost:8004
NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=http://localhost:8005
```

2. En calculo-carta-natal-api/.env.example:
```env
PORT=8001
DATABASE_URL=postgresql://user:password@host:5432/astrochat
CORS_ORIGINS=["http://localhost:3000"]
```

3. En astro_interpretador_rag_fastapi/.env.example:
```env
PORT=8002
OPENAI_API_KEY=sk-xxx
CORS_ORIGINS=["http://localhost:3000"]
```

4. En astro-calendar-personal-fastapi/.env.example:
```env
PORT=8003
DATABASE_URL=postgresql://user:password@host:5432/astrochat
CORS_ORIGINS=["http://localhost:3000"]
```

5. En astrogematria_fastapi/.env.example:
```env
PORT=8004
CORS_ORIGINS=["http://localhost:3000"]
```

6. En carta-electiva-api/.env.example:
```env
PORT=8005
CORS_ORIGINS=["http://localhost:3000"]
```

7. Crear archivo compartido: `ENV_NAMING_CONVENTION.md`
- Documentar convención de nombres
- Explicar diferencia entre local/railway/vercel
```

**Validación:**
- Cada repo tiene .env.example completo
- Ningún repo tiene .env commiteado
- Nomenclatura es consistente

---

### **PROMPT-003: Networking y Service Discovery**

**Objetivo:** Configurar comunicación entre servicios en Railway.

**Contexto:**
- Railway asigna URLs internas automáticamente
- Frontend debe llamar a las 5 APIs
- APIs NO se llaman entre sí (arquitectura actual)

**Tareas para Cline:**

```markdown
1. Documentar en cada API su endpoint de health:
- En calculo-carta-natal-api/main.py:
```python
@app.get("/health")
async def health():
    return {"status": "healthy", "service": "calculos"}
```

2. En frontend, crear utility para API URLs:
```typescript
// lib/api-config.ts
export const API_URLS = {
  calculos: process.env.NEXT_PUBLIC_CALCULOS_API_URL || 'http://localhost:8001',
  interpretaciones: process.env.NEXT_PUBLIC_INTERPRETACIONES_API_URL || 'http://localhost:8002',
  calendario: process.env.NEXT_PUBLIC_CALENDARIO_API_URL || 'http://localhost:8003',
  astrogematria: process.env.NEXT_PUBLIC_ASTROGEMATRIA_API_URL || 'http://localhost:8004',
  cartaElectiva: process.env.NEXT_PUBLIC_CARTA_ELECTIVA_API_URL || 'http://localhost:8005',
}
```

3. En cada API, configurar CORS correctamente:
```python
from fastapi.middleware.cors import CORSMiddleware
import os

origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

4. Crear script de verificación de health:
```bash
#!/bin/bash
# health-check.sh
services=(
  "http://localhost:8001/health"
  "http://localhost:8002/health"
  "http://localhost:8003/health"
  "http://localhost:8004/health"
  "http://localhost:8005/health"
)

for service in "${services[@]}"; do
  curl -f $service || echo "❌ $service failed"
done
```
```

**Validación:**
```bash
# Arrancar todos los servicios localmente
./start_services.sh

# Verificar health
bash health-check.sh
# Todos deberían responder 200 OK

# Verificar frontend puede llamar APIs
curl http://localhost:3000/api/cartas/tropical
# Debería proxy correctamente a API de cálculos
```

---

### **PROMPT-004: Database Setup con Prisma**

**Objetivo:** Configurar PostgreSQL y Prisma para producción.

**Contexto:**
- Prisma ORM maneja schema
- Necesitamos migrations automáticas
- Railway provee DATABASE_URL automáticamente

**Tareas para Cline:**

```markdown
1. En sidebar-fastapi/prisma/schema.prisma:
- Verificar que todos los modelos estén definidos
- Verificar relaciones entre User, Subscription, etc.

2. Crear script de migration para Railway:
```json
// package.json
{
  "scripts": {
    "build": "prisma generate && prisma migrate deploy && next build",
    "start": "next start",
    "prisma:generate": "prisma generate",
    "prisma:migrate": "prisma migrate deploy"
  }
}
```

3. Crear `.railway/railway.toml` en sidebar-fastapi:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
restartPolicyMaxRetries = 10
```

4. Documentar en README.md:
```markdown
## Database Setup

### Local
```bash
cp .env.example .env
# Configurar DATABASE_URL
npx prisma migrate dev
npx prisma generate
```

### Railway
- DATABASE_URL se configura automáticamente
- Migrations se ejecutan en build time
```
```

**Validación:**
```bash
# Local
npx prisma migrate status
# Debería mostrar "Database is up to date"

# Verificar que Prisma Client está generado
node -e "const { PrismaClient } = require('@prisma/client'); console.log('OK')"
```

---

### **PROMPT-005: Deployment Order y Dependencies**

**Objetivo:** Definir orden correcto de deploy para evitar errores de dependencia.

**Contexto:**
- PostgreSQL debe existir antes que servicios que lo usan
- Frontend depende de que APIs estén disponibles
- APIs son independientes entre sí

**Tareas para Cline:**

```markdown
Documentar orden de deploy en DEPLOYMENT_ORDER.md:

## Orden de Deploy (Crítico)

### Fase 1: Infraestructura Base
1. PostgreSQL Database
   - Railway lo crea automáticamente
   - Obtener DATABASE_URL
   - Esperar a que esté "healthy"

### Fase 2: APIs Core (pueden deployarse en paralelo)
2. API Cálculos (calculo-carta-natal-api)
   - Necesita: DATABASE_URL
   - Puerto: 8001
   - Health: /health

3. API Interpretaciones (astro_interpretador_rag_fastapi)
   - Necesita: OPENAI_API_KEY
   - Puerto: 8002
   - Health: /health
   - **Importante:** Incluye carpeta src/services/data/

### Fase 3: APIs Secundarias (pueden deployarse en paralelo)
4. API Calendario (astro-calendar-personal-fastapi)
   - Necesita: DATABASE_URL
   - Puerto: 8003
   - Health: /health

5. API Astrogematría (astrogematria_fastapi)
   - No necesita DATABASE_URL
   - Puerto: 8004
   - Health: /health

6. API Carta Electiva (carta-electiva-api)
   - No necesita DATABASE_URL
   - Puerto: 8005
   - Health: /health

### Fase 4: Frontend (último)
7. Frontend (sidebar-fastapi)
   - Necesita: DATABASE_URL, URLs de todas las APIs
   - Puerto: 3000
   - Health: /api/health

## Validación del Orden

Después de cada deploy, verificar:
```bash
# API deployada
curl https://[service-url].railway.app/health

# Debe responder 200 con:
{"status": "healthy", "service": "[service-name]"}
```

Si algún servicio falla:
1. Verificar logs en Railway
2. Verificar variables de entorno
3. Verificar que dependencias previas están healthy
```

**Validación:**
- Documento DEPLOYMENT_ORDER.md creado
- Incluye comandos de verificación
- Explica por qué ese orden

---

### **PROMPT-006: Archivos de Datos para RAG**

**Objetivo:** Asegurar que archivos .md de interpretaciones se incluyen en deploy.

**Contexto:**
- API Interpretaciones usa LlamaIndex + RAG
- Necesita archivos .md en `src/services/data/draco/` y `src/services/data/tropical/`
- Railway debe incluir estos archivos en el build

**Tareas para Cline:**

```markdown
1. En astro_interpretador_rag_fastapi/, verificar estructura:
```
astro_interpretador_rag_fastapi/
├── src/
│   └── services/
│       └── data/
│           ├── draco/          # ← Archivos .md dracónicos
│           └── tropical/       # ← Archivos .md tropicales
├── main.py
└── requirements.txt
```

2. Crear `.railwayignore` (si no existe):
```
# NO ignorar src/services/data/
# Railway por defecto ignora algunos archivos grandes
# Asegurar que .md se incluyen

__pycache__/
*.pyc
.env
.venv/
venv/
tests/
*.test.py
```

3. Verificar en main.py que paths son relativos:
```python
import os
from pathlib import Path

# ✅ CORRECTO - Path relativo
BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "src" / "services" / "data"

# ❌ INCORRECTO - Path absoluto
# DATA_DIR = "/Users/apple/astro_interpretador_rag_fastapi/src/services/data"
```

4. Crear script de verificación:
```python
# verify_data_files.py
from pathlib import Path

DATA_DIR = Path(__file__).parent / "src" / "services" / "data"
DRACO_DIR = DATA_DIR / "draco"
TROPICAL_DIR = DATA_DIR / "tropical"

assert DRACO_DIR.exists(), "❌ Carpeta draco/ no encontrada"
assert TROPICAL_DIR.exists(), "❌ Carpeta tropical/ no encontrada"

draco_files = list(DRACO_DIR.glob("*.md"))
tropical_files = list(TROPICAL_DIR.glob("*.md"))

print(f"✅ Encontrados {len(draco_files)} archivos en draco/")
print(f"✅ Encontrados {len(tropical_files)} archivos en tropical/")

assert len(draco_files) > 0, "❌ No hay archivos .md en draco/"
assert len(tropical_files) > 0, "❌ No hay archivos .md en tropical/"

print("✅ Todos los archivos de datos están presentes")
```
```

**Validación:**
```bash
# Local
cd astro_interpretador_rag_fastapi
python verify_data_files.py
# Debería pasar sin errores

# Después de deploy en Railway
curl https://interpretaciones.railway.app/test-data-files
# Endpoint custom para verificar archivos
```

---

### **PROMPT-007: Integración con GitHub**

**Objetivo:** Conectar todos los repositorios de GitHub a Railway para deploy automático.

**Contexto:**
- Todos los 6 repos ya están en GitHub
- Railway soporta deploy directo desde GitHub
- Esto habilita CI/CD automático
- No requiere Railway CLI

**Tareas para Cline:**

```markdown
## Pre-requisitos

Para cada repositorio en GitHub, verificar:
1. Branch principal ('main' o 'master') está actualizado
2. .gitignore está configurado correctamente:
```gitignore
# Archivos locales
.env
.env.local

# Node.js
node_modules/
.next/
dist/
build/

# Python
__pycache__/
*.pyc
.venv/
venv/
.pytest_cache/

# IDEs
.vscode/
.idea/
*.swp

# OS
.DS_Store
Thumbs.db
```

3. Secrets NO están commiteados:
```bash
# Verificar en cada repo
git grep -i "api_key\|password\|secret" -- ':!*.example' ':!*.md'
# No debería retornar nada sensible
```

## Configuración en Railway

### Paso 1: Conectar GitHub Account (una vez)
```markdown
1. Ir a railway.app
2. Sign up / Login
3. Settings → GitHub → Connect
4. Autorizar Railway en GitHub
5. Seleccionar repositorios o dar acceso a todos
```

### Paso 2: Deploy Cada Servicio

**Para PostgreSQL Database:**
```markdown
1. Railway → New Project → Provision PostgreSQL
2. Obtener DATABASE_URL (copiar para otros servicios)
3. Esperar a que esté healthy (verde)
```

**Para cada API (5 servicios FastAPI):**
```markdown
1. Railway → New Service
2. "Deploy from GitHub repo"
3. Seleccionar repo (ej: calculo-carta-natal-api)
4. Railway auto-detecta Python
5. Configurar variables de entorno:
   - PORT: [8001-8005 según servicio]
   - DATABASE_URL: [si aplica]
   - OPENAI_API_KEY: [si aplica - solo interpretaciones]
   - CORS_ORIGINS: [URL del frontend]
6. Deploy automático inicia
7. Verificar logs
8. Health check: /health debe responder 200
```

**Para Frontend (Next.js):**
```markdown
1. Railway → New Service
2. "Deploy from GitHub repo"
3. Seleccionar repo: sidebar-fastapi
4. Railway auto-detecta Next.js
5. Configurar variables de entorno:
   - DATABASE_URL: [de PostgreSQL]
   - NEXTAUTH_SECRET: [generar con: openssl rand -base64 32]
   - NEXTAUTH_URL: [URL de Railway asignada]
   - NEXT_PUBLIC_CALCULOS_API_URL: [URL del servicio]
   - NEXT_PUBLIC_INTERPRETACIONES_API_URL: [URL del servicio]
   - NEXT_PUBLIC_CALENDARIO_API_URL: [URL del servicio]
   - NEXT_PUBLIC_ASTROGEMATRIA_API_URL: [URL del servicio]
   - NEXT_PUBLIC_CARTA_ELECTIVA_API_URL: [URL del servicio]
6. Build command: `prisma generate && prisma migrate deploy && next build`
7. Deploy automático inicia
```

### Paso 3: Configurar Auto-Deploy

Para cada servicio:
```markdown
1. Railway Service → Settings
2. "Source" tab
3. Verificar que "Auto-Deploy" está ENABLED
4. Branch: main (o master)
5. Save

Ahora, cada git push a main triggerea deploy automático
```

## Workflow Post-Setup

### Deploy Updates (día a día)
```bash
# En cualquier repo
git add .
git commit -m "Update: [descripción]"
git push origin main

# Railway detecta push automáticamente
# Build y deploy en 2-5 minutos
# Verificar en Railway dashboard
```

### Rollback (si es necesario)
```markdown
1. Railway → Service → Deployments
2. Ver historial de deployments
3. Click en deployment previo
4. "Rollback to this deployment"
5. Listo en 30 segundos
```

### Preview Deployments (para testing)
```bash
# Crear branch de feature
git checkout -b feature/nueva-funcionalidad
# Hacer cambios
git push origin feature/nueva-funcionalidad

# Railway automáticamente crea preview deployment
# URL: https://feature-nueva-funcionalidad-[service].railway.app
# Probar sin afectar producción
# Merge a main cuando esté listo
```

## Checklist de Verificación

Después de setup completo:
- [ ] Todos los 6 servicios conectados a GitHub
- [ ] Auto-deploy habilitado en todos
- [ ] Variables de entorno configuradas
- [ ] Health checks responden en todos los servicios
- [ ] Frontend puede llamar a todas las APIs
- [ ] Test deployment: hacer un cambio menor, push, verificar auto-deploy

## Documentar URLs

Crear archivo: RAILWAY_SERVICES_URLS.md (para referencia del equipo)
```markdown
# URLs de Servicios en Railway

## Production
- Frontend: https://astrochat-frontend.up.railway.app
- API Cálculos: https://astrochat-calculos.up.railway.app
- API Interpretaciones: https://astrochat-interpretaciones.up.railway.app
- API Calendario: https://astrochat-calendario.up.railway.app
- API Astrogematría: https://astrochat-astrogematria.up.railway.app
- API Carta Electiva: https://astrochat-electiva.up.railway.app
- Database: [Internal URL - no exponer]

## Auto-Deploy
- Branch: main
- Trigger: git push origin main
- Build time: ~3-5 min
- Health checks: /health en cada servicio
```
```

**Resultado Esperado:**
- 6 servicios deployados y conectados a GitHub
- Cada push a main triggerea deploy automático
- Rollback disponible en 1 click
- Preview environments por branch

**Ventajas Obtenidas:**
```yaml
Antes (manual):
  - Deploy: 15-30 min por servicio
  - Rollback: 30-60 min
  - Testing: Difícil sin staging

Después (GitHub):
  - Deploy: 2-5 min automático
  - Rollback: 30 segundos
  - Testing: Preview environments gratis
```

---

## 📐 Diagramas de Arquitectura

### **Arquitectura Actual: Railway (Todo en Uno)**

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
│                          │ Port: 8001   │  │ Port: 8002 │      │
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
│ Frontend: https://astrochat.up.railway.app         │
│           https://mvp.astrochat.online (custom)     │
│                                                     │
│ APIs: Internas (no expuestas públicamente)         │
│ - calculos-api.railway.internal                    │
│ - interpretaciones-api.railway.internal            │
│ - etc.                                              │
└─────────────────────────────────────────────────────┘
```

### **Arquitectura Futura: Vercel Hybrid (Escalable)**

```
┌──────────────────────────────┐         ┌─────────────────────────┐
│       Vercel Edge            │         │      Railway            │
│                              │         │                         │
│  ┌────────────────────────┐  │         │  ┌──────────────────┐  │
│  │   Frontend Next.js     │  │  HTTPS  │  │  API Gateway     │  │
│  │   CDN Global           │──┼────────▶│  │  (Nginx/Caddy)   │  │
│  │   <50ms latency        │  │         │  └────────┬─────────┘  │
│  │   Port: 3000           │  │         │           │            │
│  └────────────────────────┘  │         │     ┌─────▼──────┐     │
│                              │         │     │ 5 FastAPI  │     │
│  Edge Functions:             │         │     │ Services   │     │
│  - Caching                   │         │     └────────────┘     │
│  - Image Optimization        │         │                        │
│  - Geo-routing               │         │     ┌──────────────┐   │
│                              │         │     │ PostgreSQL   │   │
│  Costo: $20/mes             │         │     │ (Managed)    │   │
└──────────────────────────────┘         │     └──────────────┘   │
                                         │                        │
                                         │  Costo: $50-80/mes     │
                                         └─────────────────────────┘

Cambios Necesarios:
┌──────────────────────────────────────────────────┐
│ 1. Update NEXTAUTH_URL in Vercel                │
│ 2. Configure CORS in APIs (allow Vercel domain) │
│ 3. Update API URLs in Vercel env vars           │
│ 4. DNS: astrochat.online → Vercel               │
│                                                  │
│ Tiempo estimado: 2 horas                        │
│ Downtime: 0 minutos (blue-green deployment)     │
└──────────────────────────────────────────────────┘
```

### **Migration Path: Railway → Vercel → VPS**

```
Phase 1: MVP (0-6 meses)
┌──────────────────┐
│  Railway TODO    │  $50-80/mes
│  7 servicios     │  Setup: 2-4 horas
└──────────────────┘

           ↓ (Migración gradual)

Phase 2: Hybrid (6-12 meses)
┌─────────────┐      ┌────────────┐
│   Vercel    │ ──── │  Railway   │  $70-100/mes
│  Frontend   │      │  Backend   │  Migration: 2 horas
└─────────────┘      └────────────┘

           ↓ (Optimización)

Phase 3: Optimized (12+ meses)
┌─────────────┐      ┌────────────┐
│   Vercel    │ ──── │    VPS     │  $100-200/mes
│  Frontend   │      │  Backend   │  Migration: 1-2 días
│    + CDN    │      │ Kubernetes │
└─────────────┘      └────────────┘
```

---

## ✅ Checklists de Validación

### **Pre-Deploy Checklist**

Ejecutar ANTES de comenzar el deploy en Railway:

```markdown
## Repositorios (GitHub)
- [ ] Todos los repos están en GitHub y actualizados
- [ ] Branch principal ('main' o 'master') está limpio y sincronizado
- [ ] Todos los repos tienen requirements.txt/package.json actualizado
- [ ] Todos los repos tienen .env.example completo
- [ ] Ningún repo tiene .env o secrets commiteados
- [ ] Todos los repos tienen .gitignore correcto
- [ ] No hay conflictos de merge pendientes
- [ ] Último commit pasó sin errores localmente

## Configuración
- [ ] DATABASE_URL es variable de entorno (no hardcodeada)
- [ ] OPENAI_API_KEY está disponible
- [ ] NEXTAUTH_SECRET está generado (mínimo 32 caracteres)
- [ ] Todos los puertos están documentados

## Código
- [ ] Health checks implementados en todas las APIs
- [ ] CORS configurado correctamente en todas las APIs
- [ ] Prisma schema está actualizado
- [ ] No hay imports de rutas absolutas (solo relativos)

## Testing Local
- [ ] Todos los servicios arrancan localmente
- [ ] Frontend puede llamar a las 5 APIs
- [ ] Database migrations funcionan
- [ ] Tests básicos pasan
```

**Script de Verificación:**
```bash
#!/bin/bash
# pre-deploy-check.sh

echo "🔍 Verificando repositorios..."

# Verificar que no hay .env commiteados
if git grep -l "\.env" -- ':!*.example' ':!*.md'; then
    echo "❌ Se encontraron archivos .env commiteados"
    exit 1
fi

# Verificar requirements.txt en todos los servicios FastAPI
for service in calculo-carta-natal-api astro_interpretador_rag_fastapi astro-calendar-personal-fastapi astrogematria_fastapi carta-electiva-api; do
    if [ ! -f "../$service/requirements.txt" ]; then
        echo "❌ Falta requirements.txt en $service"
        exit 1
    fi
done

# Verificar package.json en frontend
if [ ! -f "package.json" ]; then
    echo "❌ Falta package.json en sidebar-fastapi"
    exit 1
fi

echo "✅ Todas las verificaciones pasaron"
```

---

### **Deploy Checklist**

Usar durante el proceso de deploy:

```markdown
## Fase 1: Database
- [ ] PostgreSQL creado en Railway
- [ ] DATABASE_URL obtenida y guardada
- [ ] Database está "healthy" (verde en Railway)

## Fase 2: Backend APIs
- [ ] API Cálculos desplegada y healthy
- [ ] API Interpretaciones desplegada y healthy
  - [ ] Archivos .md incluidos en deploy
  - [ ] OPENAI_API_KEY configurada
- [ ] API Calendario desplegada y healthy
- [ ] API Astrogematría desplegada y healthy
- [ ] API Carta Electiva desplegada y healthy

## Fase 3: Frontend
- [ ] Frontend desplegado y healthy
- [ ] DATABASE_URL configurada
- [ ] URLs de APIs configuradas
- [ ] NEXTAUTH_SECRET configurada
- [ ] NEXTAUTH_URL apunta a Railway URL
- [ ] Prisma migrations ejecutadas

## Fase 4: Verificación
- [ ] Todos los services están "healthy" en Railway
- [ ] Health checks responden 200
- [ ] Frontend carga correctamente
- [ ] Login/Register funcionan
- [ ] Carta Natal se genera correctamente
```

**Script de Verificación:**
```bash
#!/bin/bash
# deploy-verification.sh

SERVICES=(
    "calculos"
    "interpretaciones"
    "calendario"
    "astrogematria"
    "carta-electiva"
    "frontend"
)

echo "🔍 Verificando servicios desplegados..."

for service in "${SERVICES[@]}"; do
    URL="https://$service.up.railway.app/health"
    if curl -f -s $URL > /dev/null; then
        echo "✅ $service está healthy"
    else
        echo "❌ $service está DOWN"
        exit 1
    fi
done

echo "✅ Todos los servicios están operativos"
```

---

### **Post-Deploy Checklist**

Verificar después de completar el deploy:

```markdown
## Funcionalidad Básica
- [ ] Usuario puede registrarse
- [ ] Usuario puede hacer login
- [ ] Usuario puede generar carta natal
- [ ] Usuario puede ver interpretaciones
- [ ] Usuario puede ver calendario personal

## Performance
- [ ] Tiempo de carga < 3 segundos
- [ ] APIs responden en < 1 segundo
- [ ] No hay errores en console del browser

## Seguridad
- [ ] HTTPS funciona correctamente
- [ ] CORS permite solo el frontend
- [ ] No se exponen secrets en código
- [ ] Database está en red privada

## Monitoreo
- [ ] Logs están accesibles en Railway
- [ ] No hay errores críticos en logs
- [ ] Métricas de uso están registrándose
```

**Test Manual:**
```markdown
1. Abrir https://mvp.astrochat.online
2. Click en "Registrar"
3. Crear cuenta nueva
4. Login con cuenta creada
5. Ir a "Carta Natal"
6. Llenar formulario (nombre, fecha, lugar)
7. Click en "Generar Carta"
8. Verificar que carta se genera correctamente
9. Verificar interpretaciones se cargan
10. Verificar calendario personal muestra eventos

Si todos los pasos funcionan: ✅ Deploy exitoso
```

---

## 🔄 Migration Paths

### **Migración 1: Railway → Vercel (Frontend)**

**Objetivo:** Mover solo el frontend a Vercel para mejor performance global.

**Cuándo:** Cuando tengas 100+ usuarios activos o latencia internacional sea problema.

**Pasos:**

```markdown
## Pre-Migración
1. Verificar que Railway APIs están estables
2. Backup completo de DATABASE_URL
3. Documentar todas las variables de entorno del frontend

## Migración (2 horas)

### Paso 1: Crear Proyecto en Vercel
- Conectar GitHub repo: sidebar-fastapi
- Seleccionar framework: Next.js
- No deployar todavía

### Paso 2: Configurar Variables de Entorno
En Vercel, agregar:
```env
DATABASE_URL=[mismo de Railway]
NEXTAUTH_SECRET=[mismo de Railway]
NEXTAUTH_URL=https://astrochat.online
NEXT_PUBLIC_CALCULOS_API_URL=https://calculos.railway.internal
NEXT_PUBLIC_INTERPRETACIONES_API_URL=https://interpretaciones.railway.internal
NEXT_PUBLIC_CALENDARIO_API_URL=https://calendario.railway.internal
NEXT_PUBLIC_ASTROGEMATRIA_API_URL=https://astrogematria.railway.internal
NEXT_PUBLIC_CARTA_ELECTIVA_API_URL=https://carta-electiva.railway.internal
```

### Paso 3: Actualizar CORS en APIs
En cada API FastAPI, actualizar:
```python
origins = os.getenv("CORS_ORIGINS", "").split(",")
# Agregar dominio de Vercel
# Ejemplo: "https://astrochat.vercel.app,https://astrochat.online"
```

### Paso 4: Deploy en Vercel
- Click "Deploy" en Vercel
- Esperar build completo
- Verificar preview URL funciona

### Paso 5: DNS Switch
- En DNS provider (Namecheap, Cloudflare, etc.)
- Cambiar A record de astrochat.online
- De Railway IP → Vercel IP
- TTL: 300 segundos (5 min)
- Esperar propagación: 5-30 min

### Paso 6: Verificación
- Visitar astrochat.online
- Verificar SSL (candado verde)
- Probar flujo completo: Register → Login → Carta
- Verificar logs en Vercel y Railway

## Rollback Plan
Si algo falla:
1. DNS: Revertir A record a Railway IP
2. Esperar propagación (5-30 min)
3. Todo vuelve a funcionar

Tiempo total: 5-30 min
```

**Beneficios Post-Migración:**
```yaml
Performance:
  - Latencia global: 50-100ms → 20-50ms
  - CDN automático
  - Image optimization
  
Costo:
  - Vercel: $0-20/mes (hobby → pro)
  - Railway: $50-60/mes (solo backend)
  - Total: $50-80/mes (mismo que antes)

Escalabilidad:
  - Edge functions disponibles
  - Automatic scaling
  - 100 GB bandwidth/mes
```

---

### **Migración 2: Railway → VPS/AWS (Backend)**

**Objetivo:** Mover backend a infraestructura más controlable.

**Cuándo:** Cuando costs de Railway > $100/mes o necesites más control.

**Pasos:**

```markdown
## Pre-Migración
1. Contratar VPS (DigitalOcean, AWS EC2, etc.)
2. Setup Docker + Docker Compose
3. Configurar Nginx como reverse proxy
4. Setup PostgreSQL managed o self-hosted

## Migración (1-2 días)

### Paso 1: Preparar Dockerfile para cada API
```dockerfile
# Ejemplo: calculo-carta-natal-api/Dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8001"]
```

### Paso 2: Docker Compose
```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:16
    environment:
      POSTGRES_DB: astrochat
      POSTGRES_USER: ${DB_USER}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - astrochat-network

  api-calculos:
    build: ../calculo-carta-natal-api
    environment:
      DATABASE_URL: postgresql://${DB_USER}:${DB_PASSWORD}@postgres:5432/astrochat
      PORT: 8001
    ports:
      - "8001:8001"
    networks:
      - astrochat-network
    depends_on:
      - postgres

  # ... repetir para otras APIs

networks:
  astrochat-network:

volumes:
  postgres_data:
```

### Paso 3: Nginx Configuration
```nginx
# /etc/nginx/sites-available/astrochat
server {
    listen 80;
    server_name api.astrochat.online;

    location /calculos {
        proxy_pass http://localhost:8001;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    location /interpretaciones {
        proxy_pass http://localhost:8002;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }

    # ... repetir para otras APIs
}
```

### Paso 4: Deploy
```bash
# En VPS
git clone [repos]
docker-compose up -d
systemctl restart nginx
```

### Paso 5: DNS Update
- Actualizar A records de APIs
- De Railway IPs → VPS IP
- Esperar propagación

### Paso 6: Migración de Database
```bash
# Backup de Railway
pg_dump $RAILWAY_DATABASE_URL > backup.sql

# Restore en VPS
psql $VPS_DATABASE_URL < backup.sql
```
```

**Costos Comparativos:**
```yaml
Railway ($100/mes):
  - 7 servicios
  - PostgreSQL managed
  - Backups automáticos
  - SSL automático

VPS DigitalOcean ($60/mes):
  - Droplet: $40/mes (4GB RAM, 2 CPU)
  - PostgreSQL managed: $15/mes
  - SSL: Gratis (Let's Encrypt)
  - Total: $55/mes + tiempo de mantenimiento

AWS ($80/mes):
  - EC2 t3.medium: $35/mes
  - RDS PostgreSQL: $25/mes
  - Load Balancer: $20/mes
  - Total: $80/mes
```

---

## 🐛 Troubleshooting

### **Problema: Servicio no arranca en Railway**

**Síntomas:**
```
Railway logs:
"Application failed to respond"
"Health check failed"
Status: Red
```

**Diagnóstico:**
```bash
# Verificar variables de entorno
railway run env

# Verificar que PORT está configurado
echo $PORT

# Verificar que app escucha en 0.0.0.0 (no localhost)
# En main.py:
uvicorn.run(app, host="0.0.0.0", port=int(os.getenv("PORT", 8001)))
```

**Soluciones:**
1. **Puerto incorrecto:**
   ```python
   # ❌ INCORRECTO
   uvicorn.run(app, host="localhost", port=8001)
   
   # ✅ CORRECTO
   import os
   port = int(os.getenv("PORT", 8001))
   uvicorn.run(app, host="0.0.0.0", port=port)
   ```

2. **Dependencias faltantes:**
   ```bash
   # Verificar requirements.txt tiene todas las deps
   pip freeze > requirements-full.txt
   diff requirements.txt requirements-full.txt
   ```

3. **Timeout de health check:**
   ```python
   # Agregar endpoint de health más rápido
   @app.get("/health")
   async def health():
       return {"status": "ok"}  # Sin llamadas a DB
   ```

---

### **Problema: Frontend no puede llamar a APIs**

**Síntomas:**
```
Console del browser:
"CORS error"
"Network error"
"Failed to fetch"
```

**Diagnóstico:**
```bash
# Verificar URLs de APIs
console.log(process.env.NEXT_PUBLIC_CALCULOS_API_URL)

# Verificar CORS en API
curl -I https://calculos.railway.app/health
# Buscar header: Access-Control-Allow-Origin
```

**Soluciones:**
1. **CORS no configurado:**
   ```python
   # En cada API FastAPI
   from fastapi.middleware.cors import CORSMiddleware
   
   app.add_middleware(
       CORSMiddleware,
       allow_origins=["https://mvp.astrochat.online"],
       allow_credentials=True,
       allow_methods=["*"],
       allow_headers=["*"],
   )
   ```

2. **URL incorrecta:**
   ```typescript
   // Verificar en lib/api-config.ts
   export const API_URLS = {
     calculos: process.env.NEXT_PUBLIC_CALCULOS_API_URL || 'fallback',
   }
   
   // Verificar que variable está seteada en Railway
   ```

3. **Railway internal URL:**
   ```env
   # ❌ INCORRECTO (no accesible desde browser)
   NEXT_PUBLIC_CALCULOS_API_URL=http://calculos.railway.internal
   
   # ✅ CORRECTO (URL pública)
   NEXT_PUBLIC_CALCULOS_API_URL=https://calculos.up.railway.app
   ```

---

### **Problema: Database connection failed**

**Síntomas:**
```
API logs:
"psycopg2.OperationalError: could not connect to server"
"FATAL: password authentication failed"
```

**Diagnóstico:**
```bash
# Verificar DATABASE_URL
echo $DATABASE_URL

# Verificar formato
# Debe ser: postgresql://user:pass@host:5432/dbname

# Test de conexión
psql $DATABASE_URL -c "SELECT 1"
```

**Soluciones:**
1. **URL mal formateada:**
   ```env
   # ❌ INCORRECTO
   DATABASE_URL=postgres://...  # Usar postgresql://
   
   # ✅ CORRECTO
   DATABASE_URL=postgresql://user:pass@host:5432/dbname
   ```

2. **SSL requerido:**
   ```python
   # En conexión de Prisma/SQLAlchemy
   DATABASE_URL=postgresql://...?sslmode=require
   ```

3. **Railway internal URL:**
   ```env
   # Railway provee 2 URLs:
   # - Interna (más rápida): postgres.railway.internal
   # - Externa (desde fuera): region.railway.app
   
   # Usar interna para servicios dentro de Railway
   DATABASE_URL=postgresql://user:pass@postgres.railway.internal:5432/db
   ```

---

### **Problema: Archivos .md no encontrados (API Interpretaciones)**

**Síntomas:**
```
API logs:
"FileNotFoundError: [Errno 2] No such file or directory: '/app/src/services/data/draco/...'"
```

**Diagnóstico:**
```bash
# En Railway, abrir shell
railway run bash

# Verificar estructura
ls -la src/services/data/draco/
ls -la src/services/data/tropical/
```

**Soluciones:**
1. **Paths absolutos:**
   ```python
   # ❌ INCORRECTO
   DATA_DIR = "/Users/apple/astro_interpretador_rag_fastapi/src/services/data"
   
   # ✅ CORRECTO
   from pathlib import Path
   BASE_DIR = Path(__file__).parent
   DATA_DIR = BASE_DIR / "src" / "services" / "data"
   ```

2. **.gitignore bloquea archivos:**
   ```bash
   # Verificar .gitignore
   cat .gitignore
   
   # Asegurar que no ignora .md
   # Si existe *.md, removerlo
   ```

3. **.railwayignore bloquea archivos:**
   ```bash
   # Crear .railwayignore
   # NO incluir:
   # src/services/data/
   ```

---

### **Problema: Prisma migrations fallan en Railway**

**Síntomas:**
```
Build logs:
"Prisma migrate deploy failed"
"P3009: migrate.lock is missing"
```

**Diagnóstico:**
```bash
# Verificar prisma/migrations/
ls -la prisma/migrations/

# Verificar schema.prisma
cat prisma/schema.prisma
```

**Soluciones:**
1. **Migrations no commiteadas:**
   ```bash
   # Asegurar que prisma/migrations/ está en git
   git add prisma/migrations/
   git commit -m "Add migrations"
   git push
   ```

2. **Build command incorrecto:**
   ```json
   // package.json
   {
     "scripts": {
       "build": "prisma generate && prisma migrate deploy && next build"
     }
   }
   ```

3. **DATABASE_URL no disponible en build time:**
   ```toml
   # .railway/railway.toml
   [build]
   builder = "nixpacks"
   
   [deploy]
   startCommand = "npm start"
   
   # Asegurar que DATABASE_URL está en Environment Variables
   ```

---

### **Problema: Railway out of memory**

**Síntomas:**
```
Logs:
"JavaScript heap out of memory"
"Killed"
Status: Restarting constantemente
```

**Diagnóstico:**
```bash
# Verificar uso de memoria en Railway dashboard
# Metrics → Memory usage

# Si > 512MB constantemente, hay problema
```

**Soluciones:**
1. **Aumentar memoria de Node:**
   ```json
   // package.json
   {
     "scripts": {
       "start": "NODE_OPTIONS='--max-old-space-size=1024' next start"
     }
   }
   ```

2. **Optimizar imports:**
   ```typescript
   // ❌ INCORRECTO - Importa toda la librería
   import { Button } from '@/components/ui'
   
   // ✅ CORRECTO - Import específico
   import { Button } from '@/components/ui/button'
   ```

3. **Upgrade plan de Railway:**
   ```yaml
   Hobby: 512MB RAM → $5/mes/servicio
   Pro: 8GB RAM → $20/mes/servicio
   
   # Considerar upgrade si el servicio lo requiere
   ```

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

**Próximos Pasos:**

1. Ejecutar PROMPT-001: Preparar repositorios
2. Ejecutar PROMPT-002: Configurar variables de entorno
3. Ejecutar PROMPT-003: Networking y health checks
4. Ejecutar PROMPT-004: Database setup
5. Ejecutar PROMPT-005: Deploy en Railway
6. Verificar con checklists

**Tiempo Estimado Total:** 2-4 horas

**¡Buena suerte con el deploy!** 🚀

---

*Documento creado: Noviembre 2025*  
*Última actualización: Noviembre 2025*  
*Versión: 1.0*
