# 🚀 Instrucciones Completas de Arranque - Astrowellness

## 📋 Resumen Ejecutivo

**Para usuarios experimentados - Comandos rápidos:**

```bash
# Arranque automático (recomendado)
./start_services.sh

# Verificación
./check_services.sh

# Comandos rápidos
./quick_commands.sh start
```

---

## 🏗️ Arquitectura de Microservicios

### **5 Servicios Principales**

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ASTROWELLNESS ECOSYSTEM                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│  ┌─────────────────┐    HTTP     ┌─────────────────────────────────────────┐ │
│  │   Frontend      │   Requests  │           API Gateway                   │ │
│  │   Next.js       │◄───────────►│         sidebar-fastapi                │ │
│  │ localhost:3000  │             │       localhost:3000/api               │ │
│  └─────────────────┘             └─────────────────────────────────────────┘ │
│                                             │                               │
│                                             │ HTTP Requests                 │
│                                             ▼                               │
│                          ┌─────────────────────────────────────────────────┐ │
│                          │            MICROSERVICIOS PYTHON               │ │
│                          │                                                 │ │
│  ┌─────────────────────┐ │  ┌─────────────────────┐  ┌─────────────────────┐ │
│  │   Carta Natal       │ │  │   Interpretaciones  │  │   Astrogematría     │ │
│  │   FastAPI           │ │  │   FastAPI           │  │   FastAPI           │ │
│  │   localhost:8001    │ │  │   localhost:8002    │  │   localhost:8003    │ │
│  └─────────────────────┘ │  └─────────────────────┘  └─────────────────────┘ │
│                          │                                                 │ │
│  ┌─────────────────────┐ │                                                 │ │
│  │ Calendario Personal │ │                                                 │ │
│  │   FastAPI           │ │                                                 │ │
│  │   localhost:8004    │ │                                                 │ │
│  └─────────────────────┘ │                                                 │ │
│                          └─────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### **Tabla de Servicios**

| Puerto | Servicio | Directorio | Método de Arranque | Health Check |
|--------|----------|------------|-------------------|--------------|
| 3000 | Next.js Frontend | `/Users/apple/sidebar-fastapi` | `npm run dev` | http://localhost:3000 |
| 8001 | FastAPI Carta Natal | `/Users/apple/calculo-carta-natal-api` | `source venv/bin/activate && python app.py` | http://localhost:8001/health |
| 8002 | FastAPI Interpretaciones | `/Users/apple/astro_interpretador_rag_fastapi` | `source venv/bin/activate && python app.py` | http://localhost:8002/health |
| 8003 | FastAPI Astrogematría | `/Users/apple/astrogematria_fastapi` | `source venv/bin/activate && python app.py` | http://localhost:8003/health |
| 8004 | FastAPI Calendario Personal | `/Users/apple/astro-calendar-personal-fastapi` | `./start_robust.sh` | http://localhost:8004/health |

---

## ⚡ Métodos de Arranque

### **1. 🤖 Arranque Automático (Recomendado)**

```bash
# Desde el directorio sidebar-fastapi
cd /Users/apple/sidebar-fastapi

# Iniciar todos los servicios
./start_services.sh

# Verificar estado
./check_services.sh
```

**Salida esperada:**
```
🚀 Iniciando servicios de Astrowellness...
Iniciando FastAPI Carta Natal...
✅ FastAPI Carta Natal iniciado (PID: 12345)
Iniciando FastAPI Interpretaciones...
✅ FastAPI Interpretaciones iniciado (PID: 12346)
Iniciando FastAPI Astrogematría...
✅ FastAPI Astrogematría iniciado (PID: 12347)
Iniciando FastAPI Calendario Personal...
✅ FastAPI Calendario Personal iniciado (PID: 12348)
Iniciando Next.js Frontend...
✅ Next.js Frontend iniciado (PID: 12349)

🔍 Verificando estado final:
✅ Next.js Frontend corriendo en puerto 3000
✅ FastAPI Carta Natal corriendo en puerto 8001
✅ FastAPI Interpretaciones corriendo en puerto 8002
✅ FastAPI Astrogematría corriendo en puerto 8003
✅ FastAPI Calendario Personal corriendo en puerto 8004
```

### **2. 🔧 Arranque Manual (5 Terminales)**

**Orden recomendado de arranque:**

#### **Terminal 1 - FastAPI Carta Natal (Puerto 8001)**
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

#### **Terminal 2 - FastAPI Interpretaciones (Puerto 8002)**
```bash
cd /Users/apple/astro_interpretador_rag_fastapi
source venv/bin/activate
python app.py
```

**Salida esperada:**
```
INFO:     Started server process [12347]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8002 (Press CTRL+C to quit)
```

#### **Terminal 3 - FastAPI Astrogematría (Puerto 8003)**
```bash
cd /Users/apple/astrogematria_fastapi
source venv/bin/activate
python app.py
```

**Salida esperada:**
```
INFO:     Started server process [12348]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8003 (Press CTRL+C to quit)
```

#### **Terminal 4 - FastAPI Calendario Personal (Puerto 8004) - SCRIPT ROBUSTO**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh
```

**Salida esperada:**
```
🚀 Iniciando Microservicio Personal Calendar...
📅 2025-06-22 17:48:00

[INFO] Directorio del proyecto verificado ✓
[INFO] Python verificado ✓
[INFO] Entorno virtual existente encontrado ✓
[INFO] Activando entorno virtual...
[INFO] Instalando dependencias...
[SUCCESS] Dependencias instaladas ✓
[INFO] Verificando dependencias críticas...
✓ Immanuel: version unknown
✓ ephemeris.planet: disponible
✓ FastAPI: 0.104.1
[SUCCESS] Todas las dependencias críticas verificadas ✓
[INFO] Puerto 8004 disponible ✓
[SUCCESS] 🎯 Iniciando microservicio en puerto 8004...

📊 Información del servicio:
   • URL: http://localhost:8004
   • Documentación: http://localhost:8004/docs
   • Health check: http://localhost:8004/health

🔄 Para detener: Ctrl+C

INFO:     Started server process [12349]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://0.0.0.0:8004 (Press CTRL+C to quit)
```

#### **Terminal 5 - Frontend Next.js (Puerto 3000)**
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

### **3. 🎯 Arranque Selectivo**

**Por servicio individual:**

```bash
# Solo Carta Natal
cd /Users/apple/calculo-carta-natal-api && source venv/bin/activate && python app.py

# Solo Interpretaciones
cd /Users/apple/astro_interpretador_rag_fastapi && source venv/bin/activate && python app.py

# Solo Astrogematría
cd /Users/apple/astrogematria_fastapi && source venv/bin/activate && python app.py

# Solo Calendario Personal (con script robusto)
cd /Users/apple/astro-calendar-personal-fastapi && ./start_robust.sh

# Solo Frontend
cd /Users/apple/sidebar-fastapi && npm run dev
```

---

## ✅ Verificación y Testing

### **Verificación Rápida de Puertos**
```bash
# Verificar todos los puertos
lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004

# Verificación individual
lsof -i :3000  # Next.js
lsof -i :8001  # Carta Natal
lsof -i :8002  # Interpretaciones
lsof -i :8003  # Astrogematría
lsof -i :8004  # Calendario Personal
```

### **Health Checks**
```bash
# Frontend
curl http://localhost:3000

# APIs FastAPI
curl http://localhost:8001/health
curl http://localhost:8002/health
curl http://localhost:8003/health
curl http://localhost:8004/health
```

**Respuestas esperadas:**

**Next.js Frontend:**
```html
<!DOCTYPE html>
<html>
  <head>
    <title>Astrowellness</title>
    ...
```

**FastAPI Health Check:**
```json
{
  "status": "healthy",
  "service": "Carta Natal API - Astrowellness",
  "version": "1.0.0",
  "timestamp": "2025-06-22T20:48:24.123456",
  "python_version": "3.11",
  "dependencies_ok": true
}
```

### **URLs de Acceso Completas**

**Frontend:**
- Principal: http://localhost:3000
- Login: http://localhost:3000/login
- Cartas Natales: http://localhost:3000/cartas/tropica
- Cartas Dracónicas: http://localhost:3000/cartas/draconica
- Astrogematría: http://localhost:3000/astrogematria/calculos
- Calendario General: http://localhost:3000/calendario/general
- Calendario Personal: http://localhost:3000/calendario/personal

**APIs y Documentación:**
- FastAPI Carta Natal Docs: http://localhost:8001/docs
- FastAPI Interpretaciones Docs: http://localhost:8002/docs
- FastAPI Astrogematría Docs: http://localhost:8003/docs
- FastAPI Calendario Personal Docs: http://localhost:8004/docs

### **Test Funcional Completo**
```bash
# Test de carta natal
curl -X POST "http://localhost:8001/carta-natal/tropical" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "fecha_nacimiento": "1990-01-01",
    "hora_nacimiento": "12:00",
    "ciudad_nacimiento": "Buenos Aires",
    "pais_nacimiento": "Argentina"
  }' | head -20

# Test de astrogematría
curl -X POST "http://localhost:8003/calcular" \
  -H "Content-Type: application/json" \
  -d '{
    "texto": "Test",
    "metodo": "simple"
  }'

# Test de calendario personal
curl -X POST "http://localhost:8004/calculate-personal-calendar-dynamic" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "birth_date": "1990-01-01",
    "birth_time": "12:00",
    "location": {
      "latitude": -34.6037,
      "longitude": -58.3816,
      "name": "Buenos Aires",
      "timezone": "America/Argentina/Buenos_Aires"
    },
    "year": 2025
  }' | head -20
```

---

## 🚨 Troubleshooting

### **Problemas Comunes**

#### **1. Puerto ya en uso**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000
lsof -i :8001
lsof -i :8002
lsof -i :8003
lsof -i :8004

# Matar proceso específico
kill -9 [PID]

# Matar todos los procesos en un puerto
kill -9 $(lsof -t -i:3000)
kill -9 $(lsof -t -i:8001)
kill -9 $(lsof -t -i:8002)
kill -9 $(lsof -t -i:8003)
kill -9 $(lsof -t -i:8004)
```

#### **2. Virtual Environment no activado**
```bash
# Verificar si venv está activo
which python

# Debería mostrar algo como:
# /Users/apple/calculo-carta-natal-api/venv/bin/python

# Si no, activar manualmente:
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
```

#### **3. Dependencias faltantes**

**FastAPI Carta Natal:**
```bash
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
pip install -r requirements.txt
```

**FastAPI Interpretaciones:**
```bash
cd /Users/apple/astro_interpretador_rag_fastapi
source venv/bin/activate
pip install -r requirements.txt
```

**FastAPI Astrogematría:**
```bash
cd /Users/apple/astrogematria_fastapi
source venv/bin/activate
pip install -r requirements.txt
```

**FastAPI Calendario Personal (usa script robusto):**
```bash
cd /Users/apple/astro-calendar-personal-fastapi
./start_robust.sh  # El script maneja las dependencias automáticamente
```

**Next.js Frontend:**
```bash
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
Verificar que cada FastAPI tenga configurado CORS para `http://localhost:3000`

#### **6. Servicios no responden**
```bash
# Reinicio completo
./restart_services.sh

# O manual:
pkill -f "node.*next"
pkill -f "python.*app.py"
pkill -f "uvicorn"
sleep 5
./start_services.sh
```

### **Comandos de Diagnóstico**

```bash
# Ver todos los procesos de Node y Python
ps aux | grep -E "(node|python)" | grep -v grep

# Ver conexiones de red activas
netstat -an | grep LISTEN | grep -E "(3000|8001|8002|8003|8004)"

# Ver logs de sistema (macOS)
log show --predicate 'process == "node"' --last 5m
log show --predicate 'process == "python"' --last 5m

# Verificar espacio en disco
df -h

# Verificar memoria
top -l 1 | grep PhysMem
```

### **Reinicio de Emergencia**
```bash
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
kill -9 $(lsof -t -i:8003) 2>/dev/null
kill -9 $(lsof -t -i:8004) 2>/dev/null

echo "⏳ Esperando limpieza..."
sleep 5

echo "🚀 Reiniciando servicios..."
./start_services.sh
```

---

## 📊 Scripts de Automatización

### **Scripts Disponibles**

| Script | Función | Uso |
|--------|---------|-----|
| `start_services.sh` | Iniciar todos los servicios | `./start_services.sh` |
| `check_services.sh` | Verificar estado de servicios | `./check_services.sh` |
| `restart_services.sh` | Reiniciar todos los servicios | `./restart_services.sh` |
| `quick_commands.sh` | Comandos rápidos múltiples | `./quick_commands.sh [comando]` |

### **Comandos Rápidos Disponibles**
```bash
./quick_commands.sh check     # Verificar estado
./quick_commands.sh start     # Iniciar servicios
./quick_commands.sh restart   # Reiniciar servicios
./quick_commands.sh stop      # Detener servicios
./quick_commands.sh ports     # Ver puertos específicos
./quick_commands.sh health    # Health checks
./quick_commands.sh logs      # Ver procesos activos
./quick_commands.sh urls      # Mostrar URLs de acceso
./quick_commands.sh test      # Test rápido de API
```

---

## 🎯 Estados de Servicio

### **🟢 TODO FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004
node      12345 apple   TCP *:3000 (LISTEN)
python    12346 apple   TCP *:8001 (LISTEN)
python    12347 apple   TCP *:8002 (LISTEN)
python    12348 apple   TCP *:8003 (LISTEN)
python    12349 apple   TCP *:8004 (LISTEN)
```

### **🟡 PARCIALMENTE FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004
node      12345 apple   TCP *:3000 (LISTEN)
python    12346 apple   TCP *:8001 (LISTEN)
python    12347 apple   TCP *:8002 (LISTEN)
# Faltan puertos 8003 y 8004
```

### **🔴 NADA FUNCIONANDO**
```bash
$ lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004
# Sin salida - ningún servicio está corriendo
```

---

## 📋 Checklist de Verificación

### **Antes de Empezar a Trabajar**
- [ ] Ejecutar `./check_services.sh`
- [ ] Verificar que MongoDB está corriendo (puerto 27017) si es necesario
- [ ] Si faltan servicios, ejecutar `./start_services.sh`
- [ ] Abrir http://localhost:3000 y verificar que carga
- [ ] Hacer health checks: http://localhost:8001/health, 8002, 8003, 8004

### **Durante el Desarrollo**
- [ ] Monitorear logs en las terminales
- [ ] Si un servicio se cae, reiniciarlo individualmente
- [ ] Verificar que los cambios se reflejan en el navegador
- [ ] Usar `./quick_commands.sh check` periódicamente

### **Al Terminar**
- [ ] Opcional: Matar todos los procesos para liberar recursos
- [ ] `./quick_commands.sh stop`

---

## 🔧 Comandos de Referencia Rápida

```bash
# Verificación ultra-rápida
lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004

# Arranque automático
./start_services.sh

# Health checks completos
curl http://localhost:3000 && \
curl http://localhost:8001/health && \
curl http://localhost:8002/health && \
curl http://localhost:8003/health && \
curl http://localhost:8004/health

# Reinicio de emergencia
./restart_services.sh

# Detener todo
./quick_commands.sh stop
```

---

## 📝 Notas Importantes

### **Dependencias entre Servicios**
- **Frontend (3000)** depende de **todas las APIs (8001-8004)**
- **APIs** son independientes entre sí
- **Calendario Personal (8004)** tiene script robusto con verificación automática de dependencias

### **Orden de Arranque Recomendado**
1. APIs FastAPI (8001, 8002, 8003, 8004) - pueden iniciarse en paralelo
2. Frontend Next.js (3000) - último para que encuentre todas las APIs

### **Características Especiales**
- **Puerto 8004** usa script robusto `./start_robust.sh` con verificación automática
- **Puertos 8001-8003** usan arranque manual estándar
- **Puerto 3000** es el punto de entrada principal

---

**📝 Documento creado:** 22 de junio de 2025  
**🔄 Última actualización:** 22 de junio de 2025  
**👤 Proyecto:** Astrowellness - Arquitectura de 5 Microservicios  
**💻 Sistema:** macOS con Next.js + FastAPI + Python  
**🎯 Versión:** 2.0 - Completa con Calendario Personal
