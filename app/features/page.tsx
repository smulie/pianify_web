'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function FeaturesPage() {
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
            <li><Link href="/features" className="nav-link active">{t('navFeatures')}</Link></li>
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

      {/* Hero Section */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          
          <div className="section-header" style={{ marginBottom: 60 }}>
            <div style={{ display: 'inline-block', background: 'rgba(196, 66, 240, 0.12)', color: '#e879f9', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, marginBottom: 18, textTransform: 'uppercase', letterSpacing: 0.5 }}>
              ⚡ {language === 'vi' ? 'Trực quan & Sinh động' : 'Interactive Showcases'}
            </div>
            <h1 className="section-title">{t('featuresPageTitle')}</h1>
            <p className="section-subtitle">{t('featuresPageSub')}</p>
          </div>

          {/* Feature 1: Touch Mode */}
          <div className="features-showcase-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center', marginBottom: 100 }}>
            <div className="showcase-details">
              <div style={{ background: 'rgba(196, 66, 240, 0.1)', color: '#e879f9', padding: '8px 16px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
                📱 {t('featurePathTitle')}
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
                {language === 'vi' ? 'Chơi nhạc ngay trên màn hình' : 'Learn Directly on Your Screen'}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
                {t('touchModeFullDesc')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Nhận diện đa điểm chạm (Multi-touch)' : 'Multi-touch virtual keys'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Mini-games luyện tai & nhạc lý' : 'Interactive ear training mini-games'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Luyện tập mọi nơi, không cần đàn thật' : 'Practice anytime without instruments'}
                </li>
              </ul>
            </div>
            <div className="showcase-visual" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                borderRadius: 24,
                border: '8px solid #2a2438',
                background: '#000',
                padding: 0,
                width: '100%',
                maxWidth: 320,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(196, 66, 240, 0.15)'
              }}>
                <video 
                  src="/Game plays.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', margin: '80px 0' }} />

          {/* Feature 2: Real Piano AI Mode */}
          <div className="features-showcase-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center', marginBottom: 60 }}>
            <div className="showcase-visual" style={{ display: 'flex', justifyContent: 'center', order: 2 }}>
              <div style={{
                position: 'relative',
                borderRadius: 20,
                border: '6px solid #2a2438',
                background: '#000',
                padding: 0,
                width: '100%',
                maxWidth: 320,
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(196, 66, 240, 0.15)'
              }}>
                <video 
                  src="/real piano.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  controls
                  style={{ width: '100%', height: 'auto', display: 'block' }} 
                />
              </div>
            </div>
            <div className="showcase-details" style={{ order: 1 }}>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#4ade80', padding: '8px 16px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
                🎹 {t('featureSongsTitle')}
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
                {language === 'vi' ? 'Kết nối đàn thật nhận phản hồi AI' : 'Play Real Piano with AI Coach'}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
                {t('aiModeFullDesc')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Lắng nghe qua Micro tự động của điện thoại' : 'Sound engine listening via mic'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Nhận diện nốt và nhịp điệu chính xác 100%' : '100% accurate note recognition feedback'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Kết nối cáp MIDI / Bluetooth MIDI độ trễ bằng không' : 'Direct USB-MIDI & Bluetooth MIDI compatibility'}
                </li>
              </ul>
            </div>
          </div>

          <hr style={{ border: 'none', height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)', margin: '80px 0' }} />

          {/* Feature 3: Gamification & Habit Building */}
          <div className="features-showcase-row" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 60, alignItems: 'center', marginBottom: 60 }}>
            <div className="showcase-details">
              <div style={{ background: 'rgba(124, 58, 237, 0.1)', color: '#a78bfa', padding: '8px 16px', borderRadius: 10, display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20, fontSize: 13, fontWeight: 700 }}>
                🏆 {t('gamificationPageTitle')}
              </div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#fff', marginBottom: 20, lineHeight: 1.2 }}>
                {language === 'vi' ? 'Học tập lôi cuốn như chơi game mobile' : 'Addictive Piano Learning Loop'}
              </h2>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, marginBottom: 24 }}>
                {t('gamificationPageDesc')}
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Lên cấp, mở khóa danh hiệu & danh tiếng' : 'Level up, unlock custom badges & titles'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Duy trì Streak luyện tập hàng ngày cùng mascot' : 'Keep practice Streaks alive with your mascot'}
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#fff' }}>
                  <span style={{ color: '#4ade80' }}>✓</span> {language === 'vi' ? 'Tranh tài leo Bảng xếp hạng liên đoàn thế giới' : 'Compete in weekly Global Leagues leaderboards'}
                </li>
              </ul>
            </div>
            <div className="showcase-visual" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                borderRadius: 20,
                background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.05) 0%, rgba(15, 12, 30, 0.4) 100%)',
                border: '1px solid rgba(124, 58, 237, 0.2)',
                padding: '30px',
                width: '100%',
                maxWidth: 420,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 20px 40px rgba(124, 58, 237, 0.08)'
              }}>
                <img src="/mascot_win_woohoo.webp" alt="Mascot Celebration" style={{ width: '80%', height: 'auto', maxHeight: 220, objectFit: 'contain', marginBottom: 20 }} />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, fontWeight: 700, color: '#fff' }}>
                    <span>🔥 7-Day Streak!</span>
                    <span style={{ color: '#e879f9' }}>+100 XP</span>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.05)', height: 8, borderRadius: 4, width: '100%', position: 'relative' }}>
                    <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: '100%', background: '#C442F0', borderRadius: 4 }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer-wrap" style={{ marginTop: 100 }}>
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
