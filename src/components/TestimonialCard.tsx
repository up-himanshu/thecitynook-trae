import { StarIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
}

const TestimonialCard = ({ name, rating, comment, date, image }: TestimonialProps) => {
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg shadow-md overflow-hidden p-4 mt-2">
      <div className="flex justify-center mb-4">
        <div className="relative w-20 h-20 rounded-full overflow-hidden bg-blue-500 flex items-center justify-center">
          {image ? (
            <Image
              src={image}
              alt={`${name}'s profile`}
              fill
              className="object-cover"
            />
          ) : (
            <span className="text-2xl font-semibold text-white">{getInitial(name)}</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-gray-900 dark:text-white">{name}</h3>
          <span className="text-sm text-gray-500 dark:text-gray-400">{date}</span>
        </div>
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              className={`h-5 w-5 ${index < rating ? 'text-yellow-400' : 'text-gray-200 dark:text-gray-600'}`}
              aria-hidden="true"
            />
          ))}
        </div>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;