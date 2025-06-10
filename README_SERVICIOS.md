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

## 🔍 Verificación Rápida

```bash
# Ver qué servicios están corriendo
lsof -i :3000 -i :8001 -i :8002

# Estado esperado cuando todo funciona:
# node      12345 apple   TCP *:3000 (LISTEN)
# python    12346 apple   TCP *:8001 (LISTEN)
# python    12347 apple   TCP *:8002 (LISTEN)
```

## 🌐 URLs Importantes

- **Frontend:** http://localhost:3000
- **Login:** http://localhost:3000/login
- **Cartas Natales:** http://localhost:3000/cartas/tropica
- **API Docs Carta Natal:** http://localhost:8001/docs
- **Health Check:** http://localhost:8001/health

## 🚨 Solución de Problemas

### **Si nada funciona:**
```bash
./quick_commands.sh restart
```

### **Si un puerto está ocupado:**
```bash
# Ver qué proceso usa el puerto
lsof -i :3000

# Matar proceso específico
kill -9 [PID]
```

### **Si faltan dependencias:**
```bash
# FastAPI
cd /Users/apple/calculo-carta-natal-api
source venv/bin/activate
pip install -r requirements.txt

# Next.js
cd /Users/apple/sidebar-fastapi
npm install
```

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
```

---

**💡 Tip:** Usa `./quick_commands.sh` sin parámetros para ver todos los comandos disponibles.
