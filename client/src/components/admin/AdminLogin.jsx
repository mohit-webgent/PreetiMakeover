import React, { useState } from 'react';
import { Lock, Mail, Eye, EyeOff, ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';

export default function AdminLogin({ onLoginSuccess, onBackToSite }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.adminLogin(email.trim(), password);
      if (response && response.success && response.data?.token) {
        onLoginSuccess(response.data.token, response.data.admin);
      } else {
        throw new Error(response?.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please verify your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-salon-berry/70 hover:text-salon-berry transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>
        </div>

        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/pm_logo.png"
              alt="Preeti Makeover Crest"
              className="h-16 w-auto object-contain filter drop-shadow-[0_4px_12px_rgba(229,143,176,0.45)]"
            />
          </div>
          <h2 className="font-serif text-3xl font-bold text-salon-berry tracking-tight">
            Salon Management Portal
          </h2>
          <p className="mt-2 text-xs text-salon-text-muted">
            Sign in to manage appointments, services, gallery, and salon schedule.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-luxury rounded-3xl sm:px-10 border border-salon-blush/60">
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="adminEmail" className="block text-xs font-bold uppercase tracking-wider text-salon-berry mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-salon-text-muted">
                  <Mail className="w-4 h-4" />
                </span>
                <input
                  id="adminEmail"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="admin@preetimakeover.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-salon-blush/80 focus:border-salon-petal bg-salon-blush-light/40 text-sm text-salon-berry placeholder:text-salon-berry/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-xs font-bold uppercase tracking-wider text-salon-berry mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-salon-text-muted">
                  <Lock className="w-4 h-4" />
                </span>
                <input
                  id="adminPassword"
                  type={showPassword ? 'text' : 'password'}
                  required
                  autoComplete="current-password"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-salon-blush/80 focus:border-salon-petal bg-salon-blush-light/40 text-sm text-salon-berry placeholder:text-salon-berry/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-salon-text-muted hover:text-salon-berry"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-salon-berry to-salon-berry-light hover:from-salon-berry-deep hover:to-salon-berry shadow-luxury flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-salon-petal border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-salon-petal" />
                    <span>Secure Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-salon-blush/40 text-center">
            <span className="text-[11px] text-salon-text-muted">
              Protected by server-side JWT authentication & bcrypt encryption.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
