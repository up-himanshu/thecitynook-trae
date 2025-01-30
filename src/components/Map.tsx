'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';

const Map = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initMap = async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
        version: 'weekly',
      });

      try {
        const google = await loader.load();
        const location = { lat: 40.7128, lng: -74.0060 }; // Example: New York City coordinates

        const map = new google.maps.Map(mapRef.current!, {
          center: location,
          zoom: 14,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        new google.maps.Marker({
          position: location,
          map,
          title: 'Property Location',
        });
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    initMap();
  }, []);

  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Location</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <div ref={mapRef} className="h-full w-full" />
      </div>
    </div>
  );
};

export default Map;