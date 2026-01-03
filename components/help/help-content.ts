import { CreditCard, Map, Calendar, User, HelpCircle, Moon, Cpu, Bot, Star, Sparkles, BookOpen } from "lucide-react";

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
        id: "getting_started",
        title: "Primeros Pasos",
        icon: Sparkles,
        items: [
            {
                question: "¿Qué puedo hacer en Astrochat?",
                answer: "Astrochat es tu centro de comando astrológico. Aquí puedes generar reportes profundos de tu carta natal, consultar tu calendario personal de tránsitos diarios y planificar tu vida con los ciclos de la Luna. Todo personalizado con tu hora exacta de nacimiento."
            },
            {
                question: "¿Por dónde empiezo?",
                answer: "Te recomendamos ir a la sección 'Cartas' y generar tu Carta Trópica. Es el mapa base de tu personalidad. Luego, explora el Calendario Personal para ver qué acciones te favorecen hoy."
            },
            {
                question: "¿Cuánto tarda en generarse mi interpretación?",
                answer: "El análisis de una carta natal (especialmente la Carta Dracónica) es un proceso profundo que cruza miles de variables con IA. Por lo general, toma entre 1 y 2 minutos. Puedes cerrar la ventana y relajarte, nosotros te avisaremos cuando esté listo (Notificación 'Fire & Forget')."
            }
        ]
    },
    {
        id: "charts_services",
        title: "Cartas y AstroGematria",
        icon: Map,
        items: [
            {
                question: "¿Qué es la Carta Dracónica?",
                answer: "Es una carta basada en los Nodos Lunares, que refleja el propósito del alma y vidas pasadas. Si tienes suscripción, este cálculo es automático y revela la misión espiritual detrás de tu personalidad."
            },
            {
                question: "¿Cómo funciona el servicio de Carta Horaria?",
                answer: "Si tienes una consulta horaria puedes completar el formulario. Recibiremos tu consulta y si se puede responder (si es radical) te avisaremos y enviaremos un link de pago para recibir tu respuesta profesional."
            },
            {
                question: "¿Quiero Rectificar mi hora de nacimiento",
                answer: "Si te interesa rectificar tu hora de nacimiento, completa el formulario. Verificaremos que es posible rectificar tu horario de nacimiento con los datos provistos y, de ser viable, te enviaremos un link de pago."
            },
            {
                question: "¿Qué es AstroGematria?",
                answer: "Te permite calcular el valor astrogematrico de cualquier palabra y ver en qué parte precisa de tu carta natal cae. Es ideal para analizar nombres, ciudades o marcas."
            },
            {
                question: "¿Términos Homeopáticos?",
                answer: "Hemos incorporado términos homeopáticos para que fácilmente veas dónde se ubican en tu carta natal. Importante: No es una recomendación homeopática, siempre consulta a tu médico homeópata."
            }
        ]
    },
    {
        id: "calendar",
        title: "Mi Universo (Calendario)",
        icon: Calendar,
        items: [
            {
                question: "¿Cómo uso el Calendario Personal?",
                answer: "Tu calendario muestra una vista semanal de tus tránsitos. Navega entre semanas o meses para ver cómo los planetas activan tu carta día a día."
            },
            {
                question: "¿Qué es el 'Clima Astral'?",
                answer: "Es la energía de fondo del mes. Muestra por qué Casas de tu carta transitan los planetas lentos (Júpiter a Plutón). Es el escenario donde ocurre tu vida este mes."
            },
            {
                question: "¿Qué muestra el Calendario Lunar?",
                answer: "Muestra las Fases Lunares y Eclipses. Lo especial es que calcula si estos eventos tocan tus puntos sensibles (conjunciones). Recuerda que los calendarios de años futuros se desbloquean en Diciembre."
            }
        ]
    },
    {
        id: "billing",
        title: "Mi Suscripción",
        icon: CreditCard,
        items: [
            {
                question: "¿Cómo cancelo mi suscripción?",
                answer: "Puedes cancelar en cualquier momento desde: Menú Usuario (abajo izquierda) -> Gestionar Suscripción. Tu acceso continuará hasta el final del período pagado."
            },
            {
                question: "¿Qué incluye el Base Bundle?",
                answer: "El paquete base incluye la Carta Natal Trópica ilimitada y el Calendario Personal Básico. Es el requisito para adquirir otros complementos."
            },
            {
                question: "¿Si cancelo, pierdo mis compras?",
                answer: "Sí. El acceso a los reportes y herramientas premium se mantiene solo mientras tu suscripción esté activa. Si cancelas, perderás el acceso al finalizar tu periodo de facturación actual."
            }
        ]
    },
    {
        id: "support",
        title: "Soporte y Metodología",
        icon: HelpCircle,
        items: [
            {
                question: "Veo un candado 🔒 en una función",
                answer: "Suele ocurrir si tu sesión no se ha actualizado tras una compra. Prueba Cerrar Sesión y volver a entrar para recargar tus permisos."
            },
            {
                question: "Veo datos antiguos",
                answer: "Si cambaste tu hora de nacimiento recientemente en 'Completar Datos', asegúrate de contactar a soporte si la diferencia no se actualiza (puede ser caché)."
            },
            {
                question: "¿Qué sistema de casas utilizan?",
                answer: "Utilizamos Placidus para cálculos trópicos y Nodos Verdaderos (True Node) con precisión de Swiss Ephemeris."
            },
            {
                question: "Encontré un error, ¿qué hago?",
                answer: "Toma una captura de pantalla y envíala a info@astrochat.online con una breve descripción."
            }
        ]
    }
];
