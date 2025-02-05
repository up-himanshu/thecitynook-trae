import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The City Nook - Your Urban Retreat",
  description: "Book unique urban retreat for your perfect city getaway",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QPKHM1E2R3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-QPKHM1E2R3');
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
