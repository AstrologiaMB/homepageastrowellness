# Diagnostico de errores en Fly.io - Sesion 2026-03-02

## Apps en Fly.io (cuenta: cursos@mariablaquier.com)

| App | Estado | Ultimo deploy |
|-----|--------|---------------|
| astro-calendar-personal-fastapi | OK - Sin errores | Feb 23 |
| astrogematria-fastapi | OK - Sin errores | Feb 6 |
| astro-interpretador-rag-fastapi | OK - Sin errores | Feb 23 |
| calculo-carta-natal-api | OK - Sin errores | Reciente |
| carta-electiva-api | OK - Sin errores | Feb 6 |
| **homepageastrowellness** | **Con errores** | Reciente |

---

## Errores encontrados en homepageastrowellness

### Error 1: TypeError en rendering de homepage

**Log:**
```
⨯ [TypeError: Cannot read properties of undefined (reading 'q')] { digest: '2561038848' }
⨯ [TypeError: Cannot read properties of undefined (reading 'j')] { digest: '2582968704' }
error.message="could not complete HTTP request to instance: client error (SendRequest)" request.url="/"
[Error: aborted] { code: 'ECONNRESET' }
```

**Causa raiz:**
El health check de Fly.io apuntaba a `path = "/"`, lo que forzaba un render completo de la homepage con React SSR cada 15 segundos. La homepage tiene muchos componentes con framer-motion (`motion.div` con `whileInView`, `initial`, `animate`) que durante SSR pueden producir errores en el bundle minificado de React 19 (`react-dom-server.node.production.js`). Las propiedades `.q` y `.j` son nombres minificados internos de React.

**Componentes afectados (todos usan framer-motion):**
- HeroSection.tsx (25+ referencias a motion)
- ServicesSection.tsx
- TestimonialsSection.tsx
- WhyAstroSection.tsx
- HowItWorksSection.tsx
- CTASection.tsx
- NewsletterSection.tsx
- AboutSection.tsx

**Fix aplicado:**
- `fly.toml` linea 33: Cambiado `path = "/"` a `path = "/api/health"`
- Ya existia el endpoint `app/api/health/route.ts` que retorna un JSON simple

---

### Error 2: OAuth State cookie was missing (NextAuth + Google)

**Log:**
```
[next-auth][error][OAUTH_CALLBACK_ERROR]
State cookie was missing.
  providerId: 'google',
  message: 'State cookie was missing.'
```

**Causa raiz:**
Fly.io termina TLS en su edge proxy y reenvia HTTP internamente al container:

```
Browser --[HTTPS]--> Fly.io Edge Proxy --[HTTP]--> Container (port 3000)
```

NextAuth detecta `https://` en `NEXTAUTH_URL` y usa cookies con prefijo `__Secure-`. Solo el `sessionToken` tenia configuracion explicita en `auth-options.ts`. Las cookies de `state`, `csrfToken`, `pkceCodeVerifier` y `callbackUrl` usaban defaults de NextAuth que pueden ser inconsistentes detras del reverse proxy.

**Archivos relevantes:**
- `lib/auth-options.ts` - Configuracion principal de NextAuth
- `lib/auth-utils.ts` - Helper para configuracion de cookies
- `app/api/auth/[...nextauth]/route.ts` - Route handler

**Fix aplicado:**
- `lib/auth-utils.ts`: Agregadas definiciones explicitas para `stateCookie`, `csrfTokenCookie`, `pkceCodeVerifierCookie` y `callbackUrlCookie` con nombres y opciones consistentes
- `lib/auth-options.ts` linea 204-212: Registradas las 4 cookies en la configuracion de NextAuth

**Verificaciones pendientes:**
- Confirmar que `NEXTAUTH_URL` esta seteado como secret en Fly.io con `https://`
- Confirmar que `NEXTAUTH_SECRET` esta seteado como secret en Fly.io
- Verificar redirect URI en Google Cloud Console: `https://<dominio>/api/auth/callback/google`

```bash
fly secrets list -a homepageastrowellness
```

---

### Error 3: HeadersTimeoutError en /api/interpretar-eventos

**Log:**
```
❌ Error en procesamiento background para cmm0yr7qk000lo2i0p05nzfhl: TypeError: fetch failed
    at async A (.next/server/app/api/interpretar-eventos/route.js:1:6713)
  [cause]: [Error [HeadersTimeoutError]: Headers Timeout Error] {
    code: 'UND_ERR_HEADERS_TIMEOUT'
  }
```

**Causa raiz:**
El cliente generado (openapi-typescript-codegen) en `lib/api-clients/astro-interpreter/core/request.ts` hacia `fetch()` sin timeout explicito. Node.js usa `undici` con un timeout por defecto que es insuficiente cuando la LLM del interpretador tarda entre 30s y 180s en responder.

**Flujo:**
```
homepageastrowellness /api/interpretar-eventos
  -> getAstroInterpreterClient() (BASE: https://astro-interpretador-rag-fastapi.fly.dev)
  -> fetch POST /interpretar-eventos
  -> astro-interpretador-rag-fastapi procesa con LLM (30-180s)
  -> TIMEOUT antes de recibir headers
```

**Fix aplicado:**
- `lib/api-clients/astro-interpreter/core/request.ts` funcion `sendRequest`: Agregado timeout de 300,000ms (5 minutos) usando `setTimeout` + `controller.abort()` con cleanup via `clearTimeout` en bloque `finally`

**Nota:** No es necesario poner `min_machines_running = 1` en astro-interpretador-rag-fastapi. Si la LLM ya tarda 30-180s, unos segundos de cold start son despreciables con el timeout de 300s.

---

## Configuracion actual de fly.toml (post-fix)

```toml
app = 'homepageastrowellness'
primary_region = 'iad'

[http_service]
  internal_port = 3000
  force_https = true
  auto_stop_machines = 'off'
  auto_start_machines = true
  min_machines_running = 1       # Siempre hay 1 maquina corriendo (es el UI)

  [[http_service.checks]]
    interval = "15s"             # Health check cada 15 segundos
    timeout = "10s"
    grace_period = "45s"
    method = "GET"
    path = "/api/health"         # Apunta a endpoint ligero, no a "/"

[[vm]]
  memory = '1gb'
  cpu_kind = 'shared'
  cpus = 1
```

## Stack de homepageastrowellness

- Next.js 15.2.4 con App Router
- React 19
- Node 18 (en Docker: `node:18-slim`)
- NextAuth.js v4 (Google OAuth + Credentials)
- Prisma ORM + PostgreSQL (Neon)
- framer-motion 11.18.2
- Tailwind CSS + shadcn/ui
- Deployed en Fly.io (region: iad)

## Microservicios conectados

| Servicio | URL | Proposito |
|----------|-----|-----------|
| calculo-carta-natal-api | https://calculo-carta-natal-api.fly.dev | Cartas tropicales y draconicas |
| astro-interpretador-rag-fastapi | https://astro-interpretador-rag-fastapi.fly.dev | Interpretaciones AI (RAG + LLM) |
| astro-calendar-personal-fastapi | https://astro-calendar-personal-fastapi.fly.dev | Calendario personal, transitos |
| astrogematria-fastapi | https://astrogematria-fastapi.fly.dev | Calculos numerologicos |
| carta-electiva-api | https://carta-electiva-api.fly.dev | Cartas electivas |
