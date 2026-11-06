import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { getDescription, getImage, getName, unwrapItem } from '../services/api';

const defaultHeroImg = "/detail-hero.jpg";
export default function DisplayUnit() {
  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(defaultHeroImg);
  const [error, setError] = useState('');

  useEffect(() => {
    async function getUnitDetails(signal) {
      try {
        const response = await api.get(`/unit/${id}`, { signal });
        const result = unwrapItem(response.data);
        setUnit(result);
        const firstImage = getImage(result, '');
        if (firstImage) setActiveImg(firstImage);
      } catch (fetchError) {
        if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load unit details.');
      } finally {
        setLoading(false);
      }
    }
    const controller = new AbortController();
    getUnitDetails(controller.signal);
    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-sm text-gray-500 py-24">
        Loading unit details...
      </div>
    );
  }

  if (error || !unit) {
    return <div className="min-h-[50vh] bg-white flex flex-col items-center justify-center gap-4 text-sm text-gray-600" role="alert">
      <p>{error || 'Property not found.'}</p><Link to="/units" className="text-[#8B1E22] underline">Back to properties</Link>
    </div>;
  }

  const images = Array.isArray(unit.images) ? unit.images.filter(image => typeof image === 'string') : [];
  const name = getName(unit);

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. Main Showcase Image */}
        <div className="w-full h-72 sm:h-96 md:h-120 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-200">
          <img 
            src={activeImg}
            alt={name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Gallery Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
          {images.filter(image => image !== activeImg).map((imgSrc, index) => (
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

        {/* 3. Title, Location & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 sm:mb-10 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {name}
            </h1>
            <p className="text-gray-500 text-xs flex items-center gap-1.5">
              <span className="text-[#8B1E22]">📍</span>
              {[unit.city_en, unit.project?.name_en, unit.project?.name].filter(Boolean).join(' · ') || 'Location not specified'}
            </p>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-4 md:mt-0 font-serif">
            {unit.price != null ? `${Number(unit.price).toLocaleString()} EGP` : "Contact for Price"}
          </div>
        </div>

        {/* 4. Details Grid (At a glance & Overview) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-16">
          
          {/* At a glance Sidebar */}
          <div className="lg:col-span-5 bg-gray-50 p-5 sm:p-6 rounded-2xl border border-gray-200 h-fit">
            <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-4 pb-3 border-b border-gray-200">
              At a glance
            </h3>
            <ul className="space-y-3 text-xs text-gray-700">
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Plot size ca.:</span>
                <span className="font-semibold text-gray-900">{unit.size ? `${unit.size} m²` : '—'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Living area ca.:</span>
                <span className="font-semibold text-gray-900">{unit.size ? `${unit.size} m²` : '—'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Bedrooms:</span>
                <span className="font-semibold text-gray-900">{unit.bedrooms ?? '—'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Bathrooms:</span>
                <span className="font-semibold text-gray-900">{unit.bathrooms ?? '—'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Living rooms:</span>
                <span className="font-semibold text-gray-900">2</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">WC:</span>
                <span className="font-semibold text-gray-900">4</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-gray-500">External parking:</span>
                <span className="font-semibold text-gray-900">6</span>
              </li>
            </ul>
          </div>

          {/* Overview & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              {getDescription(unit) || 'No description is available for this property.'}
            </p>

            {/* Action Buttons (WhatsApp & Call) */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a 
                href="https://whatsapp.com"
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium py-3 rounded-lg text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>💬</span> Contact via WhatsApp
              </a>
              <a
                href="tel:+176355471297"
                className="flex-1 border border-gray-300 hover:border-[#8B1E22] hover:text-[#8B1E22] text-gray-700 text-xs font-medium py-3 rounded-lg text-center transition-colors shadow-sm flex items-center justify-center gap-2"
              >
                <span>📞</span> Call
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
