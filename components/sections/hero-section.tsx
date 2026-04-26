import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

type FloatingIcon = {
  name: string;
  img: string;
  size: string;
  /** posición absoluta en px dentro del contenedor 500x550 */
  x: number;
  y: number;
  anim: string;
  delay: string;
  invert?: boolean;
};

// Contenedor de referencia 500×550, centro en (250, 275)
// Anillos: outer r=180, inner r=110
// Distribución scattered tipo "constelación": algunos sobre los anillos,
// otros dentro, otros fuera — no orbital perfecto.
const BOX_W = 500;
const BOX_H = 550;
const CX = 250;
const CY = 275;
const INNER_R = 90;
const OUTER_R = 155;

const floatingIcons: FloatingIcon[] = [
  // — Top zone
  {
    name: "React",
    img: `${CDN}/react/react-original.svg`,
    size: "w-16 h-16 md:w-[68px] md:h-[68px]",
    x: 95,
    y: 90, // exterior arriba-izq
    anim: "animate-float-slow",
    delay: "0s",
  },
  {
    name: "JavaScript",
    img: `${CDN}/javascript/javascript-original.svg`,
    size: "w-14 h-14 md:w-[62px] md:h-[62px]",
    x: 275,
    y: 95, // sobre outer ring arriba
    anim: "animate-float-medium",
    delay: "0.3s",
  },
  {
    name: "Node.js",
    img: `${CDN}/nodejs/nodejs-original.svg`,
    size: "w-12 h-12 md:w-[52px] md:h-[52px]",
    x: 410,
    y: 110, // exterior arriba-der
    anim: "animate-float-fast",
    delay: "0.6s",
  },
  // — Upper-mid zone (entre anillos / dentro)
  {
    name: "Tailwind CSS",
    img: `${CDN}/tailwindcss/tailwindcss-original.svg`,
    size: "w-12 h-12 md:w-[56px] md:h-[56px]",
    x: 215,
    y: 175, // dentro inner ring upper
    anim: "animate-float-medium",
    delay: "0.9s",
  },
  {
    name: "Next.js",
    img: `${CDN}/nextjs/nextjs-original.svg`,
    size: "w-14 h-14 md:w-[60px] md:h-[60px]",
    x: 345,
    y: 200, // entre anillos derecha
    anim: "animate-float-slow",
    delay: "1.2s",
    invert: true,
  },
  // — Mid zone (sobre outer ring laterales / centro)
  {
    name: "MySQL",
    img: `${CDN}/mysql/mysql-original.svg`,
    size: "w-12 h-12 md:w-[56px] md:h-[56px]",
    x: 75,
    y: 275, // sobre outer ring izquierda
    anim: "animate-float-fast",
    delay: "0.2s",
  },
  {
    name: "TypeScript",
    img: `${CDN}/typescript/typescript-original.svg`,
    size: "w-16 h-16 md:w-[72px] md:h-[72px]",
    x: 250,
    y: 285, // centro
    anim: "animate-float-slow",
    delay: "0.5s",
  },
  {
    name: "Docker",
    img: `${CDN}/docker/docker-original.svg`,
    size: "w-12 h-12 md:w-[54px] md:h-[54px]",
    x: 420,
    y: 290, // exterior derecha
    anim: "animate-float-medium",
    delay: "0.8s",
  },
  // — Lower zone
  {
    name: "Python",
    img: `${CDN}/python/python-original.svg`,
    size: "w-12 h-12 md:w-[56px] md:h-[56px]",
    x: 130,
    y: 385, // dentro outer ring abajo-izq
    anim: "animate-float-fast",
    delay: "1.1s",
  },
  {
    name: "Git",
    img: `${CDN}/git/git-original.svg`,
    size: "w-12 h-12 md:w-[54px] md:h-[54px]",
    x: 295,
    y: 385, // entre anillos abajo-centro
    anim: "animate-float-slow",
    delay: "1.4s",
  },
  // — Bottom zone (fuera del outer)
  {
    name: "PHP",
    img: `${CDN}/php/php-original.svg`,
    size: "w-12 h-12 md:w-[52px] md:h-[52px]",
    x: 95,
    y: 475, // exterior abajo-izq
    anim: "animate-float-medium",
    delay: "1.7s",
  },
  {
    name: "Laravel",
    img: `${CDN}/laravel/laravel-original.svg`,
    size: "w-12 h-12 md:w-[54px] md:h-[54px]",
    x: 420,
    y: 460, // exterior abajo-der
    anim: "animate-float-fast",
    delay: "2s",
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center bg-deep-space bg-cover bg-center bg-fixed overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

      {/* Glow superior centrado en cyan */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-neon-blue/20 via-neon-blue/5 to-transparent rounded-full blur-3xl z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Lado izquierdo: contenido textual */}
        <div className="text-left">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-5 leading-[1.05] tracking-tight animate-fade-in-up">
            <span className="text-neon-blue">Full Stack</span> Developer
          </h1>

          <p
            className="text-neon-blue/90 text-xs md:text-sm font-mono tracking-[0.25em] uppercase mb-6 animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            Top 3 WorldSkills 2025 · Cloud Specialist
          </p>

          <p
            className="text-base md:text-lg text-gray-400 mb-8 max-w-md tracking-normal animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            Construyo aplicaciones web, móviles y software a medida con stack
            moderno y enfoque en cloud.
          </p>

          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              asChild
              className="inline-flex items-center justify-center bg-neon-blue text-black hover:bg-neon-blue/90 transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-neon-blue/30 tracking-normal"
            >
              <a href="#projects">
                Ver más <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="inline-flex items-center justify-center bg-transparent border-gray-600 text-gray-300 hover:border-neon-blue hover:text-neon-blue transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold tracking-normal"
            >
              <a href="#contact">Contactar</a>
            </Button>
          </div>
        </div>

        {/* Lado derecho: iconos flotantes orbitando el centro */}
        <div className="relative h-[400px] md:h-[560px] hidden md:flex items-center justify-center">
          {/* Grid decorativo de fondo */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern
                  id="heroGrid"
                  width="60"
                  height="60"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="#00F0FF"
                    strokeWidth="0.5"
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#heroGrid)" />
            </svg>
          </div>

          {/* Contenedor con tamaño exacto del sistema de coordenadas */}
          <div className="relative" style={{ width: BOX_W, height: BOX_H }}>
            {/* Anillos orbitales decorativos (no todos los íconos están sobre ellos) */}
            <div
              className="absolute border border-neon-blue/25 rounded-full"
              style={{
                width: INNER_R * 2,
                height: INNER_R * 2,
                left: CX - INNER_R,
                top: CY - INNER_R,
              }}
            />
            <div
              className="absolute border border-neon-blue/15 rounded-full"
              style={{
                width: OUTER_R * 2,
                height: OUTER_R * 2,
                left: CX - OUTER_R,
                top: CY - OUTER_R,
              }}
            />

            {/* Punto central brillante */}
            <div
              className="absolute w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_20px_rgba(0,240,255,0.9)]"
              style={{ left: CX - 4, top: CY - 4 }}
            />

            {/* Iconos en posiciones absolutas pixel-perfect.
                Wrapper externo = posición fija (no se anima).
                Wrapper interno = animación float (no afecta posición). */}
            {floatingIcons.map((item) => (
              <div
                key={item.name}
                className={`absolute ${item.size}`}
                style={{
                  left: item.x,
                  top: item.y,
                  transform: "translate(-50%, -50%)",
                }}
                title={item.name}
              >
                <div
                  className={`w-full h-full ${item.anim}`}
                  style={{ animationDelay: item.delay }}
                >
                  <div className="w-full h-full flex items-center justify-center transition-transform duration-300 hover:scale-110">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={item.img}
                      alt={item.name}
                      className={`w-full h-full object-contain drop-shadow-lg ${item.invert ? "invert" : ""}`}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
