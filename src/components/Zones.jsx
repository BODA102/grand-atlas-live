import React from 'react';
import { Link } from 'react-router-dom';

const zonesHeroBg = "/zone-1.jpg";

// قائمة الـ 8 مناطق الثابتة والمضمونة 100% لتظهر فوراً
const zonesList = [
  { id: 1, name: "Historic Cairo", image: "/zone-cairo.jpg", properties_count: "12 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 2, name: "Alexandria Coast", image: "/zone-alex.jpg", properties_count: "9 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 3, name: "Giza Pyramids View", image: "/zone-giza.jpg", properties_count: "15 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 4, name: "North Coast Resort", image: "/zone-coast.jpg", properties_count: "8 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 5, name: "New Capital City", image: "/zone-cairo.jpg", properties_count: "20 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 6, name: "Alexandria Downtown", image: "/zone-alex.jpg", properties_count: "11 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 7, name: "Smart Village Giza", image: "/zone-giza.jpg", properties_count: "6 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." },
  { id: 8, name: "Red Sea Marina", image: "/zone-coast.jpg", properties_count: "14 Properties", description: "Explore elite properties situated in this prime location featuring top-tier infrastructure and modern facilities." }
];

export default function Zones() {
  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      
      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-112.5 md:h-145 bg-cover bg-center flex items-center justify-center text-white px-4 sm:px-6 py-20"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url('${zonesHeroBg}')` }}
      >
        <div className="absolute left-6 hidden xl:flex flex-col gap-4 text-white">
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">f</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">𝕏</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">in</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">♪</a>
        </div>

        <div className="text-center max-w-2xl px-2">
          <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-wide leading-tight">
            Destinations Defined by<br className="hidden sm:inline" /> Distinction
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 max-w-lg mx-auto leading-relaxed">
            From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to the neighborhoods that mirror your ambition and your aesthetic.
          </p>
        </div>
      </section>

      {/* 2. ZONES GRID (8 Cards layout matching Figma) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {zonesList.map((zoneObj, index) => (
            <div
              key={zoneObj.id || index}
              className="bg-white rounded-xl overflow-hidden border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Zone Image */}
                <div
                  className="h-44 bg-cover bg-center rounded-lg mb-3 relative"
                  style={{ backgroundImage: `url('${zoneObj.image}')` }}
                >
                  <span className="absolute top-2.5 right-2.5 bg-[#8B1E22] text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium shadow-sm">
                    {zoneObj.properties_count}
                  </span>
                </div>

                {/* Zone Title */}
                <h3 className="font-serif font-bold text-gray-900 text-sm mb-1">
                  {zoneObj.name}
                </h3>

                {/* Zone Description */}
                <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-2 mb-4">
                  {zoneObj.description}
                </p>
              </div>

              {/* View Properties Button */}
              <div>
                <Link
                  to={`/units?zone=${zoneObj.id}`}
                  className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2 rounded-lg text-xs font-medium transition-colors shadow-sm"
                >
                  View Properties
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}