#!/bin/bash
echo "🔄 Reinicio completo de servicios de Astrowellness..."

# Matar todos los procesos relacionados
echo "🛑 Deteniendo servicios existentes..."
pkill -f "node.*next" 2>/dev/null
pkill -f "python.*app.py" 2>/dev/null
pkill -f "uvicorn" 2>/dev/null

# Limpiar puertos específicos
echo "🧹 Limpiando puertos..."
kill -9 $(lsof -t -i:3000) 2>/dev/null
kill -9 $(lsof -t -i:8001) 2>/dev/null
kill -9 $(lsof -t -i:8002) 2>/dev/null
kill -9 $(lsof -t -i:8003) 2>/dev/null
kill -9 $(lsof -t -i:8004) 2>/dev/null
kill -9 $(lsof -t -i:8005) 2>/dev/null

echo "⏳ Esperando limpieza completa..."
sleep 5

#echo "🚀 Reiniciando todos los servicios..."
#./start_services.sh
