import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Footer() {

  const data = useContext(PropertyContext);

  return (
    <footer className="w-full bg-white border-t border-gray-100 text-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-xs">
        
        {/* Brand Info */}
        <div className="space-y-3">
          <img src="/logo.png" alt="Grand Atlas Logo" className="h-10 object-contain" />
          <p className="text-gray-500 font-medium">+1 (7635) 547-12-97</p>
          <p className="text-gray-500 font-medium">support@lift.agency</p>
          <p className="text-gray-400">Total System Units: {data?.properties?.length || 0}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm">QUICK LINKS</h4>
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
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm">ABOUT</h4>
          <ul className="space-y-2 text-gray-600">
            <li><Link to="/" className="hover:text-[#8B1E22] transition-colors">Grand Atlas</Link></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Legal</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Help</a></li>
            <li><a href="#" className="hover:text-[#8B1E22] transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 className="font-serif font-bold text-gray-900 mb-3 text-sm">GET IN TOUCH</h4>
          <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-1">
            <input
              type="email"
              placeholder="Get product updates"
              className="w-full border border-gray-300 rounded-l-md px-3 py-2 text-xs outline-none focus:border-[#8B1E22]"
            />
            <button
              type="submit"
              className="bg-[#8B1E22] text-white px-4 py-2 rounded-r-md text-xs font-medium hover:bg-[#6b171a] transition-colors"
            >
              →
            </button>
          </form>
          <div className="flex gap-3 text-gray-400 mt-4 text-xs">
            <a href="#" className="hover:text-[#8B1E22]">in</a>
            <a href="#" className="hover:text-[#8B1E22]">f</a>
            <a href="#" className="hover:text-[#8B1E22]">t</a>
            <a href="#" className="hover:text-[#8B1E22]">w</a>
          </div>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-6 mt-8 pt-6 border-t border-gray-100 text-center text-gray-400 text-[11px]">
        © 2026 Grand Atlas. All rights reserved
      </div>
    </footer>
  );
}