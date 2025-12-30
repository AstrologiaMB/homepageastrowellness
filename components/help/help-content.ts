import { CreditCard, Map, Calendar, User, HelpCircle } from "lucide-react";

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
