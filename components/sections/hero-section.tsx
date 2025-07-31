import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative h-screen flex items-center justify-center text-center bg-deep-space bg-cover bg-center bg-fixed overflow-hidden"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10" />
      <div className="relative z-20 p-4 max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tighter animate-fade-in-up">
          <span className="text-neon-blue">Juan Campo</span>
          <br />
          DESARROLLADOR CREATIVO & RESOLUTOR DE PROBLEMAS
        </h1>
        <p
          className="text-lg md:text-xl text-gray-300 mb-8 tracking-normal animate-fade-in-up"
          style={{ animationDelay: "0.3s" }}
        >
          Creando experiencias digitales inmersivas con tecnología de vanguardia.
        </p>
        <div className="flex justify-center space-x-4 animate-fade-in-up" style={{ animationDelay: "0.6s" }}>
          <Button
            asChild
            className="inline-flex items-center justify-center bg-neon-blue text-black hover:bg-electric-green transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
          >
            <a href="#projects">
              Ver Proyectos <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-all duration-300 rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
          >
            <a href="#contact">Contactar</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
