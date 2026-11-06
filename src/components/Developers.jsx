import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api, { getDeveloperImage, getDeveloperLogo, getName, unwrapList } from '../services/api';

export default function Developers() {
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    api.get('/developer', { signal: controller.signal })
      .then(response => setDevelopers(unwrapList(response.data)))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load developers.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="relative w-full min-h-[21rem] md:h-[21rem] bg-gray-900 mb-10 sm:mb-12 overflow-hidden flex items-center justify-center py-16">
        <div className="absolute inset-0 bg-cover bg-center opacity-55" style={{ backgroundImage: "url('/developer-1.jpg')" }} /><div className="absolute inset-0 bg-linear-to-b from-black/50 via-black/40 to-black/60" />
        <div className="absolute left-6 hidden xl:flex flex-col gap-4 text-white"><a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">f</a><a href="#" aria-label="X" className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">𝕏</a><a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">◎</a><a href="#" aria-label="TikTok" className="w-8 h-8 rounded-full border border-white/50 flex items-center justify-center">♪</a></div>
        <div className="relative text-center max-w-2xl px-4 text-white"><h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 tracking-wide">Defining the Future<br /> Skyline.</h1><p className="text-xs sm:text-sm text-gray-200 leading-relaxed">Great developments require more than just capital; they require a narrative. We provide the elite marketing and specialized brokerage services needed to position your landmark projects in front of the world's most discerning buyers.</p></div>
      </div>
      <section className="max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? <div className="text-center py-16 text-gray-500 text-sm" role="status">Loading developers...</div>
          : error ? <div className="text-center py-16 text-red-700 text-sm" role="alert">{error}</div>
            : developers.length === 0 ? <div className="text-center py-16 text-gray-500 text-sm">No developers are available yet.</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
                {developers.map((developer, index) => { const id = developer.id || developer._id; const logo = getDeveloperLogo(developer); return <article key={id || index} className="bg-white rounded-2xl overflow-hidden border border-gray-200 p-2 shadow-sm hover:shadow-md transition-shadow">
                  <Link to={`/developer/${id}`}><img src={getDeveloperImage(developer, index)} alt={getName(developer)} className="h-40 w-full rounded-xl object-cover" /></Link>
                  <div className="flex h-14 items-center px-3">{logo ? <img src={logo} alt={getName(developer)} className="max-h-10 max-w-36 object-contain object-left" /> : <h2 className="font-serif font-bold text-sm text-gray-900">{getName(developer)}</h2>}</div>
                  <div className="px-1 pb-1"><Link to={`/developer/${id}`} className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-1.5 rounded-lg text-xs font-medium transition-colors">View Projects</Link></div>
                </article>; })}
              </div>}
      </section>
    </div>
  );
}
