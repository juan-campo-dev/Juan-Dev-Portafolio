"use client";
import { useEffect } from "react";

export default function ScrollUnlocker() {
  useEffect(() => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, []);
  return null;
}
