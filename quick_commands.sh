#!/bin/bash
# 🚀 Comandos Rápidos para Astrowellness
# Uso: ./quick_commands.sh [comando]

case "$1" in
    "check"|"status")
        echo "🔍 Verificando estado de servicios..."
        ./check_services.sh
        ;;
    "start")
        echo "🚀 Iniciando todos los servicios..."
        ./start_services.sh
        ;;
    "restart")
        echo "🔄 Reiniciando todos los servicios..."
        ./restart_services.sh
        ;;
    "stop")
        echo "🛑 Deteniendo todos los servicios..."
        pkill -f "node.*next" 2>/dev/null
        pkill -f "python.*app.py" 2>/dev/null
        pkill -f "uvicorn" 2>/dev/null
        echo "✅ Servicios detenidos"
        ;;
    "ports")
        echo "🔍 Verificando puertos específicos..."
        echo "Puerto 3000 (Next.js):"
        lsof -i :3000
        echo ""
        echo "Puerto 8001 (FastAPI Carta Natal):"
        lsof -i :8001
        echo ""
        echo "Puerto 8002 (FastAPI Interpretaciones):"
        lsof -i :8002
        echo ""
        echo "Puerto 8003 (FastAPI Astrogematría):"
        lsof -i :8003
        echo ""
        echo "Puerto 8004 (FastAPI Calendario Personal):"
        lsof -i :8004
        ;;
    "health")
        echo "🏥 Health checks de APIs..."
        echo "Next.js Frontend:"
        curl -s http://localhost:3000 > /dev/null && echo "✅ OK" || echo "❌ FAIL"
        echo "FastAPI Carta Natal:"
        curl -s http://localhost:8001/health > /dev/null && echo "✅ OK" || echo "❌ FAIL"
        echo "FastAPI Interpretaciones:"
        curl -s http://localhost:8002/health > /dev/null && echo "✅ OK" || echo "❌ FAIL"
        echo "FastAPI Astrogematría:"
        curl -s http://localhost:8003/health > /dev/null && echo "✅ OK" || echo "❌ FAIL"
        echo "FastAPI Calendario Personal:"
        curl -s http://localhost:8004/health > /dev/null && echo "✅ OK" || echo "❌ FAIL"
        ;;
    "logs")
        echo "📋 Procesos activos del proyecto:"
        ps aux | grep -E "(node.*next|python.*app\.py|uvicorn)" | grep -v grep
        ;;
    "urls")
        echo "🌐 URLs de acceso:"
        echo "Frontend: http://localhost:3000"
        echo "Login: http://localhost:3000/login"
        echo "Cartas: http://localhost:3000/cartas/tropica"
        echo "Astrogematría: http://localhost:3000/astrogematria/calculos"
        echo "Calendario Personal: http://localhost:3000/calendario/personal"
        echo "API Docs Carta Natal: http://localhost:8001/docs"
        echo "API Docs Interpretaciones: http://localhost:8002/docs"
        echo "API Docs Astrogematría: http://localhost:8003/docs"
        echo "API Docs Calendario Personal: http://localhost:8004/docs"
        ;;
    "test")
        echo "🧪 Test rápido de carta natal..."
        curl -X POST "http://localhost:8001/carta-natal/tropical" \
          -H "Content-Type: application/json" \
          -d '{
            "nombre": "Test User",
            "fecha_nacimiento": "1990-01-01",
            "hora_nacimiento": "12:00",
            "ciudad_nacimiento": "Buenos Aires",
            "pais_nacimiento": "Argentina"
          }' | head -20
        ;;
    *)
        echo "🚀 Comandos Rápidos para Astrowellness"
        echo "======================================"
        echo ""
        echo "Uso: ./quick_commands.sh [comando]"
        echo ""
        echo "Comandos disponibles:"
        echo "  check    - Verificar estado de servicios"
        echo "  start    - Iniciar todos los servicios"
        echo "  restart  - Reiniciar todos los servicios"
        echo "  stop     - Detener todos los servicios"
        echo "  ports    - Ver qué procesos usan los puertos"
        echo "  health   - Health checks de APIs"
        echo "  logs     - Ver procesos activos"
        echo "  urls     - Mostrar URLs de acceso"
        echo "  test     - Test rápido de API"
        echo ""
        echo "Ejemplos:"
        echo "  ./quick_commands.sh check"
        echo "  ./quick_commands.sh start"
        echo "  ./quick_commands.sh restart"
        ;;
esac
