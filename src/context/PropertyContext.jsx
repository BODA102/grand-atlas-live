import React, { createContext, useCallback, useEffect, useState } from 'react';
import api, { unwrapList } from '../services/api';

export const PropertyContext = createContext(null);

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState('');

  const refreshProperties = useCallback(async () => {
    setPropertiesLoading(true);
    setPropertiesError('');
    try {
      const response = await api.get('/unit');
      setProperties(unwrapList(response.data));
    } catch (error) {
      setProperties([]);
      setPropertiesError(error.message || 'Could not load properties.');
    } finally {
      setPropertiesLoading(false);
    }
  }, []);

  useEffect(() => { refreshProperties(); }, [refreshProperties]);

  return (
    <PropertyContext.Provider value={{ properties, propertiesLoading, propertiesError, refreshProperties }}>
      {children}
    </PropertyContext.Provider>
  );
}
