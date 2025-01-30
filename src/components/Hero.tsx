'use client';

import Image from "next/image";

const Hero = () => {
  return (
    <>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">The City Nook - Jaipur</h1>
        <p className="text-gray-600 mt-4">Stays, Rentals & Experiences</p>
      </div>

      {/* Property Images */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative">
        <div className="relative h-[460px] rounded-lg overflow-hidden" style={{ position: "relative" }}>
          <Image
            src="/images/1.JPG"
            alt="Property Interior"
            fill
            className="object-cover"
          />
        </div>
        <div className="grid grid-cols-2 gap-4" style={{ position: "relative" }}>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/2.JPG"
              alt="Property Detail - Living Room"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/3.JPG"
              alt="Property Detail - Kitchen"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/4.JPG"
              alt="Property Detail - Bedroom"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/5.JPG"
              alt="Property Detail - Bathroom"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;