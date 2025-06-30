#!/bin/bash

# SCRIPT DE VALIDACIÓN AUTOMÁTICA - LUNA PROGRESADA
# Parte del Informe Técnico Astrowellness
# Fecha: 27/06/2025

echo "=========================================="
echo "VALIDACIÓN AUTOMÁTICA - LUNA PROGRESADA"
echo "=========================================="
echo "Fecha: $(date)"
echo "Versión: 1.0"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Contadores
TESTS_PASSED=0
TESTS_FAILED=0
TOTAL_TESTS=0

# Función para logging
log_test() {
    local test_name="$1"
    local status="$2"
    local details="$3"
    
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
    
    if [ "$status" = "PASS" ]; then
        echo -e "${GREEN}✅ PASS${NC} - $test_name"
        [ ! -z "$details" ] && echo "   $details"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAIL${NC} - $test_name"
        [ ! -z "$details" ] && echo "   $details"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
    echo ""
}

# Función para verificar si un servicio está corriendo
check_service() {
    local port="$1"
    local service_name="$2"
    
    if curl -s "http://localhost:$port/health" > /dev/null 2>&1 || \
       curl -s "http://localhost:$port/" > /dev/null 2>&1; then
        return 0
    else
        return 1
    fi
}

# Función para validar respuesta JSON
validate_json_response() {
    local response="$1"
    local expected_field="$2"
    local expected_value="$3"
    local tolerance="$4"
    
    # Extraer valor usando jq
    local actual_value=$(echo "$response" | jq -r "$expected_field" 2>/dev/null)
    
    if [ "$actual_value" = "null" ] || [ -z "$actual_value" ]; then
        return 1
    fi
    
    # Si es un número, verificar tolerancia
    if [[ "$actual_value" =~ ^[0-9]+\.?[0-9]*$ ]] && [[ "$expected_value" =~ ^[0-9]+\.?[0-9]*$ ]]; then
        local diff=$(echo "$actual_value - $expected_value" | bc -l 2>/dev/null | tr -d '-')
        if (( $(echo "$diff <= $tolerance" | bc -l) )); then
            return 0
        else
            return 1
        fi
    fi
    
    # Comparación de strings
    if [ "$actual_value" = "$expected_value" ]; then
        return 0
    else
        return 1
    fi
}

echo -e "${BLUE}🔍 VERIFICANDO PREREQUISITOS${NC}"
echo "----------------------------------------"

# Verificar que jq está instalado
if command -v jq &> /dev/null; then
    log_test "jq instalado" "PASS" "Versión: $(jq --version)"
else
    log_test "jq instalado" "FAIL" "jq no está instalado. Instalar con: brew install jq"
    exit 1
fi

# Verificar que bc está instalado
if command -v bc &> /dev/null; then
    log_test "bc instalado" "PASS" "Calculadora disponible"
else
    log_test "bc instalado" "FAIL" "bc no está instalado. Instalar con: brew install bc"
    exit 1
fi

# Verificar que curl está instalado
if command -v curl &> /dev/null; then
    log_test "curl instalado" "PASS" "Cliente HTTP disponible"
else
    log_test "curl instalado" "FAIL" "curl no está instalado"
    exit 1
fi

echo -e "${BLUE}🚀 VERIFICANDO SERVICIOS${NC}"
echo "----------------------------------------"

# Verificar servicio astro-calendar-personal-fastapi
if check_service 8004 "astro-calendar-personal"; then
    log_test "Servicio astro-calendar-personal (puerto 8004)" "PASS" "Servicio respondiendo"
else
    log_test "Servicio astro-calendar-personal (puerto 8004)" "FAIL" "Servicio no disponible. Ejecutar: cd ../astro-calendar-personal-fastapi && python app.py"
fi

echo -e "${BLUE}🧪 TESTS UNITARIOS${NC}"
echo "----------------------------------------"

# Test 1: Verificar test_progressed_moon_position.py
if [ -f "../astro-calendar-personal-fastapi/test_progressed_moon_position.py" ]; then
    cd ../astro-calendar-personal-fastapi
    TEST_OUTPUT=$(python test_progressed_moon_position.py 2>&1)
    cd - > /dev/null
    
    if echo "$TEST_OUTPUT" | grep -q "5\.3.*Capricornio\|5\.2.*Capricornio\|5\.4.*Capricornio"; then
        log_test "Test unitario Luna Progresada" "PASS" "Resultado: ~5.3° Capricornio"
    else
        log_test "Test unitario Luna Progresada" "FAIL" "Resultado inesperado: $TEST_OUTPUT"
    fi
else
    log_test "Test unitario Luna Progresada" "FAIL" "Archivo test_progressed_moon_position.py no encontrado"
fi

echo -e "${BLUE}🌐 TESTS DE API${NC}"
echo "----------------------------------------"

# Test 2: API endpoint dinámico
if check_service 8004 "astro-calendar-personal"; then
    API_RESPONSE=$(curl -s -X POST "http://localhost:8004/calculate-personal-calendar-dynamic" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Luis Minvielle",
            "birth_date": "1964-12-26", 
            "birth_time": "21:12",
            "location": {
                "latitude": -34.6118,
                "longitude": -58.3960,
                "name": "Buenos Aires",
                "timezone": "America/Argentina/Buenos_Aires"
            },
            "year": 2025
        }' 2>/dev/null)
    
    if [ $? -eq 0 ] && [ ! -z "$API_RESPONSE" ]; then
        # Verificar que la respuesta contiene eventos
        if echo "$API_RESPONSE" | jq -e '.events' > /dev/null 2>&1; then
            # Buscar evento de Luna Progresada
            LUNA_PROGRESADA=$(echo "$API_RESPONSE" | jq -r '.events[] | select(.tipo_evento == "Tránsito Casa Estado") | .house_transits[]? | select(.tipo == "luna_progresada") | .grado' 2>/dev/null)
            
            if [ ! -z "$LUNA_PROGRESADA" ] && [ "$LUNA_PROGRESADA" != "null" ]; then
                # Verificar si el grado está cerca de 5 (esperado)
                if (( $(echo "$LUNA_PROGRESADA >= 4.5 && $LUNA_PROGRESADA <= 5.5" | bc -l) )); then
                    log_test "API endpoint dinámico - Luna Progresada" "PASS" "Grado: $LUNA_PROGRESADA° (esperado: ~5°)"
                else
                    log_test "API endpoint dinámico - Luna Progresada" "FAIL" "Grado: $LUNA_PROGRESADA° (esperado: ~5°)"
                fi
            else
                log_test "API endpoint dinámico - Luna Progresada" "FAIL" "No se encontró evento de Luna Progresada en la respuesta"
            fi
        else
            log_test "API endpoint dinámico - Estructura respuesta" "FAIL" "Respuesta no contiene campo 'events'"
        fi
    else
        log_test "API endpoint dinámico - Conectividad" "FAIL" "No se pudo conectar al endpoint o respuesta vacía"
    fi
else
    log_test "API endpoint dinámico" "FAIL" "Servicio no disponible"
fi

# Test 3: Verificar posición del Sol natal
if check_service 8004 "astro-calendar-personal" && [ ! -z "$API_RESPONSE" ]; then
    SOL_NATAL=$(echo "$API_RESPONSE" | jq -r '.natal_data.points.Sun.longitude' 2>/dev/null)
    
    if [ ! -z "$SOL_NATAL" ] && [ "$SOL_NATAL" != "null" ]; then
        # Verificar si está cerca de 275.267 (esperado según AstroSeek)
        if (( $(echo "$SOL_NATAL >= 274.5 && $SOL_NATAL <= 276.0" | bc -l) )); then
            log_test "Posición Sol natal" "PASS" "Longitud: $SOL_NATAL° (esperado: 275.267°)"
        else
            log_test "Posición Sol natal" "FAIL" "Longitud: $SOL_NATAL° (esperado: 275.267°)"
        fi
    else
        log_test "Posición Sol natal" "FAIL" "No se pudo extraer posición del Sol de la respuesta"
    fi
fi

echo -e "${BLUE}⏱️  TESTS DE PERFORMANCE${NC}"
echo "----------------------------------------"

# Test 4: Tiempo de respuesta
if check_service 8004 "astro-calendar-personal"; then
    START_TIME=$(date +%s.%N)
    PERF_RESPONSE=$(curl -s -X POST "http://localhost:8004/calculate-personal-calendar-dynamic" \
        -H "Content-Type: application/json" \
        -d '{
            "name": "Test User",
            "birth_date": "1990-01-01",
            "birth_time": "12:00", 
            "location": {
                "latitude": 0,
                "longitude": 0,
                "name": "Test",
                "timezone": "UTC"
            },
            "year": 2025
        }' 2>/dev/null)
    END_TIME=$(date +%s.%N)
    
    RESPONSE_TIME=$(echo "$END_TIME - $START_TIME" | bc -l)
    
    if (( $(echo "$RESPONSE_TIME <= 5.0" | bc -l) )); then
        log_test "Tiempo de respuesta API" "PASS" "Tiempo: ${RESPONSE_TIME}s (límite: 5s)"
    else
        log_test "Tiempo de respuesta API" "FAIL" "Tiempo: ${RESPONSE_TIME}s (límite: 5s)"
    fi
fi

echo -e "${BLUE}📊 RESUMEN DE VALIDACIÓN${NC}"
echo "=========================================="
echo "Total de tests ejecutados: $TOTAL_TESTS"
echo -e "Tests exitosos: ${GREEN}$TESTS_PASSED${NC}"
echo -e "Tests fallidos: ${RED}$TESTS_FAILED${NC}"

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "\n${GREEN}🎉 TODOS LOS TESTS PASARON${NC}"
    echo "La corrección de Luna Progresada está funcionando correctamente."
    exit 0
else
    echo -e "\n${RED}⚠️  ALGUNOS TESTS FALLARON${NC}"
    echo "Se requiere investigación adicional o implementación de correcciones."
    exit 1
fi
