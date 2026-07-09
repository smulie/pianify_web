'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';

export default function GameStudiosPage() {
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
              {language === 'vi' ? 'Giải pháp cho Game' : 'Game Development'}
            </div>
            <h1 className="section-title">{t('solutionsGameTitle')}</h1>
            <p className="section-subtitle">{t('solutionsGameSub')}</p>
          </div>

          {/* Workflow details */}
          <div className="card" style={{ padding: '36px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, marginBottom: 40 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#fff' }}>
              🔧 {language === 'vi' ? 'Quy trình tích hợp Game Engine' : 'Game Engine Integration Loop'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, fontSize: 14.5, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              <p>
                {language === 'vi'
                  ? 'Các mô hình AI thông thường chỉ làm việc trên tệp văn bản code đơn lập và không hiểu cấu trúc phân cấp cảnh (scene hierarchy), tài nguyên asset game hoặc tệp cấu hình engine. Orbit khắc phục rào cản này bằng cách tự động phân tích cây tài nguyên Godot, tệp định dạng cảnh (.tscn) và thiết lập môi trường build tự động để kiểm thử sự đổi mới gameplay ngay trên máy ảo.'
                  : 'Generic coding tools only work on file-level texts and do not understand scene hierarchies, node patterns, or engine configurations. Orbit solves this by scanning Godot project folders, tracking .tscn files, and setting up compile environments to review gameplay loops instantly.'}
              </p>
              <p>
                {language === 'vi'
                  ? 'Tính năng chính bao gồm: đồng bộ hóa xúc giác haptic, cầu kết nối engine qua NDK và tối ưu luồng âm thanh không trễ.'
                  : 'Key features include: touch haptics configuration, sub-engine bridge compilation, and zero-latency audio hooks.'}
              </p>
            </div>
          </div>

          {/* Proof card preview */}
          <div className="card" style={{ padding: '30px', background: 'rgba(16, 185, 129, 0.02)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: '#10b981', marginBottom: 8 }}>
              🏆 {language === 'vi' ? 'Chứng thực dự án: Pianify Rhythm' : 'Pianify Rhythm Case Study'}
            </h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.5, marginBottom: 16 }}>
              {t('proofCard1Desc')}
            </p>
            <Link href="/showcase#rhythm-game" style={{ fontSize: 13, fontWeight: 700, color: '#10b981', textDecoration: 'none' }}>
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
