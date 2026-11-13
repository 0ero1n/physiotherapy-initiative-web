"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function HashScrollHandler() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollToTarget = (targetId: string, smooth = true) => {
      if (typeof window === "undefined" || !targetId) return false;

      let id = targetId;
      try {
        id = decodeURIComponent(targetId);
      } catch {
        // use raw id if decode fails
      }

      // Find element by id, data-alias, or name attribute
      const element =
        document.getElementById(id) ||
        document.querySelector(`[data-alias="${CSS.escape(id)}"]`) ||
        document.querySelector(`a[name="${CSS.escape(id)}"]`);

      if (element) {
        const header = document.querySelector(".site-header");
        const headerHeight = header ? header.getBoundingClientRect().height : 80;
        const breathingRoom = 20;
        const totalOffset = headerHeight + breathingRoom;

        const rect = element.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        const targetY = Math.max(0, absoluteTop - totalOffset);

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

    // If page is loaded with a hash in the URL, scroll to it and clean the URL bar
    const rawHash = typeof window !== "undefined" ? window.location.hash : "";
    if (rawHash) {
      const targetId = rawHash.replace(/^#/, "");
      if (targetId) {
        scrollToTarget(targetId, false);

        // Retry progressive ladder for dynamic image hydration
        const timers = [60, 200, 450, 800].map((delay) =>
          setTimeout(() => {
            scrollToTarget(targetId, true);
          }, delay)
        );

        // Clean the hash from the browser URL bar so the user sees a pristine canonical route
        const cleanTimer = setTimeout(() => {
          if (window.location.hash) {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + window.location.search
            );
          }
        }, 500);

        timers.push(cleanTimer);
      }
    }

    // Intercept clicks on links pointing to hashes on the current page to prevent hash from polluting URL
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
          const targetId = url.hash.replace(/^#/, "");
          scrollToTarget(targetId, true);
          // Keep URL clean: do not push hash to history!
        }
      } catch {
        // Ignore unparseable hrefs
      }
    };

    document.addEventListener("click", onDocumentClick, { capture: true });

    return () => {
      document.removeEventListener("click", onDocumentClick, { capture: true });
    };
  }, [pathname]);

  return null;
}
