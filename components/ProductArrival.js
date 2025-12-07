'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductGrid() {
  const [productsData, setProductsData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();

        // Separate products that have sort from those that don’t
        const withSort = data.filter(p => p.sort !== undefined && p.sort !== null);
        const withoutSort = data.filter(p => p.sort === undefined || p.sort === null);

        // Sort only those with sort
        const sortedWithSort = withSort.sort((a, b) => a.sort - b.sort);

        // Combine: sorted ones first, others after
        const finalData = [...sortedWithSort, ...withoutSort];

        // Map products with sale and noprice conditions
        const mappedItems = finalData
          .filter(product => product.sale === 'yes') // ✅ Only products on sale
          .map(product => {
            let priceDisplay = '';
            let discountDisplay = '';

            if (product.noprice === 'yes') {
              priceDisplay = '';
              discountDisplay = '';
            } else if (product.type === 'collection' && product.color) {
              const allPrices = product.color.flatMap(c =>
                c.sizes.map(s => parseFloat(s.price))
              );
              const minPrice = Math.min(...allPrices);
              const maxPrice = Math.max(...allPrices);
              priceDisplay =
                minPrice === maxPrice
                  ? `${minPrice.toFixed(2)}`
                  : `${minPrice.toFixed(2)} - ${maxPrice.toFixed(2)}`;
            } else {
              const price = parseFloat(product.price);
              const discount = parseFloat(product.discount || '0');

              if (discount > 0 && discount < price) {
                priceDisplay = (price - discount).toFixed(2);
                discountDisplay = price.toFixed(2);
              } else {
                priceDisplay = price.toFixed(2);
                discountDisplay = '';
              }
            }

            return {
              id: product._id,
              title: product.title,
              category: product.sub,
              img: product.img[0],
              price: priceDisplay,
              discount: discountDisplay,
              type: product.type,
              tax: product.tax,  
            };
          });

        setProductsData([
          {
            rowTitle: 'X-MAS DEALS',
            items: mappedItems.slice(0, 4), // Only show first 4 products
          },
        ]);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div style={{ padding: '30px' }}>
      {productsData.map(section => (
        <div key={section.rowTitle}>
          <p
            style={{
              fontSize: '28px',
              fontWeight: 'bold',
              marginBottom: '20px',
              color: '#222',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            {section.rowTitle}
          </p>

          <div className="product-grid">
            {section.items.map((product, index) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  textAlign: 'left',
                  position: 'relative',
                  cursor: 'pointer',
                }}
                onClick={() => router.push(`/product?id=${product.id}`)}
              >
{product.type === 'single' && product.discount && (
  <div
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      width: '60px',
      height: '60px',
      backgroundColor: 'red',
      color: 'white',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '14px',
      zIndex: 1,
    }}
  >
    SALE
  </div>
)}


                <div className="img-box">
                  <img
                    src={product.img}
                    alt={product.title}
                    style={{
                      maxHeight: '100%',
                      width: 'auto',
                      objectFit: 'contain',
                    }}
                  />
                </div>

                <div className="product-info">
                  <p className="category">{product.category}</p>
                  <p className="title">{product.title}</p>

{product.price && (
  <div className="price-row">
    <p className="price">
      <span className="currency">$</span>
      {product.price}
    </p>

    {product.discount && (
      <p className="discount">${product.discount}</p>
    )}

    {/* ✅ VAT LABEL */}
    {product.tax === "yes" && (
      <span style={{ fontSize: "12px", color: "#4caf50", marginLeft: "6px" }}>
        incl VAT
      </span>
    )}
    {product.tax === "no" && (
      <span style={{ fontSize: "12px", color: "red", marginLeft: "6px" }}>
        excl VAT
      </span>
    )}
  </div>
)}

                </div>
              </div>
            ))}
          </div>

          <style jsx>{`
            .product-grid {
              display: grid;
              grid-template-columns: repeat(4, 1fr);
              gap: 30px;
            }

            .img-box {
              width: 100%;
              height: 300px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
            }

            .product-info {
              margin-top: 15px;
            }

            .category {
              font-size: 13px;
              color: #888;
              margin-bottom: 5px;
              text-transform: capitalize;
            }

            .title {
              font-size: 20px;
              font-weight: 700;
              color: #222;
              margin-bottom: 10px;
              line-height: 1.3;
            }

            .price-row {
              display: flex;
              align-items: center;
              gap: 8px;
            }

            .price {
              font-size: 34px;
              font-weight: bold;
              color: #000;
              margin: 0;
              display: flex;
              align-items: flex-start;
            }

            .currency {
              font-size: 14px;
              margin-right: 3px;
            }

            .discount {
              font-size: 13px;
              color: #999;
              text-decoration: line-through;
              margin: 0;
            }

            @media (max-width: 768px) {
              .product-grid {
                display: flex;
                overflow-x: auto;
                gap: 12px;
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
              }

              .product-card {
                flex: 0 0 calc(50% - 6px);
                scroll-snap-align: start;
              }

              .img-box {
                height: 180px;
              }

              .product-info {
                margin-top: 6px;
              }

              .title {
                font-size: 16px;
                margin-bottom: 6px;
              }

              .price {
                font-size: 26px;
              }

              .currency {
                font-size: 12px;
              }
            }
          `}</style>
        </div>
      ))}
    </div>
  );
}
