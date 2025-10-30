'use client';

import React, { useState, useEffect } from "react";

const MyCarousel = () => {
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch("/api/banner");
        const data = await res.json();

        // Ensure you only use entries that contain valid image URLs
        const validImages = data
          .filter((item) => item?.img && item.img.length > 0)
          .flatMap((item) => item.img);

        setImages(validImages);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };

    fetchBanners();
  }, []);

  // Auto-slide effect
  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center bg-gray-200">
        Loading banners...
      </div>
    );
  }

return (
  <div className="relative w-full overflow-hidden">
    {/* Image Container with responsive heights */}
    <div className="relative w-full h-[200px] md:h-[400px]">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`slide-${index}`}
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
    </div>

    {/* Dots Navigation */}
    <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => setCurrentIndex(index)}
          className={`w-3 h-3 rounded-full transition-all duration-300 ${
            currentIndex === index ? "bg-white scale-110" : "bg-gray-400"
          }`}
        />
      ))}
    </div>
  </div>
);

};

export default MyCarousel;
