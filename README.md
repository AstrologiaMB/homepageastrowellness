# 🌟 Astrowellness - Homepage Astrológica

Una aplicación web moderna para servicios astrológicos profesionales, construida con Next.js y una arquitectura de microservicios FastAPI.

## 🚀 Características Principales

- **🔮 Cartas Natales Completas**: Cálculo preciso con Swiss Ephemeris
- **📅 Calendario Personal Astrológico**: Tránsitos y eventos personalizados
- **🌙 Luna Progresada**: Seguimiento en tiempo real (~2.5 años por signo)
- **🔢 Astrogematría**: Cálculos numerológicos avanzados
- **📊 Interpretaciones IA**: Generación automática con RAG (Retrieval-Augmented Generation)
- **🎨 Temas Personalizables**: Interfaz adaptable con múltiples temas
- **⚡ Rendimiento Optimizado**: Caching inteligente y procesamiento paralelo

## 🏗️ Arquitectura

### Stack Tecnológico

**Frontend:**
- Next.js 15.2.4 con React 19
- TypeScript para type safety
- Tailwind CSS + Radix UI para componentes
- Next-Auth para autenticación
- Prisma como ORM

**Backend:**
- 4 Microservicios FastAPI independientes
- Python 3.11+ con Swiss Ephemeris
- Arquitectura RESTful con documentación automática
- Procesamiento asíncrono para mejor rendimiento

### Microservicios

| Puerto | Servicio | Función |
|--------|----------|---------|
| 3000 | Frontend Next.js | Interfaz principal y API Gateway |
| 8001 | Carta Natal API | Cálculos astrológicos precisos |
| 8002 | Interpretaciones API | Generación de textos con IA |
| 8003 | Astrogematría API | Cálculos numerológicos |
| 8004 | Calendario Personal API | Eventos y tránsitos personalizados |

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ y npm
- Python 3.11+
- Git

### Instalación Rápida

```bash
# Clonar el repositorio
git clone https://github.com/AstrologiaMB/homepageastrowellness.git
cd homepageastrowellness

# Instalar dependencias del frontend
npm install

# Configurar base de datos
npx prisma generate
npx prisma migrate dev

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus configuraciones
```

### Arranque Automático (Recomendado)

```bash
# Iniciar todos los servicios
./start_services.sh

# Verificar estado
./check_services.sh
```

### Arranque Manual

Si prefieres control total, puedes iniciar cada servicio individualmente:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Carta Natal API
cd ../calculo-carta-natal-api
source venv/bin/activate && python app.py

# Terminal 3 - Interpretaciones API
cd ../astro_interpretador_rag_fastapi
source venv/bin/activate && python app.py

# Terminal 4 - Astrogematría API
cd ../astrogematria_fastapi
source venv/bin/activate && python app.py

# Terminal 5 - Calendario Personal API
cd ../astro-calendar-personal-fastapi
./start_robust.sh
```

## 🌐 URLs de Acceso

**Aplicación Principal:**
- Homepage: http://localhost:3000
- Cartas Natales: http://localhost:3000/cartas/tropica
- Astrogematría: http://localhost:3000/astrogematria/calculos
- Calendario Personal: http://localhost:3000/calendario/personal

**APIs y Documentación:**
- Carta Natal API: http://localhost:8001/docs
- Interpretaciones API: http://localhost:8002/docs
- Astrogematría API: http://localhost:8003/docs
- Calendario Personal API: http://localhost:8004/docs

## 🧪 Testing y Verificación

### Health Checks

```bash
# Verificar todos los servicios
curl http://localhost:3000
curl http://localhost:8001/health
curl http://localhost:8002/health
curl http://localhost:8003/health
curl http://localhost:8004/health
```

### Test Funcional

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
  }'
```

## 🛠️ Scripts Disponibles

| Script | Función |
|--------|---------|
| `npm run dev` | Iniciar frontend en modo desarrollo |
| `npm run build` | Construir para producción |
| `npm run start` | Iniciar en modo producción |
| `./start_services.sh` | Iniciar todos los microservicios |
| `./check_services.sh` | Verificar estado de servicios |
| `./restart_services.sh` | Reiniciar todos los servicios |
| `./quick_commands.sh` | Comandos rápidos múltiples |

## 🔧 Desarrollo

### Estructura del Proyecto

```
astrowellness/
├── app/                    # Páginas Next.js (App Router)
├── components/             # Componentes React reutilizables
├── hooks/                  # Custom hooks
├── lib/                    # Utilidades y configuraciones
├── prisma/                 # Esquemas de base de datos
├── public/                 # Assets estáticos
├── styles/                 # Estilos globales y temas
├── data/                   # Datos astrológicos
└── scripts/                # Scripts de automatización
```

### Comandos de Desarrollo

```bash
# Desarrollo con hot reload
npm run dev

# Linting y formateo
npm run lint

# Regenerar cliente Prisma
npx prisma generate

# Reset de base de datos
npx prisma migrate reset
```

## 🚨 Troubleshooting

### Problemas Comunes

**Puerto ocupado:**
```bash
# Ver procesos en puertos
lsof -i :3000 -i :8001 -i :8002 -i :8003 -i :8004

# Matar proceso específico
kill -9 [PID]
```

**Dependencias faltantes:**
```bash
# Frontend
npm install

# APIs Python (en cada directorio)
source venv/bin/activate
pip install -r requirements.txt
```

**Base de datos:**
```bash
npx prisma generate
npx prisma migrate dev
```

### Reinicio Completo

```bash
# Detener todos los servicios
./quick_commands.sh stop

# Reiniciar
./restart_services.sh
```

## 📊 Características Técnicas

### Rendimiento
- **Caching inteligente**: Reducción del 20% en tiempos de respuesta
- **Procesamiento paralelo**: Manejo de 30-40 eventos astrológicos simultáneos
- **Optimización de consultas**: Swiss Ephemeris para máxima precisión

### Seguridad
- Autenticación con Next-Auth
- Validación de datos con Zod
- Sanitización de inputs
- CORS configurado correctamente

### Escalabilidad
- Arquitectura de microservicios independientes
- APIs RESTful con documentación automática
- Base de datos optimizada con Prisma
- Deployment-ready para producción

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 📞 Contacto

**Astrología MB**
- Website: [astrologiamb.com](https://astrologiamb.com)
- GitHub: [@AstrologiaMB](https://github.com/AstrologiaMB)

## 🙏 Agradecimientos

- Swiss Ephemeris por los cálculos astrológicos precisos
- Comunidad de Next.js y React
- Contribuidores del proyecto

---

**⭐ Si este proyecto te resulta útil, considera darle una estrella en GitHub!**
