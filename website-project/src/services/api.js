const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

function buildUrl(url) {
  if (!url) return API_BASE;
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  // ensure leading slash
  return `${API_BASE}${url.startsWith('/') ? url : `/${url}`}`;
}

export async function apiGet(url, token) {
  const response = await fetch(buildUrl(url), {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    }
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export async function apiPost(url, body, token) {
  const response = await fetch(buildUrl(url), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}

export async function apiPut(url, body, token) {
  const response = await fetch(buildUrl(url), {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {})
    },
    body: JSON.stringify(body)
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'API request failed');
  }
  return data;
}
