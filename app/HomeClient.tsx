'use client';

import Link from 'next/link';
import { useI18n } from './LanguageContext';

export default function HomeClient() {
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

      {/* Hero Section */}
      <section className="section hero">
        <div className="container hero-grid">
          <div className="hero-content">
            <h1 className="hero-title" style={{ fontSize: 44, lineHeight: 1.2 }}>{t('heroTitle')}</h1>
            <p className="hero-subtitle">{t('heroSubtitle')}</p>
            <div className="hero-badges-wrapper" style={{ gap: 14 }}>
              <Link href="/download" className="btn-primary" style={{ textDecoration: 'none', padding: '12px 28px', borderRadius: 30, marginTop: 0, width: 'auto', boxShadow: '0 4px 20px rgba(196, 66, 240, 0.4)' }}>
                {t('ctaDownload')}
              </Link>
              <Link href="/request-demo" style={{ textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 28px', borderRadius: 30, fontSize: 15, fontWeight: 600, transition: 'all 0.2s' }} className="hover-scale">
                {t('ctaDemo')}
              </Link>
            </div>
          </div>
          <div className="hero-visuals">
            <img src="/orbit-ide-screenshot.png" alt="Orbit IDE interface" className="hero-mockup" style={{ borderRadius: 12 }} />
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="stats" style={{ padding: '30px 24px' }}>
        <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 13, textTransform: 'uppercase', letterSpacing: 1.5, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>
            {t('trustLabel')}
          </div>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>📱 {t('trustReact')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🎮 {t('trustGodot')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🔊 {t('trustAudio')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>🧪 {t('trustQA')}</span>
          </div>
        </div>
      </section>

      {/* Pianify Case Study Section */}
      <section id="proof" className="section" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('proofTitle')}</h2>
            <p className="section-subtitle">{t('proofSubtitle')}</p>
          </div>

          <div className="features-grid">
            {/* Card 1: Rhythm Game */}
            <div className="feature-card">
              <div style={{ fontSize: 24, marginBottom: 12 }}>🎮</div>
              <h3>{t('proofCard1Title')}</h3>
              <p>{t('proofCard1Desc')}</p>
              <div className="feature-visual-placeholder">
                <img src="/pianify-game-screenshot.png" alt="Pianify Rhythm Game" />
              </div>
            </div>

            {/* Card 2: AI note detection */}
            <div className="feature-card">
              <div style={{ fontSize: 24, marginBottom: 12 }}>🔊</div>
              <h3>{t('proofCard2Title')}</h3>
              <p>{t('proofCard2Desc')}</p>
              <div className="feature-visual-placeholder">
                <img src="/note-detection-workflow.png" alt="AI Note Detection" />
              </div>
            </div>

            {/* Card 3: QA Crawler */}
            <div className="feature-card">
              <div style={{ fontSize: 24, marginBottom: 12 }}>🧪</div>
              <h3>{t('proofCard3Title')}</h3>
              <p>{t('proofCard3Desc')}</p>
              <div className="feature-visual-placeholder">
                <img src="/qa-crawler-screenshot.png" alt="QA Crawler test log" />
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/showcase" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 32px', borderRadius: 30 }}>
              {t('ctaShowcase')}
            </Link>
          </div>
        </div>
      </section>

      {/* Orbit USPs Grid */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('uspsTitle')}</h2>
            <p className="section-subtitle">{t('uspsSubtitle')}</p>
          </div>

          <div className="features-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">📁</div>
              <h3>{t('usp1Title')}</h3>
              <p>{t('usp1Desc')}</p>
            </div>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">📝</div>
              <h3>{t('usp2Title')}</h3>
              <p>{t('usp2Desc')}</p>
            </div>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">⚡</div>
              <h3>{t('usp3Title')}</h3>
              <p>{t('usp3Desc')}</p>
            </div>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">🎮</div>
              <h3>{t('usp4Title')}</h3>
              <p>{t('usp4Desc')}</p>
            </div>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">🛡️</div>
              <h3>{t('usp5Title')}</h3>
              <p>{t('usp5Desc')}</p>
            </div>
            <div className="feature-card" style={{ padding: '32px' }}>
              <div className="feature-icon-wrapper">📚</div>
              <h3>{t('usp6Title')}</h3>
              <p>{t('usp6Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Autonomy Section */}
      <section className="section section-alt">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">{t('autonomyTitle')}</h2>
            <p className="section-subtitle">{t('autonomySubtitle')}</p>
          </div>

          <div className="how-timeline">
            <div className="how-step">
              <div style={{ fontSize: 24, marginBottom: 12 }}>👁️</div>
              <h3>{t('autonomyCard1Title')}</h3>
              <p>{t('autonomyCard1Desc')}</p>
            </div>
            <div className="how-step">
              <div style={{ fontSize: 24, marginBottom: 12 }}>💻</div>
              <h3>{t('autonomyCard2Title')}</h3>
              <p>{t('autonomyCard2Desc')}</p>
            </div>
            <div className="how-step">
              <div style={{ fontSize: 24, marginBottom: 12 }}>🛡️</div>
              <h3>{t('autonomyCard3Title')}</h3>
              <p>{t('autonomyCard3Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner Section */}
      <section className="section container">
        <div className="cta-banner">
          <h2>Orbit + Pianify</h2>
          <p>{t('metaDescription')}</p>
          <div className="hero-badges-wrapper" style={{ justifyContent: 'center', gap: 16 }}>
            <Link href="/download" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block', width: 'auto', padding: '12px 32px', borderRadius: 30 }}>
              {t('ctaDownload')}
            </Link>
            <Link href="/request-demo" style={{ textDecoration: 'none', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '12px 32px', borderRadius: 30, fontSize: 15, fontWeight: 600 }} className="hover-scale">
              {t('ctaDemo')}
            </Link>
          </div>
        </div>
      </section>

      {/* Support Portal Cards on Homepage */}
      <section className="support-portal-section">
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
