import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PropertyContext } from '../context/PropertyContext';

export default function Hero({ bgImg, title, desc }) {

  const data = useContext(PropertyContext);

  return (
    <section
      className="relative h-120 bg-cover bg-center flex items-center justify-center text-white px-6 pt-20"
      style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${bgImg}')` }}
    >
      <div className="text-center max-w-3xl">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 tracking-tight">
          {title}
        </h1>
        {desc && (
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed max-w-2xl mx-auto opacity-90">
            {desc}
          </p>
        )}
      </div>
    </section>
  );
}