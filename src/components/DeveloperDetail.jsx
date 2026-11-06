import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { getDescription, getImage, getName, unwrapItem, unwrapList } from '../services/api';

export default function DeveloperDetail() {
  const { id } = useParams();
  const [developer, setDeveloper] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      api.get(`/developer/${id}`, { signal: controller.signal }),
      api.get('/projects/all-projects', { signal: controller.signal }),
    ])
      .then(([developerResponse, projectsResponse]) => {
        const detail = unwrapItem(developerResponse.data);
        setDeveloper(detail);
        setProjects(unwrapList(projectsResponse.data).filter(project => {
          const projectDeveloper = project.developerId || project.developer_id || project.developer?.id || project.developer?._id || project.developer || '';
          return String(projectDeveloper) === id;
        }));
      })
      .catch(fetchError => {
        if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load developer projects.');
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [id]);

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-8 sm:pt-10 pb-12">
        <div className="text-center mb-8">
          <h1 className="font-serif font-bold text-2xl md:text-3xl text-gray-900 inline-block relative pb-2">
            Developers Projects
            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-[2.5px] bg-[#8B1E22]" />
          </h1>
        </div>

        <div className="w-full h-56 sm:h-72 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-gray-200 mb-10 sm:mb-12">
          <img src="/Image 19.png" alt="Grand Atlas developments" className="w-full h-full object-cover" />
        </div>

        {loading ? <div className="text-center py-16 text-gray-500 text-sm" role="status">Loading developer projects...</div>
          : error || !developer ? <div className="text-center py-16 text-red-700 text-sm" role="alert">{error || 'Developer not found.'}</div>
            : projects.length === 0 ? <div className="text-center py-16 text-gray-500 text-sm">No projects are listed for this developer yet.</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {projects.map((project, index) => {
                  const projectId = project.id || project._id;
                  const zoneName = project.zone?.name_en || project.zone?.name || '';
                  return <article key={projectId || index} className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                    <Link to={`/project/${projectId}`}><img src={getImage(project)} alt={getName(project)} className="h-44 sm:h-48 w-full object-cover" /></Link>
                    <div className="p-4 flex flex-1 flex-col">
                      {zoneName && <p className="text-[11px] text-[#9b846d] mb-2">{zoneName}</p>}
                      <h2 className="font-serif font-bold text-base text-[#8B1E22] mb-2">{getName(project)}</h2>
                      <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-4">{getDescription(project)}</p>
                      <Link to={`/project/${projectId}`} className="mt-auto block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2 rounded-lg text-xs font-medium transition-colors">View Details</Link>
                    </div>
                  </article>;
                })}
              </div>}
      </div>
    </div>
  );
}
