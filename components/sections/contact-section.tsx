import { useState } from "react";
import SectionHeading from "@/components/shared/section-heading";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Github, Linkedin, MessageCircle } from "lucide-react";
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("https://formspree.io/f/meozzavo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        const err = await res.json();
        throw new Error(err.error || "Error al enviar");
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message || "Algo falló");
    }
  };

  return (
    <section id="contact" className="py-20 bg-radial-gradient-section text-white">
      <TooltipProvider delayDuration={100}>
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Contacto"
            subtitle="Conectemos y Construyamos el Futuro"
          />
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8 animate-fade-in-up">
              <p className="text-lg text-gray-300 tracking-normal">
                ¿Tienes un proyecto en mente, una pregunta o simplemente quieres
                saludar? ¡No dudes en contactarme! Siempre estoy abierto a nuevas
                oportunidades y colaboraciones.
              </p>
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Mail className="h-6 w-6 text-neon-blue cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white text-black rounded px-2 py-1 text-xs shadow-lg">
                      Correo electrónico
                    </TooltipContent>
                  </Tooltip>
                  <a
                    href="mailto:juan.campo27.02@gmail.com"
                    className="text-lg text-white hover:text-neon-blue transition-colors tracking-normal"
                  >
                    juan.campo27.02@gmail.com
                  </a>
                </div>

                {/* GitHub */}
                <div className="flex items-center space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Github className="h-6 w-6 text-neon-blue cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white text-black rounded px-2 py-1 text-xs shadow-lg">
                      GitHub
                    </TooltipContent>
                  </Tooltip>
                  <a
                    href="https://github.com/Juan-Campo-developer"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-neon-blue transition-colors tracking-normal"
                  >
                    github.com/Juan-Campo-developer
                  </a>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Linkedin className="h-6 w-6 text-neon-blue cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white text-black rounded px-2 py-1 text-xs shadow-lg">
                      LinkedIn
                    </TooltipContent>
                  </Tooltip>
                  <a
                    href="https://www.linkedin.com/in/juan-campo-07ab60377/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-neon-blue transition-colors tracking-normal"
                  >
                    linkedin.com/in/juan_campo
                  </a>
                </div>

                {/* WhatsApp */}
                <div className="flex items-center space-x-3">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <MessageCircle className="h-6 w-6 text-neon-blue cursor-pointer" />
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white text-black rounded px-2 py-1 text-xs shadow-lg">
                      WhatsApp
                    </TooltipContent>
                  </Tooltip>
                  <a
                    href="https://wa.me/573223561297"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg text-white hover:text-neon-blue transition-colors tracking-normal"
                  >
                    WhatsApp: +57 322 356 1297
                  </a>
                </div>
              </div>
            </div>

            {/* FORMULARIO */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div>
                <Label htmlFor="name" className="block text-lg font-medium text-white mb-2 tracking-normal">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] text-white placeholder:text-gray-500 border border-[#1a1a1a] focus:border-transparent focus-visible:ring-2 focus-visible:ring-neon-blue"
                />
              </div>
              <div>
                <Label htmlFor="email" className="block text-lg font-medium text-white mb-2 tracking-normal">
                  Correo Electrónico
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="tu@correo.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] text-white placeholder:text-gray-500 border border-[#1a1a1a] focus:border-transparent focus-visible:ring-2 focus-visible:ring-neon-blue"
                />
              </div>
              <div>
                <Label htmlFor="message" className="block text-lg font-medium text-white mb-2 tracking-normal">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tu mensaje..."
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="bg-[#0a0a0a] text-white placeholder:text-gray-500 border border-[#1a1a1a] focus:border-transparent focus-visible:ring-2 focus-visible:ring-neon-blue transition-all duration-300"
                />
              </div>
              <Button
                type="submit"
                disabled={status === "sending"}
                className="w-full bg-neon-blue text-black hover:bg-electric-green disabled:opacity-50 transition-all duration-300 rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-neon-blue/50 tracking-normal"
              >
                {status === "sending" ? "Enviando..." : "Enviar Mensaje"}
              </Button>

              {status === "success" && (
                <p className="text-green-400 font-semibold text-center">¡Mensaje enviado con éxito!</p>
              )}
              {status === "error" && (
                <p className="text-destructive-foreground font-semibold text-center">Error: {errorMessage}</p>
              )}
            </form>
          </div>
        </div>
      </TooltipProvider>
    </section>
  );
}
