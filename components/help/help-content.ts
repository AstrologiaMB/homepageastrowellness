import { CreditCard, Map, Calendar, HelpCircle, Sparkles } from 'lucide-react';

export interface HelpCategory {
  id: string;
  title: string;
  icon: any;
  items: HelpItem[];
}

export interface HelpItem {
  question: string;
  answer: string;
  context?: string; // Optional: Link to a specific page
}

export const HELP_CONTENT: HelpCategory[] = [
  {
    id: 'getting_started',
    title: 'Primeros Pasos',
    icon: Sparkles,
    items: [
      {
        question: '¿Qué puedo hacer en Astrochat?',
        answer:
          'Astrochat es tu centro de comando astrológico. Aquí puedes generar reportes profundos de tu carta natal, consultar tu calendario personal de tránsitos diarios y planificar tu vida con los ciclos de la Luna. Todo personalizado con tu hora exacta de nacimiento.',
      },
      {
        question: '¿Por dónde empiezo?',
        answer:
          "Te recomendamos ir a la sección 'Cartas' y generar tu Carta Trópica. Es el mapa base de tu personalidad. Luego, explora el Calendario Personal para ver qué acciones te favorecen hoy.",
      },
      {
        question: '¿Cuánto tarda en generarse mi interpretación?',
        answer:
          "El análisis de una carta natal (especialmente la Carta Dracónica) es un proceso profundo que cruza miles de variables con IA. Por lo general, toma entre 1 y 2 minutos. Puedes cerrar la ventana y relajarte, nosotros te avisaremos cuando esté listo (Notificación 'Fire & Forget').",
      },
    ],
  },
  {
    id: 'charts_services',
    title: 'Cartas y AstroGematria',
    icon: Map,
    items: [
      {
        question: '¿Qué es la Carta Trópica y qué significan sus símbolos?',
        answer:
          'La Carta Trópica es tu mapa natal base. En el gráfico, verás letras que indican el "Estado Cósmico" o "Dignidad" de cada planeta:\n\n**r (Domicilio/Regencia):** El planeta está en el signo que gobierna. Su energía fluye de manera fuerte y natural.\n**e (Exaltación):** El planeta está como "invitado de honor". Su energía se magnifica positivamente.\n**E (Exaltación Exacta):** El planeta está exactamente en el grado de su máxima exaltación.\n**d (Detrimento/Exilio):** El planeta está en el signo opuesto a su domicilio. Es un terreno incómodo para su energía.\n**f (Caída):** El planeta está en el signo opuesto a su exaltación. Requiere más esfuerzo consciente.\n**R (Retrógrado - Mayúscula):** El planeta parece viajar hacia atrás desde la Tierra. Invita a la revisión interna de su energía.',
      },
      {
        question: '¿Qué es la Carta Dracónica?',
        answer:
          'Es una carta basada en los Nodos Lunares, que refleja el propósito del alma y vidas pasadas. Si tienes suscripción, este cálculo es automático y revela la misión espiritual detrás de tu personalidad.',
      },
      {
        question: '¿Cómo funciona el servicio de Carta Horaria?',
        answer:
          'Si tienes una consulta horaria puedes completar el formulario. Recibiremos tu consulta y si se puede responder (si es radical) te avisaremos y enviaremos un link de pago para recibir tu respuesta profesional.',
      },
      {
        question: '¿Quiero Rectificar mi hora de nacimiento',
        answer:
          'Si te interesa rectificar tu hora de nacimiento, completa el formulario. Verificaremos que es posible rectificar tu horario de nacimiento con los datos provistos y, de ser viable, te enviaremos un link de pago.',
      },
      {
        question: '¿Qué es AstroGematria?',
        answer:
          'Te permite calcular el valor astrogematrico de cualquier palabra y ver en qué parte precisa de tu carta natal cae. Es ideal para analizar nombres, ciudades o marcas.',
      },
      {
        question: '¿Términos Homeopáticos?',
        answer:
          'Hemos incorporado términos homeopáticos para que fácilmente veas dónde se ubican en tu carta natal. Importante: No es una recomendación homeopática, siempre consulta a tu médico homeópata.',
      },
    ],
  },
  {
    id: 'calendar',
    title: 'Mi Universo (El Calendario Personal)',
    icon: Calendar,
    items: [
      {
        question: '¿Qué es el Calendario Personal y cómo lo leo?',
        answer:
          'A diferencia de un horóscopo general, tu Calendario Personal es un mapa temporal calculado milimétricamente contra tu Carta Natal única. Los días donde no hay tarjetas son días de integración o "rutina cósmica". Cuando hay movimiento en el cielo que toca tu carta, lo verás reflejado. **Lee siempre las tarjetas de arriba hacia abajo**: las más grandes y coloridas son las energías protagonistas del día, y las más pequeñas son el contexto de fondo.',
      },
      {
        question: '¿Qué son las Tarjetas "Hero" (Eventos Destacados)?',
        answer:
          '¿Has tenido días donde sientes que hay un "antes y un después"? Las **Tarjetas Hero** son eventos astrológicos de máxima potencia. Aparecen expandidas por defecto y en colores vibrantes:\n\n🔥 **Hitos Celestiales (Eclipses y Lunas Mayores):** Te marcan grandes finales, inicios o revelaciones.\n🪐 **Hitos Personales (Planetas Lentos):** Cuando gigantes como Júpiter (Oro), Saturno (Acero) o Plutón (Lava) hacen un contacto **matemáticamente exacto** con tus puntos personales. Son los tránsitos que definen capítulos enteros de tu vida. Solo las verás en el día de su mayor clímax.',
      },
      {
        question: '¿Para qué sirve el buscador (La Lupa)?',
        answer:
          'Es tu máquina del tiempo astrológica. Te permite escanear todo el año actual en segundos. Lo hemos dividido en 4 niveles de impacto para que filtres lo que buscas:\n\n💎 **Hitos Relevantes:** Encuentra rápidamente los Eclipses y Fases Lunares clave de este año.\n🪐 **Clima Generacional:** Busca los grandes tránsitos de planetas lentos (los que cambian las reglas del juego).\n⚡ **Activadores Personales:** Rastrea planetas rápidos como Venus (Amor/Valor) o Marte (Acción/Deseo).\n🌙 **El Pulso Diario:** Sigue el recorrido emocional de la Luna por los signos.\n\n*Tip Pro: Usa el interruptor **"Solo Hitos Importantes"** para limpiar el ruido y ver instantáneamente los días cruciales.*',
      },
      {
        question: '¿Qué significan las insignias de "⚡ Activador Lunar o de Eclipse"?',
        answer:
          'Imagina que hay luna llena y sientes la tensión en el aire... de repente, un tránsito menor (como la Luna tocando a Mercurio) prende la mecha y tienes una conversación reveladora. Esa insignia amarilla parpadeante te avisa que ese tránsito, aunque parezca pequeño, es el "gatillo" que está activando la gran energía del eclipse o fase lunar de ese día. ¡Presta atención a esas horas, son ventanas de acción!',
      },
      {
        question: '¿Qué es la "Historia del Ciclo"?',
        answer:
          'La Luna no funciona en eventos aislados de un solo día, sino en tramas largas. Cada Luna Nueva planta una "semilla" en un área de tu vida que tarda 27 meses en completarse (pasando por fases de Acción, Fructificación y Liberación en el mismo signo). Usa el botón **"Ver Historia del Ciclo"** debajo de las fases lunares para rastrear esta evolución en el tiempo y entender qué patrón de tu vida se está activando.',
      },
    ],
  },
  {
    id: 'billing',
    title: 'Mi Suscripción',
    icon: CreditCard,
    items: [
      {
        question: '¿Cómo cancelo mi suscripción?',
        answer:
          'Puedes cancelar en cualquier momento desde: Menú Usuario (abajo izquierda) -> Gestionar Suscripción. Tu acceso continuará hasta el final del período pagado.',
      },
      {
        question: '¿Qué incluye el Base Bundle?',
        answer:
          'El paquete base incluye la Carta Natal Trópica ilimitada y el Calendario Personal Básico. Es el requisito para adquirir otros complementos.',
      },
      {
        question: '¿Si cancelo, pierdo mis compras?',
        answer:
          'Sí. El acceso a los reportes y herramientas premium se mantiene solo mientras tu suscripción esté activa. Si cancelas, perderás el acceso al finalizar tu periodo de facturación actual.',
      },
    ],
  },
  {
    id: 'support',
    title: 'Soporte y Metodología',
    icon: HelpCircle,
    items: [
      {
        question: 'Veo un candado 🔒 en una función',
        answer:
          'Suele ocurrir si tu sesión no se ha actualizado tras una compra. Prueba Cerrar Sesión y volver a entrar para recargar tus permisos.',
      },
      {
        question: 'Veo datos antiguos',
        answer:
          "Si cambaste tu hora de nacimiento recientemente en 'Completar Datos', asegúrate de contactar a soporte si la diferencia no se actualiza (puede ser caché).",
      },
      {
        question: '¿Qué sistema de casas utilizan?',
        answer:
          'Utilizamos Placidus para cálculos trópicos y Nodos Verdaderos (True Node) con precisión de Swiss Ephemeris.',
      },
      {
        question: 'Encontré un error, ¿qué hago?',
        answer:
          'Toma una captura de pantalla y envíala a info@astrochat.online con una breve descripción.',
      },
    ],
  },
];
