import { z } from 'zod'

// =============================================================================
// BASE VALIDATORS
// =============================================================================

/**
 * Email validator with common checks
 */
export const emailSchema = z
  .string()
  .min(1, 'El email es requerido')
  .email('El formato del email no es válido')
  .max(255, 'El email es demasiado largo')
  .transform((val) => val.trim().toLowerCase())

/**
 * Password validator with strength requirements
 */
export const passwordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña es demasiado larga')

/**
 * Strong password validator (for new registrations)
 */
export const strongPasswordSchema = z
  .string()
  .min(8, 'La contraseña debe tener al menos 8 caracteres')
  .max(128, 'La contraseña es demasiado larga')
  .regex(/[a-z]/, 'La contraseña debe contener al menos una letra minúscula')
  .regex(/[A-Z]/, 'La contraseña debe contener al menos una letra mayúscula')
  .regex(/[0-9]/, 'La contraseña debe contener al menos un número')
  .regex(/[^a-zA-Z0-9]/, 'La contraseña debe contener al menos un carácter especial')

/**
 * Name validator (first or last name)
 */
export const nameSchema = z
  .string()
  .min(1, 'El nombre es requerido')
  .min(2, 'El nombre debe tener al menos 2 caracteres')
  .max(100, 'El nombre es demasiado largo')
  .transform((val) => val.trim())

/**
 * Date validator (YYYY-MM-DD format)
 */
export const dateSchema = z
  .string()
  .min(1, 'La fecha es requerida')
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'El formato de la fecha debe ser AAAA-MM-DD')
  .refine((date) => {
    const parsed = new Date(date)
    return !isNaN(parsed.getTime())
  }, 'Fecha inválida')

/**
 * Phone number validator (flexible format)
 */
export const phoneSchema = z
  .string()
  .min(1, 'El teléfono es requerido')
  .regex(/^[+]?[\d\s\-()]+$/, 'El formato del teléfono no es válido')
  .min(10, 'El teléfono debe tener al menos 10 dígitos')
  .transform((val) => val.trim())

/**
 * City name validator
 */
export const citySchema = z
  .string()
  .min(1, 'La ciudad es requerida')
  .min(2, 'La ciudad debe tener al menos 2 caracteres')
  .max(100, 'La ciudad es demasiado larga')
  .transform((val) => val.trim())

/**
 * Country name validator
 */
export const countrySchema = z
  .string()
  .min(1, 'El país es requerido')
  .min(2, 'El país debe tener al menos 2 caracteres')
  .max(100, 'El país es demasiado largo')
  .transform((val) => val.trim())

// =============================================================================
// AUTH FORM SCHEMAS
// =============================================================================

/**
 * Login form schema
 */
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type LoginFormData = z.infer<typeof loginSchema>

/**
 * Registration form schema
 */
export const registerSchema = z
  .object({
    name: nameSchema,
    email: emailSchema,
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    termsAccepted: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los términos y condiciones',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerSchema>

/**
 * Forgot password form schema
 */
export const forgotPasswordSchema = z.object({
  email: emailSchema,
})

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>

/**
 * Reset password form schema
 */
export const resetPasswordSchema = z
  .object({
    password: strongPasswordSchema,
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>

// =============================================================================
// USER DATA FORM SCHEMAS
// =============================================================================

/**
 * Birth data schema (for natal chart calculations)
 */
export const birthDataSchema = z.object({
  birthDate: dateSchema.refine((date) => {
    const parsed = new Date(date)
    const maxDate = new Date()
    maxDate.setFullYear(maxDate.getFullYear() - 120)
    const minDate = new Date()
    minDate.setDate(minDate.getDate() - 1)
    return parsed <= minDate && parsed >= maxDate
  }, 'La fecha de nacimiento debe estar entre hace 120 años y hoy'),
  birthCity: citySchema,
  birthCountry: countrySchema,
  knowsBirthTime: z.boolean().default(false),
  birthHour: z.number().int().min(0).max(23).optional(),
  birthMinute: z.number().int().min(0).max(59).optional(),
})

export type BirthDataFormData = z.infer<typeof birthDataSchema>

/**
 * Residence data schema
 */
export const residenceDataSchema = z.object({
  residenceCity: citySchema,
  residenceCountry: countrySchema,
})

export type ResidenceDataFormData = z.infer<typeof residenceDataSchema>

/**
 * Gender schema
 */
export const genderSchema = z.enum(['masculino', 'femenino', 'otro', 'prefiero_no_decirlo'], {
  errorMap: () => ({ message: 'Selecciona una opción válida' }),
})

/**
 * Complete user data schema
 */
export const userDataSchema = z.object({
  ...birthDataSchema.shape,
  ...residenceDataSchema.shape,
  gender: genderSchema,
})

export type UserDataFormData = z.infer<typeof userDataSchema>

// =============================================================================
// CHART FORM SCHEMAS
// =============================================================================

/**
 * Carta Horaria form schema
 */
export const cartaHorariaSchema = z.object({
  firstName: nameSchema,
  lastName: nameSchema,
  email: emailSchema,
  country: z.string().min(1, 'Debes seleccionar un país'),
  acceptSingleQuestion: z.enum(['Si', 'no'], {
    errorMap: () => ({ message: 'Debes seleccionar una opción' }),
  }),
  isFirstTime: z.enum(['Si', 'no'], {
    errorMap: () => ({ message: 'Debes seleccionar una opción' }),
  }),
  questionCategory: z.string().min(1, 'Debes seleccionar una categoría'),
  acceptConsiderations: z.boolean().refine((val) => val === true, {
    message: 'Debes aceptar las consideraciones para continuar',
  }),
  question: z
    .string()
    .min(5, 'La pregunta debe tener al menos 5 caracteres')
    .max(500, 'La pregunta es demasiado larga'),
  context: z.string().max(1000, 'El contexto es demasiado largo').optional(),
})

export type CartaHorariaFormData = z.infer<typeof cartaHorariaSchema>

/**
 * Carta Electiva form schema
 */
export const cartaElectivaSchema = z.object({
  tema: z.string().min(1, 'Debes seleccionar un propósito'),
  fechaInicio: dateSchema,
  dias: z.coerce.number().int().min(1).max(90, 'El período debe estar entre 1 y 90 días'),
})

export type CartaElectivaFormData = z.infer<typeof cartaElectivaSchema>

// =============================================================================
// GENERIC HELPERS
// =============================================================================

/**
 * Creates a schema that trims and converts to lowercase
 */
export const trimmedLowercase = () =>
  z.string().transform((val) => val.trim().toLowerCase())

/**
 * Creates an optional schema that, if present, must be non-empty after trimming
 */
export const nonEmptyOptional = () =>
  z.string().optional().refine((val) => !val || val.trim().length > 0, {
    message: 'Este campo no puede estar vacío',
  })
