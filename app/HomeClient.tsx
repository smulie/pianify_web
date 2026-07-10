'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from './LanguageContext';

export default function HomeClient() {
  const { t, language, setLanguage } = useI18n();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

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
            <li><Link href="/features" className="nav-link">{t('navFeatures')}</Link></li>
            <li><a href="#courses" className="nav-link">{t('navCourses')}</a></li>
            <li><Link href="/about" className="nav-link">{t('navAbout')}</Link></li>
            <li><Link href="/pricing" className="nav-link">{t('navPricing')}</Link></li>
            <li><Link href="/faq" className="nav-link">{t('navFAQ')}</Link></li>
          </ul>

          <div className="nav-actions">
            {/* Custom language switcher inside header */}
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

            <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="nav-cta-btn">
              {t('navDownload')}
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <img src="/Pianify Icon.png" alt="Pianify Icon" style={{ width: 44, height: 44, borderRadius: 10, boxShadow: '0 4px 12px rgba(196, 66, 240, 0.3)' }} />
              <div style={{ display: 'inline-block', background: 'rgba(196, 66, 240, 0.12)', color: '#e879f9', fontSize: 12, fontWeight: 700, padding: '6px 14px', borderRadius: 20, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                🎯 {language === 'vi' ? 'Luyện tập 10 Phút mỗi ngày' : '10-Minute Daily Habit'}
              </div>
            </div>
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>
            <div className="hero-badges-wrapper">
              <a href="https://apps.apple.com/vn/app/pianify-learn-piano-habits/id6758273248" target="_blank" rel="noopener noreferrer" className="badge-btn">
                <img src="/apple.svg" alt="App Store" style={{ height: 48, width: 'auto' }} />
              </a>
              <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="badge-btn">
                <img src="/ggplay.svg" alt="Play Store" style={{ height: 48, width: 'auto' }} />
              </a>
            </div>
          </div>
          <div className="hero-visuals">
            <img src="/hero-app-preview.png" alt="Pianify App Interface on Tablet" className="hero-mockup" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="container stats-grid">
          <div className="stat-item">
            <div className="stat-num">{t('statsRating')}</div>
            <div className="stat-label">{t('statsRatingLabel')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{t('statsSongs')}</div>
            <div className="stat-label">{t('statsSongsLabel')}</div>
          </div>
          <div className="stat-item">
            <div className="stat-num">{t('statsLessons')}</div>
            <div className="stat-label">{t('statsLessonsLabel')}</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('featuresTitle')}</h2>
            <p className="section-subtitle">{t('featuresSubtitle')}</p>
          </div>

          <div className="features-grid">
            {/* Feature 1: Gamification */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <h3>{t('featureFeedbackTitle')}</h3>
              <p>{t('featureFeedbackDesc')}</p>
              <div className="feature-visual-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', padding: '10px 0' }}>
                <img src="/mascot_win_streakfire.webp" alt="Streak Fire Mascot" style={{ height: 110, width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            {/* Feature 2: Rhythm Game & Lessons */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              </div>
              <h3>{t('featurePathTitle')}</h3>
              <p>{t('featurePathDesc')}</p>
              <div className="feature-visual-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', padding: '10px 0' }}>
                <img src="/mascot_learn_piano_solo.webp" alt="Piano Solo Mascot" style={{ height: 110, width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>

            {/* Feature 3: Real Piano AI Mode */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </div>
              <h3>{t('featureSongsTitle')}</h3>
              <p>{t('featureSongsDesc')}</p>
              <div className="feature-visual-placeholder" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'transparent', padding: '10px 0' }}>
                <img src="/mascot_system_askmic.webp" alt="Microphone AI Mascot" style={{ height: 110, width: 'auto', objectFit: 'contain' }} />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/features" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 10, cursor: 'pointer', textDecoration: 'none' }}>
              {t('watchDemoBtn')} →
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('howItWorksTitle')}</h2>
            <p className="section-subtitle">{t('howItWorksSubtitle')}</p>
          </div>

          <div className="how-timeline">
            <div className="how-step">
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎮</div>
              <h3>{t('step1Title')}</h3>
              <p>{t('step1Desc')}</p>
            </div>
            <div className="how-step">
              <div style={{ fontSize: 32, marginBottom: 16 }}>⚡</div>
              <h3>{t('step2Title')}</h3>
              <p>{t('step2Desc')}</p>
            </div>
            <div className="how-step">
              <div style={{ fontSize: 32, marginBottom: 16 }}>📈</div>
              <h3>{t('step3Title')}</h3>
              <p>{t('step3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Highlights */}
      <section id="courses" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('coursesTitle')}</h2>
            <p className="section-subtitle">{t('coursesSubtitle')}</p>
          </div>

          <div className="courses-grid">
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">📱</span>
              </div>
              <div className="course-info">
                <h3>{t('course1Title')}</h3>
                <p>{t('course1Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🎹</span>
              </div>
              <div className="course-info">
                <h3>{t('course2Title')}</h3>
                <p>{t('course2Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🎵</span>
              </div>
              <div className="course-info">
                <h3>{t('course3Title')}</h3>
                <p>{t('course3Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🏛️</span>
              </div>
              <div className="course-info">
                <h3>{t('course4Title')}</h3>
                <p>{t('course4Desc')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('reviewsTitle')}</h2>
            <p className="section-subtitle">{t('reviewsSubtitle')}</p>
          </div>

          <div className="reviews-grid">
            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{t('review1Text')}"</p>
              <div className="review-user">
                <div className="review-avatar">ER</div>
                <div>
                  <div className="review-username">{t('review1Name')}</div>
                  <div className="review-userrole">{t('review1Role')}</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{t('review2Text')}"</p>
              <div className="review-user">
                <div className="review-avatar">MT</div>
                <div>
                  <div className="review-username">{t('review2Name')}</div>
                  <div className="review-userrole">{t('review2Role')}</div>
                </div>
              </div>
            </div>

            <div className="review-card">
              <div className="review-stars">★★★★★</div>
              <p className="review-text">"{t('review3Text')}"</p>
              <div className="review-user">
                <div className="review-avatar">DK</div>
                <div>
                  <div className="review-username">{t('review3Name')}</div>
                  <div className="review-userrole">{t('review3Role')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Accordion */}
      <section id="faq" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('faqTitle')}</h2>
            <p className="section-subtitle">{t('faqSubtitle')}</p>
          </div>

          <div className="faq-box">
            {/* FAQ Item 1 */}
            <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                <span>{t('faqQ1')}</span>
                <span className="faq-icon-arrow">▼</span>
              </button>
              <div className="faq-answer-panel" style={{
                maxHeight: activeFaq === 0 ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease-out'
              }}>
                <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px' }}>{t('faqA1')}</div>
              </div>
            </div>

            {/* FAQ Item 2 */}
            <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                <span>{t('faqQ2')}</span>
                <span className="faq-icon-arrow">▼</span>
              </button>
              <div className="faq-answer-panel" style={{
                maxHeight: activeFaq === 1 ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease-out'
              }}>
                <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px' }}>{t('faqA2')}</div>
              </div>
            </div>

            {/* FAQ Item 3 */}
            <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                <span>{t('faqQ3')}</span>
                <span className="faq-icon-arrow">▼</span>
              </button>
              <div className="faq-answer-panel" style={{
                maxHeight: activeFaq === 2 ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease-out'
              }}>
                <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px' }}>{t('faqA3')}</div>
              </div>
            </div>

            {/* FAQ Item 4 */}
            <div className={`faq-item ${activeFaq === 3 ? 'active' : ''}`}>
              <button className="faq-question-btn" onClick={() => toggleFaq(3)}>
                <span>{t('faqQ4')}</span>
                <span className="faq-icon-arrow">▼</span>
              </button>
              <div className="faq-answer-panel" style={{
                maxHeight: activeFaq === 3 ? '200px' : '0px',
                overflow: 'hidden',
                transition: 'max-height 0.2s ease-out'
              }}>
                <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px' }}>{t('faqA4')}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner Section */}
      <section className="section container">
        <div className="cta-banner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <img src="/Pianify Icon.png" alt="Pianify Icon" style={{ width: 80, height: 80, borderRadius: 16, marginBottom: 20, boxShadow: '0 8px 24px rgba(196, 66, 240, 0.4)' }} />
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSubtitle')}</p>
          <div className="hero-badges-wrapper" style={{ justifyContent: 'center', gap: 16 }}>
            <a href="https://apps.apple.com/vn/app/pianify-learn-piano-habits/id6758273248" target="_blank" rel="noopener noreferrer" className="badge-btn">
              <img src="/apple.svg" alt="App Store" style={{ height: 48, width: 'auto' }} />
            </a>
            <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="badge-btn">
              <img src="/ggplay.svg" alt="Play Store" style={{ height: 48, width: 'auto' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Support Section */}
      <section className="section container" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 60, paddingBottom: 60 }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div className="section-header" style={{ marginBottom: 40, display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 450px', textAlign: 'left' }}>
              <h2 className="section-title" style={{ margin: 0, fontSize: 24 }}>{t('supportTitle')}</h2>
              <p className="section-subtitle" style={{ margin: '8px 0 0 0', fontSize: 14 }}>
                {language === 'vi' 
                  ? 'Quản lý mật khẩu tài khoản học viên và yêu cầu xử lý thông tin cá nhân của bạn.' 
                  : 'Manage your student profile password and request personal data handling.'}
              </p>
            </div>
            <div style={{ flex: '0 0 80px', display: 'flex', justifyContent: 'center' }}>
              <img src="/mascot_system_support.webp" alt="Support Portal Mascot" style={{ width: 80, height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

          <div className="support-cards-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
            <Link href="/reset-password" style={{ padding: '30px 20px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, textAlign: 'center', transition: 'all 0.2s', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🔑</div>
              <div style={{ color: '#e879f9', fontSize: 15, fontWeight: 700 }}>
                {t('resetPassword')}
              </div>
            </Link>
            <Link href="/delete-account" style={{ padding: '30px 20px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, textAlign: 'center', transition: 'all 0.2s', textDecoration: 'none', display: 'block' }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>❌</div>
              <div style={{ color: '#fca5a5', fontSize: 15, fontWeight: 700 }}>
                {t('deleteAccount')}
              </div>
            </Link>
          </div>
        </div>
      </section>

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
