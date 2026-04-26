import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaDocker,
  FaBootstrap,
  FaRobot,
} from "react-icons/fa";
import {
  SiMysql,
  SiJavascript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiNextdotjs,
  SiLaravel,
  SiVuedotjs,
  SiFlask,
  SiTypescript,
  SiGooglemaps,
  SiTailwindcss,
} from "react-icons/si";

/**
 * Tipo Project — shape consumido por ProjectCard / ProjectModal.
 * Campos extra (slug, category, client, platforms, year, featured) son opcionales
 * y se usan para filtros, páginas individuales /projects/[slug] y futura API.
 */
export type ProjectCategory =
  | "empresarial"
  | "personal"
  | "academico"
  | "experimental";
export type ProjectPlatform = "web" | "pwa" | "apk" | "exe" | "ios";

export interface Project {
  // Campos consumidos por la UI actual (NO TOCAR shape)
  title: string;
  description: string;
  images: string[];
  techs: React.ReactNode[];
  githubUrl?: string;
  githubPrivate: boolean;
  demoUrl?: string;
  demoPrivate: boolean;
  demoSoon: boolean;
  // Campos extendidos (opcionales) — para API, filtros, SEO
  slug?: string;
  category?: ProjectCategory;
  client?: string;
  platforms?: ProjectPlatform[];
  year?: number;
  featured?: boolean;
}

const FALLBACK_IMG = "/images/personal.png";
const img = (name: string) => `/images/projects/${name}.png`;

export const PROJECTS: Project[] = [
  // ───────────────────────────── EMPRESARIALES ─────────────────────────────
  {
    slug: "vence-pro",
    title: "Vence Pro 360 — Seguimiento Documental de Flotas",
    description:
      "Sistema multiplataforma (Web, PWA, APK, EXE + Chatbot WhatsApp) para seguimiento documental de flotas de representantes de ventas en Postobón. Construido con PHP, JavaScript, MySQL, Docker e IA. Procesa flujos críticos para +600 clientes activos.",
    images: [img("vence-pro"), img("vence-pro-2"), img("vence-pro-3")],
    techs: [
      <FaPhp />,
      <SiJavascript />,
      <SiMysql />,
      <FaDocker />,
      <FaRobot />,
    ],
    githubUrl: undefined,
    githubPrivate: true,
    demoUrl: undefined,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Postobón / Gaseosas Lux S.A.S.",
    platforms: ["web", "pwa", "apk", "exe"],
    year: 2025,
    featured: true,
  },
  {
    slug: "luxcontrol",
    title: "LuxControl — Control de Acceso de Personal y Equipos",
    description:
      "Aplicación Web/PWA/EXE para control de entrada y salida de personal y equipos en planta. Integra flujos administrativos con SAP (anticipos, viáticos, facturas) y Webdox (contratos digitales) automatizando la gestión de RRHH.",
    images: [img("luxcontrol"), img("luxcontrol-2")],
    techs: [<SiJavascript />, <FaPhp />, <SiMysql />],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Postobón / Gaseosas Lux S.A.S.",
    platforms: ["web", "pwa", "exe"],
    year: 2025,
    featured: true,
  },
  {
    slug: "luna-sofia",
    title: "Luna Sofía — ERP Distribuciones (+600 clientes)",
    description:
      "ERP completo (React + Laravel) con +50 módulos: cartera, comisiones, pedidos, inventarios (+1.700 productos). Auditoría de rutas con Google Maps API, gestión multi-rol (Admin, Vendedor, Repartidor, Cliente) y Chatbot IA. Ventas >$114M mensuales.",
    images: [img("luna-sofia"), img("luna-sofia-2"), img("luna-sofia-3")],
    techs: [
      <FaReact />,
      <SiLaravel />,
      <SiMysql />,
      <SiGooglemaps />,
      <FaRobot />,
    ],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Luna Sofía Distribuciones",
    platforms: ["web", "apk"],
    year: 2025,
    featured: true,
  },
  {
    slug: "sgi-fermar",
    title: "SGI FERMAR — Sistema de Gestión Integral",
    description:
      "Sistema de gestión integral con PHP, JavaScript, MySQL y arquitectura MVC. Ciclo completo: requerimientos, modelado relacional, APIs REST y despliegue en producción con Docker. Módulo Python/IA para análisis.",
    images: [img("sgi-fermar"), img("sgi-fermar-2")],
    techs: [
      <FaPhp />,
      <SiJavascript />,
      <SiMysql />,
      <FaPython />,
      <FaDocker />,
    ],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Montajes y Construcciones Fermar S.A.S.",
    platforms: ["web"],
    year: 2026,
    featured: true,
  },
  {
    slug: "cotizapp",
    title: "CotizaApp — Cotizaciones e Inventario",
    description:
      "Aplicación web para cotizaciones e inventariado con PHP, JavaScript/React y MySQL. Frontend con Bootstrap y despliegue corporativo. Control de versiones con Git y buenas prácticas de documentación.",
    images: [img("cotizapp"), img("cotizapp-2")],
    techs: [<FaPhp />, <FaReact />, <SiMysql />, <FaBootstrap />],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Tecniconstrucciones BR S.A.S.",
    platforms: ["web"],
    year: 2024,
  },
  {
    slug: "novedapp",
    title: "Novedapp — Reporte de Novedades Operativas",
    description:
      "Plataforma para el reporte de novedades operativas en campo con PHP, Vue.js y MySQL. Integración de APIs REST, validaciones con POO y despliegue en servidor de producción.",
    images: [img("novedapp"), img("novedapp-2")],
    techs: [<FaPhp />, <SiVuedotjs />, <SiMysql />],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "JPLUMSER Service",
    platforms: ["web"],
    year: 2024,
  },
  {
    slug: "fleet-app",
    title: "Fleet App — Gestión de Flotas Logísticas",
    description:
      "Aplicación web para gestión integral de flotas logísticas con React + Laravel + MySQL. Auditoría de rutas en tiempo real con Google Maps API y panel multi-rol.",
    images: [img("fleet-app"), img("fleet-app-2")],
    techs: [<FaReact />, <SiLaravel />, <SiMysql />, <SiGooglemaps />],
    githubPrivate: true,
    demoUrl: "https://fleet.app-dev.icu",
    demoPrivate: false,
    demoSoon: false,
    category: "empresarial",
    client: "EasyLogística",
    platforms: ["web"],
    year: 2025,
    featured: true,
  },
  {
    slug: "wellmapp",
    title: "Wellmapp — Geolocalizador de Pozos Petroleros",
    description:
      "App móvil (APK + iOS) offline para geolocalización de +15.000 pozos petroleros y reporte de incidentes en campo. Construida con Python, Flask y geolocalización GPS para uso exclusivo de Ecopetrol.",
    images: ["/images/wellmap.png", "/images/wellmap.png"],
    techs: [<FaPython />, <SiFlask />, <SiHtml5 />, <SiCss3 />],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Ecopetrol",
    platforms: ["apk", "ios"],
    year: 2024,
  },
  {
    slug: "web-tecniconstrucciones",
    title: "Web Tecniconstrucciones — Sitio Corporativo",
    description:
      "Página web corporativa de Tecniconstrucciones BR con React, Bootstrap y Chatbot IA integrado para atención de clientes potenciales.",
    images: [img("tecniconstrucciones"), img("tecniconstrucciones-2")],
    techs: [<FaReact />, <FaBootstrap />, <FaRobot />],
    githubPrivate: true,
    demoPrivate: true,
    demoSoon: false,
    category: "empresarial",
    client: "Tecniconstrucciones BR S.A.S.",
    platforms: ["web"],
    year: 2024,
  },

  // ───────────────────────────── PERSONALES ─────────────────────────────
  {
    slug: "printflow",
    title: "PrintFlow — Plataforma de Gestión de Impresión",
    description:
      "Plataforma multiplataforma (Web, PWA, APK, EXE) para gestión de flujos de impresión y pedidos. Construida con JavaScript, PHP y MySQL.",
    images: [img("printflow"), img("printflow-2")],
    techs: [<SiJavascript />, <FaPhp />, <SiMysql />],
    githubUrl: "https://github.com/Juan-Campo-developer/printflow",
    githubPrivate: false,
    demoUrl: "https://printflow.app-dev.icu",
    demoPrivate: false,
    demoSoon: false,
    category: "personal",
    platforms: ["web", "apk", "pwa", "exe"],
    year: 2025,
    featured: true,
  },
  {
    slug: "situr",
    title: "Situr — Sistema Turístico Inteligente",
    description:
      "Plataforma web turística con HTML, CSS y Python que incluye un Chatbot IA para recomendaciones personalizadas de destinos y rutas.",
    images: [img("situr"), img("situr-2")],
    techs: [<SiHtml5 />, <SiCss3 />, <FaPython />, <FaRobot />],
    githubUrl: "https://github.com/Juan-Campo-developer/situr",
    githubPrivate: false,
    demoPrivate: true,
    demoSoon: true,
    category: "personal",
    platforms: ["web"],
    year: 2024,
  },
  {
    slug: "microgreens",
    title: "Microgreens — Cultivos Hidropónicos",
    description:
      "Sitio web educativo y de gestión para cultivos de microgreens hidropónicos. Construido con HTML, CSS y Flask (Python).",
    images: [img("microgreens"), img("microgreens-2")],
    techs: [<SiHtml5 />, <SiCss3 />, <SiFlask />, <FaPython />],
    githubUrl: "https://github.com/Juan-Campo-developer/microgreens",
    githubPrivate: false,
    demoPrivate: true,
    demoSoon: true,
    category: "personal",
    platforms: ["web"],
    year: 2024,
  },
  {
    slug: "adsonary",
    title: "Adsonary — Diccionario Técnico de Software",
    description:
      "Diccionario web para aprendices de desarrollo, con búsqueda en tiempo real de términos y ejemplos prácticos. Construido con Node.js, Express y JavaScript usando un CSV como base de datos.",
    images: ["/images/adsonary.png", "/images/adsonary.png"],
    techs: [<FaNodeJs />, <SiExpress />, <SiJavascript />],
    githubUrl:
      "https://github.com/Juan-Campo-developer/Adsonary-Diccionario-Tecnico-de-Software",
    githubPrivate: false,
    demoUrl: "https://adsonary.onrender.com/",
    demoPrivate: false,
    demoSoon: false,
    category: "personal",
    platforms: ["web"],
    year: 2024,
  },
  {
    slug: "mallapp",
    title: "Mallapp — Directorio Comercial de Centros Comerciales",
    description:
      "Aplicación web para directorio interactivo de tiendas, promociones y eventos en centros comerciales. Búsqueda por categorías y mapa interno.",
    images: [img("mallapp"), img("mallapp-2")],
    techs: [<SiJavascript />, <FaPhp />, <SiMysql />],
    githubPrivate: false,
    demoPrivate: true,
    demoSoon: true,
    category: "personal",
    platforms: ["web"],
    year: 2024,
  },

  // ───────────────────────────── ACADÉMICOS ─────────────────────────────
  {
    slug: "votaciones-sena",
    title: "Sistema de Votaciones SENA",
    description:
      "Sistema web de votaciones electrónicas para representantes de aprendices del SENA. Autenticación segura, conteo en tiempo real y resultados auditables.",
    images: [img("votaciones-sena"), img("votaciones-sena-2")],
    techs: [<FaPhp />, <SiJavascript />, <SiMysql />, <SiHtml5 />],
    githubUrl: "https://github.com/Juan-Campo-developer/votaciones-sena",
    githubPrivate: false,
    demoPrivate: true,
    demoSoon: false,
    category: "academico",
    client: "SENA — CIDT Barrancabermeja",
    platforms: ["web"],
    year: 2024,
  },
];
