'use client';

import Features from './Features';

const About = () => {
  return (
    <section id="property-features" className="h-full p-6 bg-white rounded-lg shadow-sm" itemScope itemType="https://schema.org/Product">
      <h2 className="text-2xl font-semibold mb-6" itemProp="name">About The Space</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed" itemProp="description">
            Cozy studio in a prime location, perfect for solo travelers, couples, or business guests. 
            The space features chic interriors, a comfy double bed, fully-equipped kitchenette, and a clean bathroom. 
            Enjoy amenities like high-speed Wi-Fi, air conditioning, and a flat-screen TV. 
            Take advantage of the clubhouse with a pool table and table tennis. 
            Just moments away from top attractions, dining, and nightlife, this studio offers a stylish and 
            convenient base for a memorable and comfortable experience.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Guest Access</h3>
            <p className="text-gray-600 leading-relaxed" itemProp="additionalProperty" itemScope itemType="https://schema.org/PropertyValue">
              <span itemProp="name">Guest Access Details</span>
              <span itemProp="value">Guests have full access to the studio apartment during their stay. You can easily reach the studio using the lift, ensuring a smooth arrival. The studio is private and self-contained, offering you a comfortable and relaxing space. Additionally, you can enjoy the clubhouse, which features a pool table and table tennis, subject to operating hours. Please check the timings for clubhouse access during your stay. We strive to make your experience as enjoyable and convenient as possible!</span>
            </p>
          </div>
        </div>

        {/* Features Section */}
        <Features />
      </div>
    </section>
  );
};

export default About;