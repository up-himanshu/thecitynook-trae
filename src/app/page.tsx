import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Highlights from "@/components/home/highlights";
import Map from "@/components/home/map";
import Properties from "@/components/home/properties";
import Testimonials from "@/components/home/testimonials";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "The City Nook - Premium Stays in Jaipur | Home",
  description:
    "Discover charming stays across Jaipur with The City Nook. Experience unique spaces in prime locations with the comfort of home. Perfect for both business and leisure travelers.",
  keywords:
    "Jaipur stays, premium accommodations, business stays, leisure stays, The City Nook, luxury apartments, short-term rentals, Jaipur hotels, vacation rentals",
  openGraph: {
    title: "The City Nook - Premium Stays in Jaipur",
    description:
      "Discover charming stays across Jaipur with The City Nook. Experience unique spaces in prime locations with the comfort of home.",
    type: "website",
    locale: "en_IN",
    siteName: "The City Nook",
    images: [
      {
        url: "/images/1.JPG",
        width: 1200,
        height: 630,
        alt: "The City Nook Premium Stays in Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "The City Nook - Premium Stays in Jaipur",
    description:
      "Discover charming stays across Jaipur with The City Nook. Experience unique spaces in prime locations with the comfort of home.",
    images: ["/images/1.JPG"],
  },
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <section aria-label="Featured Properties">
        <Properties properties={properties} />
      </section>
      <section aria-label="Why Choose Us">
        <Highlights />
      </section>
      <section aria-label="Guest Testimonials">
        <Testimonials />
      </section>
      <section aria-label="Property Locations">
        <Map properties={properties} />
      </section>
    </main>
  );
}
