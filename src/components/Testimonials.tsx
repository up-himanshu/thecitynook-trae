import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface Testimonial {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    rating: 5,
    comment: "Absolutely loved my stay! The location was perfect and the amenities were top-notch. Will definitely be coming back!",
    date: "March 2024",
    image: "/images/11.JPG"
  },
  {
    id: 2,
    name: "Michael Chen",
    rating: 4,
    comment: "Great urban retreat with amazing city views. The apartment was clean and modern. Highly recommend!",
    date: "February 2024",
    image: "/images/12.jpg"
  },
  {
    id: 3,
    name: "Emma Davis",
    rating: 5,
    comment: "Perfect location for exploring the city. The host was very responsive and helpful throughout our stay.",
    date: "January 2024",
    image: "/images/13.JPG"
  },
  {
    id: 4,
    name: "David Wilson",
    rating: 5,
    comment: "Exceptional experience! The attention to detail and modern amenities made our stay truly memorable.",
    date: "December 2023",
    image: "/images/1.JPG"
  }
];

const Testimonials = () => {
  return (
    <div className="h-full p-6 bg-white rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6">Guest Reviews</h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-gray-50 rounded-lg shadow-md overflow-hidden p-4 mt-2">
            <div className="flex justify-center mb-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={testimonial.image}
                  alt={`${testimonial.name}'s profile`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
                <span className="text-sm text-gray-500">{testimonial.date}</span>
              </div>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <StarIcon
                    key={index}
                    className={`h-5 w-5 ${index < testimonial.rating ? 'text-yellow-400' : 'text-gray-200'}`}
                    aria-hidden="true"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm">{testimonial.comment}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;