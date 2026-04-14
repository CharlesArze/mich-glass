import { useEffect, useRef, useState, useMemo } from "react";

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  direction?: "bottom" | "top";
  splitBy?: "words" | "letters";
}

const BlurText = ({
  text,
  delay = 200,
  className = "",
  direction = "bottom",
  splitBy = "words",
}: BlurTextProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  const elements = useMemo(() => {
    if (splitBy === "words") return text.split(" ");
    return text.split("");
  }, [text, splitBy]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const initialY = direction === "bottom" ? 50 : -50;

  return (
    <div ref={containerRef} className={`flex flex-wrap ${className}`}>
      {elements.map((el, i) => (
        <span
          key={i}
          className="inline-block transition-all"
          style={{
            transitionDuration: "0.7s",
            transitionDelay: `${i * delay}ms`,
            transitionTimingFunction: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            filter: inView ? "blur(0px)" : "blur(10px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${initialY}px)`,
          }}
        >
          {el}
          {splitBy === "words" && <span>&nbsp;</span>}
        </span>
      ))}
    </div>
  );
};

export default BlurText;