"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { FaQuoteLeft, FaStar } from "react-icons/fa";

export default function Testimonials() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Devang",
      image: "/images/devang.avif",
      rating: 5,
      date: "March 2023",
      text: "Absolutely loved my stay at TheCityNook! The location was perfect and the amenities were top-notch.",
    },
    {
      id: 2,
      name: "Raghav",
      image: "/images/raghav.avif",
      rating: 5,
      date: "January 2023",
      text: "Clean, stylish, and in the perfect location. Will definitely be staying here again on my next visit!",
    },
    {
      id: 3,
      name: "Udit",
      image: "/images/udit.avif",
      rating: 5,
      date: "November 2022",
      text: "The host was incredibly responsive and the property exceeded all expectations. Highly recommend!",
    },
  ];

  // Auto-rotate testimonials every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          Guest Testimonials
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{
                transform: `translateX(-${activeTestimonial * 100}%)`,
              }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-primary p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
                    <div className="flex items-center mb-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                        <Image
                          src={testimonial.image}
                          alt={testimonial.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-bold">{testimonial.name}</h3>
                        <p className="text-gray-500 text-sm">
                          {testimonial.date}
                        </p>
                      </div>
                    </div>
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <FaStar key={i} className="text-yellow-400" />
                      ))}
                    </div>
                    <div className="relative">
                      <FaQuoteLeft className="absolute -top-2 -left-2 text-gray-200 text-2xl opacity-50" />
                      <p className="text-gray-600 italic pl-6">
                        {testimonial.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full ${
                  activeTestimonial === index ? "bg-blue-600" : "bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
