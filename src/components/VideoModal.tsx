"use client";

import Video from "./Video";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const VideoModal = ({ isOpen, onClose }: VideoModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 p-4">
      <div className="relative w-full md:w-[36vw] lg:w-[28vw] xl:w-[20vw] max-w-[405px] mx-auto aspect-[9/16]">
        <button
          onClick={onClose}
          className="absolute -top-8 right-0 text-white hover:text-gray-300 text-sm px-3 py-1 bg-black bg-opacity-50 rounded"
        >
          Close
        </button>
        <div className="w-full h-full">
          <Video src="/videos/video.mov" />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;