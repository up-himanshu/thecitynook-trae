"use client";

import Image from "next/image";
import Link from "next/link";
import { Property } from "@/types/property";
import { getResizedURL } from "@/lib/utils";
import { FaMapMarkerAlt } from "react-icons/fa";
import { getIconComponent } from "@/lib/icon-mapping";
import PropertyCard from "./property-card";

export default function Properties({ properties }: { properties: Property[] }) {
  return (
    <section id="properties" className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Our Stays Across the City
        </h2>
        <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
          Access individual listings for more information, photos, availability
          dates and prices.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {properties.map((property: Property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
