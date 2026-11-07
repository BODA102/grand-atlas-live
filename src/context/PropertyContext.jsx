import React, { useCallback, useEffect, useState } from 'react';
import api, { unwrapList } from '../services/api';
import { PropertyContext } from './PropertyContextValue';

export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [propertiesLoading, setPropertiesLoading] = useState(true);
  const [propertiesError, setPropertiesError] = useState('');

  const refreshProperties = useCallback(async () => {
    try {
      const response = await api.get('/unit');
      setProperties(unwrapList(response.data));
      setPropertiesError('');
    } catch (error) {
      setPropertiesError(error.message || 'Could not load properties.');
    } finally {
      setPropertiesLoading(false);
    }
  }, []);

  useEffect(() => {
    let active = true;
    Promise.resolve().then(() => {
      if (active) refreshProperties();
    });
    return () => { active = false; };
  }, [refreshProperties]);

  return (
    <PropertyContext.Provider value={{ properties, propertiesLoading, propertiesError, refreshProperties }}>
      {children}
    </PropertyContext.Provider>
  );
}
