import Image from "next/image";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl?: string;
  demoUrl?: string;
  delay?: number;
  isPrivate?: boolean;
  demoPrivate?: boolean;
  demoSoon?: boolean;
}

export default function ProjectCard({
  title,
  description,
  imageUrl,
  githubUrl,
  demoUrl,
  delay = 0,
  isPrivate = false,
  demoPrivate = false,
  demoSoon = false,
}: ProjectCardProps) {
  return (
    <Card
      className="flex flex-col justify-between bg-cyber-gray border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-neon-blue/30 hover:scale-[1.02] animate-fade-in-up relative z-50"
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Contenedor de imagen con fondo opaco */}
      <CardHeader className="p-0 relative">
        <div className="w-full h-48 overflow-hidden rounded-t-lg bg-black">
          <div className="relative w-full h-full">
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={title}
              fill
              style={{ objectFit: "cover" }}
              className="transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
        </div>
      </CardHeader>

      {/* Contenido y botones (¡TODOS RESTAURADOS!) */}
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-2xl font-bold text-white mb-2 tracking-wide">
          {title}
        </CardTitle>
        <CardDescription className="text-gray-400 text-base tracking-normal">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex justify-center items-center space-x-4">
        {!isPrivate && githubUrl && (
          <Button
            asChild
            variant="outline"
            className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-colors duration-300 rounded-full px-4 py-2 tracking-normal"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2"/> GitHub
            </a>
          </Button>
        )}

        {isPrivate && (
          <Button
            disabled
            title="Este repositorio es privado"
            className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-4 py-2 tracking-normal"
          >
            <Github className="h-4 w-4 mr-2"/> Privado
          </Button>
        )}

        {!isPrivate && demoUrl && !demoPrivate && !demoSoon && (
          <Button
            asChild
            className="inline-flex items-center justify-center bg-neon-blue text-black hover:bg-electric-green transition-colors duration-300 rounded-full px-4 py-2 tracking-normal"
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2"/> Demo en Vivo
            </a>
          </Button>
        )}

        {demoSoon && (
          <Button
            disabled
            title="Próximamente"
            className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-4 py-2 tracking-normal"
          >
            <ExternalLink className="h-4 w-4 mr-2"/> ¡Próximamente!
          </Button>
        )}

        {demoPrivate && (
          <Button
            disabled
            title="Acceso restringido"
            className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-4 py-2 tracking-normal"
          >
            <ExternalLink className="h-4 w-4 mr-2"/> Restringido
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
