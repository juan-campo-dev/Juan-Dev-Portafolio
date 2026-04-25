"use client";

import HeroSection from "@/components/sections/hero-section";
import AboutSection from "@/components/sections/about-section";
import ProjectsSection from "@/components/sections/projects-section";
import CertificatesSection from "@/components/sections/certificates-section";
import RodinPlayground from "@/components/sections/rodin-playground";
import ContactSection from "@/components/sections/contact-section";
import SoftSkillsSection from "@/components/sections/soft-skills-section";
import CursorFollower from "@/components/shared/cursor-follower";
import { trackPageView } from "@/lib/tracking";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    trackPageView(window.location.pathname);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CursorFollower />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <CertificatesSection />
      <SoftSkillsSection />
      <RodinPlayground />
      <ContactSection />
    </div>
  );
}
