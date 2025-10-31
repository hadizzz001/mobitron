'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';

let subSortMap = [];


export default function FactoryNav() {
  const [products, setProducts] = useState([]);
  const [factories, setFactories] = useState([]);
  const [hoveredFactory, setHoveredFactory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

useEffect(() => {
  const loadAllData = async () => {
    try {
      // Get product data
      const prodRes = await fetch("/api/products");
      const productsData = await prodRes.json();

      // Get brand sort list
      const brandRes = await fetch("/api/brand");
      const brandSortList = await brandRes.json(); // [{ name:"Nike", sort:2 }, ...]

      // Get sub sort list
      const subRes = await fetch("/api/sub");
      const subSortList = await subRes.json(); // [{ name:"Shoes", sort:1 }, ...]

      setProducts(productsData);

      // ✅ Unique factories from product list
      const uniqueFactories = [...new Set(productsData.map(p => p.factory))];

      // ✅ Sort factories using external brand sort API
      const sortedFactories = uniqueFactories.sort((a, b) => {
        const brandA = brandSortList.find(x => x.name === a)?.sort ?? Infinity;
        const brandB = brandSortList.find(x => x.name === b)?.sort ?? Infinity;
        return brandA - brandB;
      });

      setFactories(sortedFactories);

      // ✅ Save sub sort map to use later in getter function
      subSortMap = subSortList;

    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  loadAllData();
}, []);


const getSubsByFactory = (factory) => {
  const filtered = products.filter(p => p.factory === factory);
  const uniqueSubs = [...new Set(filtered.map(p => p.sub))];

  // ✅ Sort subs using external sort list
  return uniqueSubs.sort((a, b) => {
    const aSort = subSortMap.find(x => x.name === a)?.sort ?? Infinity;
    const bSort = subSortMap.find(x => x.name === b)?.sort ?? Infinity;
    return aSort - bSort;
  });
};

  const handleSubClick = (sub) => {
    setMenuOpen(false);
    router.push(`/search?sub=${encodeURIComponent(sub)}`);
  };

  return (
    <nav className="factory-nav">
      {/* Hamburger (mobile) */}
      <div className="hamburger-container">
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Brand Menu */}
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
                <ul className="sub-list">
                  {getSubsByFactory(factory).map((sub, k) => (
                    <li key={k} className="sub-item" onClick={() => handleSubClick(sub)}>
                      {sub}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>

      {/* CSS */}
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

        .hamburger-container {
          display: none;
        }

        .hamburger-btn {
          background: none;
          border: none;
          font-size: 2rem;
          cursor: pointer;
        }

        .factory-list {
          display: flex;
          gap: 2rem;
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .factory-item {
          position: relative;
          cursor: pointer;
        }

        .factory-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          width: 250px;
        }

        .sub-item {
          padding: 0.25rem 0;
          cursor: pointer;
        }

        /* Mobile */
        @media (max-width: 768px) {
          .hamburger-container {
            display: block;
            text-align: right;
            margin-bottom: 1rem;
          }

          .factory-list {
            display: none;
            flex-direction: column;
            gap: 1rem;
          }

          .factory-list.open {
            display: flex;
          }

          .factory-dropdown {
            position: relative;
            width: 100%;
            box-shadow: none;
            padding-left: 0;
          }
        }
      `}</style>
    </nav>
  );
}
