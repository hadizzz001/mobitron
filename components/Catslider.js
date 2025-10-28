'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function FactoryNav() {
  const [products, setProducts] = useState([]);
  const [factories, setFactories] = useState([]);
  const [hoveredFactory, setHoveredFactory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        // ✅ Sort products by 'sort' ascending, placing 0/null/undefined at the end
        const sortedData = data.sort((a, b) => {
          const sortA =
            a.sort === null || a.sort === undefined || a.sort === 0
              ? Infinity
              : a.sort;
          const sortB =
            b.sort === null || b.sort === undefined || b.sort === 0
              ? Infinity
              : b.sort;
          return sortA - sortB;
        });

        setProducts(sortedData);

        // ✅ Get unique factories sorted by the lowest product sort value
        const uniqueFactories = [
          ...new Set(sortedData.map((p) => p.factory)),
        ].sort((a, b) => {
          const aMin = Math.min(
            ...sortedData
              .filter((p) => p.factory === a)
              .map((p) =>
                p.sort === null || p.sort === undefined || p.sort === 0
                  ? Infinity
                  : p.sort
              )
          );
          const bMin = Math.min(
            ...sortedData
              .filter((p) => p.factory === b)
              .map((p) =>
                p.sort === null || p.sort === undefined || p.sort === 0
                  ? Infinity
                  : p.sort
              )
          );
          return aMin - bMin;
        });

        setFactories(uniqueFactories);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const getCategoriesByFactory = (factory) => {
    const filtered = products.filter((p) => p.factory === factory);
    return [...new Set(filtered.map((p) => p.category))];
  };

  const getSubsByFactoryAndCategory = (factory, category) => {
    const filtered = products.filter(
      (p) => p.factory === factory && p.category === category
    );
    return [...new Set(filtered.map((p) => p.sub))];
  };

  const handleSubClick = (sub) => {
    setMenuOpen(false);
    router.push(`/search?sub=${encodeURIComponent(sub)}`);
  };

  return (
    <nav className="factory-nav">
      {/* ===== Hamburger (mobile) ===== */}
      <div className="hamburger-container">
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* ===== Factory Menu ===== */}
      <ul className={`factory-list ${menuOpen ? 'open' : ''}`}>
        {factories.map((factory, i) => (
          <li
            key={i}
            className="factory-item"
            onMouseEnter={() => setHoveredFactory(factory)}
            onMouseLeave={() => setHoveredFactory(null)}
          >
            <span className="factory-name">{factory}</span>

            {hoveredFactory === factory && (
              <div className="factory-dropdown">
                {getCategoriesByFactory(factory).map((cat, j) => (
                  <div key={j} className="category-block">
                    <div className="category-title">{cat}</div>
                    <ul className="sub-list">
                      {getSubsByFactoryAndCategory(factory, cat).map(
                        (sub, k) => (
                          <li
                            key={k}
                            className="sub-item"
                            onClick={() => handleSubClick(sub)}
                          >
                            {sub}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* ===== CSS ===== */}
      <style jsx>{`
        * {
          color: #222 !important;
        }

        .factory-nav {
          background: #fff;
          padding: 1rem;
          position: relative;
          z-index: 999;
        }

        /* Hamburger */
        .hamburger-container {
          display: none;
        }

        .hamburger-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
          color: #222 !important;
        }

        /* Desktop Menu */
        .factory-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .factory-item {
          position: relative;
          cursor: pointer;
        }

        .factory-name {
          font-weight: 500;
          color: #222 !important;
        }

        .factory-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #f9f9f9;
          padding: 1.5rem 1rem;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
          display: flex;
          gap: 2rem;
          z-index: 1000;
          width: 400px;
        }

        .category-block {
          display: flex;
          flex-direction: column;
        }

        .category-title {
          font-weight: 700;
          margin-bottom: 0.25rem;
          color: #222 !important;
        }

        .sub-item {
          padding: 0.15rem 0;
          cursor: pointer;
          color: #222 !important;
        }

        .sub-item:hover {
          color: #555 !important;
        }

        /* ===== Mobile Styles ===== */
        @media (max-width: 768px) {
          .hamburger-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-bottom: 1rem;
          }

          .factory-list {
            display: none;
            flex-direction: column;
            gap: 1rem;
            background: #fff;
            padding: 1rem;
            border-top: 1px solid #ddd;
          }

          .factory-list.open {
            display: flex;
          }

          .factory-item {
            border-bottom: 1px solid #eee;
            padding-bottom: 0.5rem;
          }

          .factory-dropdown {
            position: relative;
            top: 0;
            left: 0;
            flex-direction: column;
            gap: 1rem;
            box-shadow: none;
            width: 100%;
            padding: 1rem;
            border-radius: 6px;
            background: #f9f9f9;
          }
        }
      `}</style>
    </nav>
  );
}
