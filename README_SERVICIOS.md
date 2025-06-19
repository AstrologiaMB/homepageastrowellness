# 🚀 Astrowellness - Guía Rápida de Servicios

## 📋 Comandos Esenciales

### **Verificar Estado**
```bash
./quick_commands.sh check
```

### **Iniciar Todos los Servicios**
```bash
./quick_commands.sh start
```

### **Reiniciar Todo**
```bash
./quick_commands.sh restart
```

### **Detener Todo**
```bash
./quick_commands.sh stop
```

## 🎯 Servicios y Puertos

| Servicio | Puerto | URL | Comando Manual |
|----------|--------|-----|----------------|
| **Next.js Frontend** | 3000 | http://localhost:3000 | `cd /Users/apple/sidebar-fastapi && npm run dev` |
| **FastAPI Carta Natal** | 8001 | http://localhost:8001/docs | `cd /Users/apple/calculo-carta-natal-api && source venv/bin/activate && python app.py` |
| **FastAPI Interpretaciones** | 8002 | http://localhost:8002/docs | `cd /Users/apple/astro_interpretador_rag_fastapi && source venv/bin/activate && python app.py` |
| **FastAPI Astrogematría** | 8003 | http://localhost:8003/docs | `cd /Users/apple/astrogematria_fastapi && source venv/bin/activate && python app.py` |
| **🆕 FastAPI Calendario Personal** | 8004 | http://localhost:8004/docs | `cd /Users/apple/astro-calendar-personal-fastapi && ./start_robust.sh` |

## 🔍 Verificación Rápida

```bash
# Ver qué servicios están corriendo
lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004

# Estado esperado cuando todo funciona:
# node      12345 apple   TCP *:3000 (LISTEN)
# python    12346 apple   TCP *:8001 (LISTEN)
# python    12347 apple   TCP *:8002 (LISTEN)
# python    12348 apple   TCP *:8003 (LISTEN)
# python    12349 apple   TCP *:8004 (LISTEN)
```

## 🌐 URLs Importantes

### **Frontend Principal**
- **Frontend:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Cartas Natales:** http://localhost:3000/cartas/tropica
- **🆕 Calendario Personal:** http://localhost:3000/calendario-personal

### **APIs y Documentación**
- **API Docs Carta Natal:** http://localhost:8001/docs
- **API Docs Interpretaciones:** http://localhost:8002/docs
- **API Docs Astrogematría:** http://localhost:8003/docs
- **🆕 API Docs Calendario Personal:** http://localhost:8004/docs

### **Health Checks**
- **Carta Natal:** http://localhost:8001/health
- **Interpretaciones:** http://localhost:8002/health
- **Astrogematría:** http://localhost:8003/health
- **🆕 Calendario Personal:** http://localhost:8004/health

## 🆕 Nuevo Servicio: Calendario Personal

### **Características**
- **Tránsitos por Casas en Tiempo Real**: Estado actual de planetas lentos
- **Eventos Astrológicos**: Tránsitos, luna progresada, profecciones, eclipses
- **Calculador V4**: Optimizado con caching (~20% más rápido)
- **Precisión**: Swiss Ephemeris para máxima exactitud

### **Inicio Recomendado**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh
```

### **Verificación**
```bash
curl http://localhost:8004/health
# Respuesta esperada: {"status":"healthy","timestamp":"...","version":"1.0.0"}
```

### **Prueba Completa**
```bash
curl -X POST http://localhost:8004/calculate-personal-calendar-dynamic \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "birth_date": "1990-01-15",
    "birth_time": "14:30",
    "location": {
      "latitude": -34.6037,
      "longitude": -58.3816,
      "name": "Buenos Aires",
      "timezone": "America/Argentina/Buenos_Aires"
    },
    "year": 2025
  }'
```

## 🚨 Solución de Problemas

### **Si nada funciona:**
```bash
./quick_commands.sh restart
```

### **Si un puerto está ocupado:**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000  # o :8001, :8002, :8003, :8004

# Matar proceso específico
kill -9 [PID]

# Para el calendario personal, usar el script robusto:
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # Maneja automáticamente puertos ocupados
```

### **Si faltan dependencias:**

**FastAPI Carta Natal:**
```bash
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
pip install -r requirements.txt
```

**FastAPI Calendario Personal:**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # Instala dependencias automáticamente
```

**Next.js:**
```bash
cd /Users/apple/sidebar-fastapi
npm install
```

### **Problemas Específicos del Calendario Personal**

**Error: "No module named 'fastapi'"**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # El script maneja el entorno virtual automáticamente
```

**Error: No aparecen tránsitos por casas**
1. Verificar que el microservicio esté ejecutándose en puerto 8004
2. Comprobar que los datos natales incluyan información de casas
3. Revisar la consola del navegador para errores

## 📁 Archivos de Monitoreo

- `SERVICIOS_MONITORING_GUIDE.md` - Guía completa
- `check_services.sh` - Verificar estado
- `start_services.sh` - Iniciar servicios
- `restart_services.sh` - Reiniciar todo
- `quick_commands.sh` - Comandos rápidos

## ⚡ Comandos de Emergencia

```bash
# Matar todo y reiniciar
pkill -f "node.*next" && pkill -f "python.*app.py" && sleep 5 && ./quick_commands.sh start

# Verificación completa
./quick_commands.sh check && ./quick_commands.sh health

# Reiniciar solo el calendario personal
cd /Users/apple/astro-calendar-personal-fastapi && pkill -f "python app.py" && ./start_robust.sh
```

## 📊 Rendimiento Esperado

### **Tiempos de Respuesta**
- **Carta Natal**: ~1-2 segundos
- **Interpretaciones**: ~2-3 segundos  
- **Astrogematría**: ~1 segundo
- **🆕 Calendario Personal**: ~10-15 segundos (año completo)

### **Eventos Típicos (Calendario Personal)**
- **Tránsitos**: ~150-180 eventos
- **Luna Progresada**: ~12 eventos
- **Profecciones**: 1 evento
- **Fases Lunares**: ~24 eventos
- **Eclipses**: ~4-6 eventos
- **🆕 Tránsitos por Casas**: 1 evento (estado actual)

---

**💡 Tip:** Usa `./quick_commands.sh` sin parámetros para ver todos los comandos disponibles.

**🆕 Nuevo en Diciembre 2025:** Sistema de calendario personal completamente funcional con tránsitos por casas en tiempo real.
