import SectionHeading from "@/components/shared/section-heading";
import SkillBar from "@/components/shared/skill-bar";
import Image from "next/image";
import {
  Code,
  Database,
  Server,
  GitBranch,
  FileCode,
  SquareTerminal,
  Zap,
  Palette,
  Sparkles,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutSection() {
  const frontendSkills = [
    { name: "React.js", percentage: 95, icon: <Code /> },
    { name: "JavaScript", percentage: 95, icon: <SquareTerminal /> },
    { name: "TypeScript", percentage: 85, icon: <Code /> },
    { name: "HTML/CSS", percentage: 95, icon: <FileCode /> },
    { name: "Tailwind CSS", percentage: 90, icon: <Zap /> },
    { name: "Next.js", percentage: 85, icon: <Code /> },
  ];

  const backendSkills = [
    { name: "PHP / Laravel", percentage: 95, icon: <Server /> },
    { name: "Python / FastAPI / Flask", percentage: 90, icon: <GitBranch /> },
    { name: "Node.js", percentage: 80, icon: <Code /> },
    { name: "Java", percentage: 70, icon: <Server /> },
  ];

  const databaseSkills = [
    { name: "MySQL", percentage: 95, icon: <Database /> },
    { name: "PostgreSQL", percentage: 75, icon: <Database /> },
    { name: "SQL Server", percentage: 70, icon: <Database /> },
  ];

  const designSkills = [
    { name: "Adobe Illustrator", percentage: 90, icon: <Palette /> },
    { name: "Figma / Adobe XD", percentage: 75, icon: <Palette /> },
  ];

  const aiGenerativeSkill = {
    name: "IA Generativa (Claude, Copilot, GPT)",
    percentage: 90,
    icon: <Sparkles />,
    note: "Uso avanzado de herramientas IA para acelerar desarrollo",
  };

  return (
    <section id="about" className="py-20 bg-radial-gradient-section text-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Sobre Mí"
          subtitle="Un Vistazo a Mi Universo Digital"
        />

        {/* Main content grid: Image + Biography */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-12">
          {/* Left side: Image */}
          <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-xl border border-gray-700 animate-fade-in-up z-50">
            {/* Fondo sólido para tapar partículas */}
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
              Actualmente lidero el desarrollo del SGI FERMAR en Montajes y
              Construcciones Fermar S.A.S., un sistema de gestión integral con
              PHP, JavaScript, MySQL y Python para IA y análisis de datos. Uso
              avanzado de herramientas de IA (Claude, Cursor, GitHub Copilot,
              GPT) para acelerar ciclos de desarrollo. Tecnólogo ADSO con
              Ingeniería de Software en curso (7mo semestre) en Corporación
              Tecnológica del Oriente.
            </p>
          </div>
        </div>

        {/* Technical Skills Section - This part should be below the image and bio on mobile,
            but aligned in two columns on desktop. */}
        <h3
          className="text-2xl font-bold text-white mb-8 tracking-wide animate-fade-in-up text-center md:text-left"
          style={{ animationDelay: "0.6s" }}
        >
          Mi Matriz de Habilidades Técnicas
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Left Sub-Column for Skills */}
          <div>
            <h4 className="text-xl font-semibold text-neon-blue mb-3 tracking-normal">
              Frontend
            </h4>
            {frontendSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                icon={skill.icon}
                delay={0.8 + index * 0.1}
              />
            ))}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-neon-blue mb-3 tracking-normal">
                Backend
              </h4>
              {backendSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill.name}
                  percentage={skill.percentage}
                  icon={skill.icon}
                  delay={0.8 + (frontendSkills.length + index) * 0.1}
                />
              ))}
            </div>
          </div>

          {/* Right Sub-Column for Skills */}
          <div>
            <h4 className="text-xl font-semibold text-neon-blue mb-3 tracking-normal">
              Bases de Datos
            </h4>
            {databaseSkills.map((skill, index) => (
              <SkillBar
                key={skill.name}
                skill={skill.name}
                percentage={skill.percentage}
                icon={skill.icon}
                delay={
                  0.8 +
                  (frontendSkills.length + backendSkills.length + index) * 0.1
                }
              />
            ))}
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-neon-blue mb-3 tracking-normal">
                Diseño
              </h4>
              {designSkills.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  skill={skill.name}
                  percentage={skill.percentage}
                  icon={skill.icon}
                  delay={
                    0.8 +
                    (frontendSkills.length +
                      backendSkills.length +
                      databaseSkills.length +
                      index) *
                      0.1
                  }
                />
              ))}
            </div>
            <div className="mt-8">
              <h4 className="text-xl font-semibold text-neon-blue mb-3 tracking-normal">
                IA Generativa
              </h4>
              <SkillBar
                skill={aiGenerativeSkill.name}
                percentage={aiGenerativeSkill.percentage}
                icon={aiGenerativeSkill.icon}
                delay={
                  0.8 +
                  (frontendSkills.length +
                    backendSkills.length +
                    databaseSkills.length +
                    designSkills.length) *
                    0.1
                }
              />
              <p
                className="text-gray-400 text-sm mt-2 tracking-normal animate-fade-in-up"
                style={{
                  animationDelay: `${
                    0.8 +
                    (frontendSkills.length +
                      backendSkills.length +
                      databaseSkills.length +
                      designSkills.length) *
                      0.1 +
                    0.2
                  }s`,
                }}
              >
                {aiGenerativeSkill.note}
              </p>
            </div>

            {/* New CV Download Section */}
            <div
              className="mt-12 animate-fade-in-up"
              style={{
                animationDelay: `${
                  0.8 +
                  (frontendSkills.length +
                    backendSkills.length +
                    databaseSkills.length +
                    designSkills.length) *
                    0.1 +
                  0.4
                }s`,
              }}
            >
              <h4 className="text-xl font-semibold text-neon-blue mb-4 tracking-normal">
                Descarga mi CV
              </h4>
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
        </div>
      </div>
    </section>
  );
}
