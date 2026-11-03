import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
export default function JoinSection() {
  return (
    <section className="join-section">
      <div className="frame">
        <h2>
          Be part of
          <br />
          the progress.
        </h2>
        <div>
          <p>
            Share your expertise, become a partner, or support the next
            generation of physiotherapists.
          </p>
          <Link href="/contact" className="button">
            Let’s work together <ArrowUpRight size={20} aria-hidden="true" />
          </Link>
          <Link href="/donate" className="text-link">
            Make a contribution
          </Link>
        </div>
      </div>
    </section>
  );
}
