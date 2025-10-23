'use client';

export default function CategoriesRow() {
  const categories = [
    { name: 'Phones', image: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761233025/sp_v4mhcp.webp' },
    { name: 'Tablets', image: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761233024/tab_svtpa8.webp' },
    { name: 'Accessories', image: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761233024/acc_oywsn4.webp' },
    { name: 'Laptops', image: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761233024/lap_tmx0du.webp' },
    { name: 'Others', image: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761233024/other_l2pfbf.webp' },
  ];

  return (
    <div className="categories-container mt-4 mb-4">
      {categories.map((cat, index) => (
        <div key={index} className="category-item">
          <div className="category-image">
            <img src={cat.image} alt={cat.name} loading="lazy" />
          </div>
          <span className="category-name">{cat.name}</span>
        </div>
      ))}

      <style jsx>{`
        .categories-container {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 4rem;
          padding: 1rem 0;
          background-color: #fff;
        }

        .category-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .category-item:hover {
          transform: scale(1.08);
        }

        .category-image {
          width: 7rem;
          height: 7rem;
          border-radius: 50%;
          background-color: #f5f5f5;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          margin-bottom: 1rem;
          padding: 1.25rem;
          box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .category-image img {
          width: 5rem;
          height: 5rem;
          object-fit: contain;
        }

        .category-name {
          font-size: 1.125rem;
          font-weight: 600;
          color: #333;
        }

        /* Mobile styles */
        @media (max-width: 768px) {
          .categories-container {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 0 0.5rem; /* small padding to avoid first item cutoff */
            gap: 0.5rem; /* reduce gap */
            justify-content: flex-start; /* align items from left */
          }

          .categories-container::-webkit-scrollbar {
            display: none; /* hide scrollbar */
          }

          .category-item {
            flex: 0 0 calc(33.333% - 0.33rem); /* 3 items visible */
          }

          .category-image {
            width: 4.5rem;
            height: 4.5rem;
            padding: 0.5rem;
          }

          .category-image img {
            width: 3rem;
            height: 3rem;
          }

          .category-name {
            font-size: 0.95rem;
          }
        }
      `}</style>
    </div>
  );
}
