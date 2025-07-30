import {
  FaBriefcase,
  FaCalendarCheck,
  FaCheckCircle,
  FaHome,
} from "react-icons/fa";

export default function Highlights() {
  const highlights = [
    {
      title: "Local, Handpicked Accommodations",
      description:
        "Each property is personally selected for quality and location.",
      icon: FaHome,
      color: "text-blue-500",
    },
    {
      title: "Consistent Comfort and Style",
      description: "Enjoy the same high standards across all our properties.",
      icon: FaCheckCircle,
      color: "text-green-500",
    },
    {
      title: "Easy Direct Bookings",
      description:
        "Simple communication and booking process for a stress-free stay.",
      icon: FaCalendarCheck,
      color: "text-purple-500",
    },
    {
      title: "Perfect for Business or Leisure",
      description: "Ideal accommodations whether you're working or exploring.",
      icon: FaBriefcase,
      color: "text-orange-500",
    },
  ];

  return (
    <section className="py-16 bg-primary">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Why Choose The City Nook?
        </h2>
        <p className="text-secondary text-center mb-12 max-w-2xl mx-auto">
          Experience the perfect blend of comfort, convenience, and exceptional
          service
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-secondary rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center rounded-full bg-secondary">
                <highlight.icon
                  className={`text-3xl ${highlight.color} transform hover:scale-110 transition-transform duration-300`}
                />
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">
                {highlight.title}
              </h3>
              <p className="text-secondary leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
