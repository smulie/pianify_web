'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

export default function LoginPage() {
  const { t, language, setLanguage } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setError(t('errIncorrectCreds'));
    }, 1200);
  };

  const handleOAuth = (provider: string) => {
    alert(`${language === 'vi' ? 'Đang kết nối' : 'Initializing login for'} ${provider}...`);
  };

  const currentYear = new Date().getFullYear();

  return (
    <div style={{ background: '#0b0912', color: '#F9F9FB', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navbar Minimal */}
      <header className="navbar">
        <div className="navbar-container" style={{ justifyContent: 'center' }}>
          <Link href="/" className="nav-brand">
            <img src="/logo.png" alt="Pianify Logo" className="nav-logo" />
          </Link>
        </div>
      </header>

      {/* Main Box */}
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '100px 24px 40px 24px' }}>
        <div className="card" style={{ width: '100%', maxWidth: 400, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 36, borderRadius: 20 }}>
          
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
            <img src="/mascot_flow_encourage.webp" alt="Welcome Mascot" style={{ width: 80, height: 'auto', objectFit: 'contain' }} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: '#fff' }}>
            {t('authLoginTitle')}
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 28 }}>
            {t('authLoginSub')}
          </p>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label className="form-label">{t('accountEmail')}</label>
              <input 
                type="email" 
                required 
                className="form-input" 
                placeholder="student@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                <label className="form-label" style={{ marginBottom: 0 }}>{t('passwordLabel')}</label>
                <Link href="/reset-password" style={{ fontSize: 11, color: '#e879f9', textDecoration: 'underline' }}>
                  {language === 'vi' ? 'Quên mật khẩu?' : 'Forgot password?'}
                </Link>
              </div>
              <input 
                type="password" 
                required 
                className="form-input" 
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button type="submit" className="btn-primary" disabled={loading} style={{ margin: '16px 0 24px 0' }}>
              {loading ? t('authenticating') : t('navSignIn')}
            </button>
          </form>

          <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
            {t('or')}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            <button 
              onClick={() => handleOAuth('Google')}
              className="btn-oauth hover-scale"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '10px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}
            >
              🌐 {t('continueWithGoogle')}
            </button>
            <button 
              onClick={() => handleOAuth('Apple')}
              className="btn-oauth hover-scale"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '10px',
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'all 0.2s'
              }}
            >
              🍎 {t('continueWithApple')}
            </button>
          </div>

          <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
            {language === 'vi' ? 'Chưa có tài khoản?' : "Don't have an account?"}{' '}
            <Link href="/signup" style={{ color: '#e879f9', fontWeight: 600 }}>
              {language === 'vi' ? 'Đăng ký ngay' : 'Sign Up'}
            </Link>
          </div>

        </div>
      </main>

      {/* Footer Minimal */}
      <footer className="footer-wrap">
        <div className="footer-inner" style={{ justifyContent: 'center' }}>
          <div className="footer-copy">
            © {currentYear} Pianify (Smulie Studio). All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
