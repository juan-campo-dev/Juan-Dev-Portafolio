"use client";

import { useEffect, useMemo, useState } from "react";
import { Github, Linkedin, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

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

export default function FloatingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const sectionIds = useMemo(
    () => ["hero", ...navLinks.map((link) => link.id)],
    [],
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
  }, [sectionIds]);

  const handleNavigate = () => setIsOpen(false);

  return (
    <header className="fixed left-0 right-0 top-4 z-[60] px-4 pointer-events-none">
      <nav
        className={cn(
          "pointer-events-auto mx-auto max-w-5xl overflow-hidden rounded-full border border-[#00f0ff]/20 bg-black/55 text-white shadow-2xl shadow-[#00f0ff]/10 backdrop-blur-xl transition-all duration-300",
          isScrolled && "border-[#00f0ff]/35 bg-black/80 shadow-[#00f0ff]/20",
        )}
      >
        <div className="flex h-14 items-center justify-between px-3 sm:px-5">
          <a
            href="#hero"
            onClick={handleNavigate}
            className="flex min-w-0 items-center gap-3 rounded-full px-2 py-1 transition-colors hover:text-neon-blue"
            aria-label="Ir al inicio"
          >
            <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-neon-blue shadow-[0_0_16px_rgba(0,240,255,0.8)]" />
            <span className="truncate text-sm font-semibold tracking-normal sm:text-base">
              Juan Campo
            </span>
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm text-gray-300 transition-all duration-200 hover:bg-[#00f0ff]/10 hover:text-neon-blue",
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
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/35 text-gray-300 transition-all duration-200 hover:border-neon-blue hover:bg-[#00f0ff]/10 hover:text-neon-blue"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/40 text-neon-blue transition-colors hover:bg-[#00f0ff]/10 md:hidden"
            aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="border-t border-[#00f0ff]/15 px-4 pb-4 pt-2 md:hidden">
            <div className="grid gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={handleNavigate}
                  className={cn(
                    "rounded-xl px-3 py-2 text-sm text-gray-300 transition-colors hover:bg-[#00f0ff]/10 hover:text-neon-blue",
                    activeSection === link.id &&
                      "bg-[#00f0ff]/15 text-neon-blue",
                  )}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#00f0ff]/20 bg-black/40 text-gray-300 transition-colors hover:text-neon-blue"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
