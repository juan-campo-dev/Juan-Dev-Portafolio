"use client"

import HeroSection from "@/components/sections/hero-section"
import AboutSection from "@/components/sections/about-section"
import ProjectsSection from "@/components/sections/projects-section"
import RodinPlayground from "@/components/sections/rodin-playground"
import ContactSection from "@/components/sections/contact-section"
import SoftSkillsSection from "@/components/sections/soft-skills-section"
import CursorFollower from "@/components/shared/cursor-follower"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <CursorFollower />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SoftSkillsSection />
      <RodinPlayground />
      <ContactSection />
    </div>
  )
}
