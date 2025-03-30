import Image from "next/image";

const PhotoGallery = () => {
  const images = [
    { src: "/images/1.JPG", alt: "Property view 1" },
    { src: "/images/2.JPG", alt: "Property view 2" },
    { src: "/images/3.JPG", alt: "Property view 3" },
    { src: "/images/4.JPG", alt: "Property view 4" },
    { src: "/images/5.JPG", alt: "Property view 5" },
    { src: "/images/6.JPG", alt: "Property view 6" },
    { src: "/images/7.JPG", alt: "Property view 7" },
    { src: "/images/8.JPG", alt: "Property view 8" },
    { src: "/images/9.JPG", alt: "Property view 9" },
    { src: "/images/10.JPG", alt: "Property view 10" },
    { src: "/images/11.JPG", alt: "Property view 10" },
    { src: "/images/12.jpg", alt: "Property view 10" },
    { src: "/images/13.JPG", alt: "Property view 10" },
  ];

  return (
    <section
      className="h-full p-6 bg-white dark:bg-primary rounded-lg shadow-sm"
      style={{ position: "relative", zIndex: -1 }}
    >
      <h2 className="text-2xl font-semibold mb-6 dark:text-white">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="relative h-[400px] col-span-2 row-span-2 rounded-lg overflow-hidden">
          <Image
            src={images[0].src}
            alt="Living Room"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[1].src}
            alt="Kitchen"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[2].src}
            alt="Bedroom"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[3].src}
            alt="Bathroom"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[4].src}
            alt="Dining Area"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[400px] col-span-2 row-span-2 rounded-lg overflow-hidden">
          <Image
            src={images[12].src}
            alt="Master Bedroom"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[11].src}
            alt="Study Corner"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[10].src}
            alt="Balcony View"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[9].src}
            alt="Kitchen Detail"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="relative h-[190px] rounded-lg overflow-hidden">
          <Image
            src={images[8].src}
            alt="Living Room Detail"
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
