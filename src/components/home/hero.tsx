"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Hero() {
  const heroImages = [
    "https://res.cloudinary.com/shallowfeet/image/upload/f_auto/thecitynook/urban-suites/9_xuzi7s.webp",
    "https://res.cloudinary.com/shallowfeet/image/upload/f_auto/thecitynook/solitaire-suites/2_qarlo8.webp",
    "https://res.cloudinary.com/shallowfeet/image/upload/f_auto/thecitynook/urban-suites/4_pk2v2n.webp",
    "https://res.cloudinary.com/shallowfeet/image/upload/f_auto/thecitynook/solitaire-suites/9_jytmmz.webp",
  ];

  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[100vh] -mt-[96px]">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <Image
            key={image}
            src={image}
            alt={`City view ${index + 1}`}
            fill
            className={`object-cover transition-opacity duration-1000 ${
              activeImage === index ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover charming stays across Jaipur
        </h1>
        <p className="text-xl md:text-2xl mb-8">
          Unique spaces. Prime locations. The comfort of home.
        </p>
        <a
          href="#properties"
          className="bg-highlight text-black px-6 py-3 rounded-full font-medium hover:bg-business hover:text-white transition duration-300"
          onClick={() => {
            if (window.gtag) {
              window.gtag("event", "hero_view_properties_clicked", {
                event_category: "Property",
                event_label: "Hero view properties clicked",
              });
            }
          }}
        >
          View Our Properties
        </a>
      </div>
    </section>
  );
}
