'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

export default function SignupPage() {
  const { t, language } = useI18n();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(language === 'vi' ? 'Mật khẩu xác nhận không khớp.' : 'Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  const handleOAuth = (provider: string) => {
    alert(`${language === 'vi' ? 'Đang kết nối liên kết' : 'Initializing oauth flow for'} ${provider}...`);
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
          
          {success ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div className="success-icon" style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', color: '#22c55e', width: 56, height: 56, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 20px' }}>
                ✓
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>
                {language === 'vi' ? 'Đăng ký tài khoản thành công!' : 'Account Created Successfully!'}
              </h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>
                {language === 'vi' ? 'Vui lòng kiểm tra email để xác thực tài khoản học viên trước khi đăng nhập.' : 'Please check your email inbox to verify your student account before logging in.'}
              </p>
              <Link href="/login" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '10px 24px', borderRadius: 30 }}>
                {t('navSignIn')}
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                <img src="/mascot_win_cool.webp" alt="Signup Mascot" style={{ width: 80, height: 'auto', objectFit: 'contain' }} />
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, textAlign: 'center', marginBottom: 8, color: '#fff' }}>
                {t('authSignupTitle')}
              </h2>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', textAlign: 'center', marginBottom: 24 }}>
                {t('authSignupSub')}
              </p>

              {error && (
                <div className="alert alert-error" style={{ marginBottom: 20 }}>
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup}>
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

                <div className="form-group">
                  <label className="form-label">{t('passwordLabel')}</label>
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

                <div className="form-group">
                  <label className="form-label">{language === 'vi' ? 'Xác nhận Mật khẩu' : 'Confirm Password'}</label>
                  <input 
                    type="password" 
                    required 
                    className="form-input" 
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <button type="submit" className="btn-primary" disabled={loading} style={{ margin: '16px 0 24px 0' }}>
                  {loading ? t('settingUp') : (language === 'vi' ? 'Đăng ký' : 'Sign Up')}
                </button>
              </form>

              <div style={{ textAlign: 'center', fontSize: 12, color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>
                {t('or')}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
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
              </div>

              <div style={{ textAlign: 'center', fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>
                {language === 'vi' ? 'Đã có tài khoản?' : 'Already have an account?'}{' '}
                <Link href="/login" style={{ color: '#e879f9', fontWeight: 600 }}>
                  {t('navSignIn')}
                </Link>
              </div>
            </>
          )}

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
