import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api from '../services/api';

// قائمة وحدات افتراضية غنية وكاملة (Mock Data)
const fallbackUnits = [
  { id: 1, title: 'Palm Hills Office No. 3', price: '5,000,000 EGP', bedrooms: '3 Bedrooms', bathrooms: '2 Bathrooms', area: '180m²', image: '/unit-img.jpg', status: 'Available', zone: '1', developer: 'Palm Hills' },
  { id: 2, title: 'Hacienda Duplex No. 4', price: '7,500,000 EGP', bedrooms: '4 Bedrooms', bathrooms: '3 Bathrooms', area: '220m²', image: '/unit-img.jpg', status: 'Available', zone: '2', developer: 'Hayah City' },
  { id: 3, title: 'Sawary Family Villa', price: '12,000,000 EGP', bedrooms: '5 Bedrooms', bathrooms: '4 Bathrooms', area: '350m²', image: '/unit-img.jpg', status: 'Available', zone: '3', developer: 'Palm Hills' },
  { id: 4, title: 'New Cairo Luxury Apartment', price: '4,200,000 EGP', bedrooms: '2 Bedrooms', bathrooms: '2 Bathrooms', area: '140m²', image: '/unit-img.jpg', status: 'Available', zone: '4', developer: 'Hayah City' },
  { id: 5, title: 'Alexandria Sea View Suite', price: '9,000,000 EGP', bedrooms: '3 Bedrooms', bathrooms: '3 Bathrooms', area: '200m²', image: '/unit-img.jpg', status: 'Available', zone: '2', developer: 'Palm Hills' },
  { id: 6, title: 'Giza Hills Townhouse', price: '6,800,000 EGP', bedrooms: '4 Bedrooms', bathrooms: '3 Bathrooms', area: '260m²', image: '/unit-img.jpg', status: 'Available', zone: '3', developer: 'Hayah City' }
];

export default function Units() {
  const [units, setUnits] = useState(fallbackUnits);
  const [filteredUnits, setFilteredUnits] = useState(fallbackUnits);
  const [loading, setLoading] = useState(false);

  // حقول البحث وفلاتر الفلترة
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBedroom, setSelectedBedroom] = useState('');

  const location = useLocation();

  useEffect(() => {
    async function fetchUnits() {
      setLoading(true);
      try {
        const response = await api.get('/unit');
        if (response?.data && response.data.length > 0) {
          setUnits(response.data);
          setFilteredUnits(response.data);
        } else {
          setUnits(fallbackUnits);
          setFilteredUnits(fallbackUnits);
        }
      } catch (error) {
        console.error("Error fetching units, using fallback:", error);
        setUnits(fallbackUnits);
        setFilteredUnits(fallbackUnits);
      } finally {
        setLoading(false);
      }
    }
    fetchUnits();
  }, []);

  // دالة التعامل مع البحث والفلترة الفعلية
  const handleSearch = (e) => {
    e.preventDefault();
    let result = units;

    if (searchTerm.trim() !== '') {
      result = result.filter(unit => 
        unit.title?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedBedroom !== '') {
      result = result.filter(unit => 
        unit.bedrooms?.toString().includes(selectedBedroom)
      );
    }

    setFilteredUnits(result);
  };

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      
      {/* Hero Banner Section */}
      <div className="relative w-full h-80 bg-gray-900 mb-10 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url('/unit-img.jpg')` }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 max-w-2xl text-white">
          <h1 className="font-serif font-bold text-3xl md:text-4xl mb-3">Explore Our Residences</h1>
          <p className="text-xs md:text-sm text-gray-200">
            Experience a collection of residences designed for personal sanctuary. Each architecture expands city views with matured textures and spaces.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Search & Filter Bar Form */}
        <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl shadow-md border border-gray-200 mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-center">
          
          <input
            type="text"
            placeholder="Search Property..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22]"
          />

          <select
            value={selectedBedroom}
            onChange={(e) => setSelectedBedroom(e.target.value)}
            className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22]"
          >
            <option value="">Bedrooms</option>
            <option value="2">2 Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5 Bedrooms</option>
          </select>

          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22]">
            <option value="">Developer</option>
            <option value="Palm Hills">Palm Hills</option>
            <option value="Hayah City">Hayah City</option>
          </select>

          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22]">
            <option value="">Zone</option>
            <option value="1">Historic Cairo</option>
            <option value="2">Alexandria Coast</option>
            <option value="3">Giza Pyramids</option>
          </select>

          <select className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22]">
            <option value="">Status</option>
            <option value="Available">Available</option>
          </select>

          <button
            type="submit"
            className="w-full bg-[#8B1E22] hover:bg-[#72181b] text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
          >
            Search
          </button>
        </form>

        {/* Units Grid Display */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-sm">Loading units...</div>
        ) : filteredUnits.length === 0 ? (
          <div className="text-center py-20 text-gray-500 text-sm">No properties found matching your search.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <Link to={`/unit/${unit.id}`}>
                    <div
                      className="h-56 bg-cover bg-center cursor-pointer relative"
                      style={{ backgroundImage: `url('${unit.image || '/unit-img.jpg'}')` }}
                    >
                      <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm">
                        {unit.status || 'Available'}
                      </span>
                    </div>
                  </Link>

                  <div className="p-5">
                    <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 pb-3 border-b border-gray-100">
                      <span>🛏️ {unit.bedrooms}</span>
                      <span>🛁 {unit.bathrooms}</span>
                      <span>📐 {unit.area}</span>
                    </div>

                    <h3 className="font-serif font-bold text-base text-gray-900 mb-1">
                      {unit.title}
                    </h3>
                    
                    <p className="font-bold text-[#8B1E22] text-sm mb-4">
                      {unit.price || 'Contact for Price'}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    to={`/unit/${unit.id}`}
                    className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}