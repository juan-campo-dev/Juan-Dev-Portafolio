import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const floatingIcons = [
  {
    name: "React",
    img: `${CDN}/react/react-original.svg`,
    size: "w-14 h-14 md:w-16 md:h-16",
    pos: "top-[15%] right-[10%]",
    anim: "animate-float-slow",
    delay: "0s",
  },
  {
    name: "JavaScript",
    img: `${CDN}/javascript/javascript-original.svg`,
    size: "w-11 h-11 md:w-13 md:h-13",
    pos: "top-[8%] right-[28%]",
    anim: "animate-float-medium",
    delay: "0.5s",
  },
  {
    name: "TypeScript",
    img: `${CDN}/typescript/typescript-original.svg`,
    size: "w-11 h-11 md:w-13 md:h-13",
    pos: "top-[45%] right-[5%]",
    anim: "animate-float-fast",
    delay: "1s",
  },
  {
    name: "Next.js",
    img: `${CDN}/nextjs/nextjs-original.svg`,
    size: "w-12 h-12 md:w-14 md:h-14",
    pos: "top-[28%] right-[22%]",
    anim: "animate-float-medium",
    delay: "0.3s",
    invert: true,
  },
  {
    name: "Python",
    img: `${CDN}/python/python-original.svg`,
    size: "w-12 h-12 md:w-14 md:h-14",
    pos: "top-[55%] right-[18%]",
    anim: "animate-float-slow",
    delay: "0.8s",
  },
  {
    name: "Laravel",
    img: `${CDN}/laravel/laravel-original.svg`,
    size: "w-11 h-11 md:w-13 md:h-13",
    pos: "top-[35%] right-[35%]",
    anim: "animate-float-fast",
    delay: "1.2s",
  },
  {
    name: "PHP",
    img: `${CDN}/php/php-original.svg`,
    size: "w-12 h-12 md:w-14 md:h-14",
    pos: "top-[65%] right-[30%]",
    anim: "animate-float-medium",
    delay: "0.6s",
  },
  {
    name: "MySQL",
    img: `${CDN}/mysql/mysql-original.svg`,
    size: "w-11 h-11 md:w-13 md:h-13",
    pos: "top-[72%] right-[12%]",
    anim: "animate-float-slow",
    delay: "1.5s",
  },
  {
    name: "Node.js",
    img: `${CDN}/nodejs/nodejs-original.svg`,
    size: "w-11 h-11 md:w-12 md:h-12",
    pos: "top-[20%] right-[42%]",
    anim: "animate-float-fast",
    delay: "0.2s",
  },
  {
    name: "Git",
    img: `${CDN}/git/git-original.svg`,
    size: "w-10 h-10 md:w-12 md:h-12",
    pos: "top-[78%] right-[40%]",
    anim: "animate-float-medium",
    delay: "1.8s",
  },
  {
    name: "Docker",
    img: `${CDN}/docker/docker-original.svg`,
    size: "w-10 h-10 md:w-12 md:h-12",
    pos: "top-[50%] right-[40%]",
    anim: "animate-float-slow",
    delay: "0.9s",
  },
  {
    name: "Tailwind CSS",
    img: `${CDN}/tailwindcss/tailwindcss-original.svg`,
    size: "w-12 h-12 md:w-14 md:h-14",
    pos: "top-[10%] right-[48%]",
    anim: "animate-float-fast",
    delay: "0.4s",
  },
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center bg-deep-space bg-cover bg-center bg-fixed overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />

      {/* Glow effect top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-radial from-purple-600/30 via-purple-900/10 to-transparent rounded-full blur-3xl z-10 pointer-events-none" />

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Left side: Text content */}
        <div className="text-left">
          <p className="text-neon-blue text-sm md:text-base font-mono tracking-widest uppercase mb-4 animate-fade-in-up">
            Full Stack Developer Portfolio
          </p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight tracking-tighter animate-fade-in-up">
            Providing{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-purple-500">
              the best
            </span>
            <br />
            project experience
          </h1>
          <p
            className="text-base md:text-lg text-gray-400 mb-8 max-w-lg tracking-normal animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.3s" }}
          >
            Full Stack Software Engineer with experience in Website, Mobile, &
            Software development. Check out my projects and skills
          </p>
          <div
            className="flex flex-wrap gap-4 animate-fade-in-up"
            style={{ animationDelay: "0.6s" }}
          >
            <Button
              asChild
              className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-neon-blue text-white hover:opacity-90 transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-lg shadow-purple-500/25 tracking-normal"
            >
              <a href="#projects">
                Learn More! <ArrowRight className="ml-2 h-5 w-5" />
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

        {/* Right side: Floating tech icons */}
        <div className="relative h-[400px] md:h-[500px] hidden md:block">
          {/* Grid lines decorative */}
          <div className="absolute inset-0 opacity-10">
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

          {/* Orbital ring decorative */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] border border-gray-700/30 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] border border-gray-700/20 rounded-full" />

          {/* Floating icons */}
          {floatingIcons.map((item) => (
            <div
              key={item.name}
              className={`absolute ${item.pos} ${item.size} ${item.anim}`}
              style={{ animationDelay: item.delay }}
              title={item.name}
            >
              <div className="w-full h-full rounded-xl flex items-center justify-center backdrop-blur-sm bg-white/5 border border-white/10 shadow-lg shadow-black/20 p-2.5">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.img}
                  alt={item.name}
                  className={`w-full h-full object-contain drop-shadow-lg ${item.invert ? "invert" : ""}`}
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
