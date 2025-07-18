import type { Metadata } from "next";
import Image from "next/image";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact TheCityNook - Get in Touch | Premium Stays in Jaipur",
  description:
    "Contact TheCityNook for bookings, inquiries, or support. Reach our team for premium accommodation assistance in Jaipur. Quick response guaranteed.",
  keywords:
    "contact TheCityNook, Jaipur accommodation booking, customer support, inquiry, booking assistance, TheCityNook contact",
  openGraph: {
    title: "Contact TheCityNook - Get in Touch",
    description:
      "Contact TheCityNook for bookings, inquiries, or support. Reach our team for premium accommodation assistance in Jaipur.",
    type: "website",
    locale: "en_IN",
    siteName: "TheCityNook",
    images: [
      {
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "Contact TheCityNook",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact TheCityNook - Get in Touch",
    description:
      "Contact TheCityNook for bookings, inquiries, or support. Reach our team for premium accommodation assistance in Jaipur.",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    ],
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-100 -mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
          alt="Contact Us"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">Get in Touch</h1>
            <p className="text-xl">
              We&apos;re here to help make your stay perfect
            </p>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-xl font-semibold mb-2">Location</h3>
              <p className="text-gray-700">
                Jaipur
                <br />
                Rajasthan, India
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <p className="text-gray-700">
                +91 97820 01181
                <br />
                Available 24/7
              </p>
            </div>
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="text-4xl mb-4">✉️</div>
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-gray-700">
                info@thecitynook.com
                <br />
                Response within 24 hours
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Send us a Message
            </h2>
            <ContactForm />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                What are your check-in and check-out times?
              </h3>
              <p className="text-gray-700">
                Check-in is available from 2 PM onwards, and check-out is until
                11 AM. We can accommodate flexible timings based on
                availability.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                Do you offer long-term stays?
              </h3>
              <p className="text-gray-700">
                Yes, we offer special rates for extended stays. Please contact
                us for more information about our long-term stay options.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-2">
                What amenities are included?
              </h3>
              <p className="text-gray-700">
                All our properties come with high-speed WiFi, fully equipped
                kitchens, air conditioning, and essential amenities. Specific
                amenities vary by property.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Find Us</h2>
          <div className="max-w-4xl mx-auto h-[400px] rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3561.601021774875!2d75.86263067582755!3d26.788985065395966!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396dc9ae8e8e96bf%3A0xa5f64e2d3c314d87!2sThe%20City%20Nook%20-%20Urban%20Suites!5e0!3m2!1sen!2sin!4v1752611190681!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="TheCityNook Location in Jagatpura, Jaipur"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
