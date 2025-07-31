import type React from "react"
import Image from "next/image"

interface SkillBarProps {
  skill: string
  percentage: number
  icon?: React.ReactNode // For Lucide icons
  imageUrl?: string // For image logos
  delay?: number
}

export default function SkillBar({ skill, percentage, icon, imageUrl, delay = 0 }: SkillBarProps) {
  return (
    <div className="mb-4 animate-fade-in-up" style={{ animationDelay: `${delay}s` }}>
      <div className="flex flex-col items-start mb-2">
        {(icon || imageUrl) && (
          <div className="mb-2 text-neon-blue">
            {icon || (
              <Image
                src={imageUrl || "/placeholder.svg"}
                alt={`${skill} logo`}
                width={24}
                height={24}
                className="object-contain"
              />
            )}
          </div>
        )}
        <div className="flex items-center w-full">
          <span className="text-white text-lg tracking-normal">{skill}</span>
          <span className="ml-auto text-neon-blue text-sm font-bold">{percentage}%</span>
        </div>
      </div>
      <div className="w-full bg-cyber-gray rounded-full h-2">
        <div
          className="bg-neon-blue h-2 rounded-full animate-skill-fill"
          style={
            {
              width: `${percentage}%`,
              "--skill-width": `${percentage}%`,
              animationDelay: `${delay + 0.2}s`,
            } as React.CSSProperties
          }
        ></div>
      </div>
    </div>
  )
}
