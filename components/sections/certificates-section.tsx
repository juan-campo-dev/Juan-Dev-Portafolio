"use client";

import {
  Award,
  ExternalLink,
  Trophy,
  GraduationCap,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionHeading from "@/components/shared/section-heading";

/**
 * Certificados del CV real de Juan Campo (2026).
 * Categorías:
 *   - distinction  → premios / distinciones (WorldSkills)
 *   - certification → certificaciones técnicas (Oracle/AWS, Illustrator)
 *   - course → cursos completados (Coderhouse, Udemy)
 */
type CertCategory = "distinction" | "certification" | "course";

interface Certificate {
  title: string;
  issuer: string;
  date: string;
  category: CertCategory;
  highlight?: string;
  fileUrl?: string;
  link?: string;
}

const CERTIFICATES: Certificate[] = [
  // ───── Distinciones ─────
  {
    title: "Top 3 Nacional — WorldSkills Colombia 2025",
    issuer: "WorldSkills Colombia",
    date: "2025",
    category: "distinction",
    highlight: "Tecnologías Web · Estándares internacionales",
  },
  // ───── Certificaciones ─────
  {
    title: "Oracle Database @ AWS Certified Architect Professional",
    issuer: "Oracle / AWS",
    date: "Dic 2025",
    category: "certification",
  },
  {
    title: "Diseño de Elementos Vectoriales en Illustrator",
    issuer: "Adobe",
    date: "Jun 2024",
    category: "certification",
  },
  // ───── Cursos Coderhouse ─────
  {
    title: "Carrera de Desarrollo Full Stack (52 semanas)",
    issuer: "Coderhouse",
    date: "Sep 2023",
    category: "course",
    highlight: "Top 10 mejores estudiantes",
  },
  {
    title: "JavaScript",
    issuer: "Coderhouse · 34h",
    date: "Jul 2022",
    category: "course",
  },
  {
    title: "React.js",
    issuer: "Coderhouse · 28h",
    date: "Sep 2022",
    category: "course",
  },
  {
    title: "Programación Backend",
    issuer: "Coderhouse · 86h",
    date: "Mar 2023",
    category: "course",
  },
  {
    title: "Programación con Java",
    issuer: "Coderhouse · 37h",
    date: "Dic 2022",
    category: "course",
  },
  {
    title: "Desarrollo Web",
    issuer: "Coderhouse · 38h",
    date: "May 2022",
    category: "course",
  },
  // ───── Cursos Udemy ─────
  {
    title: "Next.js: El framework de React para producción",
    issuer: "Udemy · 36.5h",
    date: "Mar 2024",
    category: "course",
  },
  {
    title: "Nest: Desarrollo backend escalable con Node",
    issuer: "Udemy · 25h",
    date: "Jun 2024",
    category: "course",
  },
  {
    title: "React: De cero a experto — Hooks y MERN",
    issuer: "Udemy · 54h",
    date: "Oct 2023",
    category: "course",
  },
  {
    title: "JavaScript Moderno: Guía para dominar el lenguaje",
    issuer: "Udemy · 22.5h",
    date: "Sep 2023",
    category: "course",
  },
  {
    title: "Node: De cero a experto",
    issuer: "Udemy · 20h",
    date: "May 2023",
    category: "course",
  },
  {
    title: "Principios SOLID y Clean Code",
    issuer: "Udemy · 8.5h",
    date: "Nov 2023",
    category: "course",
  },
];

const ICONS: Record<CertCategory, React.ReactNode> = {
  distinction: <Trophy className="h-5 w-5" />,
  certification: <Award className="h-5 w-5" />,
  course: <GraduationCap className="h-5 w-5" />,
};

const LABELS: Record<CertCategory, string> = {
  distinction: "Distinción",
  certification: "Certificación",
  course: "Curso",
};

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="py-20 bg-radial-gradient-section text-white"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Certificaciones"
          subtitle="Aprendizaje continuo y reconocimientos"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <Card
              key={cert.title}
              className="flex flex-col justify-between bg-cyber-gray border border-gray-700 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-neon-blue/30 hover:scale-[1.02] animate-fade-in-up relative z-50"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <CardHeader className="p-6 pb-2">
                <div className="flex items-center gap-2 mb-3 text-neon-blue">
                  {ICONS[cert.category]}
                  <span className="text-sm font-semibold tracking-normal uppercase">
                    {LABELS[cert.category]}
                  </span>
                </div>
                <CardTitle className="text-xl font-bold text-white tracking-wide leading-snug">
                  {cert.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="p-6 pt-2 flex-grow">
                <CardDescription className="text-gray-400 text-base tracking-normal">
                  {cert.issuer}
                </CardDescription>
                {cert.highlight && (
                  <div className="mt-2 inline-flex items-center gap-1 text-electric-green text-sm tracking-normal">
                    <Sparkles className="h-3 w-3" /> {cert.highlight}
                  </div>
                )}
              </CardContent>

              <CardFooter className="p-6 pt-0 flex justify-between items-center">
                <span className="text-gray-500 text-sm tracking-normal">
                  {cert.date}
                </span>
                {cert.link && (
                  <Button
                    asChild
                    variant="outline"
                    className="inline-flex items-center justify-center bg-transparent border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-black transition-colors duration-300 rounded-full px-4 py-2 tracking-normal"
                  >
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" /> Ver
                    </a>
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
