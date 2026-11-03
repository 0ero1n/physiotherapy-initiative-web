import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import ProgramExplorer from "@/components/ProgramExplorer";
import TrainingGallery from "@/components/TrainingGallery";
import JoinSection from "@/components/JoinSection";
import StrategicInitiatives from "@/components/StrategicInitiatives";
import { APP_INFO, CORE_VALUES } from "@/data/content";

import CollaboratorsMarquee from "@/components/CollaboratorsMarquee";

export default function HomePage() {
  return (
    <>
      {/* 1. HERO: Authentic emblem + title + subtitle + primary actions */}
      <section className="home-hero">
        <div className="frame hero-centered-content">
          <div className="hero-emblem-badge">
            <Image
              src="/images/our-logo.jpeg"
              alt="Tanzania Physiotherapy Initiative Emblem"
              width={80}
              height={80}
              className="hero-emblem-img"
              priority
            />
          </div>

          <h1>Tanzania Physiotherapy Initiative</h1>

          <p className="hero-subtitle">
            Shaping the future workforce in physiotherapy within Tanzania
          </p>

          <div className="hero-buttons-row">
            <Link href="/approach" className="hero-btn-primary">
              Learn More
            </Link>
            <Link href="/initiatives" className="hero-btn-ghost">
              Get Involved
            </Link>
          </div>
        </div>
      </section>

      {/* 2. OUR MISSION & NATIONAL FOCUS */}
      <section className="mission-showcase section" id="mission">
        <div className="frame">
          <h2 className="section-title">Our Mission</h2>

          <div className="mission-quote-card">
            <blockquote className="mission-quote-text">
              “{APP_INFO.missionStatement}”
            </blockquote>
            <cite className="mission-quote-author">
              — {APP_INFO.quoteAuthor}
            </cite>
          </div>

          <div className="mission-facts-row">
            <div className="mission-fact-card">
              <strong>4</strong>
              <span>Pathways to Grow</span>
            </div>
            <div className="mission-fact-card">
              <strong>100+</strong>
              <span>Students Reached</span>
            </div>
            <div className="mission-fact-card">
              <strong>2025</strong>
              <span>Founded in Tanzania</span>
            </div>
            <div className="mission-fact-card">
              <strong>Tanzania</strong>
              <span>Our Home. Our Focus.</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE LEARNING PATHWAYS: Immediate resolution of the "4 Pathways to Grow" */}
      <section className="program-section section">
        <div className="frame">
          <div className="section-heading">
            <h2>
              Find your
              <br />
              next step.
            </h2>
            <p>
              Build your skills, exchange perspectives, or bring a new idea to
              life. Explore our four learning pathways.
            </p>
          </div>
          <ProgramExplorer />
        </div>
      </section>

      {/* 4. STRATEGIC INITIATIVES: Putting physiotherapy and inclusion into action */}
      <StrategicInitiatives />

      {/* 5. TRAINING IN ACTION: Photo journal with interactive category filtering */}
      <TrainingGallery />

      {/* 6. OUR CORE VALUES: Foundational ethos guiding education and clinical care */}
      <section className="values-section section">
        <div className="frame">
          <div className="section-heading text-center" style={{ maxWidth: "700px", margin: "0 auto 48px" }}>
            <h2>Our Core Values</h2>
            <p>
              Guiding how we teach, collaborate, and serve communities across Tanzania.
            </p>
          </div>
          <div className="value-list">
            {CORE_VALUES.map((v) => (
              <article key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 7. LEADERSHIP PREVIEW: Locally led by dedicated Tanzanian professionals */}
      <section className="about-preview frame section">
        <figure>
          <Image
            src="/images/training/training_1.jpeg"
            alt="Members of the Tanzania Physiotherapy Initiative gathered at a workshop"
            width={1000}
            height={800}
            sizes="(max-width:760px) 100vw, 50vw"
          />
        </figure>
        <div>
          <h2>
            Led here.
            <br />
            Built together.
          </h2>
          <p>
            Progress starts with people who understand the place they call home.
            Meet the Tanzanian professionals connecting education, clinical
            practice, and community care.
          </p>
          <Link href="/about#team" className="text-link">
            Meet our people <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 8. GLOBAL COLLABORATIONS MARQUEE (JUST LOGOS PASSING) */}
      <CollaboratorsMarquee />

      {/* 9. CALL TO ACTION: Participate & support our mission */}
      <JoinSection />
    </>
  );
}
