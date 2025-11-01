"use client";
import { TempProps } from "../types";
import { motion } from "framer-motion";

interface CarCardProps {
  temp: TempProps;
}

const CarCard = ({ temp }: CarCardProps) => {
  const { _id, title, price, discount, img, category, stock, type, color, noprice } = temp;

  // --- PRICE LOGIC ---
  let displayPrice = "";
  let displayOldPrice = "";
  let discountPercent: number | null = null;

  if (type === "collection" && color?.length > 0) {
    const allPrices = color.flatMap((c) => c.sizes?.map((s) => s.price) || []);
    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    displayPrice = `$${minPrice.toFixed(2)} - $${maxPrice.toFixed(2)}`;
  } else if (type === "single") {
    const initialPrice = parseFloat(price || "0");
    const discountedPrice = parseFloat(discount || "0");

    if (discountedPrice === 0 || discountedPrice === initialPrice) {
      displayPrice = `$${initialPrice.toFixed(2)}`;
      displayOldPrice = "";
      discountPercent = null;
    } else {
      displayOldPrice = `$${initialPrice.toFixed(2)}`;
      displayPrice = `$${discountedPrice.toFixed(2)}`;
      discountPercent = Math.round(((initialPrice - discountedPrice) / initialPrice) * 100);
    }
  }

  // --- OUT OF STOCK CHECK ---
  const isOutOfStock =
    (type === "single" && parseInt(stock) === 0) ||
    (type === "collection" &&
      color?.every((c) => c.sizes?.every((s) => parseInt(s.qty) === 0)));

  return (
    <a href={`/product?id=${_id}`}>
      <div className="br_grid br_grid-cols-1 supports-subgrid:br_row-span-4 supports-subgrid:br_grid-rows-[subgrid]">
        <div className="Layout br_contents">
          <center>
            <span className="br_contents">
              <div>
                <div className="initial:br_row-span-1 br_col-start-1 br_row-start-1 br_relative">
                  <div className="br_aspect-[1/1] sm:br_aspect-square">
                    <div className="br_w-full br_h-full br_relative br_flex br_items-center br_justify-center">
                      <div className="relative inline-block w-[300px] h-[300px]">
                        <img
                          src={img?.[0]}
                          alt={title}
                          className="w-full h-full object-cover object-center rounded"
                        />

                        {isOutOfStock && (
                          <div className="absolute inset-0 bg-gray-600 bg-opacity-70 text-white flex items-center justify-center text-lg font-bold z-10 rounded">
                            Out of Stock
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* ---- PRODUCT INFO ---- */}
                <div className="text-center flex flex-col items-center justify-center px-3">
                  <h3 style={{ height: "100px" }} className="text-center">
                    <a href={`/product?id=${_id}`} className="text-current no-underline">
                      <h2 className="text-sm font-bold myGray py-1">{title}</h2>

                      {/* --- PRICE DISPLAY --- */}
                      {noprice !== "yes" && (
                        type === "collection" ? (
                          <div className="font-light text-[11px] py-1 text-gray-400 myGray">
                            {displayPrice}
                          </div>
                        ) : (
                          <div className="price-container inline-flex flex-wrap gap-x-2 items-baseline justify-center text-white">
                            {displayOldPrice && (
                              <span className="font-light text-[11px] py-1 line-through text-gray-400">
                                {displayOldPrice}
                              </span>
                            )}
                            <span className="font-light text-[11px] py-1 rounded myRed">
                              {displayPrice}
                              {discountPercent !== null && (
                                <span className="ml-1 text-xs">({discountPercent}% off)</span>
                              )}
                            </span>
                          </div>
                        )
                      )}
                    </a>
                  </h3>
                </div>
              </div>
            </span>
          </center>
        </div>
      </div>
    </a>
  );
};

export default CarCard;
