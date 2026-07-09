'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

export default function PricingClient() {
  const { t, language, setLanguage } = useI18n();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const currentYear = new Date().getFullYear();

  const handleCheckoutAlert = (plan: string) => {
    alert(`${language === 'vi' ? 'Đang mở liên kết thanh toán gói' : 'Opening secure checkout for'} ${plan}.\n\n${language === 'vi' ? 'Đăng ký sẽ được thực hiện trực tiếp trên App Store hoặc Google Play Store.' : 'Subscriptions are managed through App Store or Google Play Store.'}`);
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
        <div className="container">
          
          <div className="section-header" style={{ marginBottom: 50 }}>
            <h1 className="section-title">{t('pricingHeader')}</h1>
            <p className="section-subtitle">{t('pricingSub')}</p>
          </div>

          {/* Subscriptions Grid */}
          <div className="support-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 80, alignItems: 'stretch' }}>
            
            {/* Monthly */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t('planMonthly')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{t('planMonthlyPrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t('planMonthlySub')}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planMonthlyDesc')}</p>
              </div>
              <button 
                onClick={() => handleCheckoutAlert(t('planMonthly'))}
                className="btn-primary" 
                style={{ width: '100%', padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none', cursor: 'pointer' }}
              >
                {language === 'vi' ? 'Đăng ký ngay' : 'Subscribe Now'}
              </button>
            </div>

            {/* Quarterly */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t('planQuarterly')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{t('planQuarterlyPrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t('planQuarterlySub')}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planQuarterlyDesc')}</p>
              </div>
              <button 
                onClick={() => handleCheckoutAlert(t('planQuarterly'))}
                className="btn-primary" 
                style={{ width: '100%', padding: '12px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none', cursor: 'pointer' }}
              >
                {language === 'vi' ? 'Đăng ký ngay' : 'Subscribe Now'}
              </button>
            </div>

            {/* Yearly - Best Value */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(196, 66, 240, 0.02)', border: '1px solid rgba(196, 66, 240, 0.3)', borderRadius: 16, position: 'relative' }}>
              <div style={{ position: 'absolute', top: -12, right: 24, background: 'linear-gradient(135deg, #C442F0 0%, #7B2FBE 100%)', color: '#fff', padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                Best Value
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e879f9', marginBottom: 8 }}>{t('planYearly')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{t('planYearlyPrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t('planYearlySub')}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planYearlyDesc')}</p>
              </div>
              <button 
                onClick={() => handleCheckoutAlert(t('planYearly'))}
                className="btn-primary" 
                style={{ width: '100%', padding: '12px', borderRadius: 10, cursor: 'pointer' }}
              >
                {language === 'vi' ? 'Đăng ký ngay' : 'Subscribe Now'}
              </button>
            </div>

          </div>

          {/* Compare Table */}
          <div style={{ maxWidth: 800, margin: '0 auto 80px auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#fff' }}>
              💎 {t('pricingCompareTitle')}
            </h2>
            <div className="card" style={{ padding: 36, background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 16, fontSize: 15, color: 'rgba(255,255,255,0.8)', padding: 0 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>✨ {t('pricingFeatureAllSongs')}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>✨ {t('pricingFeatureAllLessons')}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>✨ {t('pricingFeatureFeedback')}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>✨ {t('pricingFeatureAnalytics')}</li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 12 }}>✨ {t('pricingFeatureSupport')}</li>
              </ul>
            </div>
          </div>

          {/* Pricing FAQ */}
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#fff' }}>
              ❓ Pricing FAQs
            </h2>
            <div className="faq-box">
              <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                  <span>{language === 'vi' ? 'Gói đăng ký hoạt động thế nào?' : 'How does the subscription work?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel" style={{ maxHeight: activeFaq === 0 ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s ease-out' }}>
                  <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {language === 'vi' 
                      ? 'Sau khi đăng ký thành công qua Google Play hoặc App Store, tài khoản học viên của bạn sẽ được kích hoạt chế độ Premium ngay lập tức, tự động gia hạn vào cuối chu kỳ thanh toán.'
                      : 'After subscribing via Google Play or App Store, your student profile gains instant access to all premium lessons, automatically renewing at the end of each billing cycle.'}
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                  <span>{language === 'vi' ? 'Tôi có thể hủy gói đăng ký bất kỳ lúc nào không?' : 'Can I cancel my subscription anytime?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel" style={{ maxHeight: activeFaq === 1 ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s ease-out' }}>
                  <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {language === 'vi'
                      ? 'Có. Bạn có thể dễ dàng quản lý hoặc hủy đăng ký bất kỳ lúc nào thông qua phần quản lý đăng ký của App Store (iOS) hoặc Google Play (Android).'
                      : 'Yes. You can manage or cancel your subscription at any time via your App Store or Google Play account subscription management panel.'}
                  </div>
                </div>
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
