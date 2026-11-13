"use client";

import Image from "next/image";
import { useState } from "react";

const labels = ["الواجهة", "الجانب", "المقصورة"];

export function CarGallery({
  images,
  name,
}: {
  images: [string, string, string];
  name: string;
}) {
  const [active, setActive] = useState(0);

  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[16/9]">
        <Image
          src={images[active]}
          alt={`${name} - ${labels[active]}`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1280px) 100vw, 60vw"
        />
        <span className="absolute top-3 right-3 rounded-full bg-ink/75 px-3 py-1 text-xs text-white backdrop-blur">
          {labels[active]}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2 p-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setActive(index)}
            className={`relative aspect-[16/10] overflow-hidden rounded-xl border-2 transition ${
              active === index
                ? "border-accent"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <Image
              src={src}
              alt={`${name} ${labels[index]}`}
              fill
              className="object-cover"
              sizes="200px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
