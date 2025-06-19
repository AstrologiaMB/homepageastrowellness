# 🚀 Microservicios Astrowellness - Overview Actualizado

**Estado**: Diciembre 2025 - Sistema Completo Funcionando

## 🎯 Arquitectura de Microservicios

### **Frontend Principal**
- **Next.js**: Puerto 3000
- **URL**: http://localhost:3000
- **Características**: Autenticación, UI/UX, API Gateway

### **Microservicios Backend**

| Servicio | Puerto | Función | Estado | Documentación |
|----------|--------|---------|--------|---------------|
| **Carta Natal** | 8001 | Cálculos de cartas natales | ✅ Funcionando | `INTEGRACION_FASTAPI.md` |
| **Interpretaciones** | 8002 | IA para interpretaciones | ✅ Funcionando | - |
| **Astrogematría** | 8003 | Cálculos numerológicos | ✅ Funcionando | - |
| **🆕 Calendario Personal** | 8004 | Eventos astrológicos | ✅ Funcionando | Ver proyecto principal |

## 🆕 Nuevo: Microservicio Calendario Personal (Puerto 8004)

### **Características Principales**
- **Tránsitos por Casas en Tiempo Real**: Estado actual de planetas lentos
- **Eventos Astrológicos Completos**: Tránsitos, luna progresada, profecciones, eclipses
- **Calculador V4 Optimizado**: ~20% más rápido con caching
- **Precisión Astronómica**: Swiss Ephemeris

### **Integración con Frontend**
- **Componente**: `calendario-personal.tsx`
- **Ruta**: `/calendario-personal`
- **API**: Comunicación directa con puerto 8004
- **Características UI**: Tarjeta especial para tránsitos por casas

### **Endpoints Principales**
```bash
# Cálculo dinámico (recomendado)
POST http://localhost:8004/calculate-personal-calendar-dynamic

# Health check
GET http://localhost:8004/health

# Documentación interactiva
GET http://localhost:8004/docs
```

### **Datos de Entrada**
```json
{
  "name": "Usuario",
  "birth_date": "1990-01-15",
  "birth_time": "14:30",
  "location": {
    "latitude": -34.6037,
    "longitude": -58.3816,
    "name": "Buenos Aires",
    "timezone": "America/Argentina/Buenos_Aires"
  },
  "year": 2025
}
```

### **Respuesta Típica**
- **~200+ eventos** calculados por año
- **Tiempo de cálculo**: 10-15 segundos
- **Tipos de eventos**: Aspectos, luna progresada, profecciones, eclipses, fases lunares, tránsitos por casas

## 🔧 Comandos de Inicio

### **Iniciar Todo el Sistema**
```bash
# Desde sidebar-fastapi
./quick_commands.sh start
```

### **Iniciar Servicios Individuales**

**Frontend:**
```bash
cd /Users/apple/sidebar-fastapi
npm run dev
```

**Carta Natal:**
```bash
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
python app.py
```

**Calendario Personal:**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh
```

## 🌐 URLs de Desarrollo

### **Frontend**
- **Principal**: http://localhost:3000
- **Login**: http://localhost:3000/login
- **Cartas**: http://localhost:3000/cartas/tropica
- **🆕 Calendario**: http://localhost:3000/calendario-personal

### **APIs y Documentación**
- **Carta Natal**: http://localhost:8001/docs
- **Interpretaciones**: http://localhost:8002/docs
- **Astrogematría**: http://localhost:8003/docs
- **🆕 Calendario**: http://localhost:8004/docs

### **Health Checks**
```bash
curl http://localhost:8001/health  # Carta Natal
curl http://localhost:8002/health  # Interpretaciones
curl http://localhost:8003/health  # Astrogematría
curl http://localhost:8004/health  # Calendario Personal
```

## 🔍 Verificación del Sistema

### **Comando Rápido**
```bash
# Ver todos los servicios activos
lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004
```

### **Estado Esperado**
```
node      12345 apple   TCP *:3000 (LISTEN)  # Next.js
python    12346 apple   TCP *:8001 (LISTEN)  # Carta Natal
python    12347 apple   TCP *:8002 (LISTEN)  # Interpretaciones
python    12348 apple   TCP *:8003 (LISTEN)  # Astrogematría
python    12349 apple   TCP *:8004 (LISTEN)  # Calendario Personal
```

## 🚨 Troubleshooting

### **Problemas Comunes**

**Puerto 8004 ocupado:**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # Maneja automáticamente puertos ocupados
```

**Error "No module named 'fastapi'" en calendario:**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # Configura automáticamente el entorno virtual
```

**Frontend no muestra tránsitos por casas:**
1. Verificar que el microservicio esté en puerto 8004
2. Comprobar datos natales completos en el perfil de usuario
3. Revisar consola del navegador para errores

### **Reinicio Completo**
```bash
# Matar todos los procesos
pkill -f "node.*next"
pkill -f "python.*app.py"

# Esperar y reiniciar
sleep 5
./quick_commands.sh start
```

## 📊 Rendimiento del Sistema

### **Tiempos de Respuesta Típicos**
- **Carta Natal**: 1-2 segundos
- **Interpretaciones**: 2-3 segundos
- **Astrogematría**: 1 segundo
- **🆕 Calendario Personal**: 10-15 segundos (año completo)

### **Recursos del Sistema**
- **Memoria**: <500MB total para todos los servicios
- **CPU**: Picos durante cálculos, luego estable
- **Disco**: Mínimo (sin base de datos pesada)

## 📚 Documentación Relacionada

### **Proyecto Principal (Calendario Personal)**
- **README.md**: Visión general completa
- **SETUP_GUIDE.md**: Instalación paso a paso
- **FEATURES.md**: Características detalladas
- **API_DOCUMENTATION.md**: Referencia completa de API

### **Proyecto Frontend (sidebar-fastapi)**
- **README_SERVICIOS.md**: Guía rápida de servicios
- **INTEGRACION_FASTAPI.md**: Integración de cartas natales
- **MICROSERVICIOS_OVERVIEW.md**: Este documento

## 🎯 Estado Actual (Diciembre 2025)

### ✅ **Completamente Funcional**
- **4 microservicios** ejecutándose correctamente
- **Frontend integrado** con todos los servicios
- **🆕 Tránsitos por casas** implementados y funcionando
- **Documentación actualizada** y organizada

### 🚀 **Próximos Pasos**
- Optimización de rendimiento entre servicios
- Implementación de rate limiting
- Monitoreo y logging centralizado
- Preparación para producción

---

**Última actualización**: Diciembre 2025  
**Servicios activos**: 4 microservicios + 1 frontend  
**Estado**: Sistema completo funcionando con nueva característica de tránsitos por casas
