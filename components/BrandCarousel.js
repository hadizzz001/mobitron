'use client';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import CarCard1 from './CarCard1';

const YourComponent = () => {
  const [allTemp2, setAllTemps2] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("api/factory");
        const data = await response.json();
        setAllTemps2(data);
      } catch (error) {
        console.error("Error fetching the description:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <span className="ProvidersIfSelectedProductMatchesFilter">
      <content-block slug="product-page-wssb">
        <style dangerouslySetInnerHTML={{
          __html: `
            .ProductTile-SliderContainer-Title {
              height:auto;
              text-align:left;
              padding-bottom:10px;
              font-size:1.3em;
              font-weight:bold;
              font-family: 'Manrope';
            }
            .swiper-slide {
              display: flex;
              justify-content: center;
              align-items: center;
            }
            /* Make images responsive inside CarCard1 */
            .car-card-wrapper {
              display: flex;
              justify-content: center;
              align-items: center;
              width: 60px;
              height: 60px;
            }
            .car-card-img {
              width: 100%;
              height: auto;
              object-fit: contain;
            }

            /* Bigger images on larger screens */
            @media (min-width: 768px) {
              .car-card-wrapper {
                width: 100px;
                height: 100px;
              }
            }
            @media (min-width: 1024px) {
              .car-card-wrapper {
                width: 150px;
                height: 150px;
              }
            }
          `
        }} />
        <div className="ProductTile-SliderContainer ProductTile-SliderContainer--YMAL px-3" data-product-list-category="ymal-slider">
          <div className="ProductTile-SliderContainer-Title br_text-3xl-serif br_text-white">
            Our brands
          </div>

          {allTemp2 && allTemp2.length > 0 ? (
            <section style={{ maxWidth: "100%" }}>
              <Swiper
                spaceBetween={10}
                loop
                modules={[Autoplay]}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                  reverseDirection: false,
                }}
                breakpoints={{
                  150: { slidesPerView: 3 },
                  480: { slidesPerView: 4 },
                  768: { slidesPerView: 5 },
                  1024: { slidesPerView: 6 },
                }}
              >
                {allTemp2.map((temp) => (
                  <SwiperSlide key={temp._id}>
                    <div className="car-card-wrapper">
                      <CarCard1 temp={temp} />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </section>
          ) : (
            <div className='home___error-container'>
              <h2 className='text-black text-xl font-normal'>Loading...</h2>
            </div>
          )}
        </div>
      </content-block>
    </span>
  );
};

export default YourComponent;
