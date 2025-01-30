'use client';

import Image from "next/image";

const Navigation = () => {
  return (
    <nav className="bg-white border-b shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Image
              src="/bird-logo.svg"
              alt="The Nest Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="font-semibold text-xl">The City Nook</span>
          </div>
          <div className="flex space-x-8">
            <a href="#property-features" className="text-gray-900 hover:text-gray-600">About</a>
            <a href="#gallery" className="text-gray-900 hover:text-gray-600">Gallery</a>
            <a href="#testimonials" className="text-gray-900 hover:text-gray-600">Testimonials</a>
            <a href="#contact" className="text-gray-900 hover:text-gray-600">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;