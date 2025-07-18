import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - TheCityNook | Data Protection & Privacy",
  description:
    "TheCityNook's privacy policy explains how we collect, use, and protect your personal information. Learn about your data rights and our commitment to privacy.",
  keywords:
    "privacy policy, data protection, personal information, TheCityNook privacy, data rights, privacy commitment",
  openGraph: {
    title: "Privacy Policy - TheCityNook",
    description:
      "TheCityNook's privacy policy explains how we collect, use, and protect your personal information. Learn about your data rights and our commitment to privacy.",
    type: "website",
    locale: "en_IN",
    siteName: "TheCityNook",
    images: [
      {
        url: "/images/1.JPG",
        width: 1200,
        height: 630,
        alt: "TheCityNook Privacy Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - TheCityNook",
    description:
      "TheCityNook's privacy policy explains how we collect, use, and protect your personal information. Learn about your data rights and our commitment to privacy.",
    images: ["/images/1.JPG"],
  },
};

export default function PrivacyPolicy() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-gray-600 leading-relaxed">
              At The City Nook, we take your privacy seriously. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your
              information when you visit our website or make a reservation.
              Please read this privacy policy carefully. If you do not agree
              with the terms of this privacy policy, please do not access the
              site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Information We Collect
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We collect information that you voluntarily provide to us when you
              make a reservation, including:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Name</li>
              <li>Phone number</li>
              <li>Email address</li>
              <li>Dates of stay</li>
              <li>Number of guests</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              How We Use Your Information
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
              <li>Process your reservation requests</li>
              <li>Communicate with you about your stay</li>
              <li>Send you important updates about your booking</li>
              <li>Improve our services and website experience</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Information Security
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We implement appropriate technical and organizational security
              measures to protect your personal information. However, please
              note that no method of transmission over the internet or
              electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Services
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We may use third-party service providers to help us operate our
              website or administer activities on our behalf. We may share your
              information with these third parties only to the extent necessary
              to provide these services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your information</li>
              <li>Object to our use of your information</li>
              <li>Withdraw consent where previously provided</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-gray-600 leading-relaxed">
              If you have questions or concerns about this Privacy Policy,
              please contact us at:
              <br />
              <br />
              Email: info@thecitynook.com
              <br />
              Phone: +91 97820 01181
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Changes to This Privacy Policy
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We reserve the right to update or change our Privacy Policy at any
              time. Any changes will be posted on this page with an updated
              revision date.
            </p>
          </section>

          <div className="text-gray-500 text-sm mt-12">
            Last updated: {new Date("2024-01-01").toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
