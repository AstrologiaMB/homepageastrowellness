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
check_port 8003 "FastAPI Astrogematría" "http://localhost:8003/health"
check_port 8004 "FastAPI Calendario Personal" "http://localhost:8004/health"
check_port 27017 "MongoDB"

echo ""
echo "📊 Procesos activos del proyecto:"
ps aux | grep -E "(node.*next|python.*app\.py|uvicorn)" | grep -v grep | head -10

echo ""
echo "🌐 URLs de acceso:"
echo "   Frontend: http://localhost:3000"
echo "   Astrogematría: http://localhost:3000/astrogematria/calculos"
echo "   Calendario Personal: http://localhost:3000/calendario/personal"
echo "   API Docs Carta Natal: http://localhost:8001/docs"
echo "   API Docs Interpretaciones: http://localhost:8002/docs"
echo "   API Docs Astrogematría: http://localhost:8003/docs"
echo "   API Docs Calendario Personal: http://localhost:8004/docs"
