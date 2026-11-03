"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
export default function Motion() {
  const path = usePathname();
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            el.classList.add("entered");
            observer.unobserve(el);
          }
        }),
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        "main h2, main h3, main figure, main .reveal, main .program-option, main .section-heading > p, main .mission p, main .program-row, main .team-person",
      )
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [path]);
  return null;
}
