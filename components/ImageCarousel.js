import React, { useState } from 'react';
import Image from 'next/image';

const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative w-full h-64">
        <Image
          src="/placeholder-image.jpg"
          alt="No image available"
          layout="fill"
          objectFit="cover"
        />
      </div>
    );
  }

  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastSlide = currentIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative w-full h-64">
      <button
        onClick={goToPrevious}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 z-10"
      >
        &#10094;
      </button>
      <Image
        src={images[currentIndex]}
        alt={`Product image ${currentIndex + 1}`}
        layout="fill"
        objectFit="cover"
      />
      <button
        onClick={goToNext}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 z-10"
      >
        &#10095;
      </button>
    </div>
  );
};

export default ImageCarousel;