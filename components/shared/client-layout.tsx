"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import FloatingNavbar from "@/components/shared/floating-navbar";
import { OverlayFocusProvider } from "@/components/shared/overlay-focus-provider";

// ChatBot se carga después del primer paint para no bloquear LCP / hidratación.
const ChatBot = dynamic(() => import("@/components/chatbot"), {
  ssr: false,
  loading: () => null,
});

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    // Garantizar scroll habilitado al montar (una sola vez, sin polling).
    document.documentElement.style.overflow = "auto";
    document.documentElement.style.height = "auto";
    document.body.style.overflow = "auto";
    document.body.style.height = "auto";
    document.body.style.position = "relative";
  }, []);

  return (
    <OverlayFocusProvider>
      {!isAdmin && <FloatingNavbar />}
      {children}
      {!isAdmin && <ChatBot />}
    </OverlayFocusProvider>
  );
}
