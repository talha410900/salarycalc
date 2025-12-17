import { Calculator } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "footer"
}

export function Logo({ className, showText = true, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
  }

  const iconSize = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }

  const textSize = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-xl",
  }

  const textColor = variant === "footer" ? "text-background" : "text-foreground"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn(
        "flex items-center justify-center rounded-lg bg-primary shadow-md",
        sizeClasses[size]
      )}>
        <Calculator className={cn("text-primary-foreground", iconSize[size])} />
      </div>
      {showText && (
        <span className={cn("font-bold", textSize[size], textColor)}>
          TaxSal
        </span>
      )}
    </div>
  )
}

