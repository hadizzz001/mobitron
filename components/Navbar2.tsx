'use client';

import { useState } from 'react';
import Cart from "../components/Cart";
import { useBooleanValue } from '../app/context/CartBoolContext';
import { useCart } from '../app/context/CartContext';
import {
  Menu,
  X,
  Search,
  ShoppingCart,
  MapPin,
} from 'lucide-react';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const { isBooleanValue, setBooleanValue } = useBooleanValue();

  const handleClickc = () => {
    const cartb2 = document.getElementById("cartid2");
    setBooleanValue(!isBooleanValue);
    if (cartb2) {
      if (isBooleanValue) {
        cartb2.className += " MiniCart_Cart-visible";
      } else {
        cartb2.classList.remove("MiniCart_Cart-visible");
      }
    }
  };

  const handleOpenMaps = () => {
    window.open("https://www.google.com/maps", "_blank");
  };

  return (
    <>
      <Cart />

      <header className="w-full sticky top-0 z-40 bg-[#f1ede7] shadow-sm">
        {/* Desktop layout */}
        <div className="hidden md:flex items-center justify-between px-4 py-4 text-black gap-3">
          {/* Logo */}
          <a href="/" className="flex items-center">
            <img
              src="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
              alt="Logo"
              className="h-24 w-auto object-contain"
            />
          </a>

          {/* Menu Button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="flex items-center space-x-2"
          >
            <Menu className="w-6 h-6 stroke-[1.5] text-[#555]" />
            <span className="text-[#555] text-md font-medium">Menu</span>
          </button>

          {/* Search Bar */}
          <form
            action="/search"
            method="get"
            className="flex items-center flex-1 mx-4 bg-white border border-gray-400 rounded-full px-4 py-3 h-12"
          >
            <Search className="w-5 h-5 mr-3 text-[#555]" />
            <input
              type="text"
              name="q"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none text-gray-700 text-sm"
            />
          </form>

          {/* Location & Cart */}
          <div className="flex items-center space-x-3">
            <button
              onClick={handleOpenMaps}
              aria-label="Open Google Maps"
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-200 transition"
            >
              <MapPin className="w-7 h-7 text-[#555]" />
            </button>

            <button onClick={handleClickc} className="relative ml-2">
              <ShoppingCart className="w-7 h-7 stroke-[1.5] text-[#555]" />
              {cart && cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-3 h-3"></span>
              )}
            </button>
          </div>
        </div>

        {/* ✅ Mobile layout */}
        <div className="flex md:hidden flex-col px-3 py-2 bg-[#f1ede7]" id='mymoblayoutformob'>
          {/* Top row: logo + icons */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="flex items-center space-x-1"
            >
              <Menu className="w-6 h-6 stroke-[1.5] text-[#555]" />
              <span className="text-[#555] text-sm font-medium">Menu</span>
            </button>

            <a href="/" className="flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/dqjtmau0a/image/upload/v1761145131/517028198_617604041375918_3676791841633107613_n-removebg-preview_ffps8m.png"
                alt="Logo"
                className="h-16 w-auto object-contain"
              />
            </a>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleOpenMaps}
                aria-label="Open Google Maps"
                className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 transition"
              >
                <MapPin className="w-6 h-6 text-[#555]" />
              </button>

              <button onClick={handleClickc} className="relative">
                <ShoppingCart className="w-6 h-6 stroke-[1.5] text-[#555]" />
                {cart && cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2.5 h-2.5"></span>
                )}
              </button>
            </div>
          </div>

          {/* Bottom row: search bar */}
          <form
            action="/search"
            method="get"
            className="flex items-center bg-white border border-gray-400 rounded-full px-3 py-2 h-10 mt-3"
          >
            <Search className="w-5 h-5 mr-2 text-[#555]" />
            <input
              type="text"
              name="q"
              placeholder="Search..."
              className="flex-grow bg-transparent outline-none text-gray-700 text-sm"
            />
          </form>
        </div>

        {/* Menu Overlay */}
        {menuOpen && (
          <div className="fixed inset-0 bg-white text-black flex flex-col items-center justify-center z-50">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-4 right-4"
              aria-label="Close menu"
            >
              <X className="w-8 h-8 stroke-[1.5] text-[#555]" />
            </button>

            <nav className="flex flex-col items-center gap-6 mt-12 text-3xl font-bold text-[#555]">
              <a href="/" onClick={() => setMenuOpen(false)}>Home</a>
              <a href="/shop" onClick={() => setMenuOpen(false)}>Shop</a>
              <a href="/contact" onClick={() => setMenuOpen(false)}>Contact Us</a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
