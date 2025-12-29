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
                question: "¿Qué horarios muestra el calendario?",
                answer: "Todos los eventos se calculan y muestran automáticamente en tu zona horaria local detectada por el navegador."
            },
            {
                question: "¿Qué es el Calendario Lunar?",
                answer: "Es un complemento que te permite ver las fases lunares y cómo activan tu carta natal personal (tránsitos a tu Luna y Sol)."
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
