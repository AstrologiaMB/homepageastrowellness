# Protocolo de Pruebas de Producción (Smoke & Regression Testing)

Este documento detalla los pasos críticos para verificar la estabilidad, seguridad y funcionalidad de **Astrowellness** una vez desplegado en producción.

## ⚠️ Prerrequisitos
*   Acceso a una cuenta de usuario "Admin" (`info@astrochat.online`).
*   Acceso a una cuenta de usuario "Nuevo" (sin suscripciones).
*   Acceso al Dashboard de Stripe (Modo Live o Test, según corresponda).

---

## 1. Verificación de Infraestructura y Despliegue
Antes de probar la funcionalidad, verificar que los servicios estén "hablando" entre sí.

| ID | Prueba | Acción Esperada | Criterio de Éxito |
|----|--------|-----------------|-------------------|
| INF-01 | **Carga Inicial** | Entrar a la URL principal. | Carga rápida (<2s), sin errores en consola (F12). |
| INF-02 | **Health Check APIs** | Navegar a una ruta que consuma APIs (ej. Carta Natal). | No errores 500/503. Si falla, revisar variables `NEXT_PUBLIC_*_API_URL`. |

---

## 2. Autenticación y Sesión
Verificar que la "puerta de entrada" funciona.

| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| AUTH-01 | **Login Google** | Click "Iniciar Sesión" -> Google Auth. | Redirección exitosa al Dashboard. Nombre y Avatar visibles. |
| AUTH-02 | **Persistencia** | Cerrar tab, volver a abrir. | La sesión se mantiene iniciada. |
| AUTH-03 | **Logout** | Click en Avatar -> "Cerrar Sesión". | Redirección a Home. Al intentar entrar a `/dashboard` te manda a Login. |

---

## 3. Matriz de Acceso (RBAC) - Lo más crítico 🚨
Verificar que **Nadie tenga acceso a lo que no pagó**.

### Usuario GRATUITO
| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| SEC-01 | **Acceso Directo (Pago)** | Pegar URL `/cartas/tropica` en navegador. | **Redirección inmediata** a `/pricing` o landing (Layout Guard). |
| SEC-02 | **API Directa** | `curl` o Postman a `/api/cartas/tropical`. | **Error 401/403**. El backend rechaza la petición. |
| SEC-03 | **UI Bloqueada** | Intentar click en "Carta Trópica" en sidebar. | Link deshabilitado o redirige a venta. |

### Usuario BASE BUNDLE (Suscrito)
| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| SEC-04 | **Acceso Base** | Entrar a `/cartas/tropica`. | **Carga Correcta**. Se ve el formulario/gráfico. |
| SEC-05 | **Acceso Add-on (No comprado)** | Entrar a `/cartas/draconica`. | **Bloqueado**. Redirección a `/upgrade`. |
| SEC-06 | **Calendario Lunar** | Entrar a `/calendario/lunar`. | **Bloqueado**. Redirección a `/upgrade`. |

### Usuario FULL ACCESS (Base + Add-ons)
| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| SEC-07 | **Acceso Dracónica** | Entrar a `/cartas/draconica`. | **Carga Correcta**. |
| SEC-08 | **Acceso Calendario** | Entrar a `/calendario/lunar`. | **Carga Correcta**. |

---

## 4. Flujos de Compra (Stripe) 💳
**Nota:** En producción real, usa una tarjeta real y haz un reembolso inmediato, o usa códigos de descuento del 100% creados en Stripe.

| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| PAY-01 | **Compra Base Bundle** | Usuario Free -> `/pricing` -> Pagar. | 1. Redirección exitosa a Stripe Checkout.<br>2. Al volver, UI muestra "Premium".<br>3. Acceso inmediato a Carta Trópica. |
| PAY-02 | **Compra Add-on (UI Interna)** | Usuario Base -> `/upgrade` -> Agregar "Calendario Lunar". | 1. Feedback visual inmediato.<br>2. Acceso inmediato a `/calendario/lunar`. |
| PAY-03 | **Cancelación** | `/upgrade` -> Ir al Portal Stripe -> Cancelar Plan. | 1. El estado cambia a "Canceled" (pero activo hasta fin de periodo).<br>2. UI refleja fecha de expiración. |
| PAY-04 | **Compra Dracónica (Lifetime)** | `/upgrade` -> Comprar "Acceso Dracónico". | 1. Pago único.<br>2. En `/upgrade` botón dice "Ya adquirido".<br>3. Acceso permanente incluso si se cancela la suscripción base. |

---

## 5. Pruebas Funcionales Críticas (Smoke Tests)
Verificar que la "magia" astrológica funciona.

| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| FUN-01 | **Generar Carta Trópica** | Ir a Carta Trópica -> Ingresar datos nacimiento. | Se genera el SVG del mandala. Interpretaciones cargan. |
| FUN-02 | **Carta de Tránsito** | Ir a Tránsitos -> Seleccionar fecha futura. | El gráfico se actualiza. Los planetas cambian de posición. |
| FUN-03 | **Calendario Personal** | Ir a Calendario -> Ver mes actual. | Aparecen eventos. Click en evento muestra detalle. |
| FUN-04 | **Carta Electiva (Proxy)** | Ir a Carta Electiva -> Buscar fecha "Trabajo" -> 30 días. | Barra de progreso avanza (El proxy funciona). Resultados aparecen. |
| FUN-05 | **AstroGematría** | Ir a Astrogematría -> Ingresar Nombre. | Cálculo numérico correcto. Resultado visible. |

---

## 6. Panel de Administración y Growth
Para el usuario `info@astrochat.online`.

| ID | Prueba | Pasos | Resultado Esperado |
|----|--------|-------|--------------------|
| ADM-01 | **Visibilidad** | Entrar a `/admin/users`. | Lista de usuarios carga. Badges de estado correctos. |
| ADM-02 | **Exportación CSV** | Click "Descargar CSV (Marketing)". | Se descarga archivo. Abrir en Excel y verificar columnas "Has Base Bundle", "Has Draconic", etc. |
| ADM-03 | **Simulación Rol** | (Opcional) Cambiar estado de un usuario test a 'Premium'. | El usuario test gana acceso inmediato sin pagar (útil para soporte). |

---

## 7. Plan de Rollback (Si todo explota) 🔥
Si detectas un fallo crítico (ej. usuarios no pueden entrar, cobros erróneos):
1.  **En Coolify:** Revertir al "Commit Anterior" exitoso inmediatamente.
2.  **En Stripe:** Si hubo cobros erróneos, pausar suscripciones temporalmente desde el Dashboard.
