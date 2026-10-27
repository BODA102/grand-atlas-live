import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Developers() {
  const data = useContext(PropertyContext);

  const developersList = [
    {
      id: 1,
      name: "PALM HILLS",
      subName: "DEVELOPMENTS",
      location: "New Cairo",
      image: "/unit-img.jpg",
      logoImg: "/palm.png"
    },
    {
      id: 2,
      name: "Hayah City",
      subName: "Hayah Development",
      location: "New Cairo",
      image: "/City 2.jpg",
      logoImg: "/Hayah.png"
    },
    {
      id: 3,
      name: "PALM HILLS",
      subName: "DEVELOPMENTS",
      location: "New Cairo",
      image: "/unit-img.jpg",
      logoImg: "/palm.png"
    },
    {
      id: 4,
      name: "PALM HILLS",
      subName: "DEVELOPMENTS",
      location: "New Cairo",
      image: "/City 2.jpg",
      logoImg: "/palm.png"
    },
    {
      id: 5,
      name: "Hayah City",
      subName: "Hayah Development",
      location: "New Cairo",
      image: "/unit-img.jpg",
      logoImg: "/Hayah.png"
    },
    {
      id: 6,
      name: "PALM HILLS",
      subName: "DEVELOPMENTS",
      location: "New Cairo",
      image: "/City 2.jpg",
      logoImg: "/palm.png"
    }
  ];

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      
      {/* 1. Hero Banner Section matching Figma */}
      <div className="relative w-full min-h-105 md:h-105 bg-gray-900 mb-10 sm:mb-12 overflow-hidden flex items-center justify-center py-16">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-55"
          style={{ backgroundImage: `url('/developer-1.jpg')` }}
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />

        {/* Social Icons on the left (Hidden on mobile) */}
        <div className="absolute left-6 md:left-12 top-1/2 transform -translate-y-1/2 hidden xl:flex flex-col gap-4 text-white z-10">
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">f</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">𝕏</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">in</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">♪</a>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl">
          <h1 className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-white mb-4 tracking-wide leading-tight">
            Defining the Future <br className="hidden sm:inline" /> Skyline.
          </h1>
          <p className="text-gray-200 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            Great developments require more than just capital; they require a narrative. We provide the elite marketing and specialized brokerage services needed to position your landmark projects in front of the world's most discerning buyers.
          </p>
        </div>
      </div>

      {/* 2. Developers Grid Cards Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {developersList.map((dev, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Card Image with Location Badge */}
                <div className="relative h-48 sm:h-52 bg-cover bg-center" style={{ backgroundImage: `url('${dev.image}')` }}>
                  <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] px-2.5 py-1 rounded-md font-medium">
                    {dev.location}
                  </span>
                </div>

                {/* Developer Info Header inside card */}
                <div className="p-4 sm:p-5 flex items-center justify-between border-b border-gray-100">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-gray-900 tracking-wider">
                      {dev.name}
                    </h3>
                    <span className="text-[10px] text-gray-400 uppercase tracking-widest block mt-0.5">
                      {dev.subName}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-center overflow-hidden p-1 shadow-sm shrink-0">
                    <img src={dev.logoImg} alt={dev.name} className="w-full h-full object-contain" />
                  </div>
                </div>
              </div>

              {/* View Projects Button */}
              <div className="p-4 sm:p-5 pt-0 mt-4">
                <Link
                  to={`/developer/${dev.id}`}
                  className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  View Projects
                </Link>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}