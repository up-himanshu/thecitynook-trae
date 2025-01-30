'use client';

import Image from 'next/image';
import { FaWifi, FaTv, FaBuilding, FaSnowflake, FaShower, FaLaptop, FaMoon, FaTshirt, FaRegSnowflake, FaUtensils, FaBreadSlice, FaDoorOpen, FaParking, FaKey } from 'react-icons/fa';
import { FaKitchenSet } from 'react-icons/fa6';

const features = [
  { name: 'Kitchen', icon: FaKitchenSet },
  { name: 'Wifi', icon: FaWifi },
  { name: 'TV', icon: FaTv },
  { name: 'Lift', icon: FaBuilding },
  { name: 'Air conditioning', icon: FaSnowflake },
  { name: 'Shower', icon: FaShower },
  { name: 'Dedicated workspace', icon: FaLaptop },
  { name: 'Room-darkening blinds', icon: FaMoon },
  { name: 'Clothes storage', icon: FaTshirt },
  { name: 'Fridge', icon: FaRegSnowflake },
  { name: 'Cooking basics', icon: FaUtensils },
  { name: 'Toaster', icon: FaBreadSlice },
  { name: 'Private entrance', icon: FaDoorOpen },
  { name: 'Free parking on premises', icon: FaParking },
  { name: 'Self check-in', icon: FaKey },
];

const About = () => {
  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">About The Space</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4">Description</h3>
          <p className="text-gray-600 leading-relaxed">
            Cozy studio in a prime location, perfect for solo travelers, couples, or business guests. 
            The space features chic interriors, a comfy double bed, fully-equipped kitchenette, and a clean bathroom. 
            Enjoy amenities like high-speed Wi-Fi, air conditioning, and a flat-screen TV. 
            Take advantage of the clubhouse with a pool table and table tennis. 
            Just moments away from top attractions, dining, and nightlife, this studio offers a stylish and 
            convenient base for a memorable and comfortable experience.
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-4">Guest Access</h3>
            <p className="text-gray-600 leading-relaxed">
              Guests have full access to the studio apartment during their stay. You can easily reach the studio using the lift, ensuring a smooth arrival. The studio is private and self-contained, offering you a comfortable and relaxing space. Additionally, you can enjoy the clubhouse, which features a pool table and table tennis, subject to operating hours. Please check the timings for clubhouse access during your stay. We strive to make your experience as enjoyable and convenient as possible!
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <feature.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700">{feature.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;