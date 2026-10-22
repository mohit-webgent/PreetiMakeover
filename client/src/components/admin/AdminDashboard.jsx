import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Calendar, 
  Scissors, 
  Image, 
  MessageSquare, 
  Settings, 
  LogOut, 
  ExternalLink,
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Search, 
  Filter, 
  Phone, 
  MessageCircle, 
  Clock, 
  AlertCircle, 
  CheckCircle2,
  RefreshCw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { api } from '../../services/api';

export default function AdminDashboard({ token, admin, onLogout, onBackToSite }) {
  const [activeTab, setActiveTab] = useState('overview');

  // Global feedback message
  const [toast, setToast] = useState(null);

  // Data states
  const [dashboardData, setDashboardData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [appointmentFilter, setAppointmentFilter] = useState('ALL');
  const [appointmentSearch, setAppointmentSearch] = useState('');
  const [servicesCategories, setServicesCategories] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [businessSettings, setBusinessSettings] = useState(null);

  const [loading, setLoading] = useState(true);

  // Modals state
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [serviceModal, setServiceModal] = useState({ open: false, mode: 'create', data: null });
  const [galleryModal, setGalleryModal] = useState({ open: false, mode: 'create', data: null });
  const [deleteConfirm, setDeleteConfirm] = useState(null); // { type, id, name }

  // Admin Security / Change Password state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordStatus(null);

    if (passwordData.newPassword.length < 8) {
      setPasswordStatus({ type: 'error', message: 'New password must be at least 8 characters long.' });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordStatus({ type: 'error', message: 'New password and confirmation password do not match.' });
      return;
    }

    setPasswordLoading(true);
    try {
      const res = await api.changeAdminPassword(
        token,
        passwordData.currentPassword,
        passwordData.newPassword,
        passwordData.confirmPassword
      );
      if (res?.success) {
        setPasswordStatus({ type: 'success', message: 'Password updated successfully! Please keep your new credentials safe.' });
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
        showToast('Admin password updated successfully');
      } else {
        setPasswordStatus({ type: 'error', message: res?.message || 'Failed to update password.' });
      }
    } catch (err) {
      setPasswordStatus({ type: 'error', message: err.message || 'Failed to update password.' });
    } finally {
      setPasswordLoading(false);
    }
  };

  // Initial Load
  const loadInitialData = async () => {
    setLoading(true);
    try {
      const [dashRes, apptRes, srvRes, galRes, testRes, setRes] = await Promise.all([
        api.getAdminDashboard(token).catch(e => null),
        api.getAdminAppointments(token, { status: appointmentFilter, search: appointmentSearch }).catch(e => null),
        api.getAdminServices(token).catch(e => null),
        api.getAdminGallery(token).catch(e => null),
        api.getAdminTestimonials(token).catch(e => null),
        api.getSettings().catch(e => null)
      ]);

      if (dashRes?.data) setDashboardData(dashRes.data);
      if (apptRes?.data) setAppointments(apptRes.data);
      if (srvRes?.data) setServicesCategories(srvRes.data);
      if (galRes?.data) setGalleryImages(galRes.data);
      if (testRes?.data) setTestimonials(testRes.data);
      if (setRes?.data) setBusinessSettings(setRes.data);
    } catch (err) {
      showToast(err.message || 'Error loading dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [token]);

  // Handle Appointments Filter / Search
  const reloadAppointments = async (status = appointmentFilter, search = appointmentSearch) => {
    try {
      const res = await api.getAdminAppointments(token, { status, search });
      if (res?.data) setAppointments(res.data);
    } catch (err) {
      showToast(err.message || 'Error loading appointments', 'error');
    }
  };

  // Appointment Status Update
  const handleUpdateAppointment = async (id, status, notes) => {
    try {
      const res = await api.updateAppointmentStatus(token, id, status, notes);
      if (res?.success) {
        showToast('Appointment updated successfully');
        setSelectedAppointment(null);
        reloadAppointments();
        // Refresh KPI metrics
        api.getAdminDashboard(token).then(r => r?.data && setDashboardData(r.data));
      }
    } catch (err) {
      showToast(err.message || 'Failed to update appointment', 'error');
    }
  };

  // Service Save (Create or Update)
  const handleSaveService = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      categoryId: form.categoryId.value,
      name: form.name.value,
      description: form.description.value,
      startingPrice: form.startingPrice.value || null,
      durationMinutes: form.durationMinutes.value ? parseInt(form.durationMinutes.value, 10) : null,
      isFeatured: form.isFeatured.checked,
      isActive: form.isActive.checked
    };

    try {
      if (serviceModal.mode === 'create') {
        await api.createService(token, payload);
        showToast('Service created successfully');
      } else {
        await api.updateService(token, serviceModal.data.id, payload);
        showToast('Service updated successfully');
      }
      setServiceModal({ open: false, mode: 'create', data: null });
      const srvRes = await api.getAdminServices(token);
      if (srvRes?.data) setServicesCategories(srvRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to save service', 'error');
    }
  };

  // Service Delete
  const handleDeleteService = async (id) => {
    try {
      await api.deleteService(token, id);
      showToast('Service deleted successfully');
      setDeleteConfirm(null);
      const srvRes = await api.getAdminServices(token);
      if (srvRes?.data) setServicesCategories(srvRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to delete service', 'error');
    }
  };

  // Gallery Save
  const handleSaveGallery = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      title: form.title.value,
      category: form.category.value,
      imageUrl: form.imageUrl.value,
      altText: form.altText.value || form.title.value,
      displayOrder: parseInt(form.displayOrder.value, 10) || 0,
      isFeatured: form.isFeatured.checked,
      isActive: form.isActive.checked
    };

    try {
      if (galleryModal.mode === 'create') {
        await api.createGalleryImage(token, payload);
        showToast('Gallery image added');
      } else {
        await api.updateGalleryImage(token, galleryModal.data.id, payload);
        showToast('Gallery image updated');
      }
      setGalleryModal({ open: false, mode: 'create', data: null });
      const galRes = await api.getAdminGallery(token);
      if (galRes?.data) setGalleryImages(galRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to save gallery image', 'error');
    }
  };

  // Gallery Delete
  const handleDeleteGallery = async (id) => {
    try {
      await api.deleteGalleryImage(token, id);
      showToast('Gallery image removed');
      setDeleteConfirm(null);
      const galRes = await api.getAdminGallery(token);
      if (galRes?.data) setGalleryImages(galRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to remove gallery image', 'error');
    }
  };

  // Testimonial Approval Toggle
  const handleToggleTestimonial = async (id, currentStatus) => {
    try {
      await api.updateTestimonial(token, id, { isApproved: !currentStatus });
      showToast(!currentStatus ? 'Review approved for public display' : 'Review unapproved');
      const testRes = await api.getAdminTestimonials(token);
      if (testRes?.data) setTestimonials(testRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to update testimonial status', 'error');
    }
  };

  // Testimonial Delete
  const handleDeleteTestimonial = async (id) => {
    try {
      await api.deleteTestimonial(token, id);
      showToast('Testimonial deleted');
      setDeleteConfirm(null);
      const testRes = await api.getAdminTestimonials(token);
      if (testRes?.data) setTestimonials(testRes.data);
    } catch (err) {
      showToast(err.message || 'Failed to delete testimonial', 'error');
    }
  };

  // Settings Save
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    const form = e.target;
    const payload = {
      businessName: form.businessName.value,
      tagline: form.tagline.value,
      ownerName: form.ownerName.value,
      phone: form.phone.value,
      whatsapp: form.whatsapp.value,
      email: form.email.value,
      address: form.address.value,
      openingHour: form.openingHour.value,
      closingHour: form.closingHour.value,
      weeklyOffDay: form.weeklyOffDay.value,
      googleMapsUrl: form.googleMapsUrl.value
    };

    try {
      const res = await api.updateBusinessSettings(token, payload);
      if (res?.data) {
        setBusinessSettings(res.data);
        showToast('Salon settings updated successfully');
      }
    } catch (err) {
      showToast(err.message || 'Failed to update business settings', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-brand-plum flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl shadow-luxury border text-xs font-semibold flex items-center gap-2 ${
          toast.type === 'error' ? 'bg-rose-50 border-rose-200 text-rose-800' : 'bg-emerald-50 border-emerald-200 text-emerald-800'
        }`}>
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4 shrink-0" /> : <CheckCircle2 className="w-4 h-4 shrink-0" />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Top Admin Navigation Header */}
      <header className="bg-white border-b border-brand-blush/60 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-plum text-brand-gold flex items-center justify-center font-serif text-lg font-bold">
              PM
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-brand-plum block leading-tight">
                Preeti Makeover <span className="text-xs font-sans font-semibold text-brand-gold-dark bg-brand-blush/40 px-2 py-0.5 rounded-full ml-1">Admin</span>
              </span>
              <span className="text-[10px] text-brand-plum/60 block">
                Signed in as: <strong className="font-semibold text-brand-plum">{admin?.name || 'Preeti Mandal'}</strong> ({admin?.email || 'admin@preetimakeover.com'})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onBackToSite}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-brand-plum/80 hover:text-brand-plum bg-brand-ivory hover:bg-brand-blush/40 border border-brand-blush transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </button>

            <button
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2 border-t border-brand-blush/30 text-xs font-medium">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            { id: 'appointments', label: 'Appointments', icon: Calendar, badge: dashboardData?.pendingEnquiries },
            { id: 'services', label: 'Services & Catalog', icon: Scissors },
            { id: 'gallery', label: 'Gallery', icon: Image },
            { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, badge: dashboardData?.pendingTestimonialsCount },
            { id: 'settings', label: 'Salon Settings', icon: Settings },
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all shrink-0 ${
                  isActive
                    ? 'bg-brand-plum text-brand-gold font-bold shadow-sm'
                    : 'text-brand-plum/70 hover:text-brand-plum hover:bg-brand-ivory'
                }`}
              >
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
                {tab.badge > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    isActive ? 'bg-brand-gold text-brand-plum' : 'bg-rose-100 text-rose-800'
                  }`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </header>

      {/* Main Admin Tab Body */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        
        {/* ========================================================================= */}
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* KPI Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white rounded-2xl p-5 border border-brand-blush/60 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-amber-700 block mb-1">
                  Pending Enquiries
                </span>
                <div className="text-3xl font-serif font-bold text-brand-plum">
                  {dashboardData?.pendingEnquiries || 0}
                </div>
                <span className="text-[10px] text-brand-plum/60 mt-1 block">Require follow-up</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-brand-blush/60 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-emerald-700 block mb-1">
                  Confirmed Bookings
                </span>
                <div className="text-3xl font-serif font-bold text-brand-plum">
                  {dashboardData?.confirmedAppointments || 0}
                </div>
                <span className="text-[10px] text-brand-plum/60 mt-1 block">Scheduled visits</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-brand-blush/60 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-brand-gold-dark block mb-1">
                  Active Services
                </span>
                <div className="text-3xl font-serif font-bold text-brand-plum">
                  {dashboardData?.activeServicesCount || 0}
                </div>
                <span className="text-[10px] text-brand-plum/60 mt-1 block">Across {dashboardData?.totalCategoriesCount || 5} categories</span>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-brand-blush/60 shadow-sm">
                <span className="text-[11px] uppercase font-bold tracking-wider text-purple-700 block mb-1">
                  Total Enquiries
                </span>
                <div className="text-3xl font-serif font-bold text-brand-plum">
                  {dashboardData?.totalEnquiries || 0}
                </div>
                <span className="text-[10px] text-brand-plum/60 mt-1 block">All-time received</span>
              </div>
            </div>

            {/* Quick Actions & Recent Enquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Enquiries List */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush/60 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-brand-plum">Recent Appointment Enquiries</h3>
                    <p className="text-xs text-brand-plum/60">Latest submissions from website clients</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('appointments')}
                    className="text-xs font-bold text-brand-gold-dark hover:text-brand-plum"
                  >
                    View All →
                  </button>
                </div>

                {dashboardData?.recentAppointments?.length > 0 ? (
                  <div className="divide-y divide-brand-blush/40">
                    {dashboardData.recentAppointments.map((app) => (
                      <div key={app.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-sm text-brand-plum">{app.customerName}</h4>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              app.status === 'PENDING' ? 'bg-amber-100 text-amber-800' :
                              app.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-800' :
                              app.status === 'CONTACTED' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {app.status}
                            </span>
                          </div>
                          <p className="text-xs text-brand-plum/70 mt-0.5">
                            {app.serviceName} • Requested for: <strong className="font-semibold">{new Date(app.preferredDate).toISOString().split('T')[0]}</strong> {app.preferredTime || ''}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <a
                            href={`https://wa.me/${app.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(app.customerName)},%20this%20is%20Preeti%20Makeover%20regarding%20your%20appointment%20enquiry.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                            title="Chat with customer on WhatsApp"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => {
                              setSelectedAppointment(app);
                              setActiveTab('appointments');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 text-xs font-semibold"
                          >
                            Manage
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-brand-plum/60">
                    No appointment enquiries yet.
                  </div>
                )}
              </div>

              {/* Salon Snapshot */}
              <div className="lg:col-span-4 space-y-6">
                <div className="bg-gradient-to-br from-brand-plum to-brand-plum-deep text-brand-ivory rounded-3xl p-6 sm:p-8 shadow-luxury">
                  <div className="flex items-center gap-2 mb-4 text-brand-gold text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Studio Status</span>
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-2">Preeti Makeover</h4>
                  <p className="text-xs text-brand-ivory/80 leading-relaxed font-light mb-4">
                    Prince Colony, Badarpur, New Delhi. Daily 10 AM – 9 PM. Weekly Off on Tuesday.
                  </p>

                  <div className="pt-4 border-t border-white/15 space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-ivory/60">Weekly Schedule:</span>
                      <span className="font-semibold text-rose-300">Tuesday Closed</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-ivory/60">WhatsApp Bridge:</span>
                      <span className="font-semibold text-emerald-300">Active (+91 88103 59438)</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-brand-blush/60 shadow-sm space-y-3">
                  <h4 className="font-serif font-bold text-sm text-brand-plum">Quick Studio Tools</h4>
                  <button
                    onClick={() => { setServiceModal({ open: true, mode: 'create', data: null }); }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 border border-brand-blush flex items-center justify-between"
                  >
                    <span>+ Add New Treatment</span>
                    <Scissors className="w-4 h-4 text-brand-gold" />
                  </button>
                  <button
                    onClick={() => { setGalleryModal({ open: true, mode: 'create', data: null }); }}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 border border-brand-blush flex items-center justify-between"
                  >
                    <span>+ Add Portfolio Image</span>
                    <Image className="w-4 h-4 text-brand-gold" />
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 border border-brand-blush flex items-center justify-between"
                  >
                    <span>Update Salon Hours</span>
                    <Clock className="w-4 h-4 text-brand-gold" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: APPOINTMENTS MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            
            {/* Search & Filter Bar */}
            <div className="bg-white rounded-2xl p-4 border border-brand-blush/60 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
              
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 text-brand-plum/40 absolute left-3.5 top-3" />
                <input
                  type="text"
                  placeholder="Search customer name, phone, or service..."
                  value={appointmentSearch}
                  onChange={(e) => {
                    setAppointmentSearch(e.target.value);
                    reloadAppointments(appointmentFilter, e.target.value);
                  }}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-brand-blush bg-brand-ivory/40 text-xs text-brand-plum placeholder:text-brand-plum/40"
                />
              </div>

              {/* Status Filter Buttons */}
              <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
                {['ALL', 'PENDING', 'CONTACTED', 'CONFIRMED', 'COMPLETED', 'CANCELLED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => {
                      setAppointmentFilter(st);
                      reloadAppointments(st, appointmentSearch);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      appointmentFilter === st
                        ? 'bg-brand-plum text-brand-gold shadow-sm'
                        : 'bg-brand-ivory text-brand-plum/70 hover:text-brand-plum border border-brand-blush'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              <button
                onClick={() => reloadAppointments()}
                className="p-2 rounded-xl bg-brand-ivory hover:bg-brand-blush/40 text-brand-plum/80 border border-brand-blush shrink-0"
                title="Refresh"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {/* Appointments Table */}
            <div className="bg-white rounded-3xl border border-brand-blush/60 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-brand-blush/60 bg-brand-ivory/60 text-brand-plum/80 font-serif font-bold uppercase tracking-wider text-[11px]">
                      <th className="py-4 px-6">Customer</th>
                      <th className="py-4 px-6">Service</th>
                      <th className="py-4 px-6">Requested Date & Time</th>
                      <th className="py-4 px-6">Status</th>
                      <th className="py-4 px-6">Notes</th>
                      <th className="py-4 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-blush/30">
                    {appointments.length > 0 ? (
                      appointments.map((app) => (
                        <tr key={app.id} className="hover:bg-brand-ivory/30 transition-colors">
                          <td className="py-4 px-6">
                            <span className="font-bold text-sm text-brand-plum block">{app.customerName}</span>
                            <a href={`tel:${app.phone}`} className="text-brand-gold-dark hover:underline flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3" />
                              <span>{app.phone}</span>
                            </a>
                          </td>

                          <td className="py-4 px-6">
                            <span className="font-medium text-brand-plum">{app.serviceName}</span>
                          </td>

                          <td className="py-4 px-6">
                            <div className="font-medium text-brand-plum">
                              {new Date(app.preferredDate).toISOString().split('T')[0]}
                            </div>
                            <span className="text-[11px] text-brand-plum/60">{app.preferredTime || 'Anytime'}</span>
                          </td>

                          <td className="py-4 px-6">
                            <select
                              value={app.status}
                              onChange={(e) => handleUpdateAppointment(app.id, e.target.value, app.adminNotes)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${
                                app.status === 'PENDING' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                app.status === 'CONFIRMED' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                app.status === 'CONTACTED' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                app.status === 'COMPLETED' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                'bg-rose-50 text-rose-800 border-rose-200'
                              }`}
                            >
                              <option value="PENDING">PENDING</option>
                              <option value="CONTACTED">CONTACTED</option>
                              <option value="CONFIRMED">CONFIRMED</option>
                              <option value="COMPLETED">COMPLETED</option>
                              <option value="CANCELLED">CANCELLED</option>
                            </select>
                          </td>

                          <td className="py-4 px-6 max-w-xs">
                            <span className="text-brand-plum/70 italic truncate block">
                              {app.adminNotes || app.message || '—'}
                            </span>
                          </td>

                          <td className="py-4 px-6 text-right space-x-2">
                            <a
                              href={`https://wa.me/${app.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(app.customerName)},%20this%20is%20Preeti%20Makeover%20regarding%20your%20appointment%20enquiry%20for%20${encodeURIComponent(app.serviceName)}.`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-colors"
                              title="WhatsApp Customer"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>

                            <button
                              onClick={() => setSelectedAppointment(app)}
                              className="inline-flex p-2 rounded-xl bg-brand-ivory text-brand-plum hover:bg-brand-blush/40 transition-colors"
                              title="Edit Notes & Details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6" className="py-12 text-center text-brand-plum/60 text-xs">
                          No appointment enquiries found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appointment Detail & Notes Modal */}
            {selectedAppointment && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-luxury space-y-5 border border-brand-blush">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-brand-plum">
                      Appointment Details
                    </h3>
                    <button
                      onClick={() => setSelectedAppointment(null)}
                      className="p-1.5 rounded-full hover:bg-brand-ivory text-brand-plum/60"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-3 bg-brand-ivory rounded-2xl p-4 text-xs">
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Customer Name:</span>
                      <span className="font-bold text-brand-plum">{selectedAppointment.customerName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Phone:</span>
                      <span className="font-mono font-semibold text-brand-plum">{selectedAppointment.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Service:</span>
                      <span className="font-semibold text-brand-plum">{selectedAppointment.serviceName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Requested Date:</span>
                      <span className="font-semibold text-brand-plum">{new Date(selectedAppointment.preferredDate).toISOString().split('T')[0]}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-brand-plum/60">Client Message:</span>
                      <span className="font-light text-brand-plum/80">{selectedAppointment.message || 'None provided'}</span>
                    </div>
                  </div>

                  {/* Admin Notes Form */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                      Internal Admin Notes
                    </label>
                    <textarea
                      rows="3"
                      defaultValue={selectedAppointment.adminNotes || ''}
                      id="modalNotesInput"
                      placeholder="e.g. Called client at 2 PM; requested afternoon slot confirmed."
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush bg-brand-ivory/30 text-xs text-brand-plum resize-none"
                    ></textarea>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedAppointment(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-plum/70 hover:bg-brand-ivory"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        const notes = document.getElementById('modalNotesInput')?.value;
                        handleUpdateAppointment(selectedAppointment.id, selectedAppointment.status, notes);
                      }}
                      className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep"
                    >
                      Save Notes
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: SERVICES & CATALOG */}
        {/* ========================================================================= */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">Services & Treatment Catalog</h3>
                <p className="text-xs text-brand-plum/60">Manage salon treatments, duration, and optional pricing</p>
              </div>

              <button
                onClick={() => setServiceModal({ open: true, mode: 'create', data: null })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-brand-gold" />
                <span>Add New Treatment</span>
              </button>
            </div>

            {/* Categories & Nested Services List */}
            <div className="space-y-6">
              {servicesCategories.map((cat) => (
                <div key={cat.id} className="bg-white rounded-3xl p-6 sm:p-8 border border-brand-blush/60 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-brand-blush/40">
                    <div>
                      <h4 className="font-serif text-lg font-bold text-brand-plum">{cat.name}</h4>
                      <p className="text-xs text-brand-plum/60 font-light">{cat.description}</p>
                    </div>
                    <span className="text-xs font-bold text-brand-gold-dark bg-brand-ivory px-3 py-1 rounded-full border border-brand-blush">
                      {cat.services?.length || 0} Treatments
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {cat.services?.map((svc) => (
                      <div
                        key={svc.id}
                        className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                          svc.isActive 
                            ? 'bg-[#FAF7F2] border-brand-blush/60 hover:border-brand-gold/50' 
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h5 className="font-serif font-bold text-sm text-brand-plum">{svc.name}</h5>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                              svc.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                            }`}>
                              {svc.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                          
                          <p className="text-[11px] text-brand-plum/60 mb-2">
                            {svc.startingPrice ? `Starting at ₹${svc.startingPrice}` : 'Price on Consultation'}
                            {svc.durationMinutes ? ` • ${svc.durationMinutes} mins` : ''}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-brand-blush/40 flex items-center justify-between text-xs">
                          <button
                            onClick={() => api.updateService(token, svc.id, { isActive: !svc.isActive }).then(() => api.getAdminServices(token).then(r => setServicesCategories(r.data)))}
                            className="text-[10px] font-semibold text-brand-plum/60 hover:text-brand-plum underline"
                          >
                            {svc.isActive ? 'Deactivate' : 'Activate'}
                          </button>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => setServiceModal({ open: true, mode: 'edit', data: { ...svc, categoryId: cat.id } })}
                              className="p-1.5 rounded-lg hover:bg-white text-brand-plum/70"
                              title="Edit Service"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteConfirm({ type: 'service', id: svc.id, name: svc.name })}
                              className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600"
                              title="Delete Service"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Service Create/Edit Modal */}
            {serviceModal.open && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-luxury space-y-4 border border-brand-blush">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-brand-plum">
                      {serviceModal.mode === 'create' ? 'Add New Treatment' : 'Edit Treatment'}
                    </h3>
                    <button
                      onClick={() => setServiceModal({ open: false, mode: 'create', data: null })}
                      className="p-1.5 rounded-full hover:bg-brand-ivory text-brand-plum/60"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveService} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="categoryId"
                        required
                        defaultValue={serviceModal.data?.categoryId || servicesCategories[0]?.id || ''}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      >
                        {servicesCategories.map((c) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Treatment Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        defaultValue={serviceModal.data?.name || ''}
                        placeholder="e.g. Signature Hair Botox"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                          Starting Price (₹)
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          name="startingPrice"
                          defaultValue={serviceModal.data?.startingPrice || ''}
                          placeholder="Leave blank for Consultation"
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                          Duration (Minutes)
                        </label>
                        <input
                          type="number"
                          name="durationMinutes"
                          defaultValue={serviceModal.data?.durationMinutes || ''}
                          placeholder="e.g. 60"
                          className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Description / Notes
                      </label>
                      <textarea
                        name="description"
                        rows="2"
                        defaultValue={serviceModal.data?.description || ''}
                        placeholder="Brief overview of formula & benefits..."
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40 resize-none"
                      ></textarea>
                    </div>

                    <div className="flex items-center gap-6 pt-1 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          defaultChecked={serviceModal.data ? serviceModal.data.isActive : true}
                          className="rounded text-brand-plum focus:ring-brand-gold"
                        />
                        <span>Active on Website</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          defaultChecked={serviceModal.data ? serviceModal.data.isFeatured : false}
                          className="rounded text-brand-plum focus:ring-brand-gold"
                        />
                        <span>Featured Treatment</span>
                      </label>
                    </div>

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-blush/40">
                      <button
                        type="button"
                        onClick={() => setServiceModal({ open: false, mode: 'create', data: null })}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-plum/70 hover:bg-brand-ivory"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-sm"
                      >
                        {serviceModal.mode === 'create' ? 'Create Treatment' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: GALLERY MANAGEMENT */}
        {/* ========================================================================= */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">Salon Work Gallery</h3>
                <p className="text-xs text-brand-plum/60">Upload and organize verified transformation photos for public display</p>
              </div>

              <button
                onClick={() => setGalleryModal({ open: true, mode: 'create', data: null })}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-sm self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 text-brand-gold" />
                <span>Add Portfolio Image</span>
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {galleryImages.map((img) => (
                <div key={img.id} className="bg-white rounded-3xl overflow-hidden border border-brand-blush/60 shadow-sm flex flex-col justify-between">
                  <div className="aspect-[4/3] bg-brand-ivory relative overflow-hidden">
                    <img
                      src={img.imageUrl}
                      alt={img.altText || img.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500'; }}
                    />
                    <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-brand-plum shadow-sm">
                      {img.category}
                    </span>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="font-serif font-bold text-sm text-brand-plum mb-1">{img.title}</h4>
                      <p className="text-[11px] text-brand-plum/60 line-clamp-1">{img.altText}</p>
                    </div>

                    <div className="pt-3 mt-3 border-t border-brand-blush/40 flex items-center justify-between">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        img.isActive ? 'bg-emerald-50 text-emerald-800' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {img.isActive ? 'Active' : 'Hidden'}
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setGalleryModal({ open: true, mode: 'edit', data: img })}
                          className="p-1.5 rounded-lg hover:bg-brand-ivory text-brand-plum/70"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm({ type: 'gallery', id: img.id, name: img.title })}
                          className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {galleryImages.length === 0 && (
              <div className="bg-white rounded-3xl p-12 text-center border border-brand-blush/60 text-xs text-brand-plum/60">
                No custom images uploaded yet. The public site will gracefully display verified style compositions until you upload real photos.
              </div>
            )}

            {/* Gallery Modal */}
            {galleryModal.open && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-luxury space-y-4 border border-brand-blush">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif text-xl font-bold text-brand-plum">
                      {galleryModal.mode === 'create' ? 'Add Portfolio Image' : 'Edit Portfolio Image'}
                    </h3>
                    <button
                      onClick={() => setGalleryModal({ open: false, mode: 'create', data: null })}
                      className="p-1.5 rounded-full hover:bg-brand-ivory text-brand-plum/60"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveGallery} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Image Title <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        required
                        defaultValue={galleryModal.data?.title || ''}
                        placeholder="e.g. Signature HD Bridal Glow"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Category <span className="text-rose-500">*</span>
                      </label>
                      <select
                        name="category"
                        required
                        defaultValue={galleryModal.data?.category || 'Bridal'}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      >
                        <option value="Bridal">Bridal</option>
                        <option value="Hair">Hair</option>
                        <option value="Facials">Facials</option>
                        <option value="Nails">Nails</option>
                        <option value="Studio">Studio</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Image URL <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="url"
                        name="imageUrl"
                        required
                        defaultValue={galleryModal.data?.imageUrl || ''}
                        placeholder="https://example.com/photo.jpg or /assets/photo.jpg"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      />
                      <span className="text-[10px] text-brand-plum/50 mt-1 block">
                        Must be a valid web URL or asset path.
                      </span>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Alt Text (Accessibility)
                      </label>
                      <input
                        type="text"
                        name="altText"
                        defaultValue={galleryModal.data?.altText || ''}
                        placeholder="Descriptive caption for screen readers"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/40"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-1 text-xs">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isActive"
                          defaultChecked={galleryModal.data ? galleryModal.data.isActive : true}
                          className="rounded text-brand-plum focus:ring-brand-gold"
                        />
                        <span>Visible on Website</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          name="isFeatured"
                          defaultChecked={galleryModal.data ? galleryModal.data.isFeatured : false}
                          className="rounded text-brand-plum focus:ring-brand-gold"
                        />
                        <span>Featured on Homepage</span>
                      </label>
                    </div>

                    <input type="hidden" name="displayOrder" defaultValue={galleryModal.data?.displayOrder || 0} />

                    <div className="flex items-center justify-end gap-3 pt-3 border-t border-brand-blush/40">
                      <button
                        type="button"
                        onClick={() => setGalleryModal({ open: false, mode: 'create', data: null })}
                        className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-plum/70 hover:bg-brand-ivory"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-sm"
                      >
                        Save Image
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TESTIMONIALS MODERATION */}
        {/* ========================================================================= */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-2xl font-bold text-brand-plum">Client Testimonials Moderation</h3>
                <p className="text-xs text-brand-plum/60">Strictly review and approve genuine feedback before public display</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-brand-blush/60 shadow-sm overflow-hidden">
              <div className="divide-y divide-brand-blush/30">
                {testimonials.length > 0 ? (
                  testimonials.map((t) => (
                    <div key={t.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-brand-plum">{t.clientName}</h4>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            t.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {t.isApproved ? 'Approved & Live' : 'Pending Approval'}
                          </span>
                        </div>

                        <span className="text-[11px] text-brand-plum/60 block">
                          Service: {t.serviceName || 'General Consultation'} • Rating: {'★'.repeat(t.rating)}
                        </span>

                        <p className="text-xs text-brand-plum/80 italic font-light pt-1">
                          “{t.reviewText}”
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleToggleTestimonial(t.id, t.isApproved)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                            t.isApproved 
                              ? 'bg-amber-50 text-amber-800 hover:bg-amber-100 border border-amber-200' 
                              : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                          }`}
                        >
                          {t.isApproved ? 'Unapprove' : 'Approve for Website'}
                        </button>

                        <button
                          onClick={() => setDeleteConfirm({ type: 'testimonial', id: t.id, name: `${t.clientName}'s review` })}
                          className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-12 text-center text-xs text-brand-plum/60">
                    No client reviews submitted yet. The public website currently displays your verified Salon Care Commitments.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 6: SALON BUSINESS SETTINGS & ADMIN SECURITY */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl mx-auto space-y-8">
            {businessSettings && (
              <div className="bg-white rounded-3xl p-8 border border-brand-blush/60 shadow-sm space-y-6">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-plum">Salon Settings & Schedule</h3>
                  <p className="text-xs text-brand-plum/60">Update official contact information, hours, and weekly closure</p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Business Name
                      </label>
                      <input
                        type="text"
                        name="businessName"
                        required
                        defaultValue={businessSettings.businessName}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Owner Name
                      </label>
                      <input
                        type="text"
                        name="ownerName"
                        required
                        defaultValue={businessSettings.ownerName}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      Tagline
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      required
                      defaultValue={businessSettings.tagline}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Phone Number
                      </label>
                      <input
                        type="text"
                        name="phone"
                        required
                        defaultValue={businessSettings.phone}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        name="whatsapp"
                        required
                        defaultValue={businessSettings.whatsapp}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      Studio Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={businessSettings.email}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      Full Physical Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      defaultValue={businessSettings.address}
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Opening Time
                      </label>
                      <input
                        type="text"
                        name="openingHour"
                        required
                        defaultValue={businessSettings.openingHour}
                        placeholder="10:00 AM"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Closing Time
                      </label>
                      <input
                        type="text"
                        name="closingHour"
                        required
                        defaultValue={businessSettings.closingHour}
                        placeholder="09:00 PM"
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                        Weekly Off Day
                      </label>
                      <select
                        name="weeklyOffDay"
                        defaultValue={businessSettings.weeklyOffDay || 'Tuesday'}
                        className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                      >
                        <option value="Tuesday">Tuesday</option>
                        <option value="Monday">Monday</option>
                        <option value="Wednesday">Wednesday</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      Google Maps URL
                    </label>
                    <input
                      type="url"
                      name="googleMapsUrl"
                      defaultValue={businessSettings.googleMapsUrl || ''}
                      placeholder="https://maps.google.com/..."
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30"
                    />
                  </div>

                  <div className="pt-4 border-t border-brand-blush/40 flex justify-end">
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-luxury"
                    >
                      Save Business Settings
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Admin Password & Security Card */}
            <div className="bg-white rounded-3xl p-8 border border-brand-blush/60 shadow-sm space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-plum/5 text-brand-plum flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-brand-gold-dark" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-brand-plum">Admin Password & Security</h3>
                  <p className="text-xs text-brand-plum/60">
                    Update your administrator credentials with server-side bcrypt authorization
                  </p>
                </div>
              </div>

              {passwordStatus && (
                <div className={`p-4 rounded-2xl text-xs font-medium flex items-center gap-2.5 ${
                  passwordStatus.type === 'error'
                    ? 'bg-rose-50 text-rose-800 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                }`}>
                  {passwordStatus.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                  )}
                  <span>{passwordStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    required
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    placeholder="Enter current password to verify identity"
                    className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30 focus:outline-none focus:border-brand-plum"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      New Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                      placeholder="Minimum 8 characters"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30 focus:outline-none focus:border-brand-plum"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      required
                      minLength={8}
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                      placeholder="Re-enter new password"
                      className="w-full px-4 py-2.5 rounded-xl border border-brand-blush text-xs text-brand-plum bg-brand-ivory/30 focus:outline-none focus:border-brand-plum"
                    />
                  </div>
                </div>

                <div className="bg-brand-ivory/40 p-3 rounded-2xl border border-brand-blush/40 text-[11px] text-brand-plum/70 space-y-1">
                  <p className="font-semibold text-brand-plum flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-brand-gold-dark" /> Security Guarantee
                  </p>
                  <p>
                    Passwords are never saved in plain text. They are hashed using 12 salt rounds of bcrypt and stored in an isolated database record. Never share your credentials.
                  </p>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-brand-plum hover:bg-brand-plum-deep shadow-luxury flex items-center gap-2 disabled:opacity-50"
                  >
                    {passwordLoading ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        <span>Updating Password...</span>
                      </>
                    ) : (
                      <>
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Update Admin Password</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>

      {/* Confirmation Dialog for Destructive Actions */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-brand-blush shadow-luxury">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>

            <h4 className="font-serif font-bold text-lg text-brand-plum">
              Confirm Delete
            </h4>

            <p className="text-xs text-brand-plum/70 font-light">
              Are you sure you want to delete <strong className="font-semibold text-brand-plum">{deleteConfirm.name}</strong>? This action cannot be undone.
            </p>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-brand-plum/70 hover:bg-brand-ivory"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (deleteConfirm.type === 'service') handleDeleteService(deleteConfirm.id);
                  if (deleteConfirm.type === 'gallery') handleDeleteGallery(deleteConfirm.id);
                  if (deleteConfirm.type === 'testimonial') handleDeleteTestimonial(deleteConfirm.id);
                }}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-rose-600 hover:bg-rose-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
