import * as React from "react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from "lucide-react"

export type FormFieldState = 'default' | 'error' | 'success' | 'warning'

const stateIcons = {
  error: <AlertCircle className="h-4 w-4 text-destructive" />,
  success: <CheckCircle2 className="h-4 w-4 text-green-500" />,
  warning: <AlertTriangle className="h-4 w-4 text-warning" />,
  default: null,
}

export interface FormFieldBaseProps {
  id?: string
  label?: string
  description?: string
  error?: string
  state?: FormFieldState
  required?: boolean
  containerClassName?: string
}

export interface FormFieldInputProps extends FormFieldBaseProps {
  type: 'input'
  inputSize?: 'sm' | 'md' | 'lg'
}

export interface FormFieldTextareaProps extends FormFieldBaseProps {
  type: 'textarea'
  textareaSize?: 'sm' | 'md' | 'lg'
}

export type FormFieldProps = FormFieldInputProps | FormFieldTextareaProps

const FormField = React.forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  FormFieldProps
>((props, ref) => {
  const {
    id,
    label,
    description,
    error,
    state = error ? 'error' : 'default',
    required,
    containerClassName,
    type,
    ...rest
  } = props

  const fieldId = id || (rest as any).name || `field-${Math.random().toString(36).substring(2, 9)}`
  const errorMessage = error || (state === 'error' ? 'Este campo tiene un error' : undefined)
  const showIcon = state !== 'default'

  // Get the correct size prop name based on type
  const sizeProp = type === 'input' ? 'inputSize' : 'textareaSize'
  const sizeValue = (rest as any)[sizeProp] || 'md'

  return (
    <div className={cn("space-y-1.5", containerClassName)}>
      {label && (
        <div className="flex items-center gap-1.5">
          <Label
            htmlFor={fieldId}
            className={cn(
              "text-sm font-medium",
              state === 'error' && "text-destructive",
              state === 'success' && "text-green-600",
              state === 'warning' && "text-warning"
            )}
          >
            {label}
            {required && <span className="text-destructive ml-0.5">*</span>}
          </Label>
          {showIcon && stateIcons[state]}
        </div>
      )}

      {description && state === 'default' && (
        <p className="text-xs text-muted-foreground flex items-center gap-1">
          <Info className="h-3 w-3" />
          {description}
        </p>
      )}

      {type === 'input' ? (
        <Input
          ref={ref as React.Ref<HTMLInputElement>}
          id={fieldId}
          state={state}
          inputSize={sizeValue}
          {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        />
      ) : (
        <Textarea
          ref={ref as React.Ref<HTMLTextAreaElement>}
          id={fieldId}
          state={state}
          textareaSize={sizeValue}
          {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      )}

      {errorMessage && state === 'error' && (
        <p className="text-xs text-destructive flex items-center gap-1 animate-in fade-in slide-in-from-top-1">
          <AlertCircle className="h-3 w-3" />
          {errorMessage}
        </p>
      )}

      {state === 'success' && (
        <p className="text-xs text-green-600 flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Campo válido
        </p>
      )}

      {state === 'warning' && (
        <p className="text-xs text-warning flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          {description || 'Verifica este campo'}
        </p>
      )}
    </div>
  )
})
FormField.displayName = "FormField"

export { FormField }
