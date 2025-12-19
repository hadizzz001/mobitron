'use client';
import { useState, useEffect } from 'react';

export default function ImageGrid() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch('/api/banner1');
        const data = await res.json();

        // Take the first object in the array and get its 'img' array
        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].img)) {
          setImages(data[0].img);
        } else {
          console.error('No images found in API response:', data);
        }
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.length > 0 ? (
        images.map((src, index) => (
          <div key={index} className="w-full aspect-[4/3] overflow-hidden">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))
      ) : (
        <p className="col-span-4 text-center text-gray-500">Loading images...</p>
      )}
    </div>
  );
}
