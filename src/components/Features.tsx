'use client';

import { FaWifi, FaTv, FaBuilding, FaSnowflake, FaShower, FaLaptop, FaMoon, FaTshirt, FaRegSnowflake, FaUtensils, FaBreadSlice, FaDoorOpen, FaParking, FaKey, FaHeart, FaUsers, FaIdCard } from 'react-icons/fa';
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
    { name: 'Couple Friendly', icon: FaHeart },
    { name: 'Unmarried Couples Welcome', icon: FaUsers },
    { name: 'Local IDs Allowed', icon: FaIdCard },
];

const Features = () => {
    return (
        <div>
          <h3 className="text-xl font-semibold mb-4">Features & Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4" itemProp="amenityFeature">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors" itemScope itemType="https://schema.org/LocationFeatureSpecification">
                <feature.icon className="w-5 h-5 text-gray-600" />
                <span className="text-gray-700" itemProp="name">{feature.name}</span>
                <meta itemProp="value" content="true" />
              </div>
            ))}
          </div>
        </div>
    )
};

export default Features;