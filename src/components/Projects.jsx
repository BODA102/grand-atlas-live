import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api, { getDescription, getImage, getName, unwrapList } from '../services/api';

export default function Projects() {
  const location = useLocation();
  const selectedZone = new URLSearchParams(location.search).get('zone');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    api.get('/projects/all-projects', { signal: controller.signal })
      .then(response => setProjects(unwrapList(response.data)))
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load projects.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const visibleProjects = selectedZone
    ? projects.filter(project => {
      const projectZoneId = project.zoneId || project.zone_id || project.zone?.id || project.zone?._id || (typeof project.zone === 'string' ? project.zone : '');
      const projectZoneName = project.zone?.name_en || project.zone?.name;
      return String(projectZoneId || '') === selectedZone || String(projectZoneName || '').toLowerCase() === selectedZone.toLowerCase();
    })
    : projects;

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-10">
        <div className="text-center mb-8"><h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 inline-block relative pb-2">Zone Projects<span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-[2.5px] bg-[#8B1E22]"></span></h1></div>
        <div className="w-full h-64 sm:h-80 md:h-95 rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-10 sm:mb-12"><img src="/Image 19.png" alt="Zone Projects Banner" className="w-full h-full object-cover" /></div>
        {loading ? <div className="text-center py-16 text-gray-500 text-sm" role="status">Loading projects...</div>
          : error ? <div className="text-center py-16 text-red-700 text-sm" role="alert">{error}</div>
          : visibleProjects.length === 0 ? <div className="text-center py-16 text-gray-500 text-sm">{selectedZone ? 'No projects are listed for this zone yet.' : 'No projects are available yet.'}</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {visibleProjects.map((project, index) => {
                  const id = project.id || project._id;
                  return <div key={id || index} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div><Link to={`/project/${id}`}><div className="h-48 sm:h-52 bg-cover bg-center cursor-pointer hover:opacity-95 transition-opacity" style={{ backgroundImage: `url('${getImage(project)}')` }} /></Link>
                      <div className="p-4 sm:p-5"><div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-gray-500 mb-3 pb-3 border-b border-gray-100"><span>📍 {project.zone?.name_en || project.zone?.name || project.zoneId || '—'}</span><span>🏢 {project.developer?.name_en || project.developer?.name || '—'}</span></div>
                        <h3 className="font-serif font-bold text-base sm:text-lg text-gray-900 mb-2">{getName(project)}</h3><p className="text-gray-600 text-xs line-clamp-2 leading-relaxed mb-6">{getDescription(project)}</p></div>
                    </div><div className="p-4 sm:p-5 pt-0"><Link to={`/project/${id}`} className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">View Details</Link></div>
                  </div>;
                })}
              </div>}
      </div>
    </div>
  );
}
