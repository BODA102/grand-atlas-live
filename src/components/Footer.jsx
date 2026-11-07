import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContextValue';

export default function Footer() {
  const data = useContext(PropertyContext);

  return (
    <footer className="w-full bg-white border-t border-gray-100 text-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs text-center sm:text-left">
        
        {/* Brand Info */}
        <div className="space-y-3 flex flex-col items-center sm:items-start">
          <img src="/logo.png" alt="Grand Atlas Logo" className="h-10 object-contain" />
          <p className="text-gray-500 font-medium">+1 (7635) 547-12-97</p>
          <p className="text-gray-500 font-medium">support@lift.agency</p>
          <p className="text-gray-400">Total System Units: {data?.propertiesLoading ? '…' : data?.properties?.length ?? 0}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm tracking-wider">QUICK LINKS</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-[#8B1E22] transition-colors">Home</Link></li>
            <li><Link to="/units" className="hover:text-[#8B1E22] transition-colors">Inventories</Link></li>
            <li><Link to="/zones" className="hover:text-[#8B1E22] transition-colors">Zones</Link></li>
            <li><Link to="/developers" className="hover:text-[#8B1E22] transition-colors">Developers</Link></li>
            <li><Link to="/contact" className="hover:text-[#8B1E22] transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        {/* About Links */}
        <div>
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm tracking-wider">ABOUT</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-[#8B1E22] transition-colors">Grand Atlas</Link></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Legal</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Help</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div className="flex flex-col items-center sm:items-start">
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm tracking-wider">GET IN TOUCH</h4>
          <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-xs sm:max-w-none flex rounded-lg border border-gray-300 overflow-hidden focus-within:border-[#8B1E22] transition-colors">
            <input
              type="email"
              placeholder="Get product updates"
              className="w-full px-3 py-2 text-xs outline-none bg-transparent"
            />
            <button
              type="submit"
              className="bg-[#8B1E22] text-white px-4 py-2 text-xs font-medium hover:bg-[#6b171a] transition-colors shrink-0"
            >
              →
            </button>
          </form>
          <div className="flex justify-center sm:justify-start gap-4 text-gray-400 mt-4 text-sm">
            <a href="#" className="hover:text-[#8B1E22] transition-colors font-bold">in</a>
            <a href="#" className="hover:text-[#8B1E22] transition-colors font-bold">f</a>
            <a href="#" className="hover:text-[#8B1E22] transition-colors font-bold">t</a>
            <a href="#" className="hover:text-[#8B1E22] transition-colors font-bold">w</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-100 text-center text-gray-400 text-[11px]">
        © 2026 Grand Atlas. All rights reserved
      </div>
    </footer>
  );
}
