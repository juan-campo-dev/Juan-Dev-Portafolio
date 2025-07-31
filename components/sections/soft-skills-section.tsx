import SectionHeading from "@/components/shared/section-heading"
import { MessageSquare, Users, Crown, Heart, Lightbulb, RefreshCw, Brain, Clock } from "lucide-react"

export default function SoftSkillsSection() {
  const softSkills = [
    { name: "Comunicación efectiva", icon: <MessageSquare className="h-8 w-8" /> },
    { name: "Trabajo en equipo", icon: <Users className="h-8 w-8" /> },
    { name: "Liderazgo", icon: <Crown className="h-8 w-8" /> },
    { name: "Empatía", icon: <Heart className="h-8 w-8" /> },
    { name: "Resolución de conflictos", icon: <Lightbulb className="h-8 w-8" /> },
    { name: "Adaptabilidad", icon: <RefreshCw className="h-8 w-8" /> },
    { name: "Pensamiento crítico", icon: <Brain className="h-8 w-8" /> },
    { name: "Gestión del tiempo", icon: <Clock className="h-8 w-8" /> },
  ]

  return (
    <section id="soft-skills" className="py-20 bg-radial-gradient-section text-white">
      <div className="container mx-auto px-4">
        <SectionHeading title="Habilidades Blandas" subtitle="Mis Fortalezas Interpersonales" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {softSkills.map((skill, index) => (
            <div
              key={skill.name}
              className="flex flex-col items-center text-center p-6 bg-cyber-gray border border-gray-700 rounded-lg shadow-lg transition-all duration-300 hover:shadow-neon-blue/30 hover:scale-[1.05] animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-neon-blue mb-4 transition-transform duration-300 hover:rotate-6">{skill.icon}</div>
              <h3 className="text-xl font-semibold text-white tracking-normal">{skill.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
