import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About The City Nook - Our Story & Mission | Premium Stays in Jaipur",
  description:
    "Learn about The City Nook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality, local expertise, and exceptional guest experiences.",
  keywords:
    "about The City Nook, Jaipur accommodation story, premium stays mission, local hospitality, The City Nook history, guest experience",
  openGraph: {
    title: "About The City Nook - Our Story & Mission",
    description:
      "Learn about The City Nook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality and exceptional guest experiences.",
    type: "website",
    locale: "en_IN",
    siteName: "The City Nook",
    images: [
      {
        url: "/images/host.jpeg",
        width: 1200,
        height: 630,
        alt: "The City Nook Team and Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About The City Nook - Our Story & Mission",
    description:
      "Learn about The City Nook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality and exceptional guest experiences.",
    images: ["/images/host.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] -mt-[100px]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 z-10" />
        <Image
          src="/images/1.JPG"
          alt="The City Nook"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold mb-4">
              Welcome to The City Nook
            </h1>
            <p className="text-xl">
              Your home away from home in the heart of the city
            </p>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Our Mission
            </h2>
            <p className="text-lg text-secondary leading-relaxed">
              At The City Nook, we believe every city break deserves a cozy,
              well-designed retreat. Whether you&apos;re visiting for work or
              play, our spaces are thoughtfully curated to make you feel at home
              in the heart of the city. We cater to couples seeking romantic
              getaways, families looking for comfortable stays, and remote
              workers in need of a perfect work-life balance.
            </p>
          </div>
        </div>
      </section>

      {/* About the Host */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px]">
                <Image
                  src="/images/host.jpeg"
                  alt="Host"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6 text-primary">
                  About the Host
                </h2>
                <p className="text-secondary mb-4">
                  Founded with a passion for creating memorable city
                  experiences, The City Nook began as a dream to offer travelers
                  more than just a place to stay. Our hosting philosophy centers
                  around providing personalized, responsive service while
                  respecting your privacy and independence.
                </p>
                <p className="text-secondary">
                  We believe in creating spaces that feel like home, with
                  thoughtful touches and local insights that make your stay
                  truly special.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Properties */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Our Properties
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Cozy Apartments
              </h3>
              <p className="text-secondary">
                Spacious, well-appointed apartments perfect for families and
                groups.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Modern Studios
              </h3>
              <p className="text-secondary">
                Chic studios ideal for couples and solo travelers.
              </p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4 text-primary">
                Unique Stays
              </h3>
              <p className="text-secondary">
                Special properties with character and charm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            Why Book With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Lower Fees
              </h3>
              <p className="text-secondary">
                Direct booking means no platform fees
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Direct Communication
              </h3>
              <p className="text-secondary">
                Personalized service and quick responses
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Flexible Check-in/out
              </h3>
              <p className="text-secondary">Accommodating your schedule</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2 text-primary">
                Special Offers
              </h3>
              <p className="text-secondary">
                Exclusive deals for direct bookings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experience */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-primary">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-secondary italic mb-4">
                &quot;The perfect home away from home. Every detail was
                thoughtfully considered.&quot;
              </p>
              <p className="font-semibold text-primary">- Sarah & John</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-secondary italic mb-4">
                &quot;Amazing location and the host was incredibly helpful with
                local recommendations.&quot;
              </p>
              <p className="font-semibold text-primary">- Michael</p>
            </div>
            <div className="bg-secondary p-6 rounded-lg">
              <p className="text-secondary italic mb-4">
                &quot;Clean, comfortable, and beautifully designed. Will
                definitely stay again!&quot;
              </p>
              <p className="font-semibold text-primary">- Emma & Family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Touch */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Local Touch
            </h2>
            <p className="text-secondary mb-8">
              We believe in supporting and celebrating local culture. Each of
              our properties is carefully selected to reflect the unique
              character of its neighborhood, and we partner with local
              businesses to enhance your stay.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-primary p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Local Partnerships
                </h3>
                <p className="text-secondary">
                  Special discounts at nearby cafes, restaurants, and shops
                </p>
              </div>
              <div className="bg-primary p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4 text-primary">
                  Neighborhood Guide
                </h3>
                <p className="text-secondary">
                  Curated recommendations for authentic local experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-primary">
              Our Commitment
            </h2>
            <p className="text-secondary mb-8">
              We&apos;re committed to sustainable practices and supporting our
              local community. From eco-friendly cleaning products to
              partnerships with local businesses, we strive to make a positive
              impact.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-8">
            Ready to Experience The City Nook?
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/properties"
              className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Explore Listings
            </Link>
            <Link
              href="/contact"
              className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-8">
            <p className="mb-4">Follow us on social media</p>
            <div className="flex justify-center gap-4">
              <a
                href="https://www.instagram.com/the.city.nook"
                className="hover:text-gray-300 transition"
              >
                Instagram
              </a>
              <a
                href="https://www.facebook.com/thecitynookjp"
                className="hover:text-gray-300 transition"
              >
                Facebook
              </a>
              <a
                href="https://wa.me/919782001181"
                className="hover:text-gray-300 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
