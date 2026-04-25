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
    { name: "HTML", percentage: 90, icon: <FileCode /> },
    { name: "CSS", percentage: 90, icon: <Code /> },
    { name: "JavaScript", percentage: 90, icon: <SquareTerminal /> },
    { name: "Tailwind CSS", percentage: 70, icon: <Zap /> },
    { name: "React.js", percentage: 70, icon: <Code /> },
  ];

  const backendSkills = [
    { name: "PHP", percentage: 90, icon: <Server /> },
    { name: "Python", percentage: 90, icon: <GitBranch /> },
    { name: "Node.js", percentage: 70, icon: <Code /> },
  ];

  const databaseSkills = [
    { name: "MySQL", percentage: 90, icon: <Database /> },
    { name: "Lucidchart", percentage: 70, icon: <Database /> },
  ];

  const designSkills = [
    { name: "Adobe Illustrator", percentage: 90, icon: <Palette /> },
    { name: "Adobe XD", percentage: 60, icon: <Palette /> },
  ];

  const aiGenerativeSkill = {
    name: "IA Generativa",
    percentage: 80,
    icon: <Sparkles />,
    note: "Experimentando con IA generativas",
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
              ¡Hola! Soy Juan Campo, aprendiz del SENA en Tecnología en Análisis
              y Desarrollo de Software. Actualmente estoy en mi etapa lectiva, a
              un trimestre de iniciar la fase productiva, y con muchas ganas de
              seguir creciendo como desarrollador.
            </p>
            <p
              className="text-lg leading-relaxed text-gray-300 tracking-normal animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              Me apasiona crear soluciones digitales tanto en entornos web como
              móviles, combinando diseño interactivo, buenas prácticas de
              desarrollo y tecnologías modernas. Aunque me especializo en
              desarrollo front-end, también exploro el backend y el uso de
              herramientas como la inteligencia artificial para mejorar la
              experiencia del usuario. Siempre busco escribir código limpio,
              funcional y escalable, resolviendo problemas con creatividad y
              enfoque práctico.
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
