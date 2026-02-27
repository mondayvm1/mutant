import { useEffect, useRef, useState, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale" | "fade";
  threshold?: number;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyle: React.CSSProperties = {
    transitionDelay: `${delay}ms`,
    transitionDuration: "800ms",
    transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    transitionProperty: "opacity, transform",
  };

  const hiddenStyles: Record<string, React.CSSProperties> = {
    up: { opacity: 0, transform: "translateY(60px)" },
    left: { opacity: 0, transform: "translateX(80px)" },
    right: { opacity: 0, transform: "translateX(-80px)" },
    scale: { opacity: 0, transform: "scale(0.85)" },
    fade: { opacity: 0 },
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: "translateY(0) translateX(0) scale(1)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...baseStyle,
        ...(isVisible ? visibleStyle : hiddenStyles[direction]),
      }}
    >
      {children}
    </div>
  );
}
