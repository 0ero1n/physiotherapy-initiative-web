"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
const captions = [
  "Workshop participants gathered together",
  "The TPI workshop community",
  "A presentation and group discussion",
  "Learning around the workshop table",
  "Sharing ideas during a practical session",
  "A conversation between practitioners",
  "Working through a challenge together",
];
export default function GalleryViewer() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(0);
  const move = (direction: number) =>
    setIndex((i) => (i + direction + captions.length) % captions.length);
  return (
    <>
      <button
        type="button"
        className="button gallery-open"
        ref={trigger}
        onClick={() => dialog.current?.showModal()}
      >
        View all workshop photos
      </button>
      <dialog
        ref={dialog}
        onClose={() => trigger.current?.focus()}
        className="gallery-dialog"
        aria-labelledby="gallery-title"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") move(-1);
          if (e.key === "ArrowRight") move(1);
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        <div className="gallery-dialog-top">
          <h2 id="gallery-title">Our workshops</h2>
          <button
            type="button"
            aria-label="Close photo gallery"
            onClick={() => dialog.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <Image
          src={`/images/training/training_${index + 1}.jpeg`}
          alt={captions[index]}
          width={1400}
          height={1000}
          sizes="90vw"
        />
        <div className="gallery-controls">
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => move(-1)}
          >
            <ArrowLeft aria-hidden="true" />
          </button>
          <p aria-live="polite">
            {index + 1} of {captions.length} · {captions[index]}
          </p>
          <button type="button" aria-label="Next photo" onClick={() => move(1)}>
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  );
}
