import Image from "next/image";
import { memo } from "react";
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

export default memo(function ProjectCard({
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
      className="relative z-50 flex h-[34rem] sm:h-[35rem] lg:h-[36rem] flex-col justify-between overflow-hidden rounded-lg border border-gray-700 bg-cyber-gray shadow-lg transition-[transform,box-shadow] duration-300 will-change-transform hover:scale-[1.02] hover:shadow-neon-blue/30 animate-fade-in-up"
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
      <CardContent className="flex flex-grow flex-col overflow-hidden p-6">
        <CardTitle className="mb-3 text-xl font-bold leading-tight tracking-wide text-white lg:text-2xl">
          {title}
        </CardTitle>
        <CardDescription className="overflow-hidden text-sm leading-6 tracking-normal text-gray-400 lg:text-base lg:leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>

      <CardFooter className="flex min-h-[4.75rem] flex-wrap items-center justify-center gap-2.5 p-4 pt-0 sm:min-h-20 sm:gap-3 sm:p-5 sm:pt-0 lg:min-h-24 lg:gap-4 lg:p-6 lg:pt-0">
        {!isPrivate && githubUrl && (
          <Button
            asChild
            variant="outline"
            className="inline-flex h-9 items-center justify-center rounded-full border-neon-blue bg-transparent px-3 py-2 text-xs tracking-normal text-neon-blue transition-colors duration-300 hover:bg-neon-blue hover:text-black sm:text-sm lg:h-10 lg:px-4"
          >
            <a href={githubUrl} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" /> GitHub
            </a>
          </Button>
        )}

        {isPrivate && (
          <Button
            disabled
            title="Este repositorio es privado"
            className="inline-flex h-9 items-center justify-center rounded-full bg-gray-600 px-3 py-2 text-xs tracking-normal text-white opacity-60 sm:text-sm lg:h-10 lg:px-4"
          >
            <Github className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" /> Privado
          </Button>
        )}

        {!isPrivate && demoUrl && !demoPrivate && !demoSoon && (
          <Button
            asChild
            className="inline-flex h-9 items-center justify-center rounded-full bg-neon-blue px-3 py-2 text-xs tracking-normal text-black transition-colors duration-300 hover:bg-electric-green sm:text-sm lg:h-10 lg:px-4"
          >
            <a href={demoUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" /> Demo
              en Vivo
            </a>
          </Button>
        )}

        {demoSoon && (
          <Button
            disabled
            title="Próximamente"
            className="inline-flex h-9 items-center justify-center rounded-full bg-gray-600 px-3 py-2 text-xs tracking-normal text-white opacity-60 sm:text-sm lg:h-10 lg:px-4"
          >
            <ExternalLink className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" />{" "}
            ¡Próximamente!
          </Button>
        )}

        {!demoSoon && demoPrivate && (
          <Button
            disabled
            title="Acceso restringido"
            className="inline-flex h-9 items-center justify-center rounded-full bg-gray-600 px-3 py-2 text-xs tracking-normal text-white opacity-60 sm:text-sm lg:h-10 lg:px-4"
          >
            <ExternalLink className="mr-2 h-3.5 w-3.5 lg:h-4 lg:w-4" />{" "}
            Restringido
          </Button>
        )}
      </CardFooter>
    </Card>
  );
});
