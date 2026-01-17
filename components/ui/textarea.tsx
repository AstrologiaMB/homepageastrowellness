import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-lg border bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
  {
    variants: {
      state: {
        default: "border-input hover:border-accent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
        error: "border-[--border-input-error] bg-[--bg-input-error] hover:border-[--border-input-error] focus-visible:border-[--border-input-error] focus-visible:ring-[--border-input-error]",
        success: "border-[--border-input-success] bg-[--bg-input-success] hover:border-[--border-input-success] focus-visible:border-[--border-input-success] focus-visible:ring-[--border-input-success]",
        warning: "border-[--border-input-warning] bg-[--bg-input-warning] hover:border-[--border-input-warning] focus-visible:border-[--border-input-warning] focus-visible:ring-[--border-input-warning]",
      },
      textareaSize: {
        sm: "px-3 py-2 text-sm",
        md: "px-3 py-2 text-sm",
        lg: "px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      state: "default",
      textareaSize: "md",
    },
  }
)

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    Omit<VariantProps<typeof textareaVariants>, 'textareaSize'> {
  state?: 'default' | 'error' | 'success' | 'warning'
  textareaSize?: 'sm' | 'md' | 'lg'
  showCount?: boolean
  autoResize?: boolean
  maxLength?: number
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, state, textareaSize, showCount, autoResize, maxLength, value, onChange, ...props }, ref) => {
    const internalRef = React.useRef<HTMLTextAreaElement>(null)
    const textRef = (ref as React.RefObject<HTMLTextAreaElement>) || internalRef
    const [count, setCount] = React.useState(0)

    // Update character count
    React.useEffect(() => {
      if (showCount) {
        setCount(String(value || '').length)
      }
    }, [value, showCount])

    // Auto-resize functionality
    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (autoResize && textRef.current) {
        textRef.current.style.height = 'auto'
        textRef.current.style.height = `${textRef.current.scrollHeight}px`
      }
      onChange?.(e)
    }

    return (
      <div className="relative w-full">
        <textarea
          ref={textRef}
          className={cn(
            textareaVariants({ state, textareaSize }),
            showCount && 'pb-8',
            autoResize && 'resize-none overflow-hidden',
            className
          )}
          maxLength={maxLength}
          value={value}
          onChange={handleChange}
          {...props}
        />
        {showCount && (
          <div className="absolute bottom-2 right-3 text-xs text-muted-foreground">
            {maxLength ? `${count}/${maxLength}` : count}
          </div>
        )}
      </div>
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea, textareaVariants }
