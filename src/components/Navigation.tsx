"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaWhatsappSquare } from "react-icons/fa";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAdminRoute = pathname?.startsWith("/admin/");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/admin/login");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-primary border-b shadow-md fixed top-0 left-0 right-0 z-50 dark:border-black">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
            <Image
              src="/bird-logo.svg"
              alt="The Nest Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="font-semibold text-xl">The City Nook</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#property-features"
              className="text-primary hover:text-muted"
            >
              About
            </a>
            <a href="#gallery" className="text-primary hover:text-muted">
              Gallery
            </a>
            <a href="#testimonials" className="text-primary hover:text-muted">
              Testimonials
            </a>
            <a href="#contact" className="text-primary hover:text-muted">
              Contact
            </a>
            <a
              href="https://wa.me/919782001181"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-green-600 hover:text-green-700 transition-colors"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsappSquare className="w-6 h-6" />
            </a>
            {isAdminRoute && (
              <button
                onClick={handleLogout}
                className="text-primary hover:text-muted cursor-pointer"
              >
                Logout
              </button>
            )}
          </div>

          {/* Hamburger Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-md text-primary hover:bg-secondary focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100 visible"
              : "max-h-0 opacity-0 invisible"
          }`}
        >
          <div className="py-2 space-y-1">
            <a
              href="#property-features"
              className="block px-4 py-2 text-primary hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#gallery"
              className="block px-4 py-2 text-primary hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Gallery
            </a>
            <a
              href="#testimonials"
              className="block px-4 py-2 text-primary hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#contact"
              className="block px-4 py-2 text-primary hover:bg-secondary rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
            <a
              href="https://wa.me/919782001181"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 text-green-600 hover:bg-gray-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <FaWhatsappSquare className="w-6 h-6 mr-2" />
              Chat on WhatsApp
            </a>
            {isAdminRoute && (
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-primary hover:bg-secondary rounded-md w-full text-left"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
