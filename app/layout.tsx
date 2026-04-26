import React from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/shared/animated-background";
import ClientLayout from "@/components/shared/client-layout";

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${geist.className} scroll-smooth`}
      style={{ height: "auto", minHeight: "100vh", overflowY: "auto" }}
    >
      <head>
        <title>Mi Portafolio Sci-Fi</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/pwa.png" type="image/png" />
      </head>
      <body
        className="bg-background text-foreground"
        style={{
          height: "auto",
          minHeight: "100vh",
          overflowY: "auto",
          position: "relative",
        }}
      >
        <ClientLayout>
          <AnimatedBackground />
          <div className="relative w-full min-h-[100dvh]">{children}</div>
        </ClientLayout>
      </body>
    </html>
  );
}

export const metadata = {
  generator: "",
};
