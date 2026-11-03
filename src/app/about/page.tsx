import Image from "next/image";
import Hero from "@/components/Hero";
import JoinSection from "@/components/JoinSection";
import { APP_INFO, CORE_VALUES, LEADERSHIP_TEAM } from "@/data/content";
export const metadata = {
  title: "About us | Tanzania Physiotherapy Initiative",
};
export default function About() {
  return (
    <>
      <Hero
        title="People Behind Progress."
        description="A locally led non-profit initiative dedicated to advancing clinical education, strengthening professional excellence, and building a resilient physiotherapy workforce for Tanzania."
        actionHref="#team"
        actionLabel="Meet Our Leadership"
        secondaryHref="/approach"
        secondaryLabel="Explore Our Programs"
      />
      <section className="frame section about-story">
        <figure>
          <Image
            src="/images/training/training_2.jpeg"
            alt="TPI workshop participants standing together"
            width={1000}
            height={800}
            priority
          />
        </figure>
        <div>
          <h2>Our story</h2>
          <p className="statement">
            Good care begins with people who are prepared to give it.
          </p>
          <p>
            Established in {APP_INFO.establishedYear}, Tanzania Physiotherapy
            Initiative brings education and clinical practice closer together.
            We support students and professionals with practical learning,
            mentorship, and opportunities to collaborate.
          </p>
          <h3>Our mission</h3>
          <p>{APP_INFO.missionStatement}</p>
          <h3>Our vision</h3>
          <p>
            A Tanzania where a skilled, compassionate physiotherapy workforce
            helps more people access quality rehabilitation.
          </p>
        </div>
      </section>
      <section className="values-section section">
        <div className="frame">
          <div className="section-heading">
            <h2>What guides us</h2>
            <p>
              Our values shape how we teach, how we work together, and how we
              serve our communities.
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
      <section className="frame section" id="team">
        <div className="section-heading">
          <h2>Our people</h2>
          <p>
            Meet the team working to connect learning, opportunity, and better
            rehabilitation across Tanzania.
          </p>
        </div>
        <div className="team-grid">
          {LEADERSHIP_TEAM.map((m) => (
            <article className="team-person" key={m.name}>
              <Image
                src={m.photo}
                alt={m.name}
                width={600}
                height={720}
                sizes="(max-width:600px) 100vw, 32vw"
              />
              <h3>{m.name}</h3>
              <p className="person-role">{m.position}</p>
              <p>{m.bio}</p>
            </article>
          ))}
        </div>
      </section>
      <JoinSection />
    </>
  );
}
