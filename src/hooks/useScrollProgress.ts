import { useEffect, useRef, useState } from "react";

/** Returns a 0–1 progress value representing how far the element has scrolled through the viewport */
export function useScrollProgress(offset: number = 0) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight;
      const end = -rect.height;
      const current = rect.top - offset;
      const raw = 1 - (current - end) / (start - end);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [offset]);

  return { ref, progress };
}
