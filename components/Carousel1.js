'use client';

export default function FullScreenImage() {
  return (
    <div className="w-screen flex justify-center items-start overflow-hidden">
      <div className="w-full aspect-[16/9] sm:aspect-[21/9]">
        <img
          src="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761245725/21c75165477014848f8c0fa1ef98a195_awwgo0.jpg"
          alt="banner"
          className="w-full h-full object-cover object-center"
        />
      </div>
    </div>
  );
}
