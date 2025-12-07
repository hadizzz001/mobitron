'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import useEmblaCarousel from 'embla-carousel-react';

let subSortMap = [];

export default function FactoryNav() {
  const [products, setProducts] = useState([]);
  const [factories, setFactories] = useState([]);
  const [hoveredFactory, setHoveredFactory] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const router = useRouter();

  // Embla only on desktop
  const [emblaRef] = useEmblaCarousel({
    dragFree: true,
    containScroll: 'trimSnaps'
  });

  useEffect(() => {
    const checkScreen = () => setIsDesktop(window.innerWidth > 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const loadAllData = async () => {
      try {
        const prodRes = await fetch("/api/products");
        const productsData = await prodRes.json();

        const brandRes = await fetch("/api/brand");
        const brandSortList = await brandRes.json();

        const subRes = await fetch("/api/sub");
        const subSortList = await subRes.json();

        setProducts(productsData);

        const uniqueFactories = [...new Set(productsData.map(p => p.factory))];

        const sortedFactories = uniqueFactories.sort((a, b) => {
          const brandA = brandSortList.find(x => x.name === a)?.sort ?? Infinity;
          const brandB = brandSortList.find(x => x.name === b)?.sort ?? Infinity;
          return brandA - brandB;
        });

        setFactories(sortedFactories);

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

      {/* -------- MOBILE HAMBURGER -------- */}
      <div className="hamburger-container">
        <button className="hamburger-btn" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* -------- DESKTOP (Embla) -------- */}
      {isDesktop && (
        <div className="embla" ref={emblaRef}>
          <ul className="embla__container factory-list-desktop">
            {factories.map((factory, i) => (
              <li
                key={i}
                className="factory-item embla__slide"
                onMouseEnter={() => setHoveredFactory(factory)}
                onMouseLeave={() => setHoveredFactory(null)}
              >
                <span className="factory-name">{factory}</span>

                {hoveredFactory === factory && (
                  <div className="factory-dropdown">
                    <ul className="sub-list">
                      {getSubsByFactory(factory).map((sub, k) => (
                        <li
                          key={k}
                          className="sub-item"
                          onClick={() => handleSubClick(sub)}
                        >
                          {sub}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* -------- MOBILE (unchanged) -------- */}
      {!isDesktop && (
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
      )}

      <style jsx>{`
        * {
          color: black !important;
        }

        .factory-nav {
          background: #fff;
          padding: 1rem;
          position: relative;
          z-index: 999;
        }

        /* EMBLA */
        .embla {
          overflow: hidden;
          width: 100%;
        }
        .embla__container {
          display: flex;
          gap: 2rem;
        }
        .embla__slide {
          flex: 0 0 auto;
        }

        /* ORIGINAL DROPDOWN DESIGN (as you want) */
        .factory-dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #f9f9f9;
          padding: 1rem;
          border-radius: 6px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          width: 250px;
          z-index: 50;
        }

        .factory-list-desktop {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .factory-item {
          position: relative;
          cursor: pointer;
        }

        .sub-item {
          padding: 0.25rem 0;
          cursor: pointer;
        }

        /* MOBILE */
        .hamburger-container {
          display: none;
        }

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
            list-style: none;
          }

          .factory-list.open {
            display: flex;
          }

          /* Mobile dropdown stays original mobile version */
          .factory-dropdown {
            position: relative;
            width: 100%;
            box-shadow: none;
            padding-left: 0;
          }

          .embla {
            display: none;
          }
        }
          /* FIX DROPDOWN NOT SHOWING IN EMBLA */
.embla {
  overflow: visible !important;       /* allow dropdowns to escape */
}

.embla__container {
  overflow: visible !important;
}

.embla__slide {
  overflow: visible !important;
  position: relative;                 /* required for proper stacking */
  z-index: 10;
}

.factory-dropdown {
  z-index: 9999;                      /* ensure on top */
}

      `}</style>
    </nav>
  );
}
