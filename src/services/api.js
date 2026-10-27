const USE_MOCK_DATA = true;

const BASE_URL = 'https://white-seahorse-266682.hostingerulessite.com/api/v1';

const api = {
  get: async (endpoint) => {
    if (USE_MOCK_DATA) {

      if (endpoint.includes('/unit')) {
        return { 
          data: [
            { id: 1, title: 'Palm Hills Office No. 3', price: '5,000,000', bedrooms: 3, bathrooms: 2, area: '180m²', image: '/unit-img.jpg', status: 'Available' },
            { id: 2, title: 'Hacienda Duplex No. 4', price: '7,500,000', bedrooms: 4, bathrooms: 3, area: '220m²', image: '/unit-img.jpg', status: 'Available' },
            { id: 3, title: 'Sawary Family Villa', price: '12,000,000', bedrooms: 5, bathrooms: 4, area: '350m²', image: '/unit-img.jpg', status: 'Available' }
          ] 
        };
      }
      if (endpoint.includes('/zone')) {
        return { 
          data: [
            { id: 1, name: 'Historic Cairo', properties_count: '12 Properties', image: '/zone-cairo.jpg' },
            { id: 2, name: 'Alexandria Coast', properties_count: '9 Properties', image: '/zone-alex.jpg' }
          ] 
        };
      }
      return { data: [] };
    }

    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await fetch(`${BASE_URL}${cleanEndpoint}`);

      if (!response.ok) {
        return { data: null };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null };
    }
  },

  post: async (endpoint, body) => {
    if (USE_MOCK_DATA) {
      return { data: { success: true, message: "Mock success" } };
    }

    try {
      const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
      const response = await fetch(`${BASE_URL}${cleanEndpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        return { data: null };
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return { data: null };
    }
  }
};

export default api;