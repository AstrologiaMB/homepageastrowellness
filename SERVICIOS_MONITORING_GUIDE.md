# 🚀 Guía de Monitoreo y Arranque de Servicios - Astrowellness

## 📋 Índice
- [🎯 Arquitectura de Servicios](#-arquitectura-de-servicios)
- [🔍 Verificación Rápida de Estado](#-verificación-rápida-de-estado)
- [🚀 Arranque de Servicios](#-arranque-de-servicios)
- [📊 Scripts de Automatización](#-scripts-de-automatización)
- [🔧 Health Checks](#-health-checks)
- [🚨 Troubleshooting](#-troubleshooting)
- [📱 Verificación desde Navegador](#-verificación-desde-navegador)

---

## 🎯 Arquitectura de Servicios

### **Servicios Principales**
```
┌─────────────────────────────────────────────────────────────┐
│                    ASTROWELLNESS SERVICES                   │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌─────────────────┐    HTTP     ┌─────────────────────────┐ │
│  │   Frontend      │   Requests  │     API Gateway        │ │
│  │   Next.js       │◄───────────►│   sidebar-fastapi      │ │
│  │ localhost:3000  │             │   localhost:3000/api   │ │
│  └─────────────────┘             └─────────────────────────┘ │
│                                             │               │
│                                             │ HTTP          │
│                                             ▼               │
│                                  ┌─────────────────────────┐ │
│                                  │   Microservicio Python │ │
│                                  │   FastAPI Server       │ │
│                                  │   localhost:8001       │ │
│                                  └─────────────────────────┘ │
│                                             │               │
│                                             ▼               │
│                                  ┌─────────────────────────┐ │
│                                  │   Interpretaciones      │ │
│                                  │   FastAPI Server       │ │
│                                  │   localhost:8002       │ │
│                                  └─────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

### **Puertos y Servicios**
| Puerto | Servicio | Directorio | Comando |
|--------|----------|------------|---------|
| 3000 | Next.js Frontend | `/Users/apple/sidebar-fastapi` | `npm run dev` |
| 8001 | FastAPI Carta Natal | `/Users/apple/calculo-carta-natal-api` | `python app.py` |
| 8002 | FastAPI Interpretaciones | `/Users/apple/astro_interpretador_rag_fastapi` | `python app.py` |
| 27017 | MongoDB | Sistema | Automático |

---

## 🔍 Verificación Rápida de Estado

### **Comando Principal**
```bash
# Verificar todos los puertos de Astrowellness
lsof -i :3000 -i :8001 -i :8002
```

### **Verificación Individual**
```bash
# Next.js Frontend
lsof -i :3000

# FastAPI Carta Natal
lsof -i :8001

# FastAPI Interpretaciones
lsof -i :8002

# MongoDB (debe estar corriendo)
lsof -i :27017
```

### **Verificar Procesos**
```bash
# Ver procesos de Node.js
ps aux | grep node | grep -v grep

# Ver procesos de Python
ps aux | grep python | grep -v grep

# Ver procesos específicos del proyecto
ps aux | grep -E "(next|fastapi|uvicorn)" | grep -v grep
```

### **Interpretación de Resultados**

**✅ ESTADO CORRECTO:**
```
node      12345 apple  ... TCP *:3000 (LISTEN)
python    12346 apple  ... TCP *:8001 (LISTEN)  
python    12347 apple  ... TCP *:8002 (LISTEN)
```

**❌ SERVICIOS FALTANTES:**
Si no ves salida para algún puerto, ese servicio NO está corriendo.

---

## 🚀 Arranque de Servicios

### **Orden de Arranque Recomendado**
1. **MongoDB** (ya debe estar corriendo)
2. **FastAPI Carta Natal** (puerto 8001)
3. **FastAPI Interpretaciones** (puerto 8002) - opcional
4. **Next.js Frontend** (puerto 3000)

### **Terminal 1 - FastAPI Carta Natal**
```bash
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
python app.py
```

**Salida esperada:**
```
INFO:     Started server process [12346]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
```

### **Terminal 2 - FastAPI Interpretaciones** (Opcional)
```bash
cd /Users/apple/astro_interpretador_rag_fastapi
source venv/bin/activate
python app.py
```

### **Terminal 3 - Next.js Frontend**
```bash
cd /Users/apple/sidebar-fastapi
npm run dev
```

**Salida esperada:**
```
▲ Next.js 15.2.4
- Local:        http://localhost:3000
- Ready in 2.1s
```

### **Verificación Post-Arranque**
```bash
# Verificar que todos los servicios están corriendo
lsof -i :3000 -i :8001 -i :8002

# Debería mostrar 3 líneas (o 2 si no usas interpretaciones)
```

---

## 📊 Scripts de Automatización

### **Script de Verificación Completa**

Crear archivo `check_services.sh`:
```bash
#!/bin/bash
echo "🔍 Verificando servicios de Astrowellness..."
echo "================================================"

# Función para verificar puerto
check_port() {
    local port=$1
    local service=$2
    local url=$3
    
    if lsof -i :$port > /dev/null 2>&1; then
        echo "✅ $service corriendo en puerto $port"
        if [ ! -z "$url" ]; then
            if curl -s "$url" > /dev/null 2>&1; then
                echo "   - Health check OK"
            else
                echo "   - ⚠️  Health check falló"
            fi
        fi
    else
        echo "❌ $service NO está corriendo en puerto $port"
    fi
}

# Verificar servicios
check_port 3000 "Next.js Frontend" "http://localhost:3000"
check_port 8001 "FastAPI Carta Natal" "http://localhost:8001/health"
check_port 8002 "FastAPI Interpretaciones" "http://localhost:8002/health"
check_port 27017 "MongoDB"

echo ""
echo "📊 Procesos activos del proyecto:"
ps aux | grep -E "(node.*next|python.*app\.py|uvicorn)" | grep -v grep | head -10

echo ""
echo "🌐 URLs de acceso:"
echo "   Frontend: http://localhost:3000"
echo "   API Docs Carta Natal: http://localhost:8001/docs"
echo "   API Docs Interpretaciones: http://localhost:8002/docs"
```

**Hacer ejecutable y usar:**
```bash
chmod +x check_services.sh
./check_services.sh
```

### **Script de Arranque Automático**

Crear archivo `start_services.sh`:
```bash
#!/bin/bash
echo "🚀 Iniciando servicios de Astrowellness..."

# Función para iniciar servicio en background
start_service() {
    local dir=$1
    local command=$2
    local service_name=$3
    local port=$4
    
    echo "Iniciando $service_name..."
    cd "$dir"
    
    # Verificar si ya está corriendo
    if lsof -i :$port > /dev/null 2>&1; then
        echo "⚠️  $service_name ya está corriendo en puerto $port"
        return
    fi
    
    # Iniciar servicio
    if [[ $command == *"venv"* ]]; then
        source venv/bin/activate && eval "${command#*&&}" &
    else
        eval "$command" &
    fi
    
    echo "✅ $service_name iniciado (PID: $!)"
    sleep 2
}

# Iniciar servicios
start_service "/Users/apple/calculo-carta-natal-api" "source venv/bin/activate && python app.py" "FastAPI Carta Natal" 8001
start_service "/Users/apple/astro_interpretador_rag_fastapi" "source venv/bin/activate && python app.py" "FastAPI Interpretaciones" 8002
start_service "/Users/apple/sidebar-fastapi" "npm run dev" "Next.js Frontend" 3000

echo ""
echo "⏳ Esperando que los servicios se inicialicen..."
sleep 5

echo ""
echo "🔍 Verificando estado final:"
./check_services.sh
```

**Hacer ejecutable y usar:**
```bash
chmod +x start_services.sh
./start_services.sh
```

---

## 🔧 Health Checks

### **URLs de Verificación**
```bash
# Frontend Next.js
curl http://localhost:3000

# FastAPI Carta Natal - Health Check
curl http://localhost:8001/health

# FastAPI Carta Natal - Documentación
curl http://localhost:8001/docs

# FastAPI Interpretaciones - Health Check
curl http://localhost:8002/health

# Test completo de carta natal
curl -X POST "http://localhost:8001/carta-natal/tropical" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "fecha_nacimiento": "1990-01-01", 
    "hora_nacimiento": "12:00",
    "ciudad_nacimiento": "Buenos Aires",
    "pais_nacimiento": "Argentina"
  }'
```

### **Respuestas Esperadas**

**Health Check FastAPI:**
```json
{
  "status": "healthy",
  "service": "Carta Natal API - Astrowellness",
  "version": "1.0.0",
  "timestamp": "2025-01-10T19:06:24.123456",
  "python_version": "3.11",
  "dependencies_ok": true
}
```

**Next.js Frontend:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Astrowellness</title>
    ...
```

---

## 🚨 Troubleshooting

### **Problemas Comunes**

#### **1. Puerto ya en uso**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000

# Matar proceso específico
kill -9 [PID]

# Matar todos los procesos en un puerto
kill -9 $(lsof -t -i:3000)
```

#### **2. Virtual Environment no activado**
```bash
# Verificar si venv está activo
which python

# Debería mostrar: /Users/apple/calculo-carta-natal-api/venv/bin/python

# Si no, activar:
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
```

#### **3. Dependencias faltantes**
```bash
# FastAPI
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
pip install -r requirements.txt

# Next.js
cd /Users/apple/sidebar-fastapi
npm install
```

#### **4. Base de datos Prisma**
```bash
cd /Users/apple/sidebar-fastapi
npx prisma generate
npx prisma migrate dev
```

#### **5. Error de CORS**
Verificar que FastAPI tenga configurado CORS para `http://localhost:3000`

#### **6. Servicios no responden**
```bash
# Reiniciar todos los servicios
pkill -f "node.*next"
pkill -f "python.*app.py"
pkill -f "uvicorn"

# Esperar 5 segundos y reiniciar
sleep 5
./start_services.sh
```

### **Comandos de Diagnóstico**

```bash
# Ver todos los procesos de Node y Python
ps aux | grep -E "(node|python)" | grep -v grep

# Ver conexiones de red activas
netstat -an | grep LISTEN | grep -E "(3000|8001|8002)"

# Ver logs de sistema (macOS)
log show --predicate 'process == "node"' --last 5m
log show --predicate 'process == "python"' --last 5m

# Verificar espacio en disco
df -h

# Verificar memoria
top -l 1 | grep PhysMem
```

### **Reinicio Completo**
```bash
# Script de reinicio completo
#!/bin/bash
echo "🔄 Reinicio completo de servicios..."

# Matar todos los procesos
pkill -f "node.*next"
pkill -f "python.*app.py" 
pkill -f "uvicorn"

# Limpiar puertos
kill -9 $(lsof -t -i:3000) 2>/dev/null
kill -9 $(lsof -t -i:8001) 2>/dev/null
kill -9 $(lsof -t -i:8002) 2>/dev/null

echo "⏳ Esperando limpieza..."
sleep 5

echo "🚀 Reiniciando servicios..."
./start_services.sh
```

---

## 📱 Verificación desde Navegador

### **URLs de Acceso Directo**
- **Frontend Principal:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Cartas Natales:** http://localhost:3000/cartas/tropica
- **Calendario:** http://localhost:3000/calendario/general

### **APIs y Documentación**
- **FastAPI Carta Natal Docs:** http://localhost:8001/docs
- **FastAPI Interpretaciones Docs:** http://localhost:8002/docs
- **Health Check Carta Natal:** http://localhost:8001/health
- **Health Check Interpretaciones:** http://localhost:8002/health

### **Testing de Funcionalidad**
1. **Abrir** http://localhost:3000
2. **Login** con Google
3. **Completar datos** de nacimiento
4. **Ir a** http://localhost:3000/cartas/tropica
5. **Hacer clic** en "Calcular Carta Natal"
6. **Verificar** que se muestra la carta

---

## 📋 Checklist de Verificación Diaria

### **Antes de Empezar a Trabajar**
- [ ] Ejecutar `./check_services.sh`
- [ ] Verificar que MongoDB está corriendo (puerto 27017)
- [ ] Si faltan servicios, ejecutar `./start_services.sh`
- [ ] Abrir http://localhost:3000 y verificar que carga
- [ ] Hacer un health check: http://localhost:8001/health

### **Durante el Desarrollo**
- [ ] Monitorear logs en las terminales
- [ ] Si un servicio se cae, reiniciarlo individualmente
- [ ] Verificar que los cambios se reflejan en el navegador

### **Al Terminar**
- [ ] Opcional: Matar todos los procesos para liberar recursos
- [ ] `pkill -f "node.*next" && pkill -f "python.*app.py"`

---

## 🎯 Comandos de Referencia Rápida

```bash
# Verificación rápida
lsof -i :3000 -i :8001 -i :8002

# Arranque manual (3 terminales)
# Terminal 1: cd /Users/apple/calculo-carta-natal-api && source venv/bin/activate && python app.py
# Terminal 2: cd /Users/apple/astro_interpretador_rag_fastapi && source venv/bin/activate && python app.py  
# Terminal 3: cd /Users/apple/sidebar-fastapi && npm run dev

# Health checks
curl http://localhost:3000 && curl http://localhost:8001/health && curl http://localhost:8002/health

# Reinicio de emergencia
pkill -f "node.*next" && pkill -f "python.*app.py" && sleep 5 && ./start_services.sh
```

---

## ✅ Estados de Servicio

### **🟢 TODO FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002
node      12345 apple   TCP *:3000 (LISTEN)
python    12346 apple   TCP *:8001 (LISTEN)
python    12347 apple   TCP *:8002 (LISTEN)
```

### **🟡 PARCIALMENTE FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002
node      12345 apple   TCP *:3000 (LISTEN)
python    12346 apple   TCP *:8001 (LISTEN)
# Falta puerto 8002 - Interpretaciones no está corriendo
```

### **🔴 NADA FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002
# Sin salida - ningún servicio está corriendo
```

---

**📝 Documento creado:** 10 de enero de 2025  
**🔄 Última actualización:** 10 de enero de 2025  
**👤 Proyecto:** Astrowellness - Arquitectura de Microservicios  
**💻 Sistema:** macOS con Next.js + FastAPI + Python
