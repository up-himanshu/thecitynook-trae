"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Property } from "@/types/property";

export default function Header({
  properties,
  showPrimaryBkg = false,
}: {
  properties: Property[];
  showPrimaryBkg?: boolean;
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getTextColor = () => {
    if (showPrimaryBkg) {
      return isScrolled ? "text-primary" : "text-white";
    }
    return "text-primary";
  };

  const getBackgroundColor = () => {
    if (showPrimaryBkg) {
      return isScrolled ? "bg-primary" : "bg-transparent";
    }
    return "bg-primary";
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${getBackgroundColor()} ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/tcn_logo.svg"
              alt="TheCityNook Logo"
              width={80}
              height={30}
              className="-mt-1"
            />
          </Link>{" "}
          <h1 className={`text-2xl font-bold ${getTextColor()}`}>
            {"The City Nook"}
          </h1>
        </div>
        <nav className="hidden md:flex space-x-8">
          <div className="relative group">
            <button
              className={`font-medium flex items-center ${getTextColor()}`}
            >
              <Link href={"/properties"}>Properties</Link>
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div className="absolute left-0 mt-2 w-48 bg-secondary rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible  transition-all duration-300">
              {properties.map((property: Property) => (
                <Link
                  key={property.id}
                  href={`/properties/${property.slug}`}
                  className="block px-4 py-2 text-sm text-primary hover:bg-highlight hover:text-black"
                >
                  {property.title}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/about" className={`font-medium ${getTextColor()}`}>
            About
          </Link>
          <Link href="/contact" className={`font-medium ${getTextColor()}`}>
            Contact
          </Link>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className={`w-6 h-6 ${getTextColor()}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div
          className={`fixed right-0 top-0 h-full w-64 bg-primary shadow-lg transform transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <button
              className="absolute top-4 right-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <nav className="mt-8 space-y-4">
              <div className="space-y-2">
                <Link
                  href="/properties"
                  className="block text-lg font-medium hover:text-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Properties
                </Link>
                <div className="pl-4 space-y-2">
                  {properties.map((property: Property) => (
                    <Link
                      key={property.id}
                      href={`/properties/${property.slug}`}
                      className="block text-sm hover:text-secondary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {property.title}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/about"
                className="block text-lg font-medium hover:text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block text-lg font-medium hover:text-secondary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
