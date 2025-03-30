import TestimonialCard from "./TestimonialCard";

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
    name: "Udit",
    rating: 5,
    comment:
      "Had a wonderful stay. The property looks the same as in the pictures. It was clean, well-organized, and had all the amenities we needed for a comfortable stay. The space was cozy and inviting. The host was very responsive and accommodating. Highly recommend this place for anyone looking for a peaceful and hassle-free stay! Would definitely return.",
    date: "December 2024",
    image: "/images/udit.avif",
  },
  {
    id: 2,
    name: "Mayank",
    rating: 5,
    comment:
      "Spotless, cozy stay with great amenities. Perfect location near attractions. Host was friendly, responsive, and provided helpful recommendations. Highly recommend!",
    date: "December 2024",
    image: "",
  },
  {
    id: 3,
    name: "Devang",
    rating: 5,
    comment:
      "It was a really nice stay, the host is very friendly and super nice would recommend to everyone who is looking for a stay in jaipur :)",
    date: "January 2025",
    image: "/images/devang.avif",
  },
  {
    id: 4,
    name: "Raghav",
    rating: 5,
    comment: `Lovely place, quite and very approachable.
We loved our stay as Astha was very co operative.`,
    date: "December 2023",
    image: "/images/raghav.avif",
  },
];

const Testimonials = () => {
  return (
    <div className="h-full p-6 bg-white dark:bg-primary rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">
        Guest Reviews
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            name={testimonial.name}
            rating={testimonial.rating}
            comment={testimonial.comment}
            date={testimonial.date}
            image={testimonial.image}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
