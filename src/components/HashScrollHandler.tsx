"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToHashTarget = (smooth = true) => {
      if (typeof window === "undefined") return false;
      const rawHash = window.location.hash;
      if (!rawHash) return false;

      const rawId = rawHash.replace(/^#/, "");
      if (!rawId) return false;

      let id = rawId;
      try {
        id = decodeURIComponent(rawId);
      } catch {
        // use rawId if decode fails
      }

      // Find element by id, data-alias, or name attribute
      const element =
        document.getElementById(id) ||
        document.querySelector(`[data-alias="${CSS.escape(id)}"]`) ||
        document.querySelector(`a[name="${CSS.escape(id)}"]`);

      if (element) {
        // Compute exact header height dynamically
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        const breathingRoom = 20;
        const totalOffset = headerHeight + breathingRoom;

        const rect = element.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        const targetY = Math.max(0, absoluteTop - totalOffset);

        // Check if we are already close enough to avoid unnecessary jitter
        const currentY = window.pageYOffset;
        if (Math.abs(currentY - targetY) > 8) {
          window.scrollTo({
            top: targetY,
            behavior: smooth ? "smooth" : "auto",
          });
        }
        return true;
      }

      return false;
    };

    // Run immediately on route/mount
    scrollToHashTarget(false);

    // Progressive retry ladder to handle dynamic hydration, fonts, and image layout shifts
    const timers = [60, 180, 380, 750, 1300].map((delay) =>
      setTimeout(() => {
        scrollToHashTarget(true);
      }, delay)
    );

    // Handle manual hash change events
    const onHashChange = () => {
      scrollToHashTarget(true);
    };

    // Intercept clicks on links pointing to hashes on the current page
    const onDocumentClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href || !href.includes("#")) return;

      try {
        const url = new URL(href, window.location.href);
        // Only intercept internal links on the same origin and same pathname
        if (
          url.origin === window.location.origin &&
          url.pathname === window.location.pathname &&
          url.hash
        ) {
          e.preventDefault();
          if (window.location.hash !== url.hash) {
            window.history.pushState(null, "", url.hash);
          }
          scrollToHashTarget(true);
        }
      } catch {
        // Ignore unparseable hrefs
      }
    };

    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onDocumentClick, { capture: true });

    return () => {
      timers.forEach((t) => clearTimeout(t));
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onDocumentClick, { capture: true });
    };
  }, [pathname]);

  return null;
}
