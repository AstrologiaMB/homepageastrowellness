import * as React from "react"
import { Eye, EyeOff } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong'

interface PasswordStrengthMeter {
  strength: PasswordStrength
  score: number
  feedback: string[]
}

export interface PasswordInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  inputSize?: 'sm' | 'md' | 'lg'
  showStrength?: boolean
  onStrengthChange?: (strength: PasswordStrengthMeter) => void
  leftIcon?: React.ReactNode
}

const calculatePasswordStrength = (password: string): PasswordStrengthMeter => {
  const feedback: string[] = []
  let score = 0

  if (!password) {
    return { strength: 'weak', score: 0, feedback: [] }
  }

  // Length check
  if (password.length >= 8) score += 1
  else feedback.push('Mínimo 8 caracteres')

  if (password.length >= 12) score += 1

  // Lowercase
  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Incluye minúsculas')

  // Uppercase
  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Incluye mayúsculas')

  // Numbers
  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Incluye números')

  // Special characters
  if (/[^a-zA-Z0-9]/.test(password)) score += 1
  else feedback.push('Incluye caracteres especiales')

  // Determine strength level
  let strength: PasswordStrength = 'weak'
  if (score >= 5) strength = 'strong'
  else if (score >= 4) strength = 'good'
  else if (score >= 2) strength = 'fair'

  return { strength, score, feedback }
}

const strengthColors = {
  weak: 'bg-destructive',
  fair: 'bg-warning',
  good: 'bg-yellow-500',
  strong: 'bg-green-500',
}

const strengthLabels = {
  weak: 'Débil',
  fair: 'Regular',
  good: 'Buena',
  strong: 'Fuerte',
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, inputSize, showStrength = false, onStrengthChange, leftIcon, value = '', onChange, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [strength, setStrength] = React.useState<PasswordStrengthMeter>({ strength: 'weak', score: 0, feedback: [] })

    React.useEffect(() => {
      if (showStrength) {
        const newStrength = calculatePasswordStrength(String(value))
        setStrength(newStrength)
        onStrengthChange?.(newStrength)
      }
    }, [value, showStrength, onStrengthChange])

    const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev)
    }

    return (
      <div className="w-full">
        <Input
          ref={ref}
          type={showPassword ? "text" : "password"}
          inputSize={inputSize}
          leftIcon={leftIcon}
          value={value}
          onChange={onChange}
          rightAction={showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          onRightActionClick={togglePasswordVisibility}
          className={className}
          {...props}
        />

        {showStrength && value && (
          <div className="mt-2 space-y-2">
            {/* Strength bar */}
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={cn(
                    "h-full transition-all duration-300 ease-out",
                    strengthColors[strength.strength]
                  )}
                  style={{ width: `${Math.min((strength.score / 6) * 100, 100)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-muted-foreground">
                {strengthLabels[strength.strength]}
              </span>
            </div>

            {/* Feedback hints */}
            {strength.feedback.length > 0 && (
              <ul className="text-xs text-muted-foreground space-y-1">
                {strength.feedback.map((item, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-muted-foreground" />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    )
  }
)
PasswordInput.displayName = "PasswordInput"

export { PasswordInput, calculatePasswordStrength }
