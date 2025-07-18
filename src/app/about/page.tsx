import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About TheCityNook - Our Story & Mission | Premium Stays in Jaipur",
  description:
    "Learn about TheCityNook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality, local expertise, and exceptional guest experiences.",
  keywords:
    "about TheCityNook, Jaipur accommodation story, premium stays mission, local hospitality, TheCityNook history, guest experience",
  openGraph: {
    title: "About TheCityNook - Our Story & Mission",
    description:
      "Learn about TheCityNook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality and exceptional guest experiences.",
    type: "website",
    locale: "en_IN",
    siteName: "TheCityNook",
    images: [
      {
        url: "/images/host.jpeg",
        width: 1200,
        height: 630,
        alt: "TheCityNook Team and Mission",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About TheCityNook - Our Story & Mission",
    description:
      "Learn about TheCityNook's journey in providing premium accommodations in Jaipur. Discover our commitment to quality and exceptional guest experiences.",
    images: ["/images/host.jpeg"],
  },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] bg-gray-100 -mt-[100px]">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
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
      <section className="py-20 bg-gray-50">
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
                <h2 className="text-3xl font-bold mb-6">About the Host</h2>
                <p className="text-gray-700 mb-4">
                  Founded with a passion for creating memorable city
                  experiences, The City Nook began as a dream to offer travelers
                  more than just a place to stay. Our hosting philosophy centers
                  around providing personalized, responsive service while
                  respecting your privacy and independence.
                </p>
                <p className="text-gray-700">
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Properties
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Cozy Apartments</h3>
              <p className="text-gray-700">
                Spacious, well-appointed apartments perfect for families and
                groups.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Modern Studios</h3>
              <p className="text-gray-700">
                Chic studios ideal for couples and solo travelers.
              </p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Unique Stays</h3>
              <p className="text-gray-700">
                Special properties with character and charm.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book With Us */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Book With Us
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-semibold mb-2">Lower Fees</h3>
              <p className="text-gray-700">
                Direct booking means no platform fees
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-xl font-semibold mb-2">
                Direct Communication
              </h3>
              <p className="text-gray-700">
                Personalized service and quick responses
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⏰</div>
              <h3 className="text-xl font-semibold mb-2">
                Flexible Check-in/out
              </h3>
              <p className="text-gray-700">Accommodating your schedule</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold mb-2">Special Offers</h3>
              <p className="text-gray-700">
                Exclusive deals for direct bookings
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guest Experience */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Guests Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                &quot;The perfect home away from home. Every detail was
                thoughtfully considered.&quot;
              </p>
              <p className="font-semibold">- Sarah & John</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                &quot;Amazing location and the host was incredibly helpful with
                local recommendations.&quot;
              </p>
              <p className="font-semibold">- Michael</p>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 italic mb-4">
                &quot;Clean, comfortable, and beautifully designed. Will
                definitely stay again!&quot;
              </p>
              <p className="font-semibold">- Emma & Family</p>
            </div>
          </div>
        </div>
      </section>

      {/* Local Touch */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Local Touch</h2>
            <p className="text-gray-700 mb-8">
              We believe in supporting and celebrating local culture. Each of
              our properties is carefully selected to reflect the unique
              character of its neighborhood, and we partner with local
              businesses to enhance your stay.
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Local Partnerships
                </h3>
                <p className="text-gray-700">
                  Special discounts at nearby cafes, restaurants, and shops
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">
                  Neighborhood Guide
                </h3>
                <p className="text-gray-700">
                  Curated recommendations for authentic local experiences
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-gray-700 mb-8">
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
              <a href="#" className="hover:text-gray-300 transition">
                Instagram
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                Facebook
              </a>
              <a href="#" className="hover:text-gray-300 transition">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
