import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Projects() {
  // استدعاء الـ Context داخل دالة المكون بالطريقة الصحيحة
  const data = useContext(PropertyContext);

  const projectsList = [
    {
      id: 1,
      title: "Sawary Family Villa",
      units: "50 Units",
      gyms: "7 Gyms",
      area: "15,000m²",
      image: "/unit-img.jpg",
      description: "Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views."
    },
    {
      id: 2,
      title: "Sawary Family Villa",
      units: "50 Units",
      gyms: "7 Gyms",
      area: "15,000m²",
      image: "/unit-img.jpg",
      description: "Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views."
    },
    {
      id: 3,
      title: "Sawary Family Villa",
      units: "50 Units",
      gyms: "7 Gyms",
      area: "15,000m²",
      image: "/unit-img.jpg",
      description: "Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views."
    },
    {
      id: 4,
      title: "Sawary Family Villa",
      units: "50 Units",
      gyms: "7 Gyms",
      area: "15,000m²",
      image: "/unit-img.jpg",
      description: "Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views."
    },
    {
      id: 5,
      title: "Sawary Family Villa",
      units: "50 Units",
      gyms: "7 Gyms",
      area: "15,000m²",
      image: "/unit-img.jpg",
      description: "Experience the true meaning of modern living in this luxurious apartment featuring spacious rooms, elegant finishes, and breathtaking views."
    }
  ];

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      
      {/* 1. Zone Projects Header & Hero Banner Section */}
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-10">
        
        {/* Title with underline */}
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 inline-block relative pb-2">
            Zone Projects
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-[2.5px] bg-[#8B1E22]"></span>
          </h1>
        </div>

        {/* Main Banner Image matching Figma */}
        <div className="w-full h-95 md:h-105 rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-12">
          <img
            src="/Image 19.png"
            alt="Zone Projects Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* 2. Projects Grid (3 columns on large screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsList.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Project Card Image (Clickable) */}
                <Link to={`/project/${project.id}`}>
                  <div
                    className="h-52 bg-cover bg-center cursor-pointer hover:opacity-95 transition-opacity"
                    style={{ backgroundImage: `url('${project.image}')` }}
                  />
                </Link>

                {/* Card Content */}
                <div className="p-5">
                  
                  {/* Specs Bar (Units, Gyms, Area) */}
                  <div className="flex items-center justify-between text-[11px] text-gray-500 mb-3 pb-3 border-b border-gray-100">
                    <span className="flex items-center gap-1">🛏️ {project.units}</span>
                    <span className="flex items-center gap-1">🏋️ {project.gyms}</span>
                    <span className="flex items-center gap-1">📐 {project.area}</span>
                  </div>

                  {/* Project Title */}
                  <h3 className="font-serif font-bold text-lg text-gray-900 mb-2">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>
              </div>

              {/* View Details Button */}
              <div className="p-5 pt-0">
                <Link
                  to={`/project/${project.id}`}
                  className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm"
                >
                  View Details
                </Link>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
}