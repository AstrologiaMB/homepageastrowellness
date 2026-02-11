'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/auth/auth-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, CheckCircle2, Circle, UserCircle } from 'lucide-react';
import { AstroBackButtonInline } from '@/components/navigation/astro-back-button';

// Lista de países para el selector
const COUNTRIES = [
  { value: 'AF', label: 'Afghanistan' },
  { value: 'AL', label: 'Albania' },
  { value: 'DZ', label: 'Algeria' },
  { value: 'AS', label: 'American Samoa' },
  { value: 'AD', label: 'Andorra' },
  { value: 'AO', label: 'Angola' },
  { value: 'AI', label: 'Anguilla' },
  { value: 'AQ', label: 'Antarctica' },
  { value: 'AG', label: 'Antigua and Barbuda' },
  { value: 'AR', label: 'Argentina' },
  { value: 'AM', label: 'Armenia' },
  { value: 'AW', label: 'Aruba' },
  { value: 'AU', label: 'Australia' },
  { value: 'AT', label: 'Austria' },
  { value: 'AZ', label: 'Azerbaijan' },
  { value: 'BS', label: 'Bahamas' },
  { value: 'BH', label: 'Bahrain' },
  { value: 'BD', label: 'Bangladesh' },
  { value: 'BB', label: 'Barbados' },
  { value: 'BY', label: 'Belarus' },
  { value: 'BE', label: 'Belgium' },
  { value: 'BZ', label: 'Belize' },
  { value: 'BJ', label: 'Benin' },
  { value: 'BM', label: 'Bermuda' },
  { value: 'BT', label: 'Bhutan' },
  { value: 'BO', label: 'Bolivia' },
  { value: 'BA', label: 'Bosnia and Herzegovina' },
  { value: 'BW', label: 'Botswana' },
  { value: 'BR', label: 'Brazil' },
  { value: 'BN', label: 'Brunei Darussalam' },
  { value: 'BG', label: 'Bulgaria' },
  { value: 'BF', label: 'Burkina Faso' },
  { value: 'BI', label: 'Burundi' },
  { value: 'KH', label: 'Cambodia' },
  { value: 'CM', label: 'Cameroon' },
  { value: 'CA', label: 'Canada' },
  { value: 'CV', label: 'Cape Verde' },
  { value: 'KY', label: 'Cayman Islands' },
  { value: 'CF', label: 'Central African Republic' },
  { value: 'TD', label: 'Chad' },
  { value: 'CL', label: 'Chile' },
  { value: 'CN', label: 'China' },
  { value: 'CO', label: 'Colombia' },
  { value: 'KM', label: 'Comoros' },
  { value: 'CG', label: 'Congo' },
  { value: 'CD', label: 'Congo, Democratic Republic' },
  { value: 'CK', label: 'Cook Islands' },
  { value: 'CR', label: 'Costa Rica' },
  { value: 'CI', label: "Cote d'Ivoire" },
  { value: 'HR', label: 'Croatia' },
  { value: 'CU', label: 'Cuba' },
  { value: 'CW', label: 'Curacao' },
  { value: 'CY', label: 'Cyprus' },
  { value: 'CZ', label: 'Czech Republic' },
  { value: 'DK', label: 'Denmark' },
  { value: 'DJ', label: 'Djibouti' },
  { value: 'DM', label: 'Dominica' },
  { value: 'DO', label: 'Dominican Republic' },
  { value: 'EC', label: 'Ecuador' },
  { value: 'EG', label: 'Egypt' },
  { value: 'SV', label: 'El Salvador' },
  { value: 'GQ', label: 'Equatorial Guinea' },
  { value: 'ER', label: 'Eritrea' },
  { value: 'EE', label: 'Estonia' },
  { value: 'ET', label: 'Ethiopia' },
  { value: 'FK', label: 'Falkland Islands (Malvinas)' },
  { value: 'FO', label: 'Faroe Islands' },
  { value: 'FJ', label: 'Fiji' },
  { value: 'FI', label: 'Finland' },
  { value: 'FR', label: 'France' },
  { value: 'GA', label: 'Gabon' },
  { value: 'GM', label: 'Gambia' },
  { value: 'GE', label: 'Georgia' },
  { value: 'DE', label: 'Germany' },
  { value: 'GH', label: 'Ghana' },
  { value: 'GI', label: 'Gibraltar' },
  { value: 'GR', label: 'Greece' },
  { value: 'GL', label: 'Greenland' },
  { value: 'GD', label: 'Grenada' },
  { value: 'GU', label: 'Guam' },
  { value: 'GT', label: 'Guatemala' },
  { value: 'GG', label: 'Guernsey' },
  { value: 'GN', label: 'Guinea' },
  { value: 'GW', label: 'Guinea-Bissau' },
  { value: 'GY', label: 'Guyana' },
  { value: 'HT', label: 'Haiti' },
  { value: 'HN', label: 'Honduras' },
  { value: 'HK', label: 'Hong Kong' },
  { value: 'HU', label: 'Hungary' },
  { value: 'IS', label: 'Iceland' },
  { value: 'IN', label: 'India' },
  { value: 'ID', label: 'Indonesia' },
  { value: 'IR', label: 'Iran' },
  { value: 'IQ', label: 'Iraq' },
  { value: 'IE', label: 'Ireland' },
  { value: 'IM', label: 'Isle of Man' },
  { value: 'IL', label: 'Israel' },
  { value: 'IT', label: 'Italy' },
  { value: 'JM', label: 'Jamaica' },
  { value: 'JP', label: 'Japan' },
  { value: 'JE', label: 'Jersey' },
  { value: 'JO', label: 'Jordan' },
  { value: 'KZ', label: 'Kazakhstan' },
  { value: 'KE', label: 'Kenya' },
  { value: 'KI', label: 'Kiribati' },
  { value: 'KP', label: 'Korea North' },
  { value: 'KR', label: 'Korea South' },
  { value: 'KW', label: 'Kuwait' },
  { value: 'KG', label: 'Kyrgyzstan' },
  { value: 'LA', label: 'Laos' },
  { value: 'LV', label: 'Latvia' },
  { value: 'LB', label: 'Lebanon' },
  { value: 'LS', label: 'Lesotho' },
  { value: 'LR', label: 'Liberia' },
  { value: 'LY', label: 'Libya' },
  { value: 'LI', label: 'Liechtenstein' },
  { value: 'LT', label: 'Lithuania' },
  { value: 'LU', label: 'Luxembourg' },
  { value: 'MO', label: 'Macao' },
  { value: 'MK', label: 'Macedonia' },
  { value: 'MG', label: 'Madagascar' },
  { value: 'MW', label: 'Malawi' },
  { value: 'MY', label: 'Malaysia' },
  { value: 'MV', label: 'Maldives' },
  { value: 'ML', label: 'Mali' },
  { value: 'MT', label: 'Malta' },
  { value: 'MH', label: 'Marshall Islands' },
  { value: 'MR', label: 'Mauritania' },
  { value: 'MU', label: 'Mauritius' },
  { value: 'MX', label: 'Mexico' },
  { value: 'FM', label: 'Micronesia' },
  { value: 'MD', label: 'Moldova' },
  { value: 'MC', label: 'Monaco' },
  { value: 'MN', label: 'Mongolia' },
  { value: 'ME', label: 'Montenegro' },
  { value: 'MS', label: 'Montserrat' },
  { value: 'MA', label: 'Morocco' },
  { value: 'MZ', label: 'Mozambique' },
  { value: 'MM', label: 'Myanmar' },
  { value: 'NA', label: 'Namibia' },
  { value: 'NR', label: 'Nauru' },
  { value: 'NP', label: 'Nepal' },
  { value: 'NL', label: 'Netherlands' },
  { value: 'NC', label: 'New Caledonia' },
  { value: 'NZ', label: 'New Zealand' },
  { value: 'NI', label: 'Nicaragua' },
  { value: 'NE', label: 'Niger' },
  { value: 'NG', label: 'Nigeria' },
  { value: 'NU', label: 'Niue' },
  { value: 'NF', label: 'Norfolk Island' },
  { value: 'MP', label: 'Northern Mariana Islands' },
  { value: 'NO', label: 'Norway' },
  { value: 'OM', label: 'Oman' },
  { value: 'PK', label: 'Pakistan' },
  { value: 'PW', label: 'Palau' },
  { value: 'PS', label: 'Palestine' },
  { value: 'PA', label: 'Panama' },
  { value: 'PG', label: 'Papua New Guinea' },
  { value: 'PY', label: 'Paraguay' },
  { value: 'PE', label: 'Peru' },
  { value: 'PH', label: 'Philippines' },
  { value: 'PN', label: 'Pitcairn' },
  { value: 'PL', label: 'Poland' },
  { value: 'PT', label: 'Portugal' },
  { value: 'PR', label: 'Puerto Rico' },
  { value: 'QA', label: 'Qatar' },
  { value: 'RO', label: 'Romania' },
  { value: 'RU', label: 'Russia' },
  { value: 'RW', label: 'Rwanda' },
  { value: 'WS', label: 'Samoa' },
  { value: 'SM', label: 'San Marino' },
  { value: 'ST', label: 'Sao Tome and Principe' },
  { value: 'SA', label: 'Saudi Arabia' },
  { value: 'SN', label: 'Senegal' },
  { value: 'RS', label: 'Serbia' },
  { value: 'SC', label: 'Seychelles' },
  { value: 'SL', label: 'Sierra Leone' },
  { value: 'SG', label: 'Singapore' },
  { value: 'SX', label: 'Sint Maarten' },
  { value: 'SK', label: 'Slovakia' },
  { value: 'SI', label: 'Slovenia' },
  { value: 'SB', label: 'Solomon Islands' },
  { value: 'SO', label: 'Somalia' },
  { value: 'ZA', label: 'South Africa' },
  { value: 'SS', label: 'South Sudan' },
  { value: 'ES', label: 'Spain' },
  { value: 'LK', label: 'Sri Lanka' },
  { value: 'SD', label: 'Sudan' },
  { value: 'SR', label: 'Suriname' },
  { value: 'SZ', label: 'Swaziland' },
  { value: 'SE', label: 'Sweden' },
  { value: 'CH', label: 'Switzerland' },
  { value: 'SY', label: 'Syria' },
  { value: 'TW', label: 'Taiwan' },
  { value: 'TJ', label: 'Tajikistan' },
  { value: 'TZ', label: 'Tanzania' },
  { value: 'TH', label: 'Thailand' },
  { value: 'TL', label: 'Timor-Leste' },
  { value: 'TG', label: 'Togo' },
  { value: 'TK', label: 'Tokelau' },
  { value: 'TO', label: 'Tonga' },
  { value: 'TT', label: 'Trinidad and Tobago' },
  { value: 'TN', label: 'Tunisia' },
  { value: 'TR', label: 'Turkey' },
  { value: 'TM', label: 'Turkmenistan' },
  { value: 'TC', label: 'Turks and Caicos Islands' },
  { value: 'TV', label: 'Tuvalu' },
  { value: 'UG', label: 'Uganda' },
  { value: 'UA', label: 'Ukraine' },
  { value: 'AE', label: 'United Arab Emirates' },
  { value: 'GB', label: 'United Kingdom' },
  { value: 'US', label: 'United States' },
  { value: 'UY', label: 'Uruguay' },
  { value: 'UZ', label: 'Uzbekistan' },
  { value: 'VU', label: 'Vanuatu' },
  { value: 'VA', label: 'Vatican City' },
  { value: 'VE', label: 'Venezuela' },
  { value: 'VN', label: 'Vietnam' },
  { value: 'VG', label: 'Virgin Islands, British' },
  { value: 'VI', label: 'Virgin Islands, U.S.' },
  { value: 'EH', label: 'Western Sahara' },
  { value: 'YE', label: 'Yemen' },
  { value: 'ZM', label: 'Zambia' },
  { value: 'ZW', label: 'Zimbabwe' },
];

// Categorías de preguntas
const QUESTION_CATEGORIES = [
  { value: 'Trabajo', label: 'Trabajo' },
  { value: 'Salud', label: 'Salud' },
  { value: 'Una relación', label: 'Una relación' },
  { value: 'Hijos', label: 'Hijos' },
  { value: 'Ventas', label: 'Ventas' },
  { value: 'Compras', label: 'Compras' },
  { value: 'Objetos perdidos', label: 'Objetos perdidos' },
  { value: 'Inversiones', label: 'Inversiones' },
  { value: 'Otros', label: 'Otros' },
];

// Esquema de validación para el formulario
const horariaFormSchema = z.object({
  firstName: z.string().min(2, { message: 'El nombre es requerido' }),
  lastName: z.string().min(2, { message: 'El apellido es requerido' }),
  email: z.string().email({ message: 'Email inválido' }),
  country: z.string().min(1, { message: 'Selecciona un país' }),
  acceptSingleQuestion: z.boolean().refine((val) => val === true, {
    message: 'Debes confirmar que entiendes',
  }),
  isFirstTime: z.boolean().default(false),
  questionCategory: z.string().min(1, { message: 'Selecciona una categoría' }),
  acceptConsiderations: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar las consideraciones',
  }),
  hasContext: z.enum(['yes', 'no'], {
    required_error: 'Por favor indica si deseas agregar contexto',
  }),
  question: z.string()
    .min(10, { message: 'La pregunta debe tener al menos 10 caracteres' })
    .max(500, { message: 'La pregunta no puede exceder los 500 caracteres' }),
  context: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.hasContext === 'yes' && (!data.context || data.context.length < 10)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'El contexto es requerido si seleccionas "Sí"',
      path: ['context'],
    });
  }
});

type HorariaFormData = z.infer<typeof horariaFormSchema>;

// Define form sections for progress tracking
const FORM_SECTIONS = [
  { key: 'personal', title: 'Información Personal', fields: ['firstName', 'lastName', 'email', 'country'] },
  { key: 'confirmation', title: 'Confirmaciones', fields: ['acceptSingleQuestion', 'isFirstTime'] },
  { key: 'category', title: 'Categoría', fields: ['questionCategory'] },
  { key: 'considerations', title: 'Consideraciones', fields: ['acceptConsiderations'] },
  { key: 'question', title: 'Tu Pregunta', fields: ['hasContext', 'question', 'context'] },
];

export default function CartasHorariaPage() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const [, setUserData] = useState<any>(null);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<HorariaFormData>({
    resolver: zodResolver(horariaFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      country: '',
      acceptSingleQuestion: false,
      isFirstTime: false,
      questionCategory: '',
      acceptConsiderations: false,
      question: '',
      context: '',
      hasContext: undefined,
    },
  });

  // Verificar autenticación
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/login?callbackUrl=${encodeURIComponent('/cartas/horaria')}`);
    }
  }, [isLoading, isAuthenticated, router]);

  // Cargar datos del usuario
  useEffect(() => {
    async function loadUserData() {
      if (isAuthenticated && user?.email) {
        try {
          const response = await fetch('/api/user/profile');
          if (response.ok) {
            const data = await response.json();
            setUserData(data);

            // Pre-llenar campos con datos del usuario
            form.setValue('firstName', user.name?.split(' ')[0] || '');
            form.setValue('lastName', user.name?.split(' ').slice(1).join(' ') || '');
            form.setValue('email', user.email || '');

            // Verificar si el usuario ha completado sus datos
            if (!data.birthDate || !data.birthCity || !data.residenceCity) {
              router.push(`/completar-datos?callbackUrl=${encodeURIComponent('/cartas/horaria')}`);
            }
          }
        } catch (error) {
          console.error('Error al cargar datos del usuario:', error);
        } finally {
          setLoadingData(false);
        }
      }
    }

    if (!isLoading) {
      loadUserData();
    }
  }, [isAuthenticated, isLoading, user, router, form]);

  // Manejar envío del formulario
  const onSubmit = async (data: HorariaFormData) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/cartas/horaria', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Error al procesar la solicitud');
      }

      alert(
        '¡Solicitud de carta horaria enviada con éxito! Te contactaremos pronto con la respuesta.'
      );
      router.push('/');
    } catch (error) {
      console.error('Error al enviar solicitud de carta horaria:', error);
      alert('Error al procesar la solicitud. Por favor, intenta nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Watch form changes to update section pills reactively
  useEffect(() => {
    const subscription = form.watch(() => {
      // Trigger re-render to update section completion pills
    });
    return () => subscription.unsubscribe();
  }, [form]);

  // Helper to determine if a section is complete
  const getSectionCompletion = useCallback(() => {
    const currentValues = form.getValues();
    return FORM_SECTIONS.reduce((acc, section) => {
      const isComplete = section.fields.every((field) => {
        const value = currentValues[field as keyof HorariaFormData];
        if (typeof value === 'boolean') return value === true;
        if (typeof value === 'string') return value.trim().length > 0;
        if (field === 'hasContext') return value !== undefined; // Ensure hasContext is selected
        return false;
      });
      acc[section.key] = isComplete;
      return acc;
    }, {} as Record<string, boolean>);
  }, [form]);

  const completedSteps = getSectionCompletion();

  // Mostrar pantalla de carga mientras se verifica la autenticación
  if (isLoading || loadingData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-blue-50/30 dark:from-purple-950/30 dark:via-background dark:to-blue-950/20 flex items-center justify-center p-6">
        <div className="glass-card-strong rounded-2xl p-8 text-center max-w-md">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50/50 via-background to-blue-50/30 dark:from-purple-950/30 dark:via-background dark:to-blue-950/20 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Navigation */}
        <div className="flex items-center gap-4">
          <AstroBackButtonInline href="/cartas" />
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Educational Content */}
          <div className="lg:col-span-7 space-y-6">
            {/* Hero Section */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl font-light tracking-tight text-foreground">
                Respuestas concretas a tus <span className="gradient-primary font-medium">preguntas más urgentes</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Descubre el poder de la Astrología Horaria para tomar decisiones precisas en el momento exacto.
              </p>
            </div>

            {/* What is Horary Astrology? */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                  <HelpCircle className="w-6 h-6 text-primary" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-light text-foreground">¿Qué es la Astrología Horaria?</h2>
              </div>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  A diferencia de una carta natal, la Astrología Horaria es una técnica tradicional y precisa que se enfoca en el <strong>presente</strong>. Se basa en el mapa del cielo en el momento exacto en que nace tu duda.
                </p>
                <p>
                  Es, en esencia, la herramienta más eficaz de la astrología para obtener <strong>respuestas puntuales a situaciones específicas</strong>. No necesitas tu hora de nacimiento para esta consulta, ¡solo tu pregunta!
                </p>
              </div>
            </div>

            {/* The Art of Asking */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-medium text-foreground">El arte de preguntar: La clave de la precisión</h2>
              <p className="text-muted-foreground">
                Para que los astros hablen con claridad, la pregunta debe nacer de una intención real. Una respuesta libre de ambigüedades requiere una pregunta <strong>meditada, directa y orientada a un resultado claro</strong>.
              </p>
            </div>

            {/* Examples */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-medium text-foreground mb-4">Ejemplos de consultas frecuentes</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Relaciones</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">¿Tenemos futuro como pareja? ¿Volverá mi ex?</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Carrera</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">¿Obtendré este empleo? ¿Me conviene cambiar de trabajo?</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Finanzas</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">¿Este viaje de negocios será lucrativo? ¿Es buen momento para invertir?</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Bienes</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">¿Me conviene comprar esta casa? ¿Venderé mi propiedad pronto?</p>
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <div className="flex items-center gap-2 text-foreground font-medium">
                    <CheckCircle2 className="w-4 h-4 text-primary" />
                    <span>Búsquedas</span>
                  </div>
                  <p className="text-sm text-muted-foreground pl-6">¿Dónde está mi mascota? ¿Dónde dejé las llaves?</p>
                </div>
              </div>
            </div>

            {/* Service Guarantee */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 space-y-4 border-l-4 border-l-primary/50">
              <h2 className="text-xl font-medium text-foreground">Un servicio personalizado y humano</h2>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span><strong>No recibirás un informe genérico</strong> generado por un software. Cada carta es analizada por un astrólogo profesional.</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span><strong>Análisis de viabilidad:</strong> Una vez recibida tu pregunta, evaluaremos si la consulta es apta para ser respondida con claridad.</span>
                </li>
                <li className="flex gap-3">
                  <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                  <span><strong>Respuesta detallada:</strong> Recibirás la interpretación completa directamente en tu correo electrónico.</span>
                </li>
              </ul>
            </div>

            {/* Pricing Section - Highlighting Transparency */}
            <div className="glass-card-strong rounded-2xl p-6 md:p-8 bg-gradient-to-br from-amber-500/10 to-transparent border border-amber-500/20">
              <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
                <div>
                  <h3 className="text-2xl font-light text-foreground mb-1">Valor e Inversión</h3>
                  <p className="text-3xl font-semibold gradient-primary">USD 85</p>
                </div>
                <div className="text-sm text-muted-foreground md:text-right max-w-sm">
                  <p className="font-medium text-foreground mb-1 flex items-center md:justify-end gap-2">
                    <UserCircle className="w-4 h-4 text-amber-500" />
                    Garantía de transparencia
                  </p>
                  <p>No realizas ningún pago por adelantado. Solo abonas una vez que hayamos confirmado que tu consulta puede ser respondida.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Form */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-6">

              {/* Form Card */}
              <div className="glass-card-strong rounded-2xl p-6 md:p-8 border-t-4 border-t-primary shadow-xl">
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-foreground">Consulta ahora</h2>
                  <p className="text-sm text-muted-foreground">Completa el formulario para iniciar tu análisis.</p>
                </div>

                {/* Existing Form Logic */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {FORM_SECTIONS.map((section) => {
                    const isComplete = completedSteps[section.key];
                    return (
                      <Badge
                        key={section.key}
                        variant={isComplete ? 'default' : 'outline'}
                        className={isComplete ? 'bg-primary text-primary-foreground' : 'text-muted-foreground'}
                      >
                        {isComplete ? (
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                        ) : (
                          <Circle className="w-3 h-3 mr-1" />
                        )}
                        {section.title}
                      </Badge>
                    );
                  })}
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
                      {/* Sección 1: Información Personal */}
                      <AccordionItem value="item-0" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                              <span className="text-primary font-semibold">1</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-foreground">Información Personal</h3>
                              <p className="text-sm text-muted-foreground">Tus datos de contacto</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField
                              control={form.control}
                              name="firstName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground">Nombre</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tu nombre" {...field} className="border-border/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            <FormField
                              control={form.control}
                              name="lastName"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-foreground">Apellidos</FormLabel>
                                  <FormControl>
                                    <Input placeholder="Tus apellidos" {...field} className="border-border/50" />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>

                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">Correo electrónico</FormLabel>
                                <FormControl>
                                  <Input type="email" placeholder="tu@email.com" {...field} className="border-border/50" />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="country"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">País donde resides</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-border/50">
                                      <SelectValue placeholder="Seleccionar país" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {COUNTRIES.map((country) => (
                                      <SelectItem key={country.value} value={country.value}>
                                        {country.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* Sección 2: Confirmaciones */}
                      <AccordionItem value="item-1" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                              <span className="text-primary font-semibold">2</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-foreground">Confirmaciones</h3>
                              <p className="text-sm text-muted-foreground">Requisitos de la carta horaria</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-4">
                          <FormField
                            control={form.control}
                            name="acceptSingleQuestion"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 glass-card p-4 rounded-lg">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary" />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-foreground cursor-pointer">
                                    Acepto que la carta horaria responde una (1) pregunta.
                                    <span className="text-primary ml-1">*</span>
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="isFirstTime"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 glass-card p-4 rounded-lg">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary" />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-foreground cursor-pointer">
                                    Es la primera vez que hago esta pregunta, a cualquier oráculo.
                                    <span className="text-primary ml-1">*</span>
                                  </FormLabel>
                                  <FormDescription className="text-xs">
                                    Si ya fue formulada, la carta horaria pierde validez.
                                  </FormDescription>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* Sección 3: Categoría */}
                      <AccordionItem value="item-2" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                              <span className="text-primary font-semibold">3</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-foreground">Categoría</h3>
                              <p className="text-sm text-muted-foreground">Área de tu pregunta</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2">
                          <FormField
                            control={form.control}
                            name="questionCategory"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-foreground">La pregunta es acerca de</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                  <FormControl>
                                    <SelectTrigger className="border-border/50">
                                      <SelectValue placeholder="Seleccionar categoría" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {QUESTION_CATEGORIES.map((category) => (
                                      <SelectItem key={category.value} value={category.value}>
                                        {category.label}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* Sección 4: Consideraciones */}
                      <AccordionItem value="item-3" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20">
                              <span className="text-primary font-semibold">4</span>
                            </div>
                            <div className="text-left">
                              <h3 className="font-semibold text-foreground">Consideraciones</h3>
                              <p className="text-sm text-muted-foreground">Importante antes de preguntar</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-4">
                          <div className="glass-card p-4 rounded-xl space-y-3">
                            <div className="flex items-start gap-2">
                              <span className="text-primary flex-shrink-0">•</span>
                              <p className="text-sm">
                                <strong className="text-foreground">Es preferible aportar un marco de tiempo.</strong>
                                <span className="text-muted-foreground"> Por ejemplo: ¿Formaré una relación en los próximos 6 meses? ¿Venderé la casa este año?</span>
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-primary flex-shrink-0">•</span>
                              <p className="text-sm">
                                <strong className="text-foreground">El Astrólogo NO es vidente.</strong>
                                <span className="text-muted-foreground"> Es importante especificar el contexto. Por ejemplo, si preguntas por Juan, aclarar si es amigo, hermano, etc.</span>
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-primary flex-shrink-0">•</span>
                              <p className="text-sm">
                                <strong className="text-foreground">Si no provees contexto inicial, no se enviará una nueva respuesta.</strong>
                                <span className="text-muted-foreground"> Incluye toda la información relevante desde el principio.</span>
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-primary flex-shrink-0">•</span>
                              <p className="text-sm">
                                <strong className="text-foreground">La carta horaria debe reflejar la realidad.</strong>
                                <span className="text-muted-foreground"> Cuanto más contexto, más precisa será la respuesta.</span>
                              </p>
                            </div>
                            <div className="flex items-start gap-2">
                              <span className="text-primary flex-shrink-0">•</span>
                              <p className="text-sm">
                                <strong className="text-foreground">Evita preguntas con múltiples opciones.</strong>
                                <span className="text-muted-foreground"> En lugar de "Conviene la opción A o B?", formula la pregunta con la alternativa que prefieres.</span>
                              </p>
                            </div>
                          </div>

                          <FormField
                            control={form.control}
                            name="acceptConsiderations"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-start space-x-3 space-y-0 glass-card p-4 rounded-lg">
                                <FormControl>
                                  <Checkbox checked={field.value} onCheckedChange={field.onChange} className="border-primary" />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                  <FormLabel className="text-foreground cursor-pointer">
                                    He leído y entendido las consideraciones
                                    <span className="text-primary ml-1">*</span>
                                  </FormLabel>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>

                      {/* Paso 5: Contexto y Pregunta (Reordenado) */}
                      <AccordionItem value="item-4" className="glass-card rounded-xl border-border/50 px-4">
                        <AccordionTrigger className="hover:no-underline py-4">
                          <div className="flex items-center gap-3 w-full">
                            <div className={`flex items-center justify-center w-8 h-8 rounded-full border ${completedSteps.question ? 'bg-primary border-primary text-primary-foreground' : 'border-muted-foreground/30 text-muted-foreground'}`}>
                              {completedSteps.question ? <CheckCircle2 className="w-5 h-5" /> : <span className="text-sm font-medium">5</span>}
                            </div>
                            <div className="text-left">
                              <h3 className={`font-medium ${completedSteps.question ? 'text-primary' : 'text-foreground'}`}>
                                Tu Pregunta
                              </h3>
                              <p className="text-sm text-muted-foreground">Contexto y formulación</p>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="pt-4 pb-2 space-y-6">

                          {/* 1. Selección de Contexto (Active Choice) */}
                          <FormField
                            control={form.control}
                            name="hasContext"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel className="text-base font-medium">¿Deseas agregar el contexto de tu pregunta?</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(val) => {
                                      field.onChange(val);
                                      if (val === 'no') {
                                        form.setValue('context', 'Sin contexto explícito');
                                      } else {
                                        form.setValue('context', '');
                                      }
                                    }}
                                    defaultValue={field.value}
                                    className="flex flex-col space-y-1"
                                  >
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="yes" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        Sí, es importante para entender la situación
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="no" />
                                      </FormControl>
                                      <FormLabel className="font-normal cursor-pointer">
                                        No, es una duda directa sin trasfondo necesario
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          {/* 2. Campo de Contexto (Condicional) */}
                          {form.watch('hasContext') === 'yes' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                              {/* Context Guide Alert */}
                              <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-sm">
                                <div className="flex gap-2 items-start">
                                  <span className="text-xl">💡</span>
                                  <div className="space-y-2">
                                    <p className="font-semibold text-blue-800 dark:text-blue-300">Tip de experto:</p>
                                    <p className="text-blue-700 dark:text-blue-400">
                                      Para que la carta responda con precisión, necesitamos los <strong>hechos</strong>, no solo la intención.
                                    </p>
                                    <ul className="list-none space-y-1 mt-1 text-muted-foreground">
                                      <li className="flex gap-2 text-red-500/80 dark:text-red-400/80">
                                        <span>❌</span> <span><em>Vago:</em> "¿Volveremos?"</span>
                                      </li>
                                      <li className="flex gap-2 text-emerald-600/80 dark:text-emerald-400/80">
                                        <span>✅</span> <span><em>Útil:</em> "Terminamos hace 3 meses, hubo contacto ayer y quiero saber si retomaremos la relación."</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>

                              <FormField
                                control={form.control}
                                name="context"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Tu contexto <span className="text-red-500">*</span></FormLabel>
                                    <FormControl>
                                      <Textarea
                                        placeholder="Describe la situación actual, los involucrados y hechos recientes relevantes..."
                                        className="resize-none min-h-[120px] bg-background/50"
                                        {...field}
                                      />
                                    </FormControl>
                                    <div className="flex justify-end">
                                      <span className="text-xs text-muted-foreground">
                                        {field.value?.length || 0}/1000
                                      </span>
                                    </div>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          {/* 3. Campo de Pregunta */}
                          <FormField
                            control={form.control}
                            name="question"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Tu pregunta a la Carta Horaria <span className="text-red-500">*</span></FormLabel>
                                <FormControl>
                                  <Textarea
                                    placeholder="¿Qué deseas preguntarle a la carta horaria?"
                                    className="resize-none min-h-[100px] bg-background/50"
                                    {...field}
                                  />
                                </FormControl>
                                <div className="flex justify-end">
                                  <span className="text-xs text-muted-foreground">
                                    {field.value?.length || 0}/500
                                  </span>
                                </div>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white shadow-elegant-lg"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Enviando...
                          </span>
                        ) : (
                          'Enviar mi pregunta'
                        )}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground mt-3">
                        Los campos marcados con <span className="text-primary">*</span> son obligatorios
                      </p>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
