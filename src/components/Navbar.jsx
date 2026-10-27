import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Navbar() {
  const location = useLocation();
  const data = useContext(PropertyContext);
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full fixed top-4 left-0 z-50 px-4 pointer-events-none">
      <nav className="max-w-262.5 mx-auto backdrop-blur-md border border-gray-200/80 shadow-lg rounded-full py-3 px-6 md:px-8 flex items-center justify-between pointer-events-auto transition-all">
        
        {/* 1. Logo on the left */}
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-11 rounded-xl flex items-center justify-center">
            <img src="/logo.png" alt="Grand Atlas Logo" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-serif font-bold text-[16px] tracking-widest text-gray-900">GRAND ATLAS</span>
            <span className="text-[9px] tracking-widest font-serif text-gray-900 uppercase">REAL ESTATE AGENCY</span>
          </div>
        </Link>

        {/* 2. Navigation Links in the center (Notch style) */}
        <div className="flex items-center gap-6 md:gap-8 text-xs font-medium text-gray-700">
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

        {/* 3. Register Button on the right */}
        <div>
          <Link
            to="/register"
            className="bg-[#8B1E22] hover:bg-[#72171A] text-white text-[11px] font-semibold px-5 py-2 rounded-full shadow-sm transition-colors"
          >
            Register
          </Link>
        </div>

      </nav>
    </div>
  );
}