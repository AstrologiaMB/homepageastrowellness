# Informe Técnico: Problema de Re-renderizado SVG con @astrodraw/astrochart

## 📋 Resumen Ejecutivo

**Problema:** En una aplicación React/Next.js que integra astrogematría con cartas natales, el componente SVG generado por la biblioteca `@astrodraw/astrochart` no se actualiza correctamente cuando cambian los datos astrogematrícicos. El punto visual en la carta mantiene la posición de la primera palabra calculada, aunque los datos del header se actualizan correctamente.

**Impacto:** Los usuarios ven información inconsistente entre los datos mostrados (correctos) y la visualización gráfica (incorrecta).

**Stack Tecnológico:**
- Next.js 14.2.5
- React 18.2
- @astrodraw/astrochart (biblioteca de terceros para cartas astrológicas)
- TypeScript
- Tailwind CSS

## 🏗️ Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                    Página Principal                         │
│              (astrogematria/calculos)                      │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                Estado de React                              │
│  - palabra: string                                          │
│  - resultado: AstrogematriaData                            │
│  - cartaNatal: ChartData                                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│           CartaNatalAstrogematriaWrapper                   │
│              (Dynamic Import + Suspense)                   │
└─────────────────────┬───────────────────────────────────────┘
                      │
                      ▼
┌─────────────────────────────────────────────────────────────┐
│            CartaNatalAstrogematria                         │
│              (Componente problemático)                     │
│                                                             │
│  useEffect(() => {                                         │
│    // Limpiar DOM                                          │
│    // Crear ID único                                       │
│    // new Chart(uniqueId, 800, 800)                       │
│    // chart.radix(modifiedData)                           │
│  }, [chartData, astrogematriaData])                       │
└─────────────────────────────────────────────────────────────┘
```

## 🐛 Descripción Detallada del Problema

### Comportamiento Esperado:
1. Usuario ingresa "Luis" → Carta muestra punto en 14º Aries
2. Usuario ingresa "María" → Carta muestra punto en 25º Géminis
3. Cada cambio actualiza tanto los datos como la visualización

### Comportamiento Actual:
1. Usuario ingresa "Luis" → Carta muestra punto en 14º Aries ✅
2. Usuario ingresa "María" → Datos muestran 25º Géminis ✅, pero carta sigue mostrando punto en 14º Aries ❌

### Observaciones:
- Los datos del header se actualizan correctamente
- El `useEffect` se ejecuta (confirmado con console.log)
- Los datos llegan correctamente al componente
- El problema es específico del SVG generado por `@astrodraw/astrochart`

## 💻 Código Relevante

### 1. Página Principal (app/astrogematria/calculos/page.tsx)

```typescript
export default function AstrogematriaCalculosPage() {
  const [resultado, setResultado] = useState<AstrogematriaData | null>(null);
  const [cartaNatal, setCartaNatal] = useState<any>(null);

  const calcularAstrogematria = async () => {
    // ... lógica de cálculo
    if (data.success && data.data) {
      setResultado(data.data);
      obtenerCartaNatal(); // Obtiene carta natal del usuario
    }
  };

  return (
    <div>
      {/* Formulario y resultados */}
      
      {/* Carta Natal con Astrogematría */}
      {resultado && cartaNatal && (
        <CartaNatalAstrogematriaWrapper 
          key={`${resultado.palabra_original}-${resultado.grados}`} // ⚠️ Key única implementada
          chartData={cartaNatal}
          astrogematriaData={resultado}
        />
      )}
    </div>
  );
}
```

### 2. Wrapper Dinámico (components/carta-natal-astrogematria-wrapper.tsx)

```typescript
const CartaNatalAstrogematria = dynamic(() => 
  import('@/components/carta-natal-astrogematria').then(mod => mod.CartaNatalAstrogematria), 
  { ssr: false }
);

export function CartaNatalAstrogematriaWrapper({ chartData, astrogematriaData }) {
  return (
    <Suspense fallback={<div>Cargando carta natal con astrogematría...</div>}>
      <CartaNatalAstrogematria chartData={chartData} astrogematriaData={astrogematriaData} />
    </Suspense>
  );
}
```

### 3. Componente Problemático (components/carta-natal-astrogematria.tsx)

```typescript
export function CartaNatalAstrogematria({ chartData, astrogematriaData }) {
  const chartRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (chartRef.current && chartData && astrogematriaData) {
      // 🔍 Debug logging - SE EJECUTA CORRECTAMENTE
      console.log('🎯 Renderizando carta con astrogematría:', {
        palabra: astrogematriaData.palabra_original,
        grados: astrogematriaData.grados,
        posicion: astrogematriaData.posicion_completa
      });
      
      // ⚠️ Generar ID único para cada renderizado
      const uniqueChartId = `astrogematria-chart-${Date.now()}-${astrogematriaData.grados}-${Math.random().toString(36).substr(2, 9)}`;
      
      // ⚠️ Limpiar completamente el contenedor
      chartRef.current.innerHTML = '';
      
      // ⚠️ Crear un nuevo div con el ID único
      const chartContainer = document.createElement('div');
      chartContainer.id = uniqueChartId;
      chartContainer.className = 'w-full max-w-3xl h-auto';
      chartRef.current.appendChild(chartContainer);
      
      try {
        // 🚨 AQUÍ ESTÁ EL PROBLEMA: La biblioteca no se actualiza correctamente
        const chart = new Chart(uniqueChartId, 800, 800);
        
        // Modificar datos para incluir punto astrogematrícico
        const modifiedChartData = {
          ...chartData,
          planets: {
            ...chartData.planets,
            'ASTROGEMATRIA': [astrogematriaData.grados] // ⚠️ Datos correctos
          }
        };
        
        // Renderizar carta
        chart.radix(modifiedChartData);
        
        // Aplicar estilos al punto astrogematrícico
        setTimeout(() => {
          const svgElement = chartRef.current?.querySelector('svg');
          if (svgElement) {
            const astrogematriaElements = svgElement.querySelectorAll('[data-planet="ASTROGEMATRIA"]');
            astrogematriaElements.forEach(element => {
              element.setAttribute('fill', '#FFD700');
              element.setAttribute('stroke', '#FF8C00');
              element.setAttribute('stroke-width', '3');
              element.setAttribute('r', '8');
            });
          }
        }, 100);
        
      } catch (error) {
        console.error('Error renderizando carta natal:', error);
      }
    }
  }, [chartData, astrogematriaData]); // ⚠️ Dependencias correctas

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tu Carta Natal con Astrogematría</CardTitle>
        <div className="flex items-center gap-2 mt-2">
          <Badge>{astrogematriaData.palabra_original}</Badge> {/* ✅ Se actualiza */}
          <Badge>{astrogematriaData.posicion_completa}</Badge> {/* ✅ Se actualiza */}
        </div>
      </CardHeader>
      <CardContent>
        <div ref={chartRef} className="w-full max-w-3xl h-auto" /> {/* ❌ SVG no se actualiza */}
      </CardContent>
    </Card>
  );
}
```

## 🔧 Soluciones Intentadas

### 1. ✅ Key única en el wrapper
```typescript
<CartaNatalAstrogematriaWrapper 
  key={`${resultado.palabra_original}-${resultado.grados}`}
  // ...
/>
```

### 2. ✅ ID único dinámico
```typescript
const uniqueChartId = `astrogematria-chart-${Date.now()}-${astrogematriaData.grados}-${Math.random().toString(36).substr(2, 9)}`;
```

### 3. ✅ Limpieza agresiva del DOM
```typescript
chartRef.current.innerHTML = '';
const chartContainer = document.createElement('div');
chartContainer.id = uniqueChartId;
chartRef.current.appendChild(chartContainer);
```

### 4. ✅ Dependencias correctas en useEffect
```typescript
useEffect(() => {
  // ...
}, [chartData, astrogematriaData]);
```

### 5. ✅ Dynamic import con SSR disabled
```typescript
const CartaNatalAstrogematria = dynamic(() => import('...'), { ssr: false });
```

## 🤔 Hipótesis del Problema

La biblioteca `@astrodraw/astrochart` parece tener:

1. **Caché interno de elementos SVG** que no se limpia entre instancias
2. **Referencias globales** que persisten entre renders
3. **Estado interno** que no se reinicia correctamente
4. **Posible singleton pattern** que mantiene la primera configuración

## ❓ Preguntas para el Experto

1. **¿Has trabajado con `@astrodraw/astrochart` antes?** ¿Conoces algún método de cleanup o reinicialización?

2. **¿Existe alguna forma de forzar la destrucción completa** de una instancia de Chart antes de crear una nueva?

3. **¿Deberíamos considerar una alternativa** como:
   - Usar un iframe para aislar completamente la biblioteca
   - Implementar un pool de componentes que se destruyan/recreen
   - Buscar una biblioteca alternativa para cartas astrológicas

4. **¿El problema podría estar en el timing?** ¿Deberíamos agregar más delay entre la destrucción y creación?

5. **¿Hay alguna forma de inspeccionar el estado interno** de la biblioteca para entender qué está causando la persistencia?

## 📊 Datos de Debug

### Console.log output:
```
🎯 Renderizando carta con astrogematría: {palabra: "Luis", grados: 14, posicion: "14º de Aries"}
🎯 Renderizando carta con astrogematría: {palabra: "María", grados: 75, posicion: "15º de Géminis"}
```

### Observaciones:
- El useEffect se ejecuta correctamente
- Los datos llegan con los valores correctos
- El DOM se limpia y recrea
- El SVG se genera, pero mantiene la posición anterior

## 🎯 Objetivo

Necesitamos una solución que garantice que cada vez que cambien los datos astrogematrícicos, el SVG se regenere completamente mostrando el punto en la nueva posición correcta.

---

**Información adicional disponible bajo solicitud:**
- Package.json completo
- Estructura completa del proyecto
- Logs adicionales de debugging
- Screenshots del comportamiento
