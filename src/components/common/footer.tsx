"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-footer text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/tcn_logo.svg"
                alt="The City Nook Logo"
                width={60}
                height={70}
              />
              <span className="text-xl font-bold mt-1">The City Nook</span>
            </div>
            <p className="text-gray-400">
              The City Nook offers curated stays across the city. Experience
              comfort and style in prime locations.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400 mb-2">
              <a href="mailto:hello@thecitynook.com">hello@thecitynook.com</a>
            </p>
            <p className="text-gray-400">
              <a href="tel:+919782001181">+91 97820 01181</a>
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/thecitynookjp"
                className="bg-gray-700 p-2 rounded-full hover:bg-blue-600 transition duration-300"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://wa.me/919782001181"
                className="bg-gray-700 p-2 rounded-full hover:bg-green-600 transition duration-300"
              >
                <FaWhatsapp />
              </a>
              <a
                href="https://www.instagram.com/the.city.nook"
                className="bg-gray-700 p-2 rounded-full hover:bg-pink-600 transition duration-300"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>
            © {new Date().getFullYear()} The City Nook. All rights reserved. |{" "}
            <a href="/privacy-policy">Privacy Policy</a> |{" "}
            <a href="/refund-policy">Refund Policy</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
