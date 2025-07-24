import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import RootLayoutClient from "@/components/common/root-layout-client";
import Script from "next/script";

const openSans = Open_Sans({
  style: ["normal", "italic"],
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TheCityNook - Premium Stays in Jaipur | Home",
  description:
    "Discover charming stays across Jaipur with TheCityNook. Experience unique spaces in prime locations with the comfort of home. Perfect for both business and leisure travelers.",
  keywords:
    "Jaipur stays, premium accommodations, business stays, leisure stays, TheCityNook, luxury apartments, short-term rentals",
  openGraph: {
    title: "TheCityNook - Premium Stays in Jaipur",
    description:
      "Discover charming stays across Jaipur with TheCityNook. Experience unique spaces in prime locations with the comfort of home.",
    type: "website",
    locale: "en_IN",
    siteName: "TheCityNook",
    images: [
      {
        url: "/images/1.JPG",
        width: 1200,
        height: 630,
        alt: "TheCityNook Premium Stays in Jaipur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TheCityNook - Premium Stays in Jaipur",
    description:
      "Discover charming stays across Jaipur with TheCityNook. Experience unique spaces in prime locations with the comfort of home.",
    images: ["/images/1.JPG"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification", // Add your Google verification code
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gTagId =
    process.env.REACT_APP_NODE_ENV !== "development" ? "G-QPKHM1E2R3" : "";

  return (
    <html lang="en" className={openSans.className}>
      <head>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gTagId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            if (!window.location.pathname.startsWith('/admin')) {
              gtag('js', new Date());
              gtag('config', 'G-QPKHM1E2R3');
            }
          `}
        </Script>
        <meta
          property="og:title"
          content="The City Nook - Your Urban Retreat in Jaipur"
        />
        <meta property="og:site_name" content="The City Nook" />
        <meta property="og:url" content="https://thecitynook.com" />
        <meta
          property="og:description"
          content="Experience luxury stays in Jagatpura, Jaipur. Modern amenities, stunning views, and exceptional hospitality at The City Nook."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://thecitynook.com/images/2.JPG"
        />
      </head>
      <body>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
