"use client";

import Image from "next/image";
import { FaChevronLeft, FaChevronRight, FaTimes } from "react-icons/fa";
import { useState } from "react";
import { getResizedURL } from "@/lib/utils";
import BookYourStay from "@/components/book-your-stay";
import { Property } from "@/types/property";
import { getIconComponent } from "@/lib/icon-mapping";
import SuccessPopup from "@/components/common/success-popup";

interface PropertyListingClientProps {
  property: Property;
}

export default function PropertyListingClient({
  property,
}: PropertyListingClientProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );
  const [showSuccess, setShowSuccess] = useState(false);

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImageIndex(null);
  };

  const handlePrevImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + property.images.length) %
          property.images.length
      );
    }
  };

  const handleNextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % property.images.length);
    }
  };

  // Group images into pairs
  const imagePairs = [];
  for (let i = 0; i < property.images.length; i += 2) {
    imagePairs.push(property.images.slice(i, i + 2));
  }

  return (
    <>
      {/* Success Popup */}
      <SuccessPopup
        isOpen={showSuccess}
        onClose={() => setShowSuccess(false)}
        title="Reservation Enquiry Sent!"
        message="Thank you for your reservation enquiry. We will contact you soon with more details."
      />

      <div className="min-h-screen bg-primary py-4">
        <div className="container mx-auto px-4">
          {/* Hero Section */}
          <div className="w-full mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 h-[60vh] rounded-2xl overflow-hidden">
              {/* Large image on the left */}
              <div className="relative h-[40vh] md:h-full">
                <Image
                  src={getResizedURL(
                    property.slug,
                    property.images[0].src,
                    "900",
                    "600"
                  )}
                  alt={property.images[0]?.alt || property.title}
                  fill
                  className="object-cover rounded-2xl md:rounded-2xl"
                  priority
                />
              </div>
              {/* 4 smaller images on the right in a 2x2 grid */}
              <div className="hidden md:grid grid-rows-2 grid-cols-2 gap-2 h-full">
                {property.images.slice(1, 5).map((image, index) => (
                  <div key={index} className="relative h-full w-full">
                    <Image
                      src={getResizedURL(
                        property.slug,
                        image.src,
                        "450",
                        "300"
                      )}
                      alt={image.alt || property.title}
                      fill
                      className="object-cover rounded-2xl"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <div className="bg-secondary rounded-xl p-8 shadow-lg mb-8">
                {property.descriptions.map((description, index) => (
                  <div key={index}>
                    <h2 className="text-2xl font-bold mb-4">
                      {description.title}
                    </h2>
                    <p className="text-secondary leading-relaxed">
                      {description.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-secondary rounded-xl p-8 shadow-lg mb-8">
                <h2 className="text-2xl font-bold mb-6">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {property.features.map((feature, index) => {
                    const Icon = getIconComponent(feature.iconName);
                    if (!Icon) return null;
                    return (
                      <div key={index} className="flex items-center space-x-3">
                        <Icon className="text-2xl text-secondary" />
                        <span className="text-secondary">{feature.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Image Gallery */}
              <div className="bg-secondary rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Photo Gallery</h2>
                <div className="space-y-4">
                  {imagePairs.map((pair, pairIndex) => (
                    <div key={pairIndex} className="grid grid-cols-2 gap-4">
                      {pair.map((image, imageIndex) => {
                        const actualIndex = pairIndex * 2 + imageIndex;
                        return (
                          <div
                            key={actualIndex}
                            className="relative aspect-[4/3] cursor-pointer"
                            onClick={() => {
                              if (window.gtag) {
                                window.gtag(
                                  "event",
                                  `property_image_clicked_${property.slug}`,
                                  {
                                    event_category: "Property",
                                    event_label: "Property image clicked",
                                    event_value: actualIndex,
                                  }
                                );
                              }
                              handleImageClick(actualIndex);
                            }}
                          >
                            <Image
                              src={getResizedURL(
                                property.slug,
                                image.src,
                                "600",
                                "400"
                              )}
                              alt={image.alt || property.title}
                              fill
                              className="object-cover rounded-lg hover:opacity-90 transition-opacity"
                            />
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Embedded Map */}
              <div className="bg-secondary rounded-xl p-8 shadow-lg">
                <h2 className="text-2xl font-bold mb-6">Location</h2>
                <div className="aspect-video rounded-lg overflow-hidden">
                  <iframe
                    src={property.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="The City Nook Location in Jagatpura, Jaipur"
                    className="w-full h-full"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="md:col-span-1">
              <BookYourStay
                property={property}
                onBook={() => {
                  setShowSuccess(true);
                }}
              />
            </div>
          </div>
        </div>

        {/* Image Modal */}
        {selectedImageIndex !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300"
            >
              <FaTimes size={24} />
            </button>
            <button
              onClick={handlePrevImage}
              className="absolute left-4 text-white hover:text-gray-300"
            >
              <FaChevronLeft size={32} />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 text-white hover:text-gray-300"
            >
              <FaChevronRight size={32} />
            </button>
            <div className="relative w-[90vw] h-[90vh]">
              <Image
                src={getResizedURL(
                  property.slug,
                  property.images[selectedImageIndex].src,
                  "1200",
                  "800"
                )}
                alt={property.images[selectedImageIndex].alt || property.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
