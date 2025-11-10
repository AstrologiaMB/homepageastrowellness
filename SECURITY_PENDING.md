# 🔒 Security Pending Actions - Astrochat

**Proyecto:** Astrochat Railway Deployment  
**Última actualización:** 7 Noviembre 2025, 20:06 ART  
**Status:** ⚠️ ITEMS PENDIENTES DE SEGURIDAD

---

## ⚠️ CRÍTICO - Antes de Producción con Usuarios Reales

### 1. CORS Configuration - API Cálculos ⚠️

```yaml
Status: 🔴 TEMPORAL WILDCARD ACTIVO (INSEGURO)
Prioridad: ALTA
API: calculo-carta-natal-api
File: /Users/apple/calculo-carta-natal-api/app.py
Línea: ~20-25 (CORS middleware configuration)
```

**Problema Actual:**
```python
# ❌ ACTUAL (línea ~22 en app.py):
origins = ["*"]  # Wildcard - cualquier sitio puede llamar la API
```

**Solución Requerida:**
```python
# ✅ CORRECTO:
import os
origins = os.getenv("CORS_ORIGINS", "").split(",")

# Y en Railway, configurar variable de entorno:
# CORS_ORIGINS=https://astrochat-frontend.up.railway.app,https://astrochat.online
```

**Trigger para cambiar:**
- ✅ Cuando frontend esté deployado en Railway
- ✅ Cuando tengas la URL del frontend
- ✅ Antes de tener usuarios reales
- ✅ Antes de manejar datos sensibles

**Riesgos si no se cambia:**
- Cualquier sitio web puede hacer requests a tu API
- Posible robo de datos de usuarios
- Ataques CSRF (Cross-Site Request Forgery)
- No hay control de acceso

**Documentación:**
- Ver: RAILWAY_LESSONS_LEARNED.md → "Pro Tips" → "CORS Gradual"
- Ver: RAILWAY_DEPLOYMENT_STRATEGY.md → "PROMPT-003: Networking"

---

### 2. CORS Configuration - API Interpretaciones ⚠️

```yaml
Status: 🟡 PENDIENTE DE DEPLOYMENT
Prioridad: ALTA (aplicar desde inicio)
API: astro_interpretador_rag_fastapi
File: Por definir al deployar
```

**Acción:**
- Al deployar esta API, NO usar wildcard desde el inicio
- Usar configuración environment-aware desde día 1
- Aprender de la experiencia de API Cálculos

---

### 3. CORS Configuration - Todas las APIs Restantes

```yaml
Status: 🟡 PENDIENTE
APIs:
  - astro-calendar-personal-fastapi
  - astrogematria_fastapi
  - carta-electiva-api
```

**Checklist al deployar cada una:**
- [ ] Configurar CORS con environment variable desde inicio
- [ ] NO usar wildcard en producción
- [ ] Probar con URLs específicas

---

## 📋 Checklist de Seguridad Post-Deployment

Una vez que TODAS las APIs estén deployadas:

### Validación CORS
- [ ] API Cálculos: CORS específico (no wildcard)
- [ ] API Interpretaciones: CORS específico
- [ ] API Calendario: CORS específico
- [ ] API Astrogematría: CORS específico
- [ ] API Carta Electiva: CORS específico
- [ ] Frontend puede llamar a todas las APIs
- [ ] Ningún otro dominio puede llamar a las APIs

### Variables de Entorno Sensibles
- [ ] OPENAI_API_KEY: No está en código
- [ ] DATABASE_URL: No está en código
- [ ] NEXTAUTH_SECRET: Generada con openssl
- [ ] Ningún secret commiteado en GitHub

### HTTPS/SSL
- [ ] Todas las URLs usan HTTPS
- [ ] No hay mixed content warnings
- [ ] Certificados válidos en todos los servicios

---

## 🎯 Cómo Usar Este Documento

### Revisión Regular:
1. **Después de cada deployment:** Verificar items relevantes
2. **Antes de go-live con usuarios:** Validar TODO esté ✅
3. **Mensualmente:** Review de seguridad general

### Al Completar Un Item:
1. Marcar con ✅ en el checklist
2. Mover a sección "Completado" (abajo)
3. Documentar fecha y cambios realizados

### Agregar Nuevos Items:
- Si encuentras algo más que necesite atención
- Agrégalo aquí con mismo formato
- Prioridad: CRÍTICO / ALTA / MEDIA / BAJA

---

## ✅ Items Completados

### Ninguno aún

*Los items completados se moverán aquí con fecha y detalles*

---

## 📞 Referencias y Ayuda

### Documentación del Proyecto:
- **RAILWAY_LESSONS_LEARNED.md** - Experiencia real de deployment
- **RAILWAY_DEPLOYMENT_STRATEGY.md** - Guía completa
- **RAILWAY_REPOS_STATUS.md** - Status de deployments

### Recursos Externos:
- [OWASP CORS Guide](https://owasp.org/www-community/attacks/csrf)
- [FastAPI Security](https://fastapi.tiangolo.com/tutorial/security/)
- [Railway Security Best Practices](https://docs.railway.app/deploy/security)

---

## 🚨 Severity Levels

```yaml
🔴 CRÍTICO:
  - Wildcard CORS en producción con usuarios
  - Secrets expuestos en código
  - No HTTPS

🟠 ALTA:
  - CORS no configurado correctamente
  - Variables de entorno faltantes
  - Logs mostrando información sensible

🟡 MEDIA:
  - Rate limiting no configurado
  - No monitoring de seguridad

🟢 BAJA:
  - Mejoras de performance
  - Optimizaciones menores
```

---

**Última revisión:** 7 Nov 2025, 20:06 ART  
**Próxima revisión recomendada:** Después de deployar API Interpretaciones  
**Responsable:** Equipo de desarrollo

---

*"Security is not a product, but a process." - Bruce Schneier*

**Recuerda:** Este documento es tu aliado. Revísalo regularmente y mantén la seguridad de tus usuarios como prioridad #1.
