import type { Metadata } from "next";
import { Property } from "@/types/property";
import { properties } from "@/data/properties";
import { getResizedURL } from "@/lib/utils";
import PropertyListingClient from "./property-listing-client";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const property = properties.find((p: Property) => p.slug === params.slug);

  if (!property) {
    return {
      title: "Property Not Found - The City Nook",
      description: "The property you're looking for doesn't exist.",
    };
  }

  return {
    title: `${property.title} - ${property.location} | The City Nook`,
    description: property.descriptions[0].description.substring(0, 160) + "...",
    keywords: `${property.title}, ${property.location}, Jaipur accommodation, The City Nook, premium stays, luxury apartments`,
    openGraph: {
      title: `${property.title} - ${property.location}`,
      description:
        property.descriptions[0].description.substring(0, 160) + "...",
      type: "website",
      locale: "en_IN",
      siteName: "The City Nook",
      images: [
        {
          url: getResizedURL(
            property.slug,
            property.images[0].src,
            "1200",
            "630"
          ),
          width: 1200,
          height: 630,
          alt: property.images[0].alt || property.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${property.title} - ${property.location}`,
      description:
        property.descriptions[0].description.substring(0, 160) + "...",
      images: [
        getResizedURL(property.slug, property.images[0].src, "1200", "630"),
      ],
    },
  };
}

export default function PropertyPage({ params }: Props) {
  const property = properties.find((p: Property) => p.slug === params.slug);

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600">
            The property you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return <PropertyListingClient property={property} />;
}
