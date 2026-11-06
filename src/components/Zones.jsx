import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getDescription, getImage, getName, unwrapList } from '../services/api';

const zonesHeroBg = '/zone-1.jpg';

export default function Zones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    api.get('/zone', { signal: controller.signal })
      .then(response => setZones(unwrapList(response.data)))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load destinations.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 font-sans">
      <section className="relative h-100 sm:h-112.5 md:h-125 bg-cover bg-center flex items-center justify-center text-white px-4 sm:px-6 pt-20" style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.6)), url('${zonesHeroBg}')` }}>
        <div className="hidden xl:flex absolute left-6 flex-col gap-4"><a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs">f</a><a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs">𝕏</a><a href="#" className="w-8 h-8 rounded-full border border-white/40 flex items-center justify-center text-xs">in</a></div>
        <div className="text-center max-w-2xl px-2"><h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-wide leading-tight">Destinations Defined by<br className="hidden sm:inline" /> Distinction</h1><p className="text-xs sm:text-sm text-gray-200 max-w-lg mx-auto leading-relaxed">From the quiet pulse of the shoreline to the vibrant energy of the metropolitan center, explore our guide to the neighborhoods that mirror your ambition and your aesthetic.</p></div>
      </section>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {loading ? <div className="text-center py-16 text-gray-500 text-sm" role="status">Loading destinations...</div>
          : error ? <div className="text-center py-16 text-red-700 text-sm" role="alert">{error}</div>
            : zones.length === 0 ? <div className="text-center py-16 text-gray-500 text-sm">No destinations are available yet.</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {zones.map((zone, index) => { const id = zone.id || zone._id; const name = getName(zone); return <Link key={id || index} to={`/projects?zone=${encodeURIComponent(id || name)}`} aria-label={`Browse projects in ${name}`} className="block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <img src={getImage(zone, '/zone-cairo.jpg')} alt={`${name}: ${getDescription(zone)}`} className="w-full aspect-[1.4] object-cover" />
                </Link>; })}
              </div>}
      </section>
    </div>
  );
}
