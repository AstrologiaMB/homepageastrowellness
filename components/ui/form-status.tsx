import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from "lucide-react"

const formStatusVariants = cva(
  "flex items-start gap-3 p-4 rounded-lg border transition-all duration-200",
  {
    variants: {
      variant: {
        success: "border-green-500/20 bg-green-500/5 text-green-800 dark:text-green-400",
        error: "border-destructive/20 bg-destructive/5 text-destructive",
        warning: "border-warning/20 bg-warning/5 text-warning",
        info: "border-blue-500/20 bg-blue-500/5 text-blue-800 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

export interface FormStatusProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formStatusVariants> {
  variant?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  dismissible?: boolean
  onDismiss?: () => void
}

const variantIcons = {
  success: <CheckCircle2 className="h-5 w-5 flex-shrink-0" />,
  error: <AlertCircle className="h-5 w-5 flex-shrink-0" />,
  warning: <AlertTriangle className="h-5 w-5 flex-shrink-0" />,
  info: <Info className="h-5 w-5 flex-shrink-0" />,
}

const FormStatus = React.forwardRef<HTMLDivElement, FormStatusProps>(
  ({ className, variant = 'info', title, children, dismissible = false, onDismiss, ...props }, ref) => {
    const [visible, setVisible] = React.useState(true)

    const handleDismiss = () => {
      setVisible(false)
      onDismiss?.()
    }

    if (!visible) return null

    return (
      <div
        ref={ref}
        className={cn(formStatusVariants({ variant }), className)}
        role="alert"
        {...props}
      >
        <div className={cn("flex-shrink-0", variant === 'success' && 'text-green-600 dark:text-green-400', variant === 'error' && 'text-destructive', variant === 'warning' && 'text-warning', variant === 'info' && 'text-blue-600 dark:text-blue-400')}>
          {variantIcons[variant]}
        </div>
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-sm mb-1">{title}</p>
          )}
          <p className="text-sm leading-relaxed">{children}</p>
        </div>
        {dismissible && (
          <button
            type="button"
            onClick={handleDismiss}
            className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity focus:outline-none focus:ring-2 focus:ring-ring rounded-sm p-0.5"
            aria-label="Cerrar mensaje"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
FormStatus.displayName = "FormStatus"

export { FormStatus, formStatusVariants }

// Convenience components for common use cases
export const FormSuccess = (props: Omit<FormStatusProps, 'variant'>) => (
  <FormStatus variant="success" {...props} />
)

export const FormError = (props: Omit<FormStatusProps, 'variant'>) => (
  <FormStatus variant="error" {...props} />
)

export const FormWarning = (props: Omit<FormStatusProps, 'variant'>) => (
  <FormStatus variant="warning" {...props} />
)

export const FormInfo = (props: Omit<FormStatusProps, 'variant'>) => (
  <FormStatus variant="info" {...props} />
)
