import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { PropertyContext } from '../context/PropertyContext';

const defaultHeroImg = "/detail-hero.jpg";
const galleryImages = [
  "/detail-1.jpg",
  "/detail-2.jpg",
  "/detail-3.jpg",
  "/detail-4.jpg",
  "/detail-5.jpg"
];

export default function DisplayUnit() {
  const data = useContext(PropertyContext);

  const { id } = useParams();
  const [unit, setUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(defaultHeroImg);

  useEffect(() => {
    async function getUnitDetails() {
      try {
        const response = await api.get(`/unit/${id}`);
        setUnit(response?.data || null);
        if (response?.data?.image) {
          setActiveImg(response.data.image);
        }
      } catch (error) {
        console.error("Error fetching unit details:", error);
      } finally {
        setLoading(false);
      }
    }
    getUnitDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center text-sm text-gray-500 py-24">
        Loading unit details...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* 1. Main Showcase Image */}
        <div className="w-full h-72 sm:h-96 md:h-120 rounded-2xl overflow-hidden mb-4 shadow-sm border border-gray-200">
          <img 
            src={activeImg}
            alt="Unit Showcase"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Gallery Thumbnails */}
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10">
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

        {/* 3. Title, Location & Price Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 mb-8 sm:mb-10 border-b border-gray-200">
          <div>
            <h1 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {unit?.title || "Splendid historic Art Nouveau villa"}
            </h1>
            <p className="text-gray-500 text-xs flex items-center gap-1.5">
              <span className="text-[#8B1E22]">📍</span>
              {unit?.location || 'Minuso, Lake Maggiore, Switzerland — ref. LOC1771'}
            </p>
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-4 md:mt-0 font-serif">
            {unit?.price ? `${unit.price} EGP` : "50,000,000 EGP"}
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
                <span className="font-semibold text-gray-900">{unit?.plot_size || '589 m²'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Living area ca.:</span>
                <span className="font-semibold text-gray-900">{unit?.area || '300 m²'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Bedrooms:</span>
                <span className="font-semibold text-gray-900">{unit?.bedrooms || '3'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Bathrooms:</span>
                <span className="font-semibold text-gray-900">{unit?.bathrooms || '3'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">Living rooms:</span>
                <span className="font-semibold text-gray-900">2</span>
              </li>
              <li className="flex justify-between border-b border-gray-200/60 pb-2.5">
                <span className="text-gray-500">WC:</span>
                <span className="font-semibold text-gray-900">1</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-gray-500">External parking:</span>
                <span className="font-semibold text-gray-900">3, covered</span>
              </li>
            </ul>
          </div>

          {/* Overview & Action Buttons */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-serif font-bold text-lg sm:text-xl text-gray-900">Overview</h3>
            <p className="text-gray-600 leading-relaxed text-xs sm:text-sm">
              {unit?.description || 'Nestled in a residential area of Minusio, this magnificent historic villa is for sale, fully renovated and ready to move in. The spacious living areas, flooded with natural light thanks to perfect sun exposure, create a unique and welcoming atmosphere. A well-maintained, low-maintenance garden provides the ideal setting for enjoying outdoor gatherings. Its proximity to essential services and public transport also makes the villa an ideal choice for families.'}
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