"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, X, ArrowUpRight, ExternalLink } from "lucide-react";
import { INITIATIVE_PHOTOS, InitiativePhotoItem, initiativeGalleries } from "@/data/content";

export default function InitiativePhotoShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const categories = [
    "All",
    "Move for Disability 2026",
    "Cycle G × Saifee",
    "Career Fair SUZA",
  ];

  const filteredPhotos =
    selectedCategory === "All"
      ? INITIATIVE_PHOTOS
      : INITIATIVE_PHOTOS.filter((photo) =>
          selectedCategory === "Career Fair SUZA"
            ? photo.category === "Career Fair SUZA" || photo.category === "Community Outreach"
            : photo.category === selectedCategory
        );

  const openModal = (index: number, e: React.MouseEvent<HTMLButtonElement>) => {
    triggerRef.current = e.currentTarget;
    setActiveIndex(index);
    dialogRef.current?.showModal();
  };

  const closeModal = () => {
    dialogRef.current?.close();
    triggerRef.current?.focus();
  };

  const movePhoto = (direction: number) => {
    setActiveIndex((prev) => (prev + direction + filteredPhotos.length) % filteredPhotos.length);
  };

  const currentPhoto: InitiativePhotoItem | undefined = filteredPhotos[activeIndex];

  return (
    <section className="section frame initiatives-photo-showcase" aria-labelledby="showcase-heading">
      <div className="section-heading">
        <h2 id="showcase-heading">
          Community in
          <br />
          movement.
        </h2>
        <p>
          Witness the vibrant energy of Move for Disability 2026 in Dar es Salaam, our Cycle G × Saifee
          collaboration, and the regional mobilization for inclusive rehabilitation care.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 my-8 pb-4 border-b border-[#eceee2]">
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter photo showcase by initiative">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setSelectedCategory(cat);
                  setActiveIndex(0);
                }}
                className={`px-4 py-2 text-sm font-medium transition-colors duration-150 rounded-full ${
                  isActive
                    ? "bg-[#696112] text-white shadow-sm"
                    : "bg-[#eceee2] text-[#292e20] hover:bg-[#dfe3d3]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Live Pixieset External Links */}
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <a
            href={initiativeGalleries.move}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#696112] hover:underline"
          >
            <span>Move for Disability Pixieset Album</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
          <span className="text-[#53594b] hidden sm:inline">•</span>
          <a
            href={initiativeGalleries.cycle}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-medium text-[#696112] hover:underline"
          >
            <span>Cycle G × Saifee Album</span>
            <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Responsive Photo Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo, idx) => {
          const hasError = imageErrors[photo.id];
          const imageSrc = hasError ? photo.fallbackSrc : photo.src;

          return (
            <article
              key={photo.id}
              className="group bg-[#ffffff] border border-[#eceee2] overflow-hidden flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1 shadow-xs"
            >
              <button
                type="button"
                onClick={(e) => openModal(idx, e)}
                className="relative aspect-4/3 w-full overflow-hidden bg-[#eceee2] text-left block cursor-pointer"
                aria-label={`View photo: ${photo.title}`}
              >
                <Image
                  src={imageSrc}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={() => {
                    if (!hasError) {
                      setImageErrors((prev) => ({ ...prev, [photo.id]: true }));
                    }
                  }}
                />
                <span className="absolute top-3 left-3 bg-[#292e20]/80 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-1 rounded-sm uppercase tracking-wide">
                  {photo.category}
                </span>
              </button>

              <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="text-lg font-semibold text-[#292e20] mb-1">
                    {photo.title}
                  </h3>
                  <p className="text-sm text-[#53594b] leading-relaxed">
                    {photo.caption}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#eceee2] flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={(e) => openModal(idx, e)}
                    className="font-medium text-[#696112] hover:underline flex items-center gap-1"
                  >
                    Expand view <ArrowUpRight size={13} aria-hidden="true" />
                  </button>
                  {photo.pixiesetUrl && (
                    <a
                      href={photo.pixiesetUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#53594b] hover:text-[#292e20] flex items-center gap-1"
                    >
                      Pixieset <ExternalLink size={11} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Full Live Event Galleries on Pixieset */}
      <div className="mt-12 p-8 bg-[#eceee2] rounded-none text-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-[#dfe3d3]">
        <div>
          <h3 className="text-base text-[#292e20] font-semibold mb-1">
            Complete High-Resolution Photo Galleries
          </h3>
          <p className="text-[#53594b] m-0 max-w-2xl leading-relaxed">
            Full event documentation from Move for Disability 2026 and the Cycle G × Saifee Health Ride is available in original high resolution on our official Pixieset albums.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <a
            href={initiativeGalleries.move}
            target="_blank"
            rel="noreferrer"
            className="button whitespace-nowrap text-xs"
          >
            Move for Disability Album <ExternalLink size={14} aria-hidden="true" />
          </a>
          <a
            href={initiativeGalleries.cycle}
            target="_blank"
            rel="noreferrer"
            className="button button-accent whitespace-nowrap text-xs"
          >
            Cycle G Album <ExternalLink size={14} aria-hidden="true" />
          </a>
        </div>
      </div>

      {/* Accessible Fullscreen Lightbox Dialog */}
      <dialog
        ref={dialogRef}
        onClose={closeModal}
        className="gallery-dialog"
        aria-labelledby="initiative-dialog-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") movePhoto(-1);
          if (e.key === "ArrowRight") movePhoto(1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        {currentPhoto && (
          <>
            <div className="gallery-dialog-top">
              <div>
                <span className="text-xs uppercase font-semibold text-[#696112] block">
                  {currentPhoto.category}
                </span>
                <h2 id="initiative-dialog-title" className="text-xl font-bold text-[#292e20]">
                  {currentPhoto.title}
                </h2>
              </div>
              <button
                type="button"
                aria-label="Close modal dialog"
                onClick={closeModal}
              >
                <X aria-hidden="true" />
              </button>
            </div>

            <div className="relative w-full my-4">
              <Image
                src={imageErrors[currentPhoto.id] ? currentPhoto.fallbackSrc : currentPhoto.src}
                alt={currentPhoto.alt}
                width={1200}
                height={800}
                className="w-full max-h-[62vh] object-contain mx-auto"
                priority
              />
            </div>

            <div className="gallery-controls">
              <button
                type="button"
                aria-label="Previous photograph"
                onClick={() => movePhoto(-1)}
              >
                <ArrowLeft aria-hidden="true" />
              </button>
              <div className="text-center">
                <p className="text-sm font-medium text-[#292e20] mb-0.5">
                  {activeIndex + 1} of {filteredPhotos.length}
                </p>
                <p className="text-xs text-[#53594b] max-w-[500px]">
                  {currentPhoto.caption}
                </p>
              </div>
              <button
                type="button"
                aria-label="Next photograph"
                onClick={() => movePhoto(1)}
              >
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </>
        )}
      </dialog>
    </section>
  );
}
