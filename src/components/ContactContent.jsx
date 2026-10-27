import React, { useState, useContext } from 'react';
import { PropertyContext } from '../context/PropertyContext';
import { Link } from 'react-router-dom';

export default function ContactContent() {
  // استدعاء الـ Context داخل المكون بالطريقة الصحيحة
  const data = useContext(PropertyContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully.');
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      
      {/* 1. Hero Banner Section matching Figma */}
      <div className="relative w-full h-90 md:h-105 bg-gray-900 mb-14 overflow-hidden flex items-center justify-center">
        
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-50"
          style={{ backgroundImage: `url('/contact.png')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70" />

        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 max-w-3xl">
          <h1 className="font-serif font-bold text-3xl md:text-5xl text-white mb-3 tracking-wide">
            Connected Globally. <br /> Available Locally.
          </h1>
          <p className="text-gray-200 text-xs md:text-sm leading-relaxed max-w-xl mx-auto">
            With experts positioned in the world's most influential markets, we are never more than a conversation away. Reach out to our team to experience a new standard of real estate advisory. Total properties in system: {data?.properties?.length || 0}
          </p>
        </div>
      </div>

      {/* 2. Main Content Grid (Contact Info & Message Form) */}
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Information & Working Hours */}
          <div className="lg:col-span-6 space-y-8">
            
            <div>
              <h2 className="font-serif font-bold text-2xl text-gray-900 mb-3">
                Contact Information
              </h2>
              <p className="text-gray-500 text-xs leading-relaxed mb-6">
                Our team is available for private consultations and off-market inquiries. We operate with absolute discretion to ensure your real estate objectives are met with precision.
              </p>

              {/* Contact Details List */}
              <ul className="space-y-3 text-xs text-gray-700">
                <li className="flex items-center gap-2.5">
                  <span className="text-[#8B1E22]">📍</span>
                  <span>Minuso, Lake Maggiore, Switzerland — ref. LOC1771</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#8B1E22]">✉️</span>
                  <span className="font-medium text-gray-900">Grand.Atlas.Support@gmail.com</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#8B1E22]">📞</span>
                  <span>01146897069</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <span className="text-[#8B1E22]">☎️</span>
                  <span>035987124</span>
                </li>
              </ul>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="text-xs font-semibold text-gray-900 mb-3">
                Follow us on social media
              </h3>
              <div className="flex items-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white hover:border-[#8B1E22] transition-colors">f</a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white hover:border-[#8B1E22] transition-colors">𝕏</a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white hover:border-[#8B1E22] transition-colors">in</a>
                <a href="#" className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs text-gray-700 hover:bg-[#8B1E22] hover:text-white hover:border-[#8B1E22] transition-colors">📷</a>
              </div>
            </div>

            {/* Working Hours */}
            <div>
              <h3 className="font-serif font-bold text-base text-gray-900 mb-3">
                Working Hours
              </h3>
              <div className="space-y-2 text-xs text-gray-600 max-w-xs">
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Saturday :</span>
                  <span>9:00AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Sunday :</span>
                  <span>9:00AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Monday :</span>
                  <span>9:00AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Tuesday :</span>
                  <span>9:00AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium text-gray-800">Wednesday :</span>
                  <span>9:00AM - 5:00 PM</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Send Us a Message Form */}
          <div className="lg:col-span-6 bg-gray-50/60 p-8 rounded-2xl border border-gray-200/80 shadow-sm">
            <h3 className="font-serif font-bold text-xl text-gray-900 mb-6">
              Send us a message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 focus:outline-none focus:border-[#8B1E22] transition-colors shadow-sm resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8B1E22] hover:bg-[#72171A] text-white py-3 rounded-xl text-xs font-semibold transition-colors shadow-sm mt-2"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}