"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import ChatBot from "@/components/chatbot";
import FloatingNavbar from "@/components/shared/floating-navbar";
import { OverlayFocusProvider } from "@/components/shared/overlay-focus-provider";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Forzar scroll cuando el componente se monte
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "relative";

    // Asegurarse de que el scroll esté habilitado
    const enableScroll = () => {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    };

    // Habilitar scroll cada 100ms por un segundo para asegurar
    const interval = setInterval(enableScroll, 100);
    setTimeout(() => clearInterval(interval), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <OverlayFocusProvider>
      {!isAdmin && <FloatingNavbar />}
      {children}
      {!isAdmin && <ChatBot />}
    </OverlayFocusProvider>
  );
}
