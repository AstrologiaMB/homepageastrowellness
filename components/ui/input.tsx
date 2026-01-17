import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-background ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      state: {
        default: "border-input hover:border-accent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring",
        error: "border-[--border-input-error] bg-[--bg-input-error] hover:border-[--border-input-error] focus-visible:border-[--border-input-error] focus-visible:ring-[--border-input-error]",
        success: "border-[--border-input-success] bg-[--bg-input-success] hover:border-[--border-input-success] focus-visible:border-[--border-input-success] focus-visible:ring-[--border-input-success]",
        warning: "border-[--border-input-warning] bg-[--bg-input-warning] hover:border-[--border-input-warning] focus-visible:border-[--border-input-warning] focus-visible:ring-[--border-input-warning]",
      },
      inputSize: {
        sm: "h-9 px-3 py-1 text-sm",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
      hasLeftIcon: {
        true: "pl-10",
        false: "",
      },
      hasRightAction: {
        true: "pr-10",
        false: "",
      },
    },
    defaultVariants: {
      state: "default",
      inputSize: "md",
      hasLeftIcon: false,
      hasRightAction: false,
    },
  }
)

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    Omit<VariantProps<typeof inputVariants>, 'inputSize' | 'hasLeftIcon' | 'hasRightAction'> {
  state?: 'default' | 'error' | 'success' | 'warning'
  inputSize?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightAction?: React.ReactNode
  onRightActionClick?: () => void
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, state, inputSize, leftIcon, rightAction, onRightActionClick, ...props }, ref) => {
  const hasLeftIcon = !!leftIcon
  const hasRightAction = !!rightAction

  return (
    <div className="relative w-full">
      {leftIcon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
          {leftIcon}
        </div>
      )}
      <input
        type={type}
        className={cn(
          inputVariants({ state, inputSize, hasLeftIcon, hasRightAction }),
          className
        )}
        ref={ref}
        {...props}
      />
      {rightAction && (
        <button
          type="button"
          onClick={onRightActionClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-sm"
          tabIndex={-1}
        >
          {rightAction}
        </button>
      )}
    </div>
  )
})
Input.displayName = "Input"

export { Input, inputVariants }
