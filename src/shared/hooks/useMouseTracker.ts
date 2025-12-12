"use client";

import { useEffect, useState } from "react";

export function useMouseTracker() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsActive(true);

      // Get viewport dimensions
      const vx = (e.clientX / window.innerWidth - 0.5) * 2;
      const vy = (e.clientY / window.innerHeight - 0.5) * 2;

      document.documentElement.style.setProperty("--mouse-x", vx.toString());
      document.documentElement.style.setProperty("--mouse-y", vy.toString());
    };

    const handleMouseLeave = () => {
      setIsActive(false);
      document.documentElement.style.setProperty("--mouse-x", "0");
      document.documentElement.style.setProperty("--mouse-y", "0");
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return { mousePos, isActive };
}
