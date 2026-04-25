import SectionHeading from "@/components/shared/section-heading";
import Image from "next/image";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface TechItem {
  name: string;
  img: string;
  invert?: boolean;
}

const techStack: { category: string; items: TechItem[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", img: `${CDN}/html5/html5-original.svg` },
      { name: "CSS3", img: `${CDN}/css3/css3-original.svg` },
      { name: "JavaScript", img: `${CDN}/javascript/javascript-original.svg` },
      { name: "TypeScript", img: `${CDN}/typescript/typescript-original.svg` },
      { name: "React", img: `${CDN}/react/react-original.svg` },
      {
        name: "Next.js",
        img: `${CDN}/nextjs/nextjs-original.svg`,
        invert: true,
      },
      {
        name: "Tailwind CSS",
        img: `${CDN}/tailwindcss/tailwindcss-original.svg`,
      },
      { name: "Material UI", img: `${CDN}/materialui/materialui-original.svg` },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "PHP", img: `${CDN}/php/php-original.svg` },
      { name: "Laravel", img: `${CDN}/laravel/laravel-original.svg` },
      { name: "Python", img: `${CDN}/python/python-original.svg` },
      { name: "FastAPI", img: `${CDN}/fastapi/fastapi-original.svg` },
      { name: "Flask", img: `${CDN}/flask/flask-original.svg`, invert: true },
      { name: "Node.js", img: `${CDN}/nodejs/nodejs-original.svg` },
      {
        name: "Express",
        img: `${CDN}/express/express-original.svg`,
        invert: true,
      },
      { name: "Java", img: `${CDN}/java/java-original.svg` },
    ],
  },
  {
    category: "Database & Cloud",
    items: [
      { name: "MySQL", img: `${CDN}/mysql/mysql-original.svg` },
      { name: "PostgreSQL", img: `${CDN}/postgresql/postgresql-original.svg` },
      { name: "MongoDB", img: `${CDN}/mongodb/mongodb-original.svg` },
      { name: "Firebase", img: `${CDN}/firebase/firebase-original.svg` },
      {
        name: "SQL Server",
        img: `${CDN}/microsoftsqlserver/microsoftsqlserver-plain.svg`,
        invert: true,
      },
    ],
  },
  {
    category: "Tools & DevOps",
    items: [
      { name: "Git", img: `${CDN}/git/git-original.svg` },
      { name: "Docker", img: `${CDN}/docker/docker-original.svg` },
      { name: "Figma", img: `${CDN}/figma/figma-original.svg` },
      { name: "Illustrator", img: `${CDN}/illustrator/illustrator-plain.svg` },
      { name: "VS Code", img: `${CDN}/vscode/vscode-original.svg` },
      {
        name: "GitHub",
        img: `${CDN}/github/github-original.svg`,
        invert: true,
      },
    ],
  },
  {
    category: "AI & Generative",
    items: [
      {
        name: "Claude",
        img: "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
      },
      {
        name: "GitHub Copilot",
        img: `${CDN}/github/github-original.svg`,
        invert: true,
      },
      {
        name: "OpenAI / GPT",
        img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
      },
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
              Uso avanzado de herramientas de IA (Claude, Cursor, GitHub
              Copilot, GPT) para acelerar ciclos de desarrollo. Tecnólogo ADSO
              con Ingeniería de Software en curso (7mo semestre) en Corporación
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
              <div
                key={group.category}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.8 + gi * 0.15}s` }}
              >
                <h4 className="text-sm font-semibold text-neon-blue/70 uppercase tracking-widest mb-4 text-center">
                  {group.category}
                </h4>
                <div className="flex flex-wrap justify-center gap-3 md:gap-4">
                  {group.items.map((tech) => (
                    <div
                      key={tech.name}
                      className="group relative flex flex-col items-center gap-2 px-4 py-3 rounded-xl border border-white/10 bg-white/5 transition-all duration-300 hover:scale-105 hover:-translate-y-1 hover:bg-white/10 hover:border-white/20 cursor-default min-w-[80px]"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={tech.img}
                        alt={tech.name}
                        width={40}
                        height={40}
                        className={`w-10 h-10 object-contain drop-shadow-lg ${tech.invert ? "invert" : ""}`}
                        loading="lazy"
                      />
                      <span className="text-xs font-medium text-gray-300 group-hover:text-white transition-colors">
                        {tech.name}
                      </span>
                      {/* Hover glow */}
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          boxShadow:
                            "0 0 25px rgba(0, 240, 255, 0.15), inset 0 0 25px rgba(0, 240, 255, 0.05)",
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
