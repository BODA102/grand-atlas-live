import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api, { getDescription, getImage, getName, unwrapItem, unwrapList } from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true); setError('');
    api.get(`/projects/${id}`, { signal: controller.signal })
      .then(async projectResponse => {
        const detail = unwrapItem(projectResponse.data);
        setProject(detail);
        const projectName = getName(detail);
        try {
          const unitResponse = await api.get(`/unit?projectName=${encodeURIComponent(projectName)}`, { signal: controller.signal });
          setUnits(unwrapList(unitResponse.data));
        } catch (unitError) {
          if (unitError.name !== 'AbortError') setUnits([]);
        }
      })
      .catch(fetchError => { if (fetchError.name !== 'AbortError') setError(fetchError.message || 'Unable to load project details.'); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [id]);

  if (loading) return <div className="min-h-[50vh] flex items-center justify-center text-sm text-gray-500" role="status">Loading project details...</div>;
  if (error || !project) return <div className="min-h-[50vh] flex flex-col items-center justify-center gap-4 text-sm text-gray-600" role="alert"><p>{error || 'Project not found.'}</p><Link to="/projects" className="text-[#8B1E22] underline">Back to projects</Link></div>;

  const images = Array.isArray(project.images) ? project.images : [];
  return <div className="w-full bg-white text-gray-900 font-sans pb-16"><div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
    <div className="w-full h-64 sm:h-96 rounded-2xl overflow-hidden mb-6 border border-gray-200"><img src={images[0] || getImage(project, '/detail-hero.jpg')} alt={getName(project)} className="w-full h-full object-cover" /></div>
    {images.length > 1 && <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-8">{images.slice(1, 6).map((image, index) => <img key={`${image}-${index}`} src={image} alt={`${getName(project)} ${index + 2}`} className="h-20 sm:h-24 w-full object-cover rounded-xl" />)}</div>}
    <div className="pb-6 mb-8 border-b border-gray-200"><h1 className="font-serif text-2xl sm:text-3xl font-bold mb-3">{getName(project)}</h1><p className="text-sm text-gray-600">{project.zone?.name_en || project.zone?.name || ''}{project.developer ? ` · ${project.developer.name_en || project.developer.name || ''}` : ''}</p></div>
    <section className="max-w-4xl"><h2 className="font-serif font-bold text-xl mb-4">About this project</h2><p className="text-gray-600 leading-relaxed text-sm whitespace-pre-line">{getDescription(project) || 'Project information is not available.'}</p></section>
    {units.length > 0 && <section className="mt-12"><h2 className="font-serif font-bold text-xl mb-6">Available Units</h2><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">{units.map((unit, index) => <Link key={unit.id || unit._id || index} to={`/unit/${unit.id || unit._id}`} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm"><img src={getImage(unit)} alt={getName(unit)} className="h-44 w-full object-cover" /><div className="p-4"><h3 className="font-semibold">{getName(unit)}</h3><p className="text-[#8B1E22] mt-2">{unit.price != null ? `${Number(unit.price).toLocaleString()} EGP` : ''}</p></div></Link>)}</div></section>}
  </div></div>;
}
