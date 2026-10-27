import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api';

// 1. إنشاء الـ Context وتصديرها بالاسم (Named Export)
export const PropertyContext = createContext();

// 2. إنشاء الـ Provider Component
export function PropertyProvider({ children }) {
  const [properties, setProperties] = useState([]);
  const [selectedType, setSelectedType] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchProperties() {
      try {
        const response = await api.get('/unit');
        setProperties(response?.data || []);
      } catch (error) {
        console.error('Error fetching global properties:', error);
      }
    }
    fetchProperties();
  }, []);

  return (
    <PropertyContext.Provider
      value={{
        properties,
        setProperties,
        selectedType,
        setSelectedType,
        searchTerm,
        setSearchTerm
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
}