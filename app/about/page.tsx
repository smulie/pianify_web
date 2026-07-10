'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function AboutPage() {
  const { t, language, setLanguage } = useI18n();
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ background: '#0b0912', color: '#F9F9FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <Link href="/" className="nav-brand">
            <img src="/logo.png" alt="Pianify Logo" className="nav-logo" />
          </Link>

          <ul className="nav-menu">
            <li><Link href="/#features" className="nav-link">{t('navFeatures')}</Link></li>
            <li><Link href="/#courses" className="nav-link">{t('navCourses')}</Link></li>
            <li><Link href="/about" className="nav-link">{t('navAbout')}</Link></li>
            <li><Link href="/pricing" className="nav-link">{t('navPricing')}</Link></li>
            <li><Link href="/faq" className="nav-link">{t('navFAQ')}</Link></li>
          </ul>

          <div className="nav-actions">
            <div className="nav-lang-switcher">
              <button onClick={() => setLanguage('en')} className={`nav-lang-btn ${language === 'en' ? 'active' : ''}`}>EN</button>
              <button onClick={() => setLanguage('vi')} className={`nav-lang-btn ${language === 'vi' ? 'active' : ''}`}>VI</button>
            </div>
            <Link href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 600 }}>{t('navSignIn')}</Link>
            <a href="https://pianify.onelink.me/eBlV/zwsurowk" className="nav-cta-btn">{t('navDownload')}</a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container" style={{ maxWidth: 800 }}>
          
          <div className="section-header" style={{ marginBottom: 50, textAlign: 'left' }}>
            <h1 className="section-title" style={{ fontSize: 36 }}>{t('aboutTitle')}</h1>
            <p className="section-subtitle" style={{ fontSize: 16, margin: '8px 0 0 0' }}>{t('aboutSubtitle')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 40, fontSize: 15.5, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            
            {/* Mission */}
            <div className="card" style={{ padding: 36, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, display: 'flex', gap: 24, alignItems: 'center', flexWrap: 'wrap', maxWidth: 'none' }}>
              <div style={{ flex: '1 1 450px' }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🌟 {t('aboutMission')}</h2>
                <p>{t('aboutMissionDesc')}</p>
              </div>
              <div style={{ flex: '0 0 120px', display: 'flex', justifyContent: 'center' }}>
                <img src="/mascot_flow_book.webp" alt="Mascot Book" style={{ width: 120, height: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer-wrap">
        <div className="footer-inner">
          <div className="footer-copy">
            © {currentYear} Pianify (Smulie Studio). All rights reserved.
          </div>
          <div className="footer-nav">
            <a href="https://smulie.com/privacy" target="_blank" rel="noopener noreferrer" className="footer-link">
              {language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}
            </a>
            <a href="https://smulie.com/terms" target="_blank" rel="noopener noreferrer" className="footer-link">
              {language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
