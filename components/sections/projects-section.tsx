import SectionHeading from "@/components/shared/section-heading";
import ProjectCard from "@/components/shared/project-card";
import { PROJECTS, type Project } from "@/components/projects-data";
import { apiFetchOrFallback } from "@/lib/api-client";
import { getTechIcons } from "@/lib/tech-icons";
import { trackProjectView } from "@/lib/tracking";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Swiper + Radix Dialog del modal solo se cargan cuando el usuario abre uno.
const ProjectModal = dynamic(() => import("@/components/project-modal"), {
  ssr: false,
});

interface ApiProject extends Omit<Project, "techs"> {
  technologies?: string[];
  techs?: string[];
}

function isVisibleProject(project: Pick<Project, "slug">): boolean {
  return project.slug !== "tentaapp";
}

function normalizeProject(project: Project | ApiProject): Project {
  const apiTechs = Array.isArray((project as ApiProject).technologies)
    ? (project as ApiProject).technologies
    : Array.isArray((project as ApiProject).techs)
      ? (project as ApiProject).techs
      : null;

  return {
    ...project,
    images: project.images?.length ? project.images : ["/images/personal.png"],
    techs: apiTechs ? getTechIcons(apiTechs) : (project as Project).techs,
  } as Project;
}

export default function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>(() =>
    PROJECTS.filter(isVisibleProject),
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    apiFetchOrFallback<ApiProject[]>(
      "/projects",
      PROJECTS as unknown as ApiProject[],
      { signal: controller.signal },
    )
      .then((data) => {
        if (controller.signal.aborted) return;
        setProjects(data.map(normalizeProject).filter(isVisibleProject));
      })
      .catch(() => {
        if (controller.signal.aborted) return;
        setProjects(PROJECTS.filter(isVisibleProject));
      });

    return () => controller.abort();
  }, []);

  const openProject = (index: number) => {
    setSelected(index);
    setModalOpen(true);

    const slug = projects[index]?.slug;
    if (slug) {
      trackProjectView(slug);
    }
  };

  return (
    <section
      id="projects"
      className="py-20 bg-radial-gradient-section text-white"
    >
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Mis Proyectos"
          subtitle="Aventurándome en la Frontera Digital"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={project.slug ?? index}
              className="h-full cursor-pointer"
              onClick={() => openProject(index)}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
                imageUrl={project.images[0]}
                githubUrl={project.githubUrl}
                demoUrl={project.demoUrl}
                delay={index * 0.1}
                isPrivate={project.githubPrivate}
                demoPrivate={project.demoPrivate}
                demoSoon={project.demoSoon}
              />
            </div>
          ))}
        </div>
        {modalOpen && selected !== null && projects[selected] && (
          <ProjectModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            images={projects[selected].images}
            title={projects[selected].title}
            description={projects[selected].description}
            techs={projects[selected].techs}
            githubUrl={projects[selected].githubUrl}
            demoUrl={projects[selected].demoUrl}
            isPrivate={projects[selected].githubPrivate}
            demoPrivate={projects[selected].demoPrivate}
            demoSoon={projects[selected].demoSoon}
            slug={projects[selected].slug}
          />
        )}
      </div>
    </section>
  );
}
