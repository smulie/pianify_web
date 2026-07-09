'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

export default function RequestDemoClient() {
  const { t, language, setLanguage } = useI18n();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [teamSize, setTeamSize] = useState('1-5');
  const [useCase, setUseCase] = useState('');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError(language === 'vi' ? 'Vui lòng đồng ý với chính sách bảo mật.' : 'Please consent to the privacy policy.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate form submission to a backend (Wait 1.5 seconds)
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError(t('errGeneric'));
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div style={{ background: '#0b0912', color: '#F9F9FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <Link href="/" className="nav-brand">
            <img src="/logo.png" alt="Pianify Logo" className="nav-logo" />
            <span className="nav-logo-text">Orbit</span>
          </Link>

          <ul className="nav-menu">
            <li><Link href="/showcase" className="nav-link">{t('navShowcase')}</Link></li>
            <li><Link href="/pricing" className="nav-link">{t('navPricing')}</Link></li>
            <li><Link href="/security" className="nav-link">{t('navSecurity')}</Link></li>
            <li><Link href="/resources" className="nav-link">{t('navResources')}</Link></li>
          </ul>

          <div className="nav-actions">
            {/* Language switcher */}
            <div className="nav-lang-switcher">
              <button 
                onClick={() => setLanguage('en')} 
                className={`nav-lang-btn ${language === 'en' ? 'active' : ''}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('vi')} 
                className={`nav-lang-btn ${language === 'vi' ? 'active' : ''}`}
              >
                VI
              </button>
            </div>

            <Link href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 600 }}>
              {t('navSignIn')}
            </Link>

            <Link href="/request-demo" className="nav-cta-btn">
              {t('navRequestDemo')}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'start' }}>
          
          {/* Left Column: Visual Sidebar info */}
          <div style={{ position: 'sticky', top: 120 }}>
            <h1 className="hero-title" style={{ fontSize: 38, marginBottom: 16 }}>{t('demoTitle')}</h1>
            <p className="hero-subtitle" style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', marginBottom: 40 }}>{t('demoSubtitle')}</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ display: 'flex', gap: 16, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: 20, borderRadius: 12 }}>
                <span style={{ fontSize: 24 }}>🎮</span>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t('solutionsGameTitle')}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{t('solutionsGameSub')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: 20, borderRadius: 12 }}>
                <span style={{ fontSize: 24 }}>📱</span>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t('solutionsMobileTitle')}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{t('solutionsMobileSub')}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 16, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', padding: 20, borderRadius: 12 }}>
                <span style={{ fontSize: 24 }}>🧪</span>
                <div>
                  <h4 style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginBottom: 4 }}>{t('solutionsGameTitle')}</h4>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{t('solutionsQASub')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="card" style={{ maxWidth: 'none', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', padding: 40, borderRadius: 20 }}>
            {success ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <div className="success-icon" style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid #22c55e', color: '#22c55e', width: 64, height: 64, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 32, margin: '0 auto 24px' }}>
                  ✓
                </div>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                  {language === 'vi' ? 'Gửi yêu cầu thành công!' : 'Demo Request Sent!'}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 24 }}>
                  {t('demoFormSuccess')}
                </p>
                <Link href="/" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '10px 24px', borderRadius: 30 }}>
                  {t('backToHomeBtn')}
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="alert alert-error" style={{ marginBottom: 20 }}>
                    {error}
                  </div>
                )}

                <div className="form-group">
                  <label className="form-label">{t('demoFormName')}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="Jane Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('demoFormEmail')}</label>
                  <input
                    type="email"
                    required
                    className="form-input"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                  <div className="form-group">
                    <label className="form-label">{t('demoFormCompany')}</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Acme Studio"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">{t('demoFormRole')}</label>
                    <input
                      type="text"
                      required
                      className="form-input"
                      placeholder="Engineering Lead"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('demoFormTeamSize')}</label>
                  <select
                    className="form-input"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    disabled={loading}
                    style={{ background: '#1e1c31', cursor: 'pointer' }}
                  >
                    <option value="1-5">1-5</option>
                    <option value="6-20">6-20</option>
                    <option value="21-100">21-100</option>
                    <option value="100+">100+</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('demoFormUseCase')}</label>
                  <input
                    type="text"
                    required
                    className="form-input"
                    placeholder="React Native / Godot Game Dev / C++"
                    value={useCase}
                    onChange={(e) => setUseCase(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('demoFormMessage')}</label>
                  <textarea
                    className="form-input"
                    rows={4}
                    placeholder="Tell us about your codebase challenge..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    disabled={loading}
                    style={{ resize: 'vertical', minHeight: 80 }}
                  />
                </div>

                {/* Consent checkbox */}
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', margin: '20px 0 24px 0' }}>
                  <input 
                    type="checkbox" 
                    id="consent" 
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    style={{ marginTop: 4, cursor: 'pointer' }}
                  />
                  <label htmlFor="consent" style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', cursor: 'pointer', lineHeight: 1.4 }}>
                    {language === 'vi' 
                      ? 'Tôi đồng ý cho phép Orbit xử lý thông tin biểu mẫu này liên hệ trực tiếp cho buổi demo theo ' 
                      : 'I consent to Orbit processing this form data to schedule a demo according to '}
                    <Link href="/privacy" style={{ color: '#e879f9', textDecoration: 'underline' }}>
                      {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
                    </Link>.
                  </label>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                  {loading ? <><div className="spinner" />{language === 'vi' ? 'Đang gửi...' : 'Submitting...'}</> : t('demoFormSubmit')}
                </button>

                <p style={{ fontSize: 11, textAlign: 'center', marginTop: 16, color: 'rgba(255,255,255,0.4)' }}>
                  {t('demoFormFallback')}
                </p>
              </form>
            )}
          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer-wrap" style={{ marginTop: 80 }}>
        <div className="footer-inner">
          <div className="footer-copy">
            © {currentYear} Orbit Coding Agent (Smulie Studio). All rights reserved.
          </div>
          <div className="footer-nav">
            <Link href="/privacy" className="footer-link">
              {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </Link>
            <Link href="/terms" className="footer-link">
              {language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}
            </Link>
            <Link href="/data-use" className="footer-link">
              {language === 'vi' ? 'Sử dụng dữ liệu' : 'Data Use'}
            </Link>
            <Link href="/security" className="footer-link">
              {language === 'vi' ? 'An ninh' : 'Security'}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
