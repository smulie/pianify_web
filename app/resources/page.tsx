'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function ResourcesPage() {
  const { t, language, setLanguage } = useI18n();
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
            <div className="nav-lang-switcher">
              <button onClick={() => setLanguage('en')} className={`nav-lang-btn ${language === 'en' ? 'active' : ''}`}>EN</button>
              <button onClick={() => setLanguage('vi')} className={`nav-lang-btn ${language === 'vi' ? 'active' : ''}`}>VI</button>
            </div>
            <Link href="/login" className="nav-link" style={{ fontSize: 14, fontWeight: 600 }}>{t('navSignIn')}</Link>
            <Link href="/request-demo" className="nav-cta-btn">{t('navRequestDemo')}</Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container" style={{ maxWidth: 840 }}>
          
          <div className="section-header" style={{ marginBottom: 50 }}>
            <h1 className="section-title">Developer Resources</h1>
            <p className="section-subtitle">
              {language === 'vi' 
                ? 'Tìm kiếm tài liệu, theo dõi lịch trình cập nhật và tham gia cộng đồng nhà phát triển Orbit.' 
                : 'Access product documentation, view recent updates, and connect with developers using Orbit.'}
            </p>
          </div>

          {/* Grid Layout */}
          <div className="support-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 24, marginBottom: 60 }}>
            
            {/* Box 1: Docs */}
            <div className="card" style={{ padding: 30, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📚</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{language === 'vi' ? 'Tài liệu phát triển (Docs)' : 'Documentation'}</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20 }}>
                {language === 'vi' ? 'Tài liệu API, cấu hình thiết lập Agent và hướng dẫn kết nối Native Module.' : 'Detailed installation guides, SDK setup APIs, and custom prompt configurations.'}
              </p>
              <button onClick={() => alert('Documentation hub under development')} className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none' }}>
                Open Docs
              </button>
            </div>

            {/* Box 2: Changelog */}
            <div className="card" style={{ padding: 30, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Changelog</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20 }}>
                {language === 'vi' ? 'Nhật ký cập nhật tính năng mới nhất của Orbit IDE và AI Agent.' : 'Latest feature announcements, bug fixes, and model version updates for Orbit IDE.'}
              </p>
              <button onClick={() => alert('Changelog hub under development')} className="btn-primary" style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none' }}>
                View Changelog
              </button>
            </div>

            {/* Box 3: FAQ */}
            <div className="card" style={{ padding: 30, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>❓</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>FAQs</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20 }}>
                {language === 'vi' ? 'Tổng hợp 10 câu hỏi thường gặp nhất về an ninh dữ liệu và khả năng tích hợp.' : 'Top questions regarding codebase compliance, offline support, and billing.'}
              </p>
              <Link href="/faq" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', display: 'block', width: '100%', padding: '10px', fontSize: 13, borderRadius: 10 }}>
                Go to FAQs
              </Link>
            </div>

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
            <Link href="/privacy" className="footer-link">{language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}</Link>
            <Link href="/terms" className="footer-link">{language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
