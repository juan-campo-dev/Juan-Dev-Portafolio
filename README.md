# 🚀 Juan Dev — Portafolio Profesional

[![Next.js](https://img.shields.io/badge/Next.js-15.2-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)

> Portafolio dinámico de **Juan Andrés Campo** — Full Stack Developer | Top 3 Nacional WorldSkills Colombia 2025.

🌐 **Demo:** [juan-dev.app-dev.icu](https://juan-dev.app-dev.icu)
📧 **Contacto:** juan_campo_dev@yahoo.com

---

## 🧠 Sobre el proyecto

Sistema tipo SaaS personal con frontend Next.js + React + Tailwind y backend Laravel/MySQL/MongoDB ([juan-dev-backend](https://github.com/juan-campo-dev/juan-dev-backend)).

### Características

- 🎨 **Diseño iOS/SaaS** — animaciones, partículas, gradientes neon, modo oscuro
- 🎯 **16 proyectos reales** categorizados (empresariales, personales, académicos, experimentales)
- 📜 **Certificaciones** — WorldSkills, Oracle/AWS, Coderhouse, Udemy
- 🤖 **Chatbot IA** integrado (Gemini)
- 🪐 **Playground 3D** con generación de modelos vía Hyper3D
- 📊 **Métricas en tiempo real** (MongoDB Atlas)
- 🔐 **Panel admin** con CRUD + drag-drop

### Stack

| Capa         | Tecnologías                                                                  |
| ------------ | ---------------------------------------------------------------------------- |
| **Frontend** | Next.js 15, React 19, TypeScript, Tailwind CSS, Framer Motion, Three.js      |
| **Backend**  | Laravel 11, Sanctum, MySQL, MongoDB Atlas                                    |
| **Deploy**   | Hostinger (compartido) — frontend `/public_html/juan-dev/` + Laravel `/api/` |

---

## 🛠️ Setup local

```bash
git clone https://github.com/juan-campo-dev/juan-dev-frontend.git
cd juan-dev-frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Visita [http://localhost:3000](http://localhost:3000).

---

## 📂 Estructura

```
app/                  → App Router (Next.js 15)
components/
  ├ sections/         → Hero, About, Projects, Certificates, Contact
  ├ shared/           → ProjectCard, CursorFollower, AnimatedBackground
  └ ui/               → shadcn/ui primitives
lib/
  ├ api-client.ts     → Wrapper fetch al backend Laravel
  ├ tech-icons.tsx    → Mapper string → ícono React
  └ tracking.ts       → Eventos analytics → MongoDB
public/
  ├ cv/               → CVs descargables
  └ images/projects/  → Screenshots
```

---

## 👨‍💻 Autor

**Juan Andrés Campo** — Full Stack Developer · Cloud Solutions Specialist

- 🥉 Top 3 Nacional — WorldSkills Colombia 2025 (Tecnologías Web)
- 🎓 Tecnólogo ADSO (SENA) · Ingeniería de Software (7mo semestre)
- 💼 Experiencia: Postobón · Fermar · Tecniconstrucciones · JPLUMSER · Luna Sofía

---

© 2026 Juan Campo. Todos los derechos reservados.
