"use client";

import { useEffect, useRef } from "react";
import {
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
  FaHome,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Property } from "@/types/property";

interface MapProps {
  properties: Property[];
}

export default function Map({ properties }: MapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    let map: google.maps.Map | null = null;

    const initMap = () => {
      if (!mapRef.current || !properties.length) return;

      // Parse latLong coordinates from properties
      const coordinates = properties
        .map((property) => {
          const [lat, lng] = property.latLong
            .split(",")
            .map((coord) => parseFloat(coord.trim()));
          return { lat, lng };
        })
        .filter((coord) => !isNaN(coord.lat) && !isNaN(coord.lng));

      if (coordinates.length === 0) return;

      // Calculate bounds to fit all properties
      const bounds = new google.maps.LatLngBounds();
      coordinates.forEach((coord) => {
        bounds.extend(coord);
      });

      // Create the map instance
      map = new google.maps.Map(mapRef.current, {
        center: bounds.getCenter(),
        zoom: 13,
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [
              { invert_lightness: true },
              { saturation: 10 },
              { lightness: 30 },
              { gamma: 0.5 },
              { hue: "#00ffee" },
            ],
          },
        ],
      });

      // Fit map to bounds with some padding
      map.fitBounds(bounds);

      // Add some padding to the bounds
      google.maps.event.addListenerOnce(map, "bounds_changed", () => {
        const currentZoom = map?.getZoom() || 13;
        if (currentZoom > 15) {
          map?.setZoom(15);
        }
      });

      // Add markers for each property
      properties.forEach((property) => {
        const [lat, lng] = property.latLong
          .split(",")
          .map((coord) => parseFloat(coord.trim()));
        if (!isNaN(lat) && !isNaN(lng)) {
          new google.maps.Marker({
            map,
            position: { lat, lng },
            title: property.title,
            animation: google.maps.Animation.DROP,
          });
        }
      });

      mapInstanceRef.current = map;
    };

    // Load the Google Maps script
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBn63Ih9Hhw3idqMkKVpJPuFFTkRsEyAvM&libraries=marker`;
    script.async = true;
    script.defer = true;
    script.onload = initMap;
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [properties]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">
          Find Our Properties
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {/* Left: Map */}
          <div className="bg-black h-96 rounded-lg overflow-hidden relative">
            <div ref={mapRef} className="w-full h-full" />
          </div>
          {/* Right: About/Details */}
          <div className="bg-secondary rounded-lg p-8 flex flex-col justify-center shadow-lg">
            <h3 className="text-2xl font-bold mb-4 text-primary flex items-center">
              <FaMapMarkerAlt className="mr-2 text-blue-500" />
              About TheCityNook
            </h3>
            <p className="text-secondary mb-6">
              TheCityNook offers curated urban stays in Jaipur, blending
              comfort, style, and convenience. Our handpicked properties are
              perfect for business and leisure travelers alike, ensuring a
              memorable city experience.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center">
                <FaHome className="text-2xl text-blue-400 mr-3" />
                <span className="text-primary font-medium">
                  Handpicked Local Stays
                </span>
              </div>
              <div className="flex items-center">
                <FaCheckCircle className="text-2xl text-green-500 mr-3" />
                <span className="text-primary font-medium">
                  Consistent Comfort & Style
                </span>
              </div>
              <div className="flex items-center">
                <FaCalendarCheck className="text-2xl text-purple-500 mr-3" />
                <span className="text-primary font-medium">
                  Easy Direct Bookings
                </span>
              </div>
              <div className="flex items-center">
                <FaBriefcase className="text-2xl text-orange-500 mr-3" />
                <span className="text-primary font-medium">
                  Business & Leisure Ready
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
