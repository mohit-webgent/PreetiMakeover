import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function AdminPage({ adminToken, adminUser, onLoginSuccess, onLogout }) {
  const navigate = useNavigate();

  const handleBackToSite = () => {
    navigate('/');
  };

  if (!adminToken) {
    return (
      <div className="pt-20 min-h-screen bg-salon-blush flex items-center justify-center p-4">
        <AdminLogin onLoginSuccess={onLoginSuccess} onBackToSite={handleBackToSite} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <AdminDashboard 
        token={adminToken} 
        admin={adminUser} 
        onLogout={onLogout} 
        onBackToSite={handleBackToSite} 
      />
    </div>
  );
}
