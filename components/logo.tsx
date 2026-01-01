import Image from "next/image"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
  variant?: "default" | "footer"
}

export function Logo({ className, showText = false, size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "h-16",
    md: "h-24 w-36",
    lg: "h-32",
  }

  const textSize = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const textColor = variant === "footer" ? "text-background" : "text-foreground"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Image
        src="/images/logo.png"
        alt="TaxSal - Free Tool to Estimate Salary and Taxes in the USA"
        width={size === "sm" ? 64 : size === "md" ? 96 : 128}
        height={size === "sm" ? 64 : size === "md" ? 96 : 128}
        className={cn("object-contain", sizeClasses[size])}
        priority
        unoptimized
      />
      {showText && (
        <span className={cn("font-bold", textSize[size], textColor)}>
          TaxSal
        </span>
      )}
    </div>
  )
}

