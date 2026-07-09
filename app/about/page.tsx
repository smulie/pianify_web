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
            <span className="nav-logo-text">Pianify</span>
          </Link>

          <ul className="nav-menu">
            <li><Link href="/#features" className="nav-link">{t('navFeatures')}</Link></li>
            <li><Link href="/#courses" className="nav-link">{t('navCourses')}</Link></li>
            <li><Link href="/about" className="nav-link">{t('navAbout')}</Link></li>
            <li><Link href="/pricing" className="nav-link">{t('navPricing')}</Link></li>
            <li><Link href="/lessons" className="nav-link">{t('navLessons')}</Link></li>
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
            <div className="card" style={{ padding: 36, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🌟 {t('aboutMission')}</h2>
              <p>{t('aboutMissionDesc')}</p>
            </div>

            {/* Team */}
            <div className="card" style={{ padding: 36, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 16 }}>🎹 {t('aboutTeam')}</h2>
              <p style={{ marginBottom: 28 }}>{t('aboutTeamDesc')}</p>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
                <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🧑‍💻</div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: 14 }}>Anh Tuan</strong>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Lead Engineer</span>
                </div>
                <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>👩‍🏫</div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: 14 }}>Thu Huong</strong>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Head of Education</span>
                </div>
                <div style={{ padding: 20, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 12, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>🎼</div>
                  <strong style={{ display: 'block', color: '#fff', fontSize: 14 }}>Minh Tri</strong>
                  <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Curator & Composer</span>
                </div>
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
