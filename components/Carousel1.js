'use client';

import { useState, useEffect } from 'react';

export default function FullScreenImage() {
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/banner2');
        const data = await res.json();
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
 <>
      {imageUrl ? (
        <img
          src={imageUrl}
          alt="banner" 
          className='w-full'
        />
      ) : (
        <div
          style={{
            color: '#fff',
          }}
        >
          Loading banner...
        </div>
      )} 
      </>
  );
}
