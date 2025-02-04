"use client";

import Image from "next/image";

const Hero = () => {
  return (
    <article className="hero-section" itemScope itemType="https://schema.org/LodgingBusiness">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4" itemProp="name">The City Nook - Jaipur</h1>
        <p className="text-gray-600 mt-4" itemProp="description">
          Luxury Stays and Rentals in Jagatpura, Jaipur
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 relative">
        <div
          className="relative h-[460px] rounded-lg overflow-hidden"
          style={{ position: "relative" }}
        >
          <Image
            src="/images/2.JPG"
            alt="Luxurious Studio Interior at The City Nook Jaipur - Modern Living Space with Contemporary Furnishings"
            fill
            className="object-cover"
            priority
            itemProp="image"
          />
        </div>
        <div
          className="grid grid-cols-2 gap-4"
          style={{ position: "relative" }}
        >
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/5.JPG"
              alt="Elegant Living Room at The City Nook - Comfortable Seating Area with Modern Decor"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/13.JPG"
              alt="Exterior View of The City Nook - Modern Residential Building in Jagatpura, Jaipur"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/7.JPG"
              alt="Cozy Bedroom at The City Nook - Comfortable Double Bed with Quality Linens"
              fill
              className="object-cover"
            />
          </div>
          <div className="relative h-[210px] rounded-lg overflow-hidden">
            <Image
              src="/images/11.JPG"
              alt="Clubhouse at The City Nook - Recreational Area with Pool Table and Table Tennis Facilities"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <meta itemProp="address" content="Jagatpura, Jaipur, Rajasthan, India" />
        <meta itemProp="priceRange" content="₹2000" />
        <meta itemProp="telephone" content="+91 97820 01181" />
      </div>
    </article>
  );
};

export default Hero;
