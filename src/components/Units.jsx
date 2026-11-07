import React, { useContext, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import api, { getDescription, getImage, getName, unwrapList } from '../services/api';
import { PropertyContext } from '../context/PropertyContextValue';

const fieldClass = 'w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-[#8B1E22] transition-colors';

export default function Units() {
  const propertyContext = useContext(PropertyContext);
  const [filteredUnits, setFilteredUnits] = useState(null);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation();
  const [filters, setFilters] = useState(() => ({ bedrooms: '', bathrooms: '', developerName: '', zoneName: new URLSearchParams(location.search).get('zone') || '', projectName: '', status: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '', sort: 'asc' }));

  const units = filteredUnits ?? propertyContext?.properties ?? [];
  const loading = searching || (filteredUnits === null && propertyContext?.propertiesLoading);
  const visibleError = error || (filteredUnits === null ? propertyContext?.propertiesError : '');

  const searchUnits = async event => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (searchTerm.trim()) params.set('search', searchTerm.trim());
    for (const [key, value] of Object.entries(filters)) {
      if (value !== '' && !(key === 'sort' && value === 'asc')) params.set(key, value);
    }
    if (params.size === 0) {
      setFilteredUnits(null);
      setError('');
      return;
    }
    setSearching(true);
    setError('');
    try {
      const response = await api.get(`/unit${params.size ? `?${params}` : ''}`);
      setFilteredUnits(unwrapList(response.data));
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to load properties.');
    } finally {
      setSearching(false);
    }
  };

  const resetSearch = () => {
    setSearchTerm('');
    setFilters({ bedrooms: '', bathrooms: '', developerName: '', zoneName: '', projectName: '', status: '', minPrice: '', maxPrice: '', minSize: '', maxSize: '', sort: 'asc' });
    setFilteredUnits(null);
    setError('');
  };

  const updateFilter = (key, value) => setFilters(current => ({ ...current, [key]: value }));

  return (
    <div className="w-full bg-white text-gray-900 font-sans pb-16">
      <div className="relative w-full h-94 bg-gray-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: "url('/units-bg.jpg')" }} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-2xl text-white">
          <h1 className="font-serif font-bold text-2xl sm:text-3xl md:text-4xl mb-3">Where Visionary Design<br /> Meets Daily Life</h1>
          <p className="text-xs md:text-sm text-gray-200 leading-relaxed">Experience a collection of residences designed as personal sanctuaries. Each unit balances expansive city views with artisanal textures and quiet, light-filled interiors to create the ultimate retreat from the world.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <form onSubmit={searchUnits} className="bg-white p-4 sm:p-5 rounded-2xl border border-[#8B1E22]/50 mb-8 sm:mb-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-0 items-center lg:mt-28">
          <input type="search" placeholder="Search Property" value={searchTerm} onChange={event => setSearchTerm(event.target.value)} className={`${fieldClass} lg:rounded-r-none`} />
          <select value={filters.bedrooms} onChange={event => updateFilter('bedrooms', event.target.value)} className={`${fieldClass} lg:rounded-none`}>
            <option value="">Bedrooms</option>{[1, 2, 3, 4, 5, 6].map(value => <option key={value} value={value}>{value} Bedrooms</option>)}
          </select>
          <input placeholder="Developer" value={filters.developerName} onChange={event => updateFilter('developerName', event.target.value)} className={`${fieldClass} lg:rounded-none`} />
          <input placeholder="Zone" value={filters.zoneName} onChange={event => updateFilter('zoneName', event.target.value)} className={`${fieldClass} lg:rounded-none`} />
          <input placeholder="Project" value={filters.projectName} onChange={event => updateFilter('projectName', event.target.value)} className={`${fieldClass} lg:rounded-none`} />
          <select value={filters.status} onChange={event => updateFilter('status', event.target.value)} className={`${fieldClass} lg:rounded-none`}>
            <option value="">Status</option><option value="AVAILABLE">Available</option><option value="SOLD">Sold</option><option value="RENTED">Rented</option>
          </select>
          <div className="flex min-w-0"><input type="number" min="0" placeholder="Min price" aria-label="Minimum price" value={filters.minPrice} onChange={event => updateFilter('minPrice', event.target.value)} className={`${fieldClass} rounded-r-none`} /><input type="number" min="0" placeholder="Max price" aria-label="Maximum price" value={filters.maxPrice} onChange={event => updateFilter('maxPrice', event.target.value)} className={`${fieldClass} rounded-l-none`} /></div>
          <details className="col-span-full border-t border-gray-100 px-1 pt-3 text-xs text-gray-600">
            <summary className="cursor-pointer font-medium text-[#8B1E22]">Advanced filters</summary>
            <div className="grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 lg:grid-cols-4">
              <select aria-label="Bathrooms" value={filters.bathrooms} onChange={event => updateFilter('bathrooms', event.target.value)} className={fieldClass}>
                <option value="">Any bathrooms</option>{[1, 2, 3, 4, 5, 6].map(value => <option key={value} value={value}>{value} Bathrooms</option>)}
              </select>
              <input type="number" min="0" placeholder="Min size (m²)" aria-label="Minimum size" value={filters.minSize} onChange={event => updateFilter('minSize', event.target.value)} className={fieldClass} />
              <input type="number" min="0" placeholder="Max size (m²)" aria-label="Maximum size" value={filters.maxSize} onChange={event => updateFilter('maxSize', event.target.value)} className={fieldClass} />
              <select aria-label="Sort by price" value={filters.sort} onChange={event => updateFilter('sort', event.target.value)} className={fieldClass}>
                <option value="asc">Price: Low to High</option><option value="desc">Price: High to Low</option>
              </select>
            </div>
          </details>
          <div className="lg:col-span-6 flex justify-center gap-3 py-4"><button type="submit" disabled={searching} className="w-full sm:w-64 bg-[#8B1E22] hover:bg-[#72181b] disabled:opacity-60 text-white py-2.5 rounded-lg text-xs font-semibold transition-colors shadow-sm">{searching ? 'Searching...' : 'Search'}</button><button type="button" onClick={resetSearch} className="rounded-lg border border-gray-300 px-4 text-xs text-gray-600 hover:bg-gray-50">Reset</button></div>
        </form>

        {loading ? <div className="text-center py-20 text-gray-500 text-sm" role="status">Loading units...</div>
          : visibleError ? <div className="text-center py-20 text-red-700 text-sm" role="alert">{visibleError}</div>
            : units.length === 0 ? <div className="text-center py-20 text-gray-500 text-sm">No properties found matching your search.</div>
              : <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {units.map((unit, index) => {
                  const id = unit.id || unit._id;
                  const image = getImage(unit);
                  const title = getName(unit);
                  return <div key={id || index} className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <Link to={`/unit/${id}`}><div className="h-48 sm:h-56 bg-cover bg-center cursor-pointer relative" style={{ backgroundImage: `url('${image}')` }}>
                        {unit.status && <span className="absolute top-3 right-3 bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-full font-medium shadow-sm">{unit.status}</span>}
                      </div></Link>
                      <div className="p-4 sm:p-5">
                        <div className="flex items-center justify-between flex-wrap gap-2 text-[11px] text-[#9b846d] mb-3 pb-3 border-b border-gray-100">
                          <span>🛏 {unit.bedrooms ?? '—'} Bedrooms</span><span>🛁 {unit.bathrooms ?? '—'} Bathrooms</span><span>📐 {unit.size ? `${unit.size}m²` : '—'}</span>
                        </div>
                        <div className="flex items-start justify-between gap-3 mb-2"><h3 className="font-serif font-bold text-sm text-[#8B1E22]">{title}</h3><p className="font-bold text-[#9b846d] text-sm whitespace-nowrap">{unit.price != null ? `${Number(unit.price).toLocaleString()} EGP` : 'Contact for Price'}</p></div>
                        <p className="text-gray-500 text-[11px] leading-relaxed line-clamp-3 mb-4">{getDescription(unit) || 'More information about this residence is available on the details page.'}</p>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 pt-0"><Link to={`/unit/${id}`} className="block text-center w-full border border-[#8B1E22] text-[#8B1E22] hover:bg-[#8B1E22] hover:text-white py-2.5 rounded-xl text-xs font-semibold transition-colors shadow-sm">View Details</Link></div>
                  </div>;
                })}
              </div>}
      </div>
    </div>
  );
}
