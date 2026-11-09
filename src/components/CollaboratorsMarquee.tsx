"use client";

import Image from "next/image";
import { COLLABORATORS } from "@/data/content";

export default function CollaboratorsMarquee() {
  // 4x duplication ensures a completely seamless, gap-free infinite scroll on any screen size
  const marqueeItems = [
    ...COLLABORATORS,
    ...COLLABORATORS,
    ...COLLABORATORS,
    ...COLLABORATORS,
  ];

  return (
    <aside
      className="pure-logo-marquee-section"
      aria-label="Partner and Collaborator Logos"
    >
      <div className="pure-logo-track-wrapper">
        <div className="pure-logo-track">
          {marqueeItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              className="pure-logo-item"
              title={item.name}
            >
              <Image
                src={item.logo}
                alt={`${item.name} logo`}
                width={320}
                height={100}
                className="pure-logo-img"
                sizes="(max-width: 640px) 200px, 300px"
              />
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
