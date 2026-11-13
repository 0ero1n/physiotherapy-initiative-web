import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Hero from "@/components/Hero";
import TrainingGallery from "@/components/TrainingGallery";
import GoniometerSimulator from "@/components/GoniometerSimulator";
import JoinSection from "@/components/JoinSection";
import { PROGRAMS } from "@/data/content";

const names = [
  "Physiotherapy Academy",
  "Summer School",
  "International Exchange",
  "Innovation Incubation",
];

export const metadata = {
  title: "Programs & Clinical Pathways",
  description:
    "Four comprehensive pathways connecting clinical knowledge, practical skills, and the healthcare professionals shaping physiotherapy in Tanzania.",
};

export default function Approach() {
  return (
    <>
      <Hero
        title="Learn. Put It into Practice."
        description="Four comprehensive pathways connecting clinical knowledge, practical skills, and the healthcare professionals shaping physiotherapy in Tanzania."
        actionHref="#programs"
        actionLabel="View All 4 Programs"
        secondaryHref="/initiatives"
        secondaryLabel="Active Initiatives"
      />
      <nav className="frame program-jump" aria-label="Jump to a program">
        {PROGRAMS.map((p, i) => (
          <Link key={p.id} href={`/approach/${p.id}`}>
            {names[i]}
          </Link>
        ))}
      </nav>
      <span id="workforce" className="sr-only" />
      <div className="frame program-details" id="programs" data-alias="workforce">
        {PROGRAMS.map((p, i) => (
          <section key={p.id} id={p.id} className="program-row">
            <figure>
              <Image
                src={p.image || `/images/training/training_${[5, 3, 6, 7][i]}.jpeg`}
                alt={`${names[i]} session in action`}
                width={1000}
                height={800}
                sizes="(max-width:760px) 100vw, 48vw"
              />
            </figure>
            <div>
              <h2>{names[i]}</h2>
              <p>{p.description}</p>
              <ul>
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <div className="flex items-center gap-3 flex-wrap mt-5">
                <Link
                  className="button"
                  href={`/contact?subject=${encodeURIComponent(p.title)}`}
                >
                  Ask about this program
                </Link>
                <Link
                  className="button button-ghost"
                  href={`/approach/${p.id}`}
                >
                  <span>Full Program Dossier</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </section>
        ))}
      </div>
      <GoniometerSimulator />
      <TrainingGallery />
      <JoinSection />
    </>
  );
}
