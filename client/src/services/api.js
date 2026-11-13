/**
 * API Service for Preeti Makeover Client
 * Connects directly to Vite proxy (/api)
 */

// Generous timeout: the free-tier API can take ~30–50s to wake from sleep.
const REQUEST_TIMEOUT_MS = 60000;

async function fetchJson(endpoint, options = {}) {
  const url = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  };
  if (!config.signal && typeof AbortSignal !== 'undefined' && AbortSignal.timeout) {
    config.signal = AbortSignal.timeout(REQUEST_TIMEOUT_MS);
  }

  let response;
  try {
    response = await fetch(url, config);
  } catch (err) {
    const error = new Error(
      err?.name === 'TimeoutError' || err?.name === 'AbortError'
        ? 'Our server is taking too long to respond. Please try again, or message us on WhatsApp.'
        : 'Network error. Please check your internet connection and try again.'
    );
    error.network = true;
    throw error;
  }
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error(data?.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

function authHeaders(token) {
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

export const api = {
  // Public CMS Site Content
  getContent: () => fetchJson('/api/content'),

  // Public Services
  getServices: () => fetchJson('/api/services'),
  getServiceBySlug: (slug) => fetchJson(`/api/services/${slug}`),

  // Public Business Settings
  getSettings: () => fetchJson('/api/settings'),

  // Public Testimonials (Approved only)
  getTestimonials: () => fetchJson('/api/testimonials'),

  // Public Gallery Images (Active only)
  getGallery: () => fetchJson('/api/gallery'),

  // Public review submission (held for moderation)
  submitTestimonial: (reviewData) =>
    fetchJson('/api/testimonials', {
      method: 'POST',
      body: JSON.stringify(reviewData)
    }),

  // Public Appointment Submission
  createAppointment: (appointmentData) =>
    fetchJson('/api/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData)
    }),

  // ==========================================
  // Admin Protected APIs
  // ==========================================

  // Admin Auth
  adminLogin: (email, password) =>
    fetchJson('/api/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    }),

  getAdminMe: (token) =>
    fetchJson('/api/admin/me', {
      headers: authHeaders(token)
    }),

  changeAdminPassword: (token, currentPassword, newPassword, confirmPassword) =>
    fetchJson('/api/admin/change-password', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify({ currentPassword, newPassword, confirmPassword })
    }),

  // Admin Dashboard KPIs
  getAdminDashboard: (token) =>
    fetchJson('/api/admin/dashboard', {
      headers: authHeaders(token)
    }),

  // Admin Appointments
  getAdminAppointments: (token, params = {}) => {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'ALL') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.range && params.range !== 'all') query.append('range', params.range);
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return fetchJson(`/api/admin/appointments${qs}`, {
      headers: authHeaders(token)
    });
  },

  /** Download appointments matching the current filters as a CSV file. */
  downloadAppointmentsCsv: async (token, params = {}) => {
    const query = new URLSearchParams();
    if (params.status && params.status !== 'ALL') query.append('status', params.status);
    if (params.search) query.append('search', params.search);
    if (params.range && params.range !== 'all') query.append('range', params.range);
    const qs = query.toString() ? `?${query.toString()}` : '';
    const response = await fetch(`/api/admin/appointments/export.csv${qs}`, { headers: authHeaders(token) });
    if (!response.ok) {
      const data = await response.json().catch(() => null);
      throw new Error(data?.message || 'Export failed');
    }
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `appointments-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  },

  updateAppointmentStatus: (token, id, status, adminNotes) =>
    fetchJson(`/api/admin/appointments/${id}/status`, {
      method: 'PATCH',
      headers: authHeaders(token),
      body: JSON.stringify({ status, adminNotes })
    }),

  // Admin Services & Categories
  getAdminServices: (token) =>
    fetchJson('/api/admin/services', {
      headers: authHeaders(token)
    }),

  createService: (token, serviceData) =>
    fetchJson('/api/admin/services', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(serviceData)
    }),

  updateService: (token, id, serviceData) =>
    fetchJson(`/api/admin/services/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(serviceData)
    }),

  deleteService: (token, id) =>
    fetchJson(`/api/admin/services/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token)
    }),

  createCategory: (token, categoryData) =>
    fetchJson('/api/admin/categories', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(categoryData)
    }),

  updateCategory: (token, id, categoryData) =>
    fetchJson(`/api/admin/categories/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(categoryData)
    }),

  deleteCategory: (token, id) =>
    fetchJson(`/api/admin/categories/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token)
    }),

  // Admin Gallery
  getAdminGallery: (token) =>
    fetchJson('/api/admin/gallery', {
      headers: authHeaders(token)
    }),

  createGalleryImage: (token, imageData) =>
    fetchJson('/api/admin/gallery', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(imageData)
    }),

  updateGalleryImage: (token, id, imageData) =>
    fetchJson(`/api/admin/gallery/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(imageData)
    }),

  deleteGalleryImage: (token, id) =>
    fetchJson(`/api/admin/gallery/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token)
    }),

  // Admin Testimonials
  getAdminTestimonials: (token) =>
    fetchJson('/api/admin/testimonials', {
      headers: authHeaders(token)
    }),

  createTestimonial: (token, testimonialData) =>
    fetchJson('/api/admin/testimonials', {
      method: 'POST',
      headers: authHeaders(token),
      body: JSON.stringify(testimonialData)
    }),

  updateTestimonial: (token, id, testimonialData) =>
    fetchJson(`/api/admin/testimonials/${id}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(testimonialData)
    }),

  deleteTestimonial: (token, id) =>
    fetchJson(`/api/admin/testimonials/${id}`, {
      method: 'DELETE',
      headers: authHeaders(token)
    }),

  // Admin CMS Content Management
  getAdminContent: (token) =>
    fetchJson('/api/admin/content', {
      headers: authHeaders(token)
    }),

  updateContentItem: (token, key, itemData) =>
    fetchJson(`/api/admin/content/${encodeURIComponent(key)}`, {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(itemData)
    }),

  saveContentBatch: (token, items) =>
    fetchJson('/api/admin/content/batch/save', {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify({ items })
    }),

  uploadImage: async (token, file) => {
    const formData = new FormData();
    formData.append('image', file);

    const headers = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const response = await fetch('/api/admin/upload', {
      method: 'POST',
      headers,
      body: formData
    });

    const data = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(data?.message || 'Failed to upload image');
    }
    return data;
  },

  // Admin Settings
  updateBusinessSettings: (token, settingsData) =>
    fetchJson('/api/admin/settings', {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(settingsData)
    })
};
