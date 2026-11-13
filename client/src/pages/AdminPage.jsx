import React from 'react';
import { useNavigate } from 'react-router-dom';
import AdminLogin from '../components/admin/AdminLogin';
import AdminDashboard from '../components/admin/AdminDashboard';

export default function AdminPage({ adminToken, adminUser, onLoginSuccess, onLogout, onContentUpdated }) {
  const navigate = useNavigate();

  const handleBackToSite = () => {
    navigate('/');
  };

  if (!adminToken) {
    return (
      <div className="admin-scope min-h-screen bg-salon-blush flex items-center justify-center p-4">
        <AdminLogin onLoginSuccess={onLoginSuccess} onBackToSite={handleBackToSite} />
      </div>
    );
  }

  return (
    <div className="admin-scope min-h-screen bg-paper">
      <AdminDashboard 
        token={adminToken} 
        admin={adminUser} 
        onLogout={onLogout} 
        onBackToSite={handleBackToSite}
        onContentUpdated={onContentUpdated}
        onTokenRefreshed={(newToken) => onLoginSuccess(newToken, adminUser)}
      />
    </div>
  );
}
