import React, { useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

const galleryImages = [
  "/detail-1.jpg",
  "/detail-2.jpg",
  "/detail-3.jpg",
  "/detail-4.jpg",
  "/detail-5.jpg"
];

export default function ProjectDetail() {
  const data = useContext(PropertyContext);

  const { id } = useParams();
  const [activeImg, setActiveImg] = useState("/detail-hero.jpg");

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        
        {/* 1. Main Project Title with underline under Family Villa */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="font-serif font-bold text-xl sm:text-2xl md:text-3xl text-gray-900 tracking-wide inline-block leading-tight">
            Sawary <span className="relative pb-1">Family Villa<span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8B1E22]"></span></span> Project {id ? `#${id}` : ''}
          </h1>
        </div>

        {/* 2. Main Hero Showcase Image */}
        <div className="w-full h-72 sm:h-96 md:h-125 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-200">
          <img 
            src={activeImg} 
            alt="Project Showcase" 
            className="w-full h-full object-cover" 
          />
        </div>

        {/* 3. Gallery Thumbnails Grid (5 images) */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 md:gap-4 mb-8 sm:mb-10">
          {galleryImages.map((imgSrc, index) => (
            <div 
              key={index} 
              onClick={() => setActiveImg(imgSrc)}
              className={`h-20 sm:h-24 rounded-xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm ${
                activeImg === imgSrc ? 'border-[#8B1E22] scale-[1.02]' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <img 
                src={imgSrc} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </div>
          ))}
        </div>

        {/* 4. Subtitle, Location & Real Palm Hills Logo Image Badge */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 sm:mb-10 border-b border-gray-200 gap-4">
          <div>
            <h2 className="font-serif text-lg sm:text-2xl md:text-3xl font-bold text-[#8B1E22] mb-1.5 leading-snug">
              Splendid historic Art Nouveau villa
            </h2>
            <p className="text-gray-500 text-xs flex items-center gap-1.5">
              <span className="text-[#8B1E22]">📍</span>
              Minuso, Lake Maggiore, Switzerland — ref. LOC1771
            </p>
          </div>
          
          {/* Palm Hills Real Logo Image Badge */}
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-200 shadow-sm self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="text-right">
              <span className="block font-serif font-bold text-xs text-gray-900 tracking-wider">PALM HILLS</span>
              <span className="block text-[9px] text-gray-400 uppercase tracking-widest">DEVELOPMENTS</span>
            </div>
            <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center p-1 shadow-sm shrink-0">
              <img src="/palm.png" alt="Palm Hills" className="w-full h-full object-contain" />
            </div>
          </div>
        </div>

        {/* 5. Details Section: At a glance & Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          
          {/* At a glance Sidebar */}
          <div className="lg:col-span-5 bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 h-fit shadow-sm">
            <h3 className="font-serif font-bold text-base md:text-lg text-gray-900 mb-4 pb-3 border-b border-gray-200">
              At a glance
            </h3>
            <ul className="space-y-3 text-xs text-gray-700">
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Plot size ca.:</span>
                <span className="font-semibold text-gray-900">589 m²</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Living area ca.:</span>
                <span className="font-semibold text-gray-900">300 m²</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Units:</span>
                <span className="font-semibold text-gray-900">3000</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Man made Lakes:</span>
                <span className="font-semibold text-gray-900">3</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Playground:</span>
                <span className="font-semibold text-gray-900">8</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Public gyms:</span>
                <span className="font-semibold text-gray-900">20</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-gray-500">Schools:</span>
                <span className="font-semibold text-gray-900">50</span>
              </li>
            </ul>
          </div>

          {/* Overview Section */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              Nestled in a residential area of Minusio, this magnificent historic villa is for sale, fully renovated and ready to move in. The spacious living areas, flooded with natural light thanks to perfect sun exposure, create a unique and welcoming atmosphere. A well-maintained, low-maintenance garden provides the ideal setting for enjoying outdoor gatherings. Its proximity to essential services and public transport also makes the villa an ideal choice for families.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}