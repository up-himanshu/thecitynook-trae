"use client";

interface VideoProps {
  src: string;
  type?: string;
}

const Video = ({ src, type = "video/mp4" }: VideoProps) => {
  return (
    <video
      className="w-full h-full object-contain"
      controls
      controlsList="nodownload"
      autoPlay
      playsInline
      preload="auto"
    >
      <source src={src} type={type} />
      Your browser does not support the video tag.
    </video>
  );
};

export default Video;