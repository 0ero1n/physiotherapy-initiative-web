"use client";
import { useState } from "react";
const joints = [
  { id: "knee", label: "Knee flexion", max: 140, start: 125 },
  { id: "shoulder", label: "Shoulder abduction", max: 180, start: 145 },
  { id: "cervical", label: "Cervical rotation", max: 80, start: 65 },
  { id: "lumbar", label: "Lumbar flexion", max: 60, start: 50 },
];
export default function GoniometerSimulator() {
  const [selected, setSelected] = useState("knee");
  const [angles, setAngles] = useState<Record<string, number>>({
    knee: 125,
    shoulder: 145,
    cervical: 65,
    lumbar: 50,
  });
  const joint = joints.find((j) => j.id === selected)!;
  const angle = angles[selected];
  const rad = ((angle - 90) * Math.PI) / 180;
  return (
    <section className="simulator-section section">
      <div className="frame">
        <div className="section-heading">
          <h2>Explore movement</h2>
          <p>
            Try a simple angle-measurement demonstration. Select a movement,
            then adjust the angle to see the goniometer arms change.
          </p>
        </div>
        <div className="simulator-layout">
          <div className="joint-options">
            {joints.map((j) => (
              <button
                key={j.id}
                aria-pressed={selected === j.id}
                onClick={() => setSelected(j.id)}
                className={selected === j.id ? "selected" : ""}
              >
                {j.label}
              </button>
            ))}
            <p>
              This interactive illustration demonstrates angles only. It is not
              an assessment or treatment recommendation.
            </p>
          </div>
          <div className="angle-panel">
            <svg
              viewBox="0 0 240 240"
              role="img"
              aria-label={`Angle illustration: ${angle} degrees`}
            >
              <circle
                cx="120"
                cy="120"
                r="90"
                fill="none"
                stroke="var(--pale)"
                strokeWidth="12"
              />
              <path
                d={`M 120 30 A 90 90 0 0 1 ${120 + 90 * Math.cos(rad)} ${120 + 90 * Math.sin(rad)}`}
                fill="none"
                stroke="var(--olive)"
                strokeWidth="12"
              />
              <path
                d={`M 120 30 L 120 120 L ${120 + 90 * Math.cos(rad)} ${120 + 90 * Math.sin(rad)}`}
                fill="none"
                stroke="var(--ink)"
                strokeWidth="5"
              />
              <circle cx="120" cy="120" r="8" fill="var(--ink)" />
            </svg>
            <label htmlFor="angle">
              {joint.label}: <output htmlFor="angle">{angle}°</output>
            </label>
            <input
              id="angle"
              type="range"
              min="0"
              max={joint.max}
              value={angle}
              aria-valuetext={`${angle} degrees`}
              onChange={(e) =>
                setAngles({ ...angles, [selected]: Number(e.target.value) })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}
