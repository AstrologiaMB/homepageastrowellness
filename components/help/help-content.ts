import { CreditCard, Map, Calendar, User, HelpCircle, Moon, Cpu } from "lucide-react";

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
        id: "billing",
        title: "Suscripciones y Pagos",
        icon: CreditCard,
        items: [
            {
                question: "¿Cómo cancelo mi suscripción?",
                answer: "Puedes cancelar en cualquier momento desde: Menú Usuario (abajo izquierda) -> Gestionar Suscripción -> Ir al Portal de Facturación. Tu acceso continuará hasta el final del período pagado."
            },
            {
                question: "¿Qué incluye el Base Bundle?",
                answer: "El paquete base incluye la Carta Natal Trópica ilimitada y el Calendario Personal Básico. Es el requisito para adquirir otros complementos."
            },
            {
                question: "¿Si cancelo, pierdo mis compras de por vida?",
                answer: "No. Las compras 'Lifetime' (como la Carta Dracónica) son tuyas para siempre, incluso si cancelas la suscripción mensual base."
            },
            {
                question: "¿Cómo actualizo mi tarjeta de crédito?",
                answer: "Ve a 'Gestionar Suscripción' y serás redirigido al portal seguro de Stripe donde puedes agregar o quitar métodos de pago."
            }
        ]
    },
    {
        id: "methodology",
        title: "Metodología y Tecnología",
        icon: Cpu,
        items: [
            {
                question: "¿Qué sistema de cálculo utilizan?",
                answer: "Utilizamos el sistema de casas **Placidus** para todos los cálculos trópicos (el estándar en astrología psicológica). Para la **Carta Dracónica**, aplicamos la técnica avanzada de superposición: calculamos tu carta desde los Nodos Lunares y la superponemos a tu carta trópica para revelar cómo tu misión espiritual impacta tu realidad diaria."
            },
            {
                question: "¿Quién escribe mi reporte? ¿Es 100% IA?",
                answer: "Es una colaboración híbrida única. Utilizamos tecnología de IA de última generación para *redactar* y *conectar* los puntos de tu carta, pero el **contenido astrológico base** proviene estrictamente de la académica **María Blaquier**. La tecnología es el vehículo que personaliza el reporte; la sabiduría y las definiciones son 100% de la autora."
            },
            {
                question: "¿Por qué mi carta se ve diferente a otros sitios?",
                answer: "Pequeñas diferencias (de 1° o 2°) son posibles. Nosotros calculamos específicamente el **Nodo Norte Verdadero** (True Node), mientras que otros sitios usan por defecto el Nodo Medio (Mean Node). Nuestros cálculos están calibrados con *Swiss Ephemeris*, la fuente astronómica más precisa del mundo."
            },
            {
                question: "¿Puedo regenerar mi interpretación si no me gusta?",
                answer: "No. La regeneración es una función técnica reservada para administradores en caso de fallos del sistema. Tu reporte es único."
            },
            {
                question: "¿Esto reemplaza a un astrólogo?",
                answer: "Este informe es una herramienta poderosa de autoconocimiento y guía inicial, diseñada con rigor profesional. Sin embargo, ninguna herramienta digital puede replicar la sensibilidad, la intuición y el diálogo transformador de una sesión 1 a 1. Úsalo como un mapa para tu viaje."
            }
        ]
    },
    {
        id: "charts",
        title: "Cartas y AstroGematria",
        icon: Map,
        items: [
            {
                question: "¿Qué es la Carta Dracónica?",
                answer: "Es una carta basada en los Nodos Lunares, que refleja el propósito del alma y vidas pasadas. Se accede como un complemento de pago único."
            },
            {
                question: "¿Por qué mi Ascendente parece incorrecto?",
                answer: "Asegúrate de que la hora de nacimiento sea exacta (de tu partida de nacimiento). Un error de 4 minutos puede cambiar el grado del Ascendente."
            },
            {
                question: "¿Qué sistema de casas utilizas?",
                answer: "Por defecto utilizamos el sistema Placidus, que es el más común en la astrología psicológica moderna."
            }
        ]
    },
    {
        id: "lunar_calendar",
        title: "Calendario Lunar",
        icon: Moon, // Need to import Moon
        items: [
            {
                question: "¿Qué muestra el Calendario Lunar?",
                answer: "Muestra las Fases Lunares (Nueva, Llena, Cuartos) y Eclipses del año. Lo especial es que calcula si estos eventos hacen 'conjunción' exacta (0°) con tus planetas natales, activando áreas específicas de tu vida."
            },
            {
                question: "¿Cómo veo años anteriores o futuros?",
                answer: "En la parte superior verás pestañas por año (ej: [2025] [2026]). Simplemente haz clic para cambiar de año. El sistema guarda un histórico desde el 2025 en adelante."
            },
            {
                question: "¿Por qué el próximo año tiene un candado 🔒?",
                answer: "Los calendarios futuros se desbloquean automáticamente a mediados de Diciembre del año actual. Esto asegura que la información astrológica sea precisa y oportuna."
            },
            {
                question: "¿Qué significa el Diario Lunar?",
                answer: "Es tu espacio privado para registrar intenciones en Luna Nueva o soltar cargas en Luna Llena. Tus notas se guardan vinculadas a cada evento lunar específico."
            }
        ]
    },
    {
        id: "calendar",
        title: "Calendario y Eventos",
        icon: Calendar,
        items: [
            {
                question: "¿Cómo uso el Calendario Personal?",
                answer: "Tu calendario muestra una vista semanal de tus tránsitos. Puedes navegar entre semanas usando las flechas o seleccionar un mes específico con el calendario desplegable. Cada día te mostrará los contactos exactos entre los planetas en el cielo y tu carta natal."
            },
            {
                question: "¿Qué es el 'Clima Astral de Fondo'?",
                answer: "Es una fila de tarjetas en la parte superior que muestra por dónde transitan los planetas lentos (Júpiter a Plutón) y tu Luna Progresada en tus Casas Natales. Esta información se actualiza automáticamente el día 1 de cada mes. Además, verás el grado y signo exacto de cada planeta para mayor precisión."
            },
            {
                question: "¿Cómo busco tránsitos específicos?",
                answer: "Utiliza el botón de Lupa 🔍 'Explorador de Tránsitos'. Allí puedes filtrar por planeta (ej. 'Solo Marte'), tipo de aspecto (ej. 'Conjunciones') o buscar palabras clave como 'Retrógrado'. Al hacer clic en un resultado, el calendario te llevará directamente a la fecha de ese evento."
            },
            {
                question: "¿Qué significan los grados (ej. 15° 30')?",
                answer: "Mostramos la posición exacta de los planetas en grados (°) y minutos ('). Esto es útil para saber cuándo un planeta está entrando o saliendo de un signo o casa."
            },
            {
                question: "¿Qué horarios muestra el calendario?",
                answer: "Todos los eventos se calculan y muestran automáticamente en tu zona horaria local detectada por el navegador (ej. si viajas, el horario se ajusta a donde estés)."
            }
        ]
    },
    {
        id: "account",
        title: "Cuenta y Soporte",
        icon: User,
        items: [
            {
                question: "¿Cómo cambio mis datos de nacimiento?",
                answer: "Puedes editar tus datos de nacimiento hasta 3 veces por seguridad. Ve a Configuración de Usuario. Si necesitas más cambios, contacta a soporte."
            },
            {
                question: "Encontré un error, ¿qué hago?",
                answer: "Por favor, toma una captura de pantalla y envíala a info@astrochat.online con una breve descripción de lo que estabas haciendo."
            }
        ]
    }
];
