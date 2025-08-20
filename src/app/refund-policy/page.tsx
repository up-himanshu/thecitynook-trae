import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy - The City Nook | Cancellation & Refund Terms",
  description:
    "The City Nook's refund policy explains our cancellation terms and refund process. Full 100% refund available until check-in day. Learn about our booking policies and refund procedures.",
  keywords:
    "refund policy, cancellation policy, booking refund, The City Nook refund, cancellation terms, refund process",
  openGraph: {
    title: "Refund Policy - The City Nook",
    description:
      "The City Nook's refund policy explains our cancellation terms and refund process. Full 100% refund available until check-in day. Learn about our booking policies and refund procedures.",
    type: "website",
    locale: "en_IN",
    siteName: "The City Nook",
    images: [
      {
        url: "/images/1.JPG",
        width: 1200,
        height: 630,
        alt: "The City Nook Refund Policy",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy - The City Nook",
    description:
      "The City Nook's refund policy explains our cancellation terms and refund process. Full 100% refund available until check-in day. Learn about our booking policies and refund procedures.",
    images: ["/images/1.JPG"],
  },
};

export default function RefundPolicy() {
  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Refund Policy</h1>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
            <p className="text-secondary leading-relaxed">
              At The City Nook, we understand that travel plans can change
              unexpectedly. This Refund Policy outlines our cancellation terms
              and refund procedures to ensure transparency and fairness for all
              our guests. Please read this policy carefully before making your
              reservation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>
            <p className="text-secondary leading-relaxed mb-4">
              We offer flexible cancellation terms to accommodate our guests'
              needs:
            </p>
            <ul className="list-disc pl-6 text-secondary space-y-2">
              <li>
                <strong>Full Refund:</strong> Cancellations made until the day
                of check-in are eligible for a 100% refund
              </li>
              <li>
                <strong>No Refund:</strong> Cancellations made after check-in
                date on the arrival date
              </li>
              <li>
                <strong>Early Departure:</strong> No refunds for early
                departures or unused nights
              </li>
              <li>
                <strong>No-Show:</strong> No refunds for guests who do not
                arrive without prior cancellation
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Refund Process</h2>
            <p className="text-secondary leading-relaxed mb-4">
              When you cancel your booking within the eligible timeframe:
            </p>
            <ul className="list-disc pl-6 text-secondary space-y-2">
              <li>Refunds are processed within 5-7 business days</li>
              <li>
                Refunds are issued to the original payment method used for
                booking
              </li>
              <li>
                You will receive an email confirmation once the refund is
                processed
              </li>
              <li>
                Processing times may vary depending on your bank or payment
                provider
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              How to Cancel Your Booking
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              To cancel your reservation and request a refund:
            </p>
            <ul className="list-disc pl-6 text-secondary space-y-2">
              <li>Contact us via phone or email as soon as possible</li>
              <li>Provide your booking reference number and guest details</li>
              <li>Specify your reason for cancellation</li>
              <li>Ensure cancellation is confirmed by our team</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Special Circumstances
            </h2>
            <p className="text-secondary leading-relaxed mb-4">
              We understand that certain situations may require special
              consideration:
            </p>
            <ul className="list-disc pl-6 text-secondary space-y-2">
              <li>
                <strong>Medical Emergencies:</strong> Documentation may be
                required for medical-related cancellations
              </li>
              <li>
                <strong>Natural Disasters:</strong> Cancellations due to natural
                disasters or government restrictions
              </li>
              <li>
                <strong>Travel Restrictions:</strong> COVID-19 related travel
                bans or restrictions
              </li>
              <li>
                <strong>Property Issues:</strong> Cancellations due to property
                maintenance or availability issues
              </li>
            </ul>
            <p className="text-secondary leading-relaxed mt-4">
              In these cases, we will review each situation individually and may
              offer alternative solutions such as rescheduling or partial
              refunds.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Booking Modifications
            </h2>
            <p className="text-secondary leading-relaxed">
              If you need to modify your booking (change dates, number of
              guests, etc.), please contact us at least 48 hours before your
              scheduled arrival. Modifications are subject to availability and
              may incur additional charges or require a new booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Group Bookings</h2>
            <p className="text-secondary leading-relaxed">
              For group bookings (3 or more rooms), cancellation policies may
              vary. Please contact us directly to discuss specific terms for
              your group reservation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Third-Party Bookings
            </h2>
            <p className="text-secondary leading-relaxed">
              If you made your reservation through a third-party platform (such
              as Booking.com, Airbnb, etc.), please refer to their specific
              cancellation and refund policies. We cannot guarantee refunds for
              bookings made through third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-secondary leading-relaxed">
              If you have questions about our refund policy or need to cancel
              your booking, please contact us at:
              <br />
              <br />
              Email:{" "}
              <a href="mailto:hello@thecitynook.com">hello@thecitynook.com</a>
              <br />
              Phone: <a href="tel:+919782001181">+91 97820 01181</a>
              <br />
              <br />
              We're here to help and will process your cancellation request
              promptly.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              Changes to This Refund Policy
            </h2>
            <p className="text-secondary leading-relaxed">
              We reserve the right to update or modify this Refund Policy at any
              time. Any changes will be posted on this page with an updated
              revision date. We encourage you to review this policy
              periodically.
            </p>
          </section>

          <div className="text-gray-400 text-sm mt-12">
            Last updated: {new Date("2025-05-01").toLocaleDateString()}
          </div>
        </div>
      </div>
    </main>
  );
}
