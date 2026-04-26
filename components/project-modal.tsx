"use client";

import React, { useEffect, useCallback, Suspense, useState } from "react";
import "@/styles/project-modal.css";
import {
  X,
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { trackDemoClick, trackGithubClick } from "@/lib/tracking";
import { useOverlayFocus } from "@/components/shared/overlay-focus-provider";
import { cn } from "@/lib/utils";
import { overlaySurface } from "@/lib/ui-system";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProjectModalProps {
  open: boolean;
  onClose: () => void;
  images: string[];
  title: string;
  description: string;
  techs: React.ReactNode[];
  githubUrl?: string;
  demoUrl?: string;
  isPrivate?: boolean;
  demoPrivate?: boolean;
  demoSoon?: boolean;
  slug?: string;
}

const ProjectModal: React.FC<ProjectModalProps> = React.memo(
  ({
    open,
    onClose,
    images,
    title,
    description,
    techs,
    githubUrl,
    demoUrl,
    isPrivate,
    demoPrivate,
    demoSoon,
    slug,
  }) => {
    useOverlayFocus("project-modal", open);
    // Limpieza de overflow al cerrar modal o cambiar de ruta
    // Limpieza de overflow al montar el componente (previene scroll bloqueado tras recarga)
    useEffect(() => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }, []);

    // Limpieza de overflow al cerrar modal o cambiar de ruta
    useEffect(() => {
      const cleanOverflow = () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
      if (open) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        // Next.js: limpiar overflow al cambiar de ruta
        window.addEventListener("popstate", cleanOverflow);
        window.addEventListener("hashchange", cleanOverflow);
      } else {
        cleanOverflow();
      }
      return () => {
        cleanOverflow();
        window.removeEventListener("popstate", cleanOverflow);
        window.removeEventListener("hashchange", cleanOverflow);
      };
    }, [open]);

    const handleClose = useCallback(() => {
      onClose();
    }, [onClose]);

    if (!open) return null;

    return (
      <div className={overlaySurface.root}>
        <div className={overlaySurface.backdrop} />
        <div className="relative z-10 w-full max-w-7xl max-h-[95vh] overflow-y-auto rounded-2xl">
          <div className={overlaySurface.glow}>
            <div className="h-full w-full rounded-2xl bg-black/90 backdrop-blur-md" />
          </div>
          <div className={cn("relative min-h-fit", overlaySurface.panel)}>
            {/* Header */}
            <div
              className={cn(
                "h-12 md:h-14 px-3 md:px-6 rounded-t-2xl",
                overlaySurface.header,
              )}
            >
              <div className="flex space-x-1 md:space-x-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 md:w-3 md:h-3 rounded-full opacity-80 shadow-lg ${["bg-red-500", "bg-yellow-500", "bg-green-500"][i]}`}
                  />
                ))}
              </div>
              <span
                className="text-[#c2e9fa] font-mono text-sm md:text-xl lg:text-2xl font-bold tracking-wider truncate mx-2 max-w-[60%] md:max-w-none"
                title={title}
              >
                {title}
              </span>
              <button
                onClick={handleClose}
                aria-label="Cerrar"
                className="group relative flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70 transition-all duration-300 hover:border-red-500/40 hover:bg-red-500/15 hover:text-red-300 focus:outline-none focus:ring-2 focus:ring-red-500/40 flex-shrink-0"
              >
                <div className="absolute inset-0 rounded-full bg-red-500/15 scale-0 group-hover:scale-100 transition-transform duration-300" />
                <X className="relative z-10 w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 p-3 md:p-6 pb-6">
              {/* Image + Buttons */}
              <div className="lg:col-span-2 flex flex-col items-center space-y-4 md:space-y-6 w-full">
                <Suspense
                  fallback={<div className="text-white">Cargando...</div>}
                >
                  <div className="relative group flex items-center justify-center w-full">
                    <div className="absolute -inset-0.5 rounded-lg border border-[#00f0ff]/10 bg-gradient-to-br from-[#00f0ff]/10 via-[#001a2b]/40 to-[#0080ff]/10 shadow-[0_0_16px_2px_#00f0ff22]" />
                    <div
                      className={cn(
                        "relative flex items-center justify-center overflow-hidden w-full h-48 md:h-80 lg:h-96",
                        overlaySurface.mediaFrame,
                      )}
                    >
                      <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        navigation={{
                          nextEl: ".next-btn",
                          prevEl: ".prev-btn",
                        }}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 5000, disableOnInteraction: false }}
                        className="w-full h-full swiper"
                      >
                        {images.map((img, idx) => (
                          <SwiperSlide key={idx}>
                            <div className="relative flex items-center justify-center w-full h-full">
                              <img
                                src={img || "/placeholder.svg"}
                                alt={`${title} imagen ${idx + 1}`}
                                loading="lazy"
                                className="object-cover w-full h-full max-w-full mx-auto rounded-lg shadow-[0_0_16px_1px_#00f0ff22] bg-black/90 p-1"
                              />
                              <div className="absolute top-2 md:top-3 right-2 md:right-3 bg-black/80 border border-[#00f0ff]/40 px-2 md:px-3 py-1 rounded-full shadow text-[#00f0ff] font-mono text-xs">
                                {idx + 1} / {images.length}
                              </div>
                            </div>
                          </SwiperSlide>
                        ))}
                      </Swiper>
                      <button className="prev-btn absolute left-1 md:left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-9 md:h-9 bg-black/80 border border-[#00f0ff]/30 rounded-full flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition duration-300">
                        <ChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                      <button className="next-btn absolute right-1 md:right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-9 md:h-9 bg-black/80 border border-[#00f0ff]/30 rounded-full flex items-center justify-center text-[#00f0ff] hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] transition duration-300">
                        <ChevronRight className="w-4 h-4 md:w-5 md:h-5" />
                      </button>
                    </div>
                  </div>
                </Suspense>

                {/* Botones GitHub / Demo */}
                <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 w-full max-w-md">
                  {!isPrivate && githubUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-colors duration-300 rounded-full px-3 md:px-4 py-2 tracking-normal text-sm"
                    >
                      <a
                        href={githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slug && trackGithubClick(slug)}
                      >
                        <Github className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />{" "}
                        GitHub
                      </a>
                    </Button>
                  )}
                  {isPrivate && (
                    <Button
                      disabled
                      title="Este repositorio es privado"
                      className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-3 md:px-4 py-2 tracking-normal text-sm"
                    >
                      <Github className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />{" "}
                      Privado
                    </Button>
                  )}
                  {!isPrivate && demoUrl && !demoPrivate && !demoSoon && (
                    <Button
                      asChild
                      className="inline-flex items-center justify-center bg-neon-blue text-black hover:bg-electric-green transition-colors duration-300 rounded-full px-3 md:px-4 py-2 tracking-normal text-sm"
                    >
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => slug && trackDemoClick(slug)}
                      >
                        <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />{" "}
                        Demo en Vivo
                      </a>
                    </Button>
                  )}
                  {demoSoon && (
                    <Button
                      disabled
                      title="Próximamente"
                      className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-3 md:px-4 py-2 tracking-normal text-sm"
                    >
                      <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />{" "}
                      ¡Próximamente!
                    </Button>
                  )}
                  {demoPrivate && (
                    <Button
                      disabled
                      title="Acceso restringido"
                      className="inline-flex items-center justify-center bg-gray-600 text-white cursor-not-allowed opacity-60 rounded-full px-3 md:px-4 py-2 tracking-normal text-sm"
                    >
                      <ExternalLink className="h-3 w-3 md:h-4 md:w-4 mr-1 md:mr-2" />{" "}
                      Restringido
                    </Button>
                  )}
                </div>
              </div>

              {/* Descripción y Techs */}
              <div className="lg:col-span-1 flex flex-col space-y-4 md:space-y-6">
                <div className={cn(overlaySurface.section, "p-4 md:p-6")}>
                  <div className="text-xs md:text-sm text-[#00f0ff] font-mono mb-2 md:mb-3 tracking-wider">
                    DESCRIPCIÓN
                  </div>
                  <p className="text-gray-300 leading-relaxed text-xs md:text-sm">
                    {description}
                  </p>
                </div>
                <div className={cn(overlaySurface.section, "p-4 md:p-6")}>
                  <div className="text-xs md:text-sm text-[#00f0ff] font-mono mb-3 md:mb-4 tracking-wider">
                    TECNOLOGIAS IMPLEMENTADAS
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3">
                    {techs.map((icon, idx) => (
                      <div key={idx} className="relative group">
                        <div className="absolute inset-0 bg-[#00f0ff]/20 rounded-lg scale-0 group-hover:scale-110 transition-transform duration-300" />
                        <div className="relative p-2 md:p-4 bg-black/60 backdrop-blur-sm border border-[#00f0ff]/20 rounded-lg hover:border-[#00f0ff] transition-all duration-300 flex items-center justify-center min-h-[3rem] md:min-h-[4rem]">
                          <span className="text-lg md:text-2xl">{icon}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#00f0ff] to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    );
  },
);

export default ProjectModal;
