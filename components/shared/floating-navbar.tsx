"use client";

import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOverlayFocusState } from "@/components/shared/overlay-focus-provider";

const navLinks = [
  { label: "Proyectos", href: "#projects", id: "projects" },
  { label: "Certificados", href: "#certificates", id: "certificates" },
  { label: "Contacto", href: "#contact", id: "contact" },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/Juan-Campo-developer",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/juan_campo",
    icon: Linkedin,
  },
];

const sectionIds = ["hero", ...navLinks.map((link) => link.id)];

export default function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const { isOverlayFocused } = useOverlayFocusState();
  const isScrolledRef = useRef(false);

  useEffect(() => {
    let frame = 0;
    let pending = false;
    const evaluate = () => {
      pending = false;
      const scrollY = window.scrollY;
      const next = isScrolledRef.current ? scrollY > 10 : scrollY > 72;
      if (next !== isScrolledRef.current) {
        isScrolledRef.current = next;
        setIsScrolled(next);
      }
    };
    const onScroll = () => {
      if (pending) return;
      pending = true;
      frame = window.requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveSection(visible.target.id);
        }
      },
      { rootMargin: "-25% 0px -55% 0px", threshold: [0.12, 0.25, 0.5] },
    );

    sectionIds.forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleNavigate = () => setIsOpen(false);

  return (
    <header
      className={cn(
        "fixed left-0 right-0 z-[60] pointer-events-none transition-[top,padding,opacity,filter,transform] duration-500 ease-out",
        isScrolled ? "top-4 px-4" : "top-0 px-0",
        isOverlayFocused && "-translate-y-6 opacity-0 blur-sm scale-[0.98]",
      )}
      aria-hidden={isOverlayFocused}
    >
      <nav
        className={cn(
          "pointer-events-auto mx-auto border text-white backdrop-blur-md transition-[max-width,border-radius,background-color,border-color,box-shadow] duration-500 ease-out",
          isScrolled
            ? "max-w-5xl rounded-full border-[#00f0ff]/35 bg-black/80 shadow-2xl shadow-[#00f0ff]/20"
            : "max-w-none rounded-none border-x-0 border-t-0 border-[#00f0ff]/15 bg-black/50 shadow-none",
          isOverlayFocused && "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "mx-auto flex items-center justify-between transition-[height,max-width,padding] duration-500 ease-out",
            isScrolled
              ? "h-16 max-w-5xl px-4 sm:px-6"
              : "h-[4.5rem] max-w-7xl px-5 sm:px-8",
          )}
        >
          <a
            href="#hero"
            onClick={handleNavigate}
            className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1.5 transition-colors hover:text-neon-blue"
            aria-label="Ir al inicio"
          >
            <span className="truncate text-base font-semibold tracking-normal sm:text-lg">
              Juan Campo
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-5 py-2.5 text-sm text-gray-300 transition-all duration-300 ease-out hover:bg-[#00f0ff]/10 hover:text-neon-blue",
                  activeSection === link.id &&
                    "bg-[#00f0ff]/15 text-neon-blue shadow-inner shadow-[#00f0ff]/10",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-2 md:flex">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/35 text-gray-300 transition-all duration-300 ease-out hover:border-neon-blue hover:bg-[#00f0ff]/10 hover:text-neon-blue"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/40 text-neon-blue transition-colors duration-300 hover:bg-[#00f0ff]/10 md:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div
          role="dialog"
          aria-label="Menú de navegación"
          className={cn(
            "pointer-events-auto fixed right-4 z-[70] w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[#00f0ff]/25 bg-black/90 p-3 text-white shadow-2xl shadow-[#00f0ff]/20 backdrop-blur-md md:hidden",
            isScrolled ? "top-24" : "top-[5.25rem]",
          )}
        >
          <div className="grid gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={handleNavigate}
                className={cn(
                  "rounded-xl px-3 py-2.5 text-sm text-gray-300 transition-colors hover:bg-[#00f0ff]/10 hover:text-neon-blue",
                  activeSection === link.id && "bg-[#00f0ff]/15 text-neon-blue",
                )}
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-3 flex justify-end gap-2 border-t border-[#00f0ff]/15 pt-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/40 text-gray-300 transition-colors hover:border-neon-blue hover:bg-[#00f0ff]/10 hover:text-neon-blue"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
