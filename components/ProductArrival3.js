'use client';

export default function ProductGrid() {
  const productsData = [
    {
      rowTitle: 'New Arrivals',
      items: [
        {
          id: 1,
          title: 'Apple iPhone 15 Pro 256GB – Natural Titanium Edition',
          category: 'Smartphone',
          img: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761246662/Apple-iPhone-15-Pro-lineup-natural-titanium_instagram-841x1024-removebg-preview_jbfabj.png',
          price: '999',
          discount: '1099',
        },
        {
          id: 2,
          title: 'Samsung Galaxy S24 Ultra 5G 256GB – Titanium Gray',
          category: 'Android',
          img: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761246662/1200Wx1200H-SM-S721BZKCMEA-SG-removebg-preview_nan0mi.png',
          price: '899',
          discount: '999',
        },
        {
          id: 3,
          title: 'Google Pixel 8 Pro 128GB Obsidian – AI Photography',
          category: 'Google',
          img: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761246662/1200Wx1200H-SM-S721BZKCMEA-SG-removebg-preview_nan0mi.png',
          price: '799',
          discount: '899',
        },
        {
          id: 4,
          title: 'OnePlus 12 256GB – Glacial Green AMOLED Display',
          category: 'Android',
          img: 'https://res.cloudinary.com/dqjtmau0a/image/upload/v1761246662/Apple-iPhone-15-Pro-lineup-natural-titanium_instagram-841x1024-removebg-preview_jbfabj.png',
          price: '749',
          discount: '899',
        },
      ],
    },
  ];

  return (
    <div style={{ padding: '30px' }}>
      {productsData.map((section) => (
        <div key={section.rowTitle} style={{ marginBottom: '60px' }}>
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
            {section.items.map((product) => (
              <div
                key={product.id}
                className="product-card"
                style={{
                  textAlign: 'left',
                  position: 'relative',
                }}
              >
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

                  <div className="price-row">
                    <p className="price">
                      <span className="currency">$</span>
                      {product.price}
                    </p>
                    <p className="discount">${product.discount}</p>
                  </div>
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

            /* MOBILE FIXES */
            @media (max-width: 768px) {
              .product-grid {
                display: flex;
                overflow-x: auto;
                gap: 12px; /* smaller gap */
                scroll-snap-type: x mandatory;
                -webkit-overflow-scrolling: touch;
              }

              .product-card {
                flex: 0 0 calc(50% - 6px);
                scroll-snap-align: start;
              }

              .img-box {
                height: 180px; /* smaller image height */
              }

              .product-info {
                margin-top: 6px; /* reduce space between image & text */
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
