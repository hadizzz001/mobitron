// app/page.tsx or components/ImageGrid.tsx
export default function ImageGrid() {
  const images = [
    'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761234990/84d0566c343c668cc1cedcff7b955d5d_b1rn8n.jpg',
    'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761234990/30b340a970e9f260cb0112be41e8ca54_jue9hm.jpg',
    'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761234990/iphone_air__f0t56fef3oey_large_w4hvif.jpg',
    'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761234990/10df69847fecd08c33ef700892b1ef3e_qs0iky.jpg',
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {images.map((src, index) => (
        <div key={index} className="w-full aspect-[4/3] overflow-hidden">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  );
}
