"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PROGRAMS } from "@/data/content";
export const programNames = [
  "Physiotherapy Academy",
  "Summer School",
  "International Exchange",
  "Innovation Incubation",
];
const photos = [4, 3, 6, 7];
export default function ProgramExplorer() {
  const [active, setActive] = useState(0);
  const program = PROGRAMS[active];
  return (
    <div className="program-explorer">
      <div className="program-options" aria-label="Explore learning pathways">
        {PROGRAMS.map((p, i) => (
          <button
            key={p.id}
            className={
              i === active ? "program-option selected" : "program-option"
            }
            aria-pressed={i === active}
            aria-controls="program-detail"
            onClick={() => setActive(i)}
          >
            {programNames[i]}
            <ArrowUpRight size={25} aria-hidden="true" />
          </button>
        ))}
      </div>
      <div className="program-preview" id="program-detail">
        <figure key={program.id}>
          <Image
            src={program.image || `/images/training/training_${photos[active]}.jpeg`}
            alt={`${program.title} in action`}
            width={900}
            height={650}
            sizes="(max-width: 760px) 100vw, 48vw"
          />
          <figcaption>Learning that connects to practice</figcaption>
        </figure>
        <div aria-live="polite">
          <p>{program.shortDesc}</p>
          <Link href={`/approach/${program.id}`} className="text-link">
            Explore this program <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
      <noscript>
        <Link href="/approach">Explore all four programs</Link>
      </noscript>
    </div>
  );
}
