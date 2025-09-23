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
start_service "/Users/apple/astrogematria_fastapi" "source venv/bin/activate && python app.py" "FastAPI Astrogematría" 8003
start_service "/Users/apple/astro-calendar-personal-fastapi" "./start_robust.sh" "FastAPI Calendario Personal" 8004
start_service "/Users/apple/carta-electiva-api" "source venv/bin/activate && python -m uvicorn app:app --host 0.0.0.0 --port 8005 --reload" "FastAPI Carta Electiva" 8005
start_service "/Users/apple/sidebar-fastapi" "npm run dev" "Next.js Frontend" 3000

echo ""
echo "⏳ Esperando que los servicios se inicialicen..."
sleep 5

echo ""
echo "🔍 Verificando estado final:"
./check_services.sh
