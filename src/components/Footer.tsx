import Image from "next/image";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Footer = () => {
  const hostInfo = {
    name: "Astha  Mishra",
    description:
      "Passionate about creating memorable stays in the heart of the city. With a background in hospitality and interior design, I ensure every detail of your stay is perfect. I love sharing local insights and making guests feel at home in our urban retreat.",
    hostingSince: "2019",
    photo: "/images/host.jpeg",
    checkInTime: "1:00 PM",
    checkOutTime: "11:00 AM",
  };

  const contactInfo = {
    phone: "+91 97820 01181",
    social: [
      {
        icon: FaFacebook,
        link: "https://www.facebook.com/thecitynookjp",
        label: "Facebook",
      },
      {
        icon: FaInstagram,
        link: "https://www.instagram.com/the.city.nook/",
        label: "Instagram",
      },
    ],
  };

  return (
    <footer id="contact" className="bg-slate-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex items-start space-x-6">
              <div className="relative w-48 h-48 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={hostInfo.photo}
                  alt={hostInfo.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold">{hostInfo.name}</h3>
                <p className="text-slate-400">
                  Hosting since {hostInfo.hostingSince}
                </p>
                <p className="text-slate-300">{hostInfo.description}</p>
              </div>
            </div>

            <div className="flex space-x-6">
              {contactInfo.social.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 hover:text-yellow-400 transition-colors"
                    aria-label={item.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <p className="text-xl font-medium">
                  Call or WhatsApp for booking:
                </p>
                <p className="text-3xl font-bold text-yellow-400">
                  <a href="tel:+919782001181">{contactInfo.phone}</a>
                </p>
              </div>

              <div className="flex space-x-8 mt-6">
                <div>
                  <p className="text-slate-400 text-sm">Check-in</p>
                  <p className="text-slate-300 font-medium">
                    {hostInfo.checkInTime}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-sm">Check-out</p>
                  <p className="text-slate-300 font-medium">
                    {hostInfo.checkOutTime}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href="https://maps.app.goo.gl/mw1dJnR5TRBSQphu6"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                <FaMapMarkerAlt className="w-5 h-5" />
                <span>Click here for directions</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800">
          <p className="text-slate-400 text-sm text-center">
            © {new Date().getFullYear()} The City Nook. All rights reserved.
            <span className="mx-2">·</span>
            <a
              href="/privacy-policy"
              className="hover:text-yellow-400 transition-colors"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
