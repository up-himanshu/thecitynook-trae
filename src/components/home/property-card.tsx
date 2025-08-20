import { getIconComponent } from "@/lib/icon-mapping";
import { getResizedURL } from "@/lib/utils";
import { Property } from "@/types/property";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function PropertyCard({ property }: { property: Property }) {
  return (
    <Link
      href={`/properties/${property.slug}`}
      className="block bg-secondary rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1 cursor-pointer"
      onClick={() => {
        if (window.gtag) {
          window.gtag("event", `property_viewed_${property.slug}`, {
            event_category: "Property",
            event_label: "Property viewed",
          });
        }
      }}
    >
      <div className="relative h-64">
        <Image
          src={getResizedURL(
            property.slug,
            property.images[0].src,
            "600",
            "200"
          )}
          alt={property.images[0].alt}
          width={800}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-6">
        <div className="flex flex-row justify-between w-full">
          <h3 className="text-2xl font-bold mb-2">{property.title}</h3>
          <div className="flex items-center text-gray-500 mb-6 flex-wrap gap-1">
            <FaMapMarkerAlt />
            {property.location}
          </div>
        </div>
        <p className="text-secondary mb-4">
          {property.descriptions[0].description}
        </p>
        <div className="flex items-center text-gray-500 mb-6 flex-wrap gap-4">
          {property.features.map((feature, index) => {
            const Icon = getIconComponent(feature.iconName);
            if (!feature.showOnListing || !Icon) return null;
            return (
              <div key={index} className="flex items-center">
                <Icon className="mr-1" />
                <span>{feature.label}</span>
              </div>
            );
          })}
        </div>
        <Link
          href={`/properties/${property.slug}`}
          className="inline-block bg-highlight text-black px-4 py-2 rounded font-medium hover:bg-business hover:text-white transition duration-300"
          onClick={() => {
            if (window.gtag) {
              window.gtag("event", `property_viewed_${property.slug}`, {
                event_category: "Property",
                event_label: "Property viewed",
              });
            }
          }}
        >
          View Details
        </Link>
      </div>
    </Link>
  );
}
