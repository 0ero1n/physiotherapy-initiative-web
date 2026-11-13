"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { ArrowLeft, ArrowRight, X, Maximize2, ArrowUpRight } from "lucide-react";

interface TrainingPhoto {
  n: number;
  category: "Workshops" | "Clinical Skills" | "Outreach";
  title: string;
  caption: string;
}

interface TrainingGalleryProps {
  title?: string;
  subtitle?: string;
  limit?: number;
  showExploreLink?: boolean;
}

const allTrainingPhotos: TrainingPhoto[] = [
  {
    n: 1,
    category: "Workshops",
    title: "Workshop Assembly",
    caption: "Cohort of physiotherapy practitioners and students gathered in Dar es Salaam.",
  },
  {
    n: 2,
    category: "Clinical Skills",
    title: "Community of Practice",
    caption: "Peer-to-peer discussion exploring modern diagnostic assessment protocols.",
  },
  {
    n: 3,
    category: "Workshops",
    title: "Room for New Ideas",
    caption: "Evidence-based knowledge sharing in a workshop presentation.",
  },
  {
    n: 4,
    category: "Clinical Skills",
    title: "Practical Exploration",
    caption: "Hands-on review of musculoskeletal treatment and rehabilitation equipment.",
  },
  {
    n: 5,
    category: "Outreach",
    title: "Collaborative Planning",
    caption: "Physiotherapists coordinating upcoming regional community outreach clinics.",
  },
  {
    n: 6,
    category: "Clinical Skills",
    title: "Every Voice Matters",
    caption: "Practitioners bringing their real-world clinical experience to the table.",
  },
  {
    n: 7,
    category: "Workshops",
    title: "A Shared Challenge",
    caption: "Small-group discussion problem-solving complex neurological cases.",
  },
];

const categories = ["All", "Workshops", "Clinical Skills", "Outreach"] as const;
type CategoryFilter = (typeof categories)[number];

export default function TrainingGallery({
  title = "Our Gallery",
  subtitle = "A look inside our workshops: ideas shared, hands-on clinical skills practiced, and a rehabilitation workforce advancing together.",
  limit,
  showExploreLink = true,
}: TrainingGalleryProps = {}) {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);

  const filteredPhotos =
    activeCategory === "All"
      ? allTrainingPhotos
      : allTrainingPhotos.filter((p) => p.category === activeCategory);

  const displayedPhotos = limit ? filteredPhotos.slice(0, limit) : filteredPhotos;

  const openLightbox = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    lastTriggerRef.current = e.currentTarget;
    setActiveModalIndex(index);
    dialogRef.current?.showModal();
  };

  const closeLightbox = () => {
    dialogRef.current?.close();
    setActiveModalIndex(null);
    lastTriggerRef.current?.focus();
  };

  const navigateLightbox = (step: number) => {
    if (activeModalIndex === null) return;
    const total = displayedPhotos.length;
    setActiveModalIndex((activeModalIndex + step + total) % total);
  };

  const currentModalPhoto =
    activeModalIndex !== null ? displayedPhotos[activeModalIndex] : null;

  return (
    <section className="training-gallery-section section" id="gallery" aria-labelledby="gallery-heading">
      <div className="frame">
        <div className="section-heading">
          <h2 id="gallery-heading">{title}</h2>
          <p>{subtitle}</p>
        </div>

        {/* Interactive Category Filter Pills */}
        <div
          className="gallery-filter-tabs"
          role="tablist"
          aria-label="Filter training gallery by category"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            const count =
              cat === "All"
                ? allTrainingPhotos.length
                : allTrainingPhotos.filter((p) => p.category === cat).length;

            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(cat)}
                className={`gallery-filter-pill ${isActive ? "active" : ""}`}
              >
                <span>{cat}</span>
                <span className="gallery-pill-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Grid of Filtered Photos */}
        <div className="photo-journal">
          {displayedPhotos.map((photo, idx) => (
            <figure key={photo.n} className="photo-card">
              <div className="image-wrap">
                <Image
                  src={`/images/training/training_${photo.n}.jpeg`}
                  alt={photo.caption}
                  width={900}
                  height={700}
                  sizes="(max-width:760px) 100vw, 45vw"
                  className="photo-card-img"
                />
                <button
                  type="button"
                  className="photo-expand-btn"
                  aria-label={`Enlarge photo: ${photo.title}`}
                  onClick={(e) => openLightbox(idx, e)}
                >
                  <Maximize2 size={16} aria-hidden="true" />
                  <span>Zoom</span>
                </button>
              </div>
              <figcaption>
                <div className="photo-card-meta">
                  <span className="photo-category-tag">{photo.category}</span>
                  <span className="photo-number">Photo 0{photo.n}</span>
                </div>
                <h3>{photo.title}</h3>
                <p>{photo.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>

        {limit && showExploreLink && (
          <div className="gallery-more-action">
            <Link href="/approach#gallery" className="button button-outline">
              Explore full photo gallery <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        onClose={closeLightbox}
        className="gallery-dialog"
        aria-labelledby="lightbox-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") navigateLightbox(-1);
          if (e.key === "ArrowRight") navigateLightbox(1);
          if (e.key === "Escape") closeLightbox();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        {currentModalPhoto && (
          <div className="gallery-dialog-inner">
            <div className="gallery-dialog-top">
              <div className="lightbox-meta">
                <span className="lightbox-cat">{currentModalPhoto.category}</span>
                <h3 id="lightbox-title">{currentModalPhoto.title}</h3>
              </div>
              <button
                type="button"
                aria-label="Close photo preview"
                onClick={closeLightbox}
                className="gallery-close-btn"
              >
                <X size={20} aria-hidden="true" />
              </button>
            </div>

            <div className="gallery-dialog-body">
              <Image
                src={`/images/training/training_${currentModalPhoto.n}.jpeg`}
                alt={currentModalPhoto.caption}
                width={1400}
                height={1000}
                sizes="90vw"
                className="lightbox-image"
                priority
              />
            </div>

            <div className="gallery-controls">
              <button
                type="button"
                aria-label="Previous photo"
                onClick={() => navigateLightbox(-1)}
                className="lightbox-arrow-btn"
              >
                <ArrowLeft size={18} aria-hidden="true" />
                <span>Prev</span>
              </button>
              <p className="lightbox-counter" aria-live="polite">
                {(activeModalIndex ?? 0) + 1} of {filteredPhotos.length} · {currentModalPhoto.caption}
              </p>
              <button
                type="button"
                aria-label="Next photo"
                onClick={() => navigateLightbox(1)}
                className="lightbox-arrow-btn"
              >
                <span>Next</span>
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
