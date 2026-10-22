/**
 * API Service for Preeti Makeover Client
 * Connects directly to Vite proxy (/api)
 */

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

  const response = await fetch(url, config);
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
  // Public Services
  getServices: () => fetchJson('/api/services'),
  getServiceBySlug: (slug) => fetchJson(`/api/services/${slug}`),

  // Public Business Settings
  getSettings: () => fetchJson('/api/settings'),

  // Public Testimonials (Approved only)
  getTestimonials: () => fetchJson('/api/testimonials'),

  // Public Gallery Images (Active only)
  getGallery: () => fetchJson('/api/gallery'),

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
    if (params.page) query.append('page', params.page);
    if (params.limit) query.append('limit', params.limit);
    const qs = query.toString() ? `?${query.toString()}` : '';
    return fetchJson(`/api/admin/appointments${qs}`, {
      headers: authHeaders(token)
    });
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

  // Admin Settings
  updateBusinessSettings: (token, settingsData) =>
    fetchJson('/api/admin/settings', {
      method: 'PUT',
      headers: authHeaders(token),
      body: JSON.stringify(settingsData)
    })
};
