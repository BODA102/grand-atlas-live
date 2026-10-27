import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Navbar() {
  const location = useLocation();
  const data = useContext(PropertyContext);
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (path) => location.pathname === path;

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="w-full fixed top-4 left-0 z-50 px-4 pointer-events-none">
      <nav className="max-w-7xl mx-auto backdrop-blur-md bg-white/80 border border-gray-200/80 shadow-lg rounded-full py-3 px-6 md:px-8 flex items-center justify-between pointer-events-auto transition-all">
        
        {/* 1. Logo on the left */}
        <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
          <div className="w-8 h-11 rounded-xl flex items-center justify-center">
            <img src="/logo.png" alt="Grand Atlas Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-serif font-bold text-[16px] tracking-widest text-gray-900">GRAND ATLAS</span>
            <span className="text-[9px] tracking-widest font-serif text-gray-900 uppercase">REAL ESTATE AGENCY</span>
          </div>
        </Link>

        {/* 2. Navigation Links in the center (Desktop) */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-medium text-gray-700">
          <Link
            to="/"
            className={`relative pb-1 hover:text-[#8B1E22] transition-colors ${isActive('/') ? 'text-[#8B1E22] font-semibold' : ''}`}
          >
            Home
            {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1E22]"></span>}
          </Link>

          <Link
            to="/units"
            className={`relative pb-1 hover:text-[#8B1E22] transition-colors ${isActive('/units') ? 'text-[#8B1E22] font-semibold' : ''}`}
          >
            Units
            {isActive('/units') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1E22]"></span>}
          </Link>

          <Link
            to="/zones"
            className={`relative pb-1 hover:text-[#8B1E22] transition-colors ${isActive('/zones') ? 'text-[#8B1E22] font-semibold' : ''}`}
          >
            Zones
            {isActive('/zones') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1E22]"></span>}
          </Link>

          <Link
            to="/developers"
            className={`relative pb-1 hover:text-[#8B1E22] transition-colors ${isActive('/developers') ? 'text-[#8B1E22] font-semibold' : ''}`}
          >
            Developers
            {isActive('/developers') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1E22]"></span>}
          </Link>

          <Link
            to="/contact"
            className={`relative pb-1 hover:text-[#8B1E22] transition-colors ${isActive('/contact') ? 'text-[#8B1E22] font-semibold' : ''}`}
          >
            Contact Us
            {isActive('/contact') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-[#8B1E22]"></span>}
          </Link>
        </div>

        {/* 3. Register Button & Mobile Hamburger Button */}
        <div className="flex items-center gap-4">
          <Link
            to="/register"
            onClick={closeMenu}
            className="bg-[#8B1E22] hover:bg-[#72171A] text-white text-[11px] font-semibold px-4 md:px-5 py-2 rounded-full shadow-sm transition-colors"
          >
            Register
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 focus:outline-none p-1"
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </nav>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-4 right-4 bg-white/95 backdrop-blur-md border border-gray-200 shadow-2xl rounded-2xl p-6 flex flex-col gap-4 text-sm font-medium text-gray-800 pointer-events-auto transition-all">
          <Link
            to="/"
            onClick={closeMenu}
            className={`py-2 border-b border-gray-100 ${isActive('/') ? 'text-[#8B1E22] font-bold' : ''}`}
          >
            Home
          </Link>
          <Link
            to="/units"
            onClick={closeMenu}
            className={`py-2 border-b border-gray-100 ${isActive('/units') ? 'text-[#8B1E22] font-bold' : ''}`}
          >
            Units
          </Link>
          <Link
            to="/zones"
            onClick={closeMenu}
            className={`py-2 border-b border-gray-100 ${isActive('/zones') ? 'text-[#8B1E22] font-bold' : ''}`}
          >
            Zones
          </Link>
          <Link
            to="/developers"
            onClick={closeMenu}
            className={`py-2 border-b border-gray-100 ${isActive('/developers') ? 'text-[#8B1E22] font-bold' : ''}`}
          >
            Developers
          </Link>
          <Link
            to="/contact"
            onClick={closeMenu}
            className={`py-2 ${isActive('/contact') ? 'text-[#8B1E22] font-bold' : ''}`}
          >
            Contact Us
          </Link>
        </div>
      )}
    </div>
  );
}