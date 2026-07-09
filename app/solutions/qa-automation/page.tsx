'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';

export default function QAAutomationPage() {
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
            {/* Language switcher */}
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
          <div className="section-header" style={{ marginBottom: 40 }}>
            <div style={{ display: 'inline-block', background: 'rgba(196, 66, 240, 0.15)', color: '#e879f9', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 16 }}>
              {language === 'vi' ? 'Giải pháp Kiểm thử & Tự động hóa' : 'QA & Automation'}
            </div>
            <h1 className="section-title">{t('solutionsQATitle')}</h1>
            <p className="section-subtitle">{t('solutionsQASub')}</p>
          </div>

          {/* Details */}
          <div className="card" style={{ padding: '36px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#fff' }}>
              🧪 {language === 'vi' ? 'Viết kịch bản test khói tự động & Crawl dữ liệu bài học' : 'Auto Smoke Tests & Lesson Crawling'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              <p>
                {language === 'vi'
                  ? 'Việc duy trì các bài kiểm thử hồi quy (regression) và xác định tính chính xác của dữ liệu cấu trúc phức tạp (như nhạc lý, tọa độ bản đồ game) luôn là gánh nặng cho kỹ sư QA. Orbit giải phóng sức lao động bằng cách tự thiết kế crawler bot phân tích cấu trúc bài học JSON nhạc lý của Pianify, chạy thử qua máy ảo âm thanh và tự so khớp sai lệch nốt nhạc.'
                  : 'Maintaining regression test sets and validating complex structured assets (like sheet music formats or coordinate data grids) is a heavy burden for QA engineers. Orbit eliminates manual effort by coding custom crawler bots that parse musical JSON, stream audio signals, and assert expected notes against pitch detection outputs.'}
              </p>
            </div>
          </div>

          {/* Proof */}
          <div className="card" style={{ padding: '30px', background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>
              🏆 {language === 'vi' ? 'Chứng thực dự án: QA Crawler tự động' : 'Pianify QA Crawler Study'}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 16 }}>
              {t('proofCard3Desc')}
            </p>
            <Link href="/showcase#course-crawler" style={{ fontSize: 13, fontWeight: 700, color: '#10b981', textDecoration: 'none' }}>
              {language === 'vi' ? 'Xem chi tiết showcase →' : 'View full showcase case study →'}
            </Link>
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
            <Link href="/privacy" className="footer-link">{t('resetPassword')}</Link>
            <Link href="/terms" className="footer-link">{t('deleteAccount')}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
