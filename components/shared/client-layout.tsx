"use client";

import { useEffect } from 'react';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Forzar scroll cuando el componente se monte
    document.documentElement.style.overflow = 'auto';
    document.documentElement.style.height = 'auto';
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    document.body.style.position = 'relative';
    
    // Asegurarse de que el scroll esté habilitado
    const enableScroll = () => {
      document.documentElement.style.overflow = 'auto';
      document.body.style.overflow = 'auto';
    };

    // Habilitar scroll cada 100ms por un segundo para asegurar
    const interval = setInterval(enableScroll, 100);
    setTimeout(() => clearInterval(interval), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <>{children}</>;
}
