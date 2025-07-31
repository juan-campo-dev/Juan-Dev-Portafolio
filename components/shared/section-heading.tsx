import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  className?: string
}

export default function SectionHeading({ title, subtitle, className }: SectionHeadingProps) {
  return (
    <div className={cn("text-center mb-12", className)}>
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-wide animate-fade-in-up">{title}</h2>
      {subtitle && (
        <p className="text-lg text-gray-400 tracking-normal animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          {subtitle}
        </p>
      )}
      <div
        className="w-24 h-1 bg-neon-blue mx-auto mt-4 rounded-full animate-fade-in-up"
        style={{ animationDelay: "0.4s" }}
      />
    </div>
  )
}
