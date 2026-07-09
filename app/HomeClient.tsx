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
            <span className="nav-logo-text">Pianify</span>
          </Link>

          <ul className="nav-menu">
            <li><a href="#features" className="nav-link">{t('navFeatures')}</a></li>
            <li><a href="#courses" className="nav-link">{t('navCourses')}</a></li>
            <li><Link href="/about" className="nav-link">{t('navAbout')}</Link></li>
            <li><Link href="/pricing" className="nav-link">{t('navPricing')}</Link></li>
            <li><Link href="/lessons" className="nav-link">{t('navLessons')}</Link></li>
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
            <h1 className="hero-title">{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>
            <div className="hero-badges-wrapper">
              <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="badge-btn">
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
            <div className="stat-num">{t('statsDownloads')}</div>
            <div className="stat-label">{t('statsDownloadsLabel')}</div>
          </div>
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
            {/* Feature 1: Real-time Feedback */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
                  <path d="M19 10v1a7 7 0 0 1-14 0v-1"/>
                  <line x1="12" x2="12" y1="19" y2="22"/>
                </svg>
              </div>
              <h3>{t('featureFeedbackTitle')}</h3>
              <p>{t('featureFeedbackDesc')}</p>
              <div className="feature-visual-placeholder">
                <img src="/feature-feedback.png" alt="Real-Time Audio Recognition" />
              </div>
            </div>

            {/* Feature 2: Structured Curriculum */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                  <path d="M6 6h10"/>
                  <path d="M6 10h10"/>
                </svg>
              </div>
              <h3>{t('featurePathTitle')}</h3>
              <p>{t('featurePathDesc')}</p>
              <div className="feature-visual-placeholder">
                <img src="/feature-courses.png" alt="Structured Lesson Courses" />
              </div>
            </div>

            {/* Feature 3: Curated Library */}
            <div className="feature-card">
              <div className="feature-icon-wrapper">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18V5l12-2v13"/>
                  <circle cx="6" cy="18" r="3"/>
                  <circle cx="18" cy="16" r="3"/>
                </svg>
              </div>
              <h3>{t('featureSongsTitle')}</h3>
              <p>{t('featureSongsDesc')}</p>
              <div className="feature-visual-placeholder" style={{ background: 'linear-gradient(135deg, #1b1419 0%, #0b0912 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '80%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Für Elise - Beethoven</span>
                    <span style={{ color: '#e879f9', fontSize: 12, fontWeight: 700 }}>{language === 'vi' ? 'Cổ điển' : 'Classical'}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Let It Be - The Beatles</span>
                    <span style={{ color: '#a78bfa', fontSize: 12, fontWeight: 700 }}>Pop</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Perfect - Ed Sheeran</span>
                    <span style={{ color: '#c084fc', fontSize: 12, fontWeight: 700 }}>Hits</span>
                  </div>
                </div>
              </div>
            </div>
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
              <div style={{ fontSize: 32, marginBottom: 16 }}>🎹</div>
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
                <span className="course-icon-decor">🌱</span>
              </div>
              <div className="course-info">
                <h3>{t('course1Title')}</h3>
                <p>{t('course1Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🏛️</span>
              </div>
              <div className="course-info">
                <h3>{t('course2Title')}</h3>
                <p>{t('course2Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🎸</span>
              </div>
              <div className="course-info">
                <h3>{t('course3Title')}</h3>
                <p>{t('course3Desc')}</p>
              </div>
            </div>
            <div className="course-card">
              <div className="course-img-box">
                <span className="course-icon-decor">🎼</span>
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
        <div className="cta-banner">
          <h2>{t('ctaTitle')}</h2>
          <p>{t('ctaSubtitle')}</p>
          <div className="hero-badges-wrapper" style={{ justifyContent: 'center', gap: 16 }}>
            <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="badge-btn">
              <img src="/apple.svg" alt="App Store" style={{ height: 48, width: 'auto' }} />
            </a>
            <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="badge-btn">
              <img src="/ggplay.svg" alt="Play Store" style={{ height: 48, width: 'auto' }} />
            </a>
          </div>
        </div>
      </section>

      {/* Support Portal Cards on Homepage */}
      <section className="support-portal-section" style={{ borderTop: '1px solid rgba(255,255,255,0.04)', paddingTop: 40 }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: 40 }}>
            <h2 className="section-title" style={{ fontSize: 24 }}>{t('supportTitle')}</h2>
          </div>
          <div className="support-cards-grid">
            <Link href="/reset-password" className="support-link-card">
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔑</div>
              <div className="support-card-title" style={{ color: '#e879f9' }}>{t('resetPassword')}</div>
            </Link>
            <Link href="/delete-account" className="support-link-card">
              <div style={{ fontSize: 24, marginBottom: 8 }}>❌</div>
              <div className="support-card-title" style={{ color: '#fca5a5' }}>{t('deleteAccount')}</div>
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
