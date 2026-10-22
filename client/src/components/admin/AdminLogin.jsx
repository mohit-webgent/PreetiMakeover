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
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={onBackToSite}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-plum/70 hover:text-brand-plum transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Public Website</span>
          </button>
        </div>

        {/* Brand Icon & Heading */}
        <div className="text-center">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-brand-plum to-brand-plum-deep text-brand-gold flex items-center justify-center font-serif text-2xl font-bold mx-auto mb-4 shadow-luxury">
            PM
          </div>
          <h2 className="font-serif text-3xl font-bold text-brand-plum tracking-tight">
            Salon Management Portal
          </h2>
          <p className="mt-2 text-xs text-brand-plum/60">
            Sign in to manage appointments, services, gallery, and salon schedule.
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-luxury rounded-3xl sm:px-10 border border-brand-blush/60">
          
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="adminEmail" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-brand-plum/40">
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
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum placeholder:text-brand-plum/30 transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="adminPassword" className="block text-xs font-bold uppercase tracking-wider text-brand-plum mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-3.5 text-brand-plum/40">
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
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-brand-blush/80 focus:border-brand-gold bg-brand-ivory/40 text-sm text-brand-plum placeholder:text-brand-plum/30 transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3.5 text-brand-plum/40 hover:text-brand-plum"
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
                className="w-full py-3.5 px-4 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-brand-plum to-brand-plum-light hover:from-brand-plum-deep hover:to-brand-plum shadow-luxury flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-brand-gold" />
                    <span>Secure Sign In</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-6 pt-6 border-t border-brand-blush/40 text-center">
            <span className="text-[11px] text-brand-plum/50">
              Protected by server-side JWT authentication & bcrypt encryption.
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}
