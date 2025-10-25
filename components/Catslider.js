'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CategoriesRow() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [products, setProducts] = useState([]);
  const [openCategory, setOpenCategory] = useState(null);
  const [openBrand, setOpenBrand] = useState(null);
  const router = useRouter();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch('/api/category');
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await fetch('/api/brand');
        const data = await res.json();
        setBrands(data); // [{ name, img: [url] }]
      } catch (error) {
        console.error('Failed to fetch brands:', error);
      }
    };
    fetchBrands();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const getBrandsByCategory = (category) => {
    const filtered = products.filter((p) => p.category === category);
    return [...new Set(filtered.map((p) => p.factory))];
  };

  const getSubsByCategoryAndBrand = (category, brand) => {
    const filtered = products.filter(
      (p) => p.category === category && p.factory === brand
    );
    return [...new Set(filtered.map((p) => p.sub))];
  };

  const handleCategoryClick = (category) => {
    if (openCategory === category) {
      setOpenCategory(null);
      setOpenBrand(null);
    } else {
      setOpenCategory(category);
      setOpenBrand(null);
    }
  };

  const handleBrandClick = (brand) => {
    if (openBrand === brand) {
      setOpenBrand(null);
    } else {
      setOpenBrand(brand);
    }
  };

  const handleSubClick = (sub) => {
    router.push(`/search?sub=${encodeURIComponent(sub)}`);
  };

  // Helper: find brand image by name
  const getBrandImage = (brandName) => {
    const brand = brands.find(
      (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );
    return brand?.img?.[0] || null;
  };

  return (
    <div className="categories-container mt-4 mb-4">
      {categories.map((cat, index) => (
        <div key={index} className="category-item">
          <div
            className="category-image"
            onClick={() => handleCategoryClick(cat.name)}
          >
            <img src={cat.img[0]} alt={cat.name} loading="lazy" />
          </div>
          <span
            className="category-name"
            onClick={() => handleCategoryClick(cat.name)}
          >
            {cat.name}
          </span>

          {/* --- Dropdown for brands --- */}
          {openCategory === cat.name && (
            <div className="dropdown">
              {getBrandsByCategory(cat.name).map((brand, i) => {
                const brandImg = getBrandImage(brand);
                return (
                  <div key={i} className="dropdown-item">
                    <div
                      className="brand-name"
                      onClick={() => handleBrandClick(brand)}
                    >
                      {brandImg && (
                        <img
                          src={brandImg}
                          alt={brand}
                          className="brand-icon"
                          loading="lazy"
                        />
                      )}
                      <span>{brand}</span>
                    </div>

                    {/* --- Subcategories --- */}
                    {openBrand === brand && (
                      <div className="sub-dropdown">
                        {getSubsByCategoryAndBrand(cat.name, brand).map(
                          (sub, j) => (
                            <div
                              key={j}
                              className="sub-item"
                              onClick={() => handleSubClick(sub)}
                            >
                              {sub}
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
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
          position: relative;
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
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
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

        .dropdown {
          margin-top: 0.5rem;
          background: #f9f9f9;
          border-radius: 10px;
          padding: 0.5rem;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }

        .dropdown-item {
          margin-bottom: 0.5rem;
        }

        .brand-name {
          font-weight: 600;
          color: #555 !important;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.25rem 0.5rem;
          border-radius: 6px;
        }

        .brand-name:hover {
          background: #ececec;
        }

        .brand-icon {
          width: 32px;
          height: 32px;
          object-fit: contain;
          border-radius: 6px;
        }

        .sub-dropdown {
          margin-left: 2.5rem;
          margin-top: 0.25rem;
          border-left: 2px solid #ddd;
          padding-left: 0.5rem;
        }

        .sub-item {
          color: #444 !important;
          cursor: pointer;
          padding: 0.25rem 0;
        }

        .sub-item:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .categories-container {
            flex-wrap: nowrap;
            overflow-x: auto;
            padding: 0 0.5rem;
            gap: 0.5rem;
            justify-content: flex-start;
          }
          .category-item {
            flex: 0 0 calc(33.333% - 0.33rem);
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
          .brand-icon {
            width: 24px;
            height: 24px;
          }
        }

        .categories-container {
  display: flex;
  flex-wrap: nowrap; /* prevent wrapping on desktop */
  justify-content: flex-start; /* align items to the left */
  gap: 2rem;
  padding: 1rem;
  background-color: #fff;
  overflow-x: auto; /* enable horizontal scroll */
  scrollbar-width: thin; /* optional for Firefox */
}

.categories-container::-webkit-scrollbar {
  height: 6px;
}

.categories-container::-webkit-scrollbar-thumb {
  background-color: rgba(0,0,0,0.3);
  border-radius: 3px;
}

      `}</style>
    </div>
  );
}
