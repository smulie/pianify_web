'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function LessonsPage() {
  const { t, language, setLanguage } = useI18n();
  const currentYear = new Date().getFullYear();

  const handleBookAlert = (tutor: string) => {
    alert(`${language === 'vi' ? 'Đang kết nối lịch hẹn của giảng viên' : 'Opening booking schedule for'} ${tutor}.\n\n${language === 'vi' ? 'Buổi học sẽ được sắp xếp và thông báo qua email của bạn.' : 'Sessions are scheduled and notified via your registered student email.'}`);
  };

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
        <div className="container" style={{ maxWidth: 840 }}>
          
          <div className="section-header" style={{ marginBottom: 50 }}>
            <div style={{ display: 'inline-block', background: 'rgba(196, 66, 240, 0.15)', color: '#e879f9', fontSize: 12, fontWeight: 700, padding: '4px 12px', borderRadius: 20, marginBottom: 16 }}>
              {language === 'vi' ? 'Học viên & Giảng viên' : 'Personal Tutoring'}
            </div>
            <h1 className="section-title">{t('lessonsTitle')}</h1>
            <p className="section-subtitle">{t('lessonsSubtitle')}</p>
          </div>

          {/* Details */}
          <div className="card" style={{ padding: '36px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, marginBottom: 50 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#fff' }}>
              🎥 {language === 'vi' ? 'Đẩy nhanh tiến trình cùng chuyên gia' : 'Accelerate Progress with Professional Guidance'}
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
              {t('lessonsDesc')}
            </p>
          </div>

          {/* Featured Tutors */}
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', marginBottom: 24, textAlign: 'center' }}>
              👩‍🏫 {t('tutorsListTitle')}
            </h2>
            
            <div className="support-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
              <div className="card" style={{ padding: 28, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>👩‍🏫</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{t('tutor1Name')}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20 }}>{t('tutor1Bio')}</p>
                </div>
                <button 
                  onClick={() => handleBookAlert(t('tutor1Name'))}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10, cursor: 'pointer' }}
                >
                  {t('bookTutor')}
                </button>
              </div>

              <div className="card" style={{ padding: 28, background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 32, marginBottom: 12 }}>👨‍🏫</div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 8 }}>{t('tutor2Name')}</h3>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5, marginBottom: 20 }}>{t('tutor2Bio')}</p>
                </div>
                <button 
                  onClick={() => handleBookAlert(t('tutor2Name'))}
                  className="btn-primary" 
                  style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10, cursor: 'pointer' }}
                >
                  {t('bookTutor')}
                </button>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer Section */}
      <footer className="footer-wrap" style={{ marginTop: 80 }}>
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
