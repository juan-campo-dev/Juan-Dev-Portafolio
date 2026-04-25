import SectionHeading from "@/components/shared/section-heading";
import Image from "next/image";
import {
  Download,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface TechItem {
  name: string;
  icon: string;
  color: string;
  bg?: string;
}

const techStack: { category: string; items: TechItem[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", icon: "🌐", color: "#E34F26", bg: "#E34F2615" },
      { name: "CSS3", icon: "🎨", color: "#1572B6", bg: "#1572B615" },
      { name: "JavaScript", icon: "JS", color: "#F7DF1E", bg: "#F7DF1E15" },
      { name: "TypeScript", icon: "TS", color: "#3178C6", bg: "#3178C615" },
      { name: "React", icon: "⚛️", color: "#61DAFB", bg: "#61DAFB15" },
      { name: "Next.js", icon: "N", color: "#ffffff", bg: "#ffffff10" },
      { name: "Tailwind", icon: "🌊", color: "#06B6D4", bg: "#06B6D415" },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "PHP", icon: "PHP", color: "#777BB4", bg: "#777BB415" },
      { name: "Laravel", icon: "◆", color: "#FF2D20", bg: "#FF2D2015" },
      { name: "Python", icon: "🐍", color: "#3776AB", bg: "#3776AB15" },
      { name: "FastAPI", icon: "⚡", color: "#009688", bg: "#00968815" },
      { name: "Flask", icon: "🧪", color: "#ffffff", bg: "#ffffff10" },
      { name: "Node.js", icon: "⬡", color: "#339933", bg: "#33993315" },
      { name: "Java", icon: "☕", color: "#ED8B00", bg: "#ED8B0015" },
    ],
  },
  {
    category: "Database & Cloud",
    items: [
      { name: "MySQL", icon: "🐬", color: "#4479A1", bg: "#4479A115" },
      { name: "PostgreSQL", icon: "🐘", color: "#4169E1", bg: "#4169E115" },
      { name: "SQL Server", icon: "🗄️", color: "#CC2927", bg: "#CC292715" },
      { name: "MongoDB", icon: "🍃", color: "#47A248", bg: "#47A24815" },
      { name: "Firebase", icon: "🔥", color: "#FFCA28", bg: "#FFCA2815" },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", icon: "⎇", color: "#F05032", bg: "#F0503215" },
      { name: "Docker", icon: "🐳", color: "#2496ED", bg: "#2496ED15" },
      { name: "Figma", icon: "🎯", color: "#F24E1E", bg: "#F24E1E15" },
      { name: "Illustrator", icon: "Ai", color: "#FF9A00", bg: "#FF9A0015" },
    ],
  },
  {
    category: "AI & Generative",
    items: [
      { name: "Claude", icon: "✦", color: "#D4A574", bg: "#D4A57415" },
      { name: "GitHub Copilot", icon: "🤖", color: "#00F0FF", bg: "#00F0FF15" },
      { name: "GPT", icon: "◉", color: "#10A37F", bg: "#10A37F15" },
      { name: "Cursor", icon: "▸", color: "#7B61FF", bg: "#7B61FF15" },
    ],
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-radial-gradient-section text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Sobre Mí"
          subtitle="Un Vistazo a Mi Universo Digital"
        />

        {/* Main content grid: Image + Biography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
          {/* Left side: Image */}
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-xl border border-gray-700 animate-fade-in-up z-50">
            <div className="absolute inset-0 bg-black" />
            <Image
              src="/images/personal.png"
              alt="Juan Campo"
              fill
              style={{ objectFit: "cover" }}
              className="relative"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 text-white text-xl font-bold tracking-wide">
              Juan Campo
            </div>
          </div>

          {/* Right side: Biography */}
          <div className="space-y-8">
            <p
              className="text-lg leading-relaxed text-gray-300 tracking-normal animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              ¡Hola! Soy Juan Andrés Campo Rodriguez, Desarrollador Full Stack
              con +2.5 años de experiencia en React.js, Python, FastAPI, Flask,
              PHP y Laravel. Top 3 Nacional WorldSkills 2025 en Tecnologías Web.
              He creado +16 aplicaciones en producción incluyendo sistemas con
              integración de IA, chatbots y análisis de datos.
            </p>
            <p
              className="text-lg leading-relaxed text-gray-300 tracking-normal animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Especializado en construir sistemas completos de gestión integral
              con PHP, JavaScript, MySQL y Python para IA y análisis de datos.
              Uso avanzado de herramientas de IA (Claude, Cursor, GitHub Copilot,
              GPT) para acelerar ciclos de desarrollo. Tecnólogo ADSO con
              Ingeniería de Software en curso (7mo semestre) en Corporación
              Tecnológica del Oriente.
            </p>
          </div>
        </div>

        {/* Tech Stack Grid */}
        <div className="mb-12">
          <h3
            className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-wide animate-fade-in-up text-center"
            style={{ animationDelay: "0.6s" }}
          >
            Tech Stack
          </h3>
          <p
            className="text-gray-500 text-center mb-10 animate-fade-in-up"
            style={{ animationDelay: "0.7s" }}
          >
            Technologies I work with daily
          </p>

          <div className="space-y-10">
            {techStack.map((group, gi) => (
              <div key={group.category} className="animate-fade-in-up" style={{ animationDelay: `${0.8 + gi * 0.15}s` }}>
                <h4 className="text-sm font-semibold text-neon-blue/70 uppercase tracking-widest mb-4 text-center">
                  {group.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-xl border transition-all duration-300 hover:scale-105 hover:-translate-y-1 cursor-default"
                      style={{
                        backgroundColor: tech.bg,
                        borderColor: `${tech.color}30`,
                      }}
                    >
                      <span
                        className="text-xl leading-none"
                        style={{ color: tech.color }}
                      >
                        {tech.icon}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: tech.color }}
                      >
                        {tech.name}
                      </span>
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow: `0 0 20px ${tech.color}25, inset 0 0 20px ${tech.color}10`,
                        }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CV Download */}
        <div
          className="flex flex-col items-center gap-4 animate-fade-in-up"
          style={{ animationDelay: "1.5s" }}
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              className="inline-flex items-center justify-center bg-neon-blue text-black hover:bg-electric-green transition-all duration-300 rounded-full px-6 py-3 text-base font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
            >
              <a href="/cv/cv.pdf" download="Juan_Campo_CV.pdf">
                <Download className="mr-2 h-4 w-4" /> CV Profesional
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 rounded-full px-6 py-3 text-base font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
            >
              <a href="/cv/cv-sena.pdf" download="Juan_Campo_CV_SENA.pdf">
                <Download className="mr-2 h-4 w-4" /> CV SENA
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 rounded-full px-6 py-3 text-base font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
            >
              <a href="#certificates">
                <Sparkles className="mr-2 h-4 w-4" /> Ver Certificados
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
