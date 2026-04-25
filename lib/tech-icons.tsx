import type { ReactNode } from "react";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaPhp,
  FaDocker,
  FaBootstrap,
  FaRobot,
  FaJava,
  FaGitAlt,
  FaLinux,
  FaAws,
} from "react-icons/fa";
import {
  SiMysql,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss3,
  SiExpress,
  SiNextdotjs,
  SiLaravel,
  SiVuedotjs,
  SiFlask,
  SiGooglemaps,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiSymfony,
  SiNestjs,
  SiJquery,
} from "react-icons/si";

/**
 * Mapeo de string → ícono React. Cuando el backend devuelva
 * `technologies: ["React", "Laravel"]` (strings), lo convertimos a iconos
 * usando este mapper. Mantiene la UI igual.
 */
const ICONS: Record<string, ReactNode> = {
  react: <FaReact />,
  "next.js": <SiNextdotjs />,
  nextjs: <SiNextdotjs />,
  node: <FaNodeJs />,
  "node.js": <FaNodeJs />,
  nodejs: <FaNodeJs />,
  express: <SiExpress />,
  nestjs: <SiNestjs />,
  python: <FaPython />,
  flask: <SiFlask />,
  php: <FaPhp />,
  laravel: <SiLaravel />,
  symfony: <SiSymfony />,
  vue: <SiVuedotjs />,
  "vue.js": <SiVuedotjs />,
  vuejs: <SiVuedotjs />,
  javascript: <SiJavascript />,
  js: <SiJavascript />,
  typescript: <SiTypescript />,
  ts: <SiTypescript />,
  html: <SiHtml5 />,
  html5: <SiHtml5 />,
  css: <SiCss3 />,
  css3: <SiCss3 />,
  tailwind: <SiTailwindcss />,
  "tailwind css": <SiTailwindcss />,
  bootstrap: <FaBootstrap />,
  jquery: <SiJquery />,
  mysql: <SiMysql />,
  postgresql: <SiPostgresql />,
  postgres: <SiPostgresql />,
  mongodb: <SiMongodb />,
  mongo: <SiMongodb />,
  docker: <FaDocker />,
  git: <FaGitAlt />,
  linux: <FaLinux />,
  aws: <FaAws />,
  java: <FaJava />,
  ia: <FaRobot />,
  ai: <FaRobot />,
  "chatbot ia": <FaRobot />,
  "maps api": <SiGooglemaps />,
  "google maps": <SiGooglemaps />,
};

/**
 * Convierte un string de tecnología a su ícono React.
 * Si no encuentra match, devuelve null.
 */
export function getTechIcon(tech: string): ReactNode {
  const key = tech.trim().toLowerCase();
  return ICONS[key] ?? null;
}

/**
 * Convierte un array de strings a un array de iconos React,
 * filtrando los que no tienen match.
 */
export function getTechIcons(techs: string[]): ReactNode[] {
  return techs.map(getTechIcon).filter(Boolean);
}
