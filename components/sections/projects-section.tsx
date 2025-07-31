
import SectionHeading from "@/components/shared/section-heading";
import ProjectCard from "@/components/shared/project-card";
import ProjectModal from "@/components/project-modal";
import { PROJECTS } from "@/components/projects-data";
import { useState } from "react";


export default function ProjectsSection() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

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
          {PROJECTS.map((project, index) => (
            <div key={index} className="cursor-pointer" onClick={() => { setSelected(index); setModalOpen(true); }}>
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
        {modalOpen && selected !== null && (
          <ProjectModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            images={PROJECTS[selected].images}
            title={PROJECTS[selected].title}
            description={PROJECTS[selected].description}
            techs={PROJECTS[selected].techs}
            githubUrl={PROJECTS[selected].githubUrl}
            demoUrl={PROJECTS[selected].demoUrl}
            isPrivate={PROJECTS[selected].githubPrivate}
            demoPrivate={PROJECTS[selected].demoPrivate}
            demoSoon={PROJECTS[selected].demoSoon}
          />
        )}
      </div>
    </section>
  );
}
