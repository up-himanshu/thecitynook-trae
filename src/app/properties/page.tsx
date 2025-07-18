import type { Metadata } from "next";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getResizedURL } from "@/lib/utils";
import { properties } from "@/data/properties";
import { getIconComponent } from "@/lib/icon-mapping";

export const metadata: Metadata = {
  title: "All Properties - TheCityNook | Premium Stays in Jaipur",
  description:
    "Browse all premium properties available with TheCityNook in Jaipur. Find your perfect accommodation from our curated collection of luxury stays.",
  keywords:
    "Jaipur properties, all accommodations, premium stays collection, luxury apartments, TheCityNook properties, Jaipur rentals",
  openGraph: {
    title: "All Properties - TheCityNook",
    description:
      "Browse all premium properties available with TheCityNook in Jaipur. Find your perfect accommodation from our curated collection of luxury stays.",
    type: "website",
    locale: "en_IN",
    siteName: "TheCityNook",
    images: [
      {
        url: "/images/2.JPG",
        width: 1200,
        height: 630,
        alt: "TheCityNook Properties Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Properties - TheCityNook",
    description:
      "Browse all premium properties available with TheCityNook in Jaipur. Find your perfect accommodation from our curated collection of luxury stays.",
    images: ["/images/2.JPG"],
  },
};

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100 -mt-[100px]">
        <Image
          src="/images/2.JPG"
          alt="Luxury Properties"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Our Properties
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover our carefully curated selection of premium
              accommodations, designed to provide you with the perfect stay.
            </p>
          </div>
        </div>
      </section>

      {/* Properties Grid Section */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <Link
              href={`/properties/${property.slug}`}
              key={property.id}
              className="group bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-[1.02]"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={getResizedURL(
                    property.slug,
                    property.images[0].src,
                    "600",
                    "200"
                  )}
                  alt={property.images[0].alt}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {property.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {property.descriptions[0].description}
                </p>
                <div className="grid grid-cols-3 gap-4">
                  {property.features.map((feature, index) => {
                    const FeatureIcon = getIconComponent(feature.iconName);
                    if (!feature.showOnListing || !FeatureIcon) return null;
                    return (
                      <div
                        key={index}
                        className="flex items-center text-gray-600"
                      >
                        <FeatureIcon className="w-5 h-5 mr-2" />
                        <span className="text-sm">{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
