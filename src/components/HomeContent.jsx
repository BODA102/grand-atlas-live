import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { PropertyContext } from '../context/PropertyContext';

export default function HomeContent() {
  const contextData = useContext(PropertyContext);

  const [masterpieces, setMasterpieces] = useState([]);
  const [landmarks, setLandmarks] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await api.get('/unit');
        const data = res?.data || [];
        if (Array.isArray(data) && data.length > 0) {
          setMasterpieces(data.slice(0, 3));
          setLandmarks(data.slice(0, 3));
        }
      } catch (err) {
        console.error('Error fetching units:', err);
      }
    }
    loadData();
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 font-sans">

      {/* 1. HERO SECTION */}
      <section
        className="relative w-full min-h-125 md:h-145 bg-cover bg-center flex items-center justify-center text-white px-4 sm:px-6 py-20"
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/hero-bg.jpg')` }}
      >
        {/* Social Links Side Bar (Hidden on Mobile) */}
        <div className="absolute left-6 hidden xl:flex flex-col gap-4 text-white">
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">f</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">𝕏</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">in</a>
          <a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs hover:bg-[#8B1E22] hover:border-[#8B1E22] transition-colors">♪</a>
        </div>

        <div className="text-center max-w-3xl px-2">
          <h1 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight tracking-wide">
            Redefining the Horizon<br className="hidden sm:inline" /> of Modern Luxury Living
          </h1>
          <p className="text-xs sm:text-sm text-gray-200 mb-8 max-w-xl mx-auto leading-relaxed">
            We believe a home should be a sanctuary of innovation, and an expression of your personal vision. By combining cutting edge modern data with a keen eye for world-class design, we help you navigate the sea of luxury market to find a space that inspires your best work and deepest rest.
          </p>

          <div className="flex justify-center items-center w-full">
            <Link to="/units">
              <button className="bg-[#8B1E22] text-white px-8 py-3 rounded-full font-medium hover:bg-[#6b171a] transition-all shadow-lg text-xs sm:text-sm tracking-wider uppercase">
                Explore Properties
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BENCHMARKS OF SUCCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center mb-10">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-gray-900 inline-block pb-2 border-b-2 border-[#8B1E22]">
            Benchmarks of Success
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block text-[#8B1E22]">📋</span>
            <h3 className="font-bold text-2xl text-gray-900">{contextData?.properties?.length || 45}</h3>
            <p className="text-xs text-gray-500 mt-1">Properties Managed</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block text-[#8B1E22]">💰</span>
            <h3 className="font-bold text-2xl text-gray-900">70M</h3>
            <p className="text-xs text-gray-500 mt-1">Total Managed Investment (EGP)</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block text-[#8B1E22]">😀</span>
            <h3 className="font-bold text-2xl text-gray-900">500</h3>
            <p className="text-xs text-gray-500 mt-1">Happy Clients</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <span className="text-2xl mb-2 block text-[#8B1E22]">🎯</span>
            <h3 className="font-bold text-2xl text-gray-900">99%</h3>
            <p className="text-xs text-gray-500 mt-1">Client Satisfaction</p>
          </div>
        </div>
      </section>

      {/* 3. ABOUT GRAND ATLAS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-gray-900 inline-block pb-2 border-b-2 border-[#8B1E22]">
            About Grand Atlas
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center">
            <div className="w-full max-w-sm sm:max-w-md h-72 sm:h-96 border-2 border-[#8B1E22] rounded-t-[120px] sm:rounded-t-[140px] rounded-b-2xl overflow-hidden shadow-sm p-2">
              <img src="/about-img.jpg" alt="About Grand Atlas" className="w-full h-full object-cover rounded-t-[110px] sm:rounded-t-[130px] rounded-xl" />
            </div>
          </div>
          <div className="space-y-4 text-xs sm:text-sm text-gray-600 leading-relaxed text-center md:text-left">
            <p>
              We began with a singular, uncompromising vision: to bridge the gap between world-class architecture and the individuals who define our global culture. We recognized that for the discerning client, a home is rarely just a physical structure; it is a curated environment, a private gallery, and the ultimate expression of a life well-lived.
            </p>
            <p>
              Our journey started out in the pursuit of transactions, but in the pursuit of excellence, we set out to dismantle the traditional, high-volume real estate model in favor of a bespoke, ‘private office’ approach—one where quality always supersedes quantity, and where every client is treated as the sole focus of our firm.
            </p>
            <p>
              We don’t just find you a home; we secure your peace of mind through a veil of absolute professional confidentiality.
            </p>
            <div className="pt-2 flex justify-center md:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-[#8B1E22] hover:bg-[#6b171a] text-white text-xs font-medium px-6 py-2.5 rounded-md transition-colors shadow-sm"
              >
                Know More <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. HAND-SELECTED MASTERPIECES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-10">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-gray-900 inline-block pb-2 border-b-2 border-[#8B1E22]">
            Hand-Selected Masterpieces
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(masterpieces.length > 0 ? masterpieces : [1, 2, 3]).map((item, idx) => {
            const imgPath = typeof item === 'object' ? item.image : `/masterpiece-${idx + 1}.jpg`;
            const title = typeof item === 'object' ? item.title : idx === 0 ? 'Palm Hills Office No. 3' : idx === 1 ? 'Hacienda Duplex No. 4' : 'Sawary Family Villa';
            
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
                <div
                  className="h-48 sm:h-52 bg-cover bg-center rounded-lg mb-3"
                  style={{ backgroundImage: `url('${imgPath || `/masterpiece-${idx + 1}.jpg`}')` }}
                ></div>
                <h3 className="font-serif font-bold text-sm text-gray-900 px-1">
                  0{idx + 1}. {title}
                </h3>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. STRATEGIC LOCATIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="text-center mb-8">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-gray-900 inline-block pb-2 border-b-2 border-[#8B1E22]">
            Strategic Locations
          </h2>
        </div>
        <div className="w-full h-64 sm:h-96 md:h-112.5 rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-gray-50 flex items-center justify-center p-2 sm:p-4">
          <img src="/Map.jpg" alt="Strategic Locations Map" className="w-full h-full object-cover rounded-xl shadow-inner" />
        </div>
      </section>

      {/* 6. FUTURE LANDMARKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 mb-12">
        <div className="text-center mb-10">
          <h2 className="font-serif font-bold text-xl md:text-2xl text-gray-900 inline-block pb-2 border-b-2 border-[#8B1E22]">
            Future Landmarks
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {(landmarks.length > 0 ? landmarks : [1, 2, 3]).map((item, idx) => {
            const imgPath = typeof item === 'object' ? item.image : `/unit-img.jpg`;
            const name = typeof item === 'object' ? item.title : idx === 1 ? 'New Giza' : 'Palm Hills';
            
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div
                    className="h-48 sm:h-52 bg-cover bg-center rounded-lg mb-3 relative"
                    style={{ backgroundImage: `url('${imgPath || '/zone-1.jpg'}')` }}
                  >
                    <span className="absolute top-3 right-3 bg-[#8B1E22] text-white text-[10px] px-2.5 py-0.5 rounded-full font-medium">
                      {idx === 1 ? 'New Cairo' : 'Palm Hills'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-1 px-1">
                    <span className="w-2 h-2 rounded-full bg-[#8B1E22]"></span>
                    <h4 className="font-serif font-bold text-xs text-[#8B1E22] uppercase tracking-wider">{name}</h4>
                  </div>
                </div>
                <Link
                  to={`/unit/${typeof item === 'object' ? item.id : idx + 1}`}
                  className="block text-center w-full border border-gray-300 hover:border-[#8B1E22] text-gray-700 hover:text-[#8B1E22] text-xs py-2 rounded-lg font-medium transition-colors mt-4"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}