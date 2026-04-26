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
  react: <FaReact color="#61DAFB" />,
  "next.js": <SiNextdotjs color="#FFFFFF" />,
  nextjs: <SiNextdotjs color="#FFFFFF" />,
  node: <FaNodeJs color="#3C873A" />,
  "node.js": <FaNodeJs color="#3C873A" />,
  nodejs: <FaNodeJs color="#3C873A" />,
  express: <SiExpress color="#E5E5E5" />,
  nestjs: <SiNestjs color="#E0234E" />,
  python: <FaPython color="#FFD43B" />,
  flask: <SiFlask color="#E5E5E5" />,
  php: <FaPhp color="#8993BE" />,
  laravel: <SiLaravel color="#FF2D20" />,
  symfony: <SiSymfony color="#E5E5E5" />,
  vue: <SiVuedotjs color="#4FC08D" />,
  "vue.js": <SiVuedotjs color="#4FC08D" />,
  vuejs: <SiVuedotjs color="#4FC08D" />,
  javascript: <SiJavascript color="#F7DF1E" />,
  js: <SiJavascript color="#F7DF1E" />,
  typescript: <SiTypescript color="#3178C6" />,
  ts: <SiTypescript color="#3178C6" />,
  html: <SiHtml5 color="#E34F26" />,
  html5: <SiHtml5 color="#E34F26" />,
  css: <SiCss3 color="#1572B6" />,
  css3: <SiCss3 color="#1572B6" />,
  tailwind: <SiTailwindcss color="#06B6D4" />,
  "tailwind css": <SiTailwindcss color="#06B6D4" />,
  bootstrap: <FaBootstrap color="#7952B3" />,
  jquery: <SiJquery color="#0769AD" />,
  mysql: <SiMysql color="#4479A1" />,
  postgresql: <SiPostgresql color="#4169E1" />,
  postgres: <SiPostgresql color="#4169E1" />,
  mongodb: <SiMongodb color="#47A248" />,
  mongo: <SiMongodb color="#47A248" />,
  docker: <FaDocker color="#2496ED" />,
  git: <FaGitAlt color="#F05032" />,
  linux: <FaLinux color="#FCC624" />,
  aws: <FaAws color="#FF9900" />,
  java: <FaJava color="#ED8B00" />,
  ia: <FaRobot color="#00F0FF" />,
  ai: <FaRobot color="#00F0FF" />,
  "chatbot ia": <FaRobot color="#00F0FF" />,
  "maps api": <SiGooglemaps color="#4285F4" />,
  "google maps": <SiGooglemaps color="#4285F4" />,
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
