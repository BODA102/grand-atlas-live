const BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api/v1').replace(/\/$/, '');

async function request(endpoint, { method = 'GET', body, signal, cache = method === 'GET' ? 'no-store' : undefined } = {}) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const isFormData = typeof FormData !== 'undefined' && body instanceof FormData;
  const token = typeof localStorage !== 'undefined' ? localStorage.getItem('grandAtlasToken') : null;
  const response = await fetch(`${BASE_URL}${path}`, {
    method,
    signal,
    ...(cache ? { cache } : {}),
    headers: {
      ...(body && !isFormData ? { 'Content-Type': 'application/json' } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? (isFormData ? body : JSON.stringify(body)) : undefined,
  });

  const contentType = response.headers.get('content-type') || '';
  const data = contentType.includes('application/json') ? await response.json() : await response.text();
  if (!response.ok) {
    const retryAfter = response.headers.get('Retry-After');
    const retryHint = retryAfter
      ? (/^\d+$/.test(retryAfter) ? ` Try again in ${retryAfter} seconds.` : ` Retry after ${retryAfter}.`)
      : ' Please wait and try again.';
    const fallbackMessage = response.status === 429
      ? `The API is temporarily limiting requests.${retryHint}`
      : `Request failed (${response.status})`;
    const error = new Error(data?.message || data?.error || fallbackMessage);
    error.status = response.status;
    error.retryAfter = retryAfter;
    error.data = data;
    throw error;
  }
  return { data };
}

const api = {
  get: (endpoint, options = {}) => request(endpoint, options),
  post: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'POST', body }),
  patch: (endpoint, body, options = {}) => request(endpoint, { ...options, method: 'PATCH', body }),
  delete: (endpoint, options = {}) => request(endpoint, { ...options, method: 'DELETE' }),
};

export function unwrapList(payload) {
  let current = payload;
  for (let depth = 0; depth < 4; depth += 1) {
    if (Array.isArray(current)) return current;
    current = current?.data ?? current?.items ?? current?.results;
  }
  return [];
}

export function unwrapItem(payload) {
  let current = payload;
  for (let depth = 0; depth < 4; depth += 1) {
    if (!current?.data || Array.isArray(current.data)) break;
    current = current.data;
  }
  return current;
}

export function getName(item) {
  return item?.name_en || item?.title_en || item?.name || item?.title || 'Untitled';
}

export function getDescription(item) {
  return item?.description_en || item?.description || '';
}

export function getImage(item, fallback = '/unit-img.jpg') {
  const images = item?.images;
  const image = item?.image || item?.imageUrl || item?.coverImage || (Array.isArray(images) ? images[0] : images);
  return typeof image === 'string' && image ? image : fallback;
}

export function getDeveloperImage(developer, index = 0) {
  const name = `${developer?.name_en || ''} ${developer?.name_ar || ''}`.toLowerCase();
  if (name.includes('palm')) return '/developer-palm-hills.png';
  if (name.includes('rash') || name.includes('راشد') || name.includes('الراشدي')) return '/developer-office.png';
  return index % 2 === 0 ? '/developer-residence.png' : '/developer-office.png';
}

export function getDeveloperLogo(developer) {
  const name = `${developer?.name_en || ''} ${developer?.name_ar || ''}`.toLowerCase();
  if (name.includes('palm')) return '/palm.png';
  if (name.includes('hayah')) return '/Hayah.png';
  return '';
}

export default api;
