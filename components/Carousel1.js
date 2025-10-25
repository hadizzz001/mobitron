'use client';

import { useState, useEffect } from 'react';

export default function FullScreenImage() {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/banner2');
        const data = await res.json();

        // Assuming the API returns something like:
        // [{ "img": ["https://example.com/image.jpg"] }]
        if (Array.isArray(data) && data.length > 0) {
          const firstImage = data[0]?.img?.[0];
          if (firstImage) setImageUrl(firstImage);
        }
      } catch (error) {
        console.error('Error fetching banner:', error);
      }
    };

    fetchBanner();
  }, []);

  return (
    <div className="w-screen flex justify-center items-start overflow-hidden">
      <div className="w-full aspect-[16/9] sm:aspect-[21/9]">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="banner"
            className="w-full h-full object-cover object-center"
          />
        ) : (
          <div className="w-full h-full flex justify-center items-center bg-gray-200 text-gray-500">
            Loading banner...
          </div>
        )}
      </div>
    </div>
  );
}
