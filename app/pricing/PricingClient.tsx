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

  return (
    <div style={{ background: '#0b0912', color: '#F9F9FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      
      {/* Navigation Header */}
      <header className="navbar">
        <div className="navbar-container">
          <Link href="/" className="nav-brand">
            <img src="/logo.png" alt="Pianify Logo" className="nav-logo" />
          </Link>

          <ul className="nav-menu">
            <li><Link href="/#features" className="nav-link">{t('navFeatures')}</Link></li>
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

      {/* Main Content */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          
          <div className="section-header" style={{ marginBottom: 50, display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
              <div style={{ display: 'inline-block', background: 'rgba(196, 66, 240, 0.12)', color: '#e879f9', fontSize: 12, fontWeight: 700, padding: '4px 14px', borderRadius: 20, marginBottom: 18, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                ⚡ {language === 'vi' ? 'Luyện tập không giới hạn' : 'Unlimited Practice'}
              </div>
              <h1 className="section-title" style={{ margin: 0 }}>{t('pricingHeader')}</h1>
              <p className="section-subtitle" style={{ margin: '8px 0 0 0' }}>{t('pricingSub')}</p>
            </div>
            <div style={{ flex: '0 0 110px', display: 'flex', justifyContent: 'center' }}>
              <img src="/mascot_monetization_openchest.webp" alt="Free value chest mascot" style={{ width: 110, height: 'auto', objectFit: 'contain' }} />
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="support-cards-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 80, alignItems: 'stretch' }}>
            
            {/* Super 1 Month */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, maxWidth: 'none' }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Super 1 Month</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>$5.99</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/ {language === 'vi' ? 'tháng' : 'month'}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>
                  {language === 'vi' ? 'Năng lượng không giới hạn và hoàn toàn không quảng cáo.' : 'Unlimited energy and completely ad-free.'}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.7)' }}>
                  <li>✓ {language === 'vi' ? 'Năng lượng không giới hạn' : 'Unlimited energy'}</li>
                  <li>✓ {language === 'vi' ? 'Không quảng cáo' : 'No Ads'}</li>
                </ul>
              </div>
              <div>
                <a 
                  href="https://pianify.onelink.me/eBlV/zwsurowk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', boxShadow: 'none', marginBottom: 16 }}
                >
                  {language === 'vi' ? 'Đăng ký ngay' : 'Subscribe Now'}
                </a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                  {language === 'vi' ? 'Tự động gia hạn $5.99 / tháng' : 'Auto-renews at $5.99 / month'}
                </div>
              </div>
            </div>

            {/* Super 1 Year - Recommended */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '44px 30px 36px 30px', background: 'linear-gradient(135deg, rgba(196, 66, 240, 0.05) 0%, rgba(15, 12, 30, 0.4) 100%)', border: '2px solid rgba(196, 66, 240, 0.4)', borderRadius: 16, position: 'relative', boxShadow: '0 20px 40px rgba(196, 66, 240, 0.12)', maxWidth: 'none', overflow: 'visible' }}>
              <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', background: 'linear-gradient(90deg, #e879f9 0%, #C442F0 100%)', color: '#fff', padding: '4px 16px', borderRadius: 20, fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5, whiteSpace: 'nowrap' }}>
                {language === 'vi' ? 'KHUYÊN DÙNG' : 'RECOMMENDED'}
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 800, color: '#e879f9' }}>Super 1 Year</h3>
                  <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                    {language === 'vi' ? 'Tiết kiệm 44%' : 'Save 44%'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>$0.00</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/ {language === 'vi' ? 'Dùng thử miễn phí' : 'Free Trial'}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, marginBottom: 24 }}>
                  {language === 'vi' ? 'Bắt đầu dùng thử miễn phí 1 năm! Trải nghiệm toàn bộ tính năng cao cấp không giới hạn.' : 'Try 1 Year for free! Experience all premium features without limits.'}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.8)' }}>
                  <li>✓ <strong>{language === 'vi' ? 'Dùng thử miễn phí' : 'Free trial included'}</strong></li>
                  <li>✓ {language === 'vi' ? 'Năng lượng không giới hạn' : 'Unlimited energy'}</li>
                  <li>✓ {language === 'vi' ? 'Không quảng cáo' : 'No Ads'}</li>
                  <li>✓ {language === 'vi' ? 'Tiết kiệm 44%' : 'Save 44% compared to monthly'}</li>
                </ul>
              </div>
              <div>
                <a 
                  href="https://pianify.onelink.me/eBlV/zwsurowk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '14px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block', marginBottom: 16 }}
                >
                  {language === 'vi' ? 'DÙNG THỬ MIỄN PHÍ' : 'TRY FREE TRIAL'}
                </a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                  {language === 'vi' ? 'Tự động gia hạn $39.99 / 12 tháng' : 'Auto-renews at $39.99 / 12 months'}
                </div>
              </div>
            </div>

            {/* Super 3 Months */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, maxWidth: 'none' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#fff' }}>Super 3 Months</h3>
                  <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#4ade80', fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 10 }}>
                    {language === 'vi' ? 'Tiết kiệm 17%' : 'Save 17%'}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>$5.00</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>/ {language === 'vi' ? 'tháng' : 'month'}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>
                  {language === 'vi' ? 'Giải pháp trung hạn cân bằng cho việc tập luyện.' : 'Mid-term plan. Balance price and commitment.'}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', display: 'flex', flexDirection: 'column', gap: 8, fontSize: 13.5, color: 'rgba(255,255,255,0.7)' }}>
                  <li>✓ {language === 'vi' ? 'Năng lượng không giới hạn' : 'Unlimited energy'}</li>
                  <li>✓ {language === 'vi' ? 'Không quảng cáo' : 'No Ads'}</li>
                  <li>✓ {language === 'vi' ? 'Tiết kiệm 17%' : 'Save 17%'}</li>
                </ul>
              </div>
              <div>
                <a 
                  href="https://pianify.onelink.me/eBlV/zwsurowk" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary" 
                  style={{ width: '100%', padding: '12px', borderRadius: 10, cursor: 'pointer', textAlign: 'center', textDecoration: 'none', display: 'block', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', boxShadow: 'none', marginBottom: 16 }}
                >
                  {language === 'vi' ? 'Đăng ký ngay' : 'Subscribe Now'}
                </a>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16, fontSize: 12, color: 'rgba(255,255,255,0.3)', textAlign: 'center' }}>
                  {language === 'vi' ? 'Tự động gia hạn $14.99 / 3 tháng' : 'Auto-renews at $14.99 / 3 months'}
                </div>
              </div>
            </div>

          </div>

          {/* Comparison Table */}
          <div style={{ maxWidth: 800, margin: '0 auto 80px auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#fff' }}>
              📊 {language === 'vi' ? 'Bảng So sánh Gói Học' : 'Plan Comparison Grid'}
            </h2>
            <div className="card" style={{ padding: '0', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16, overflow: 'hidden', maxWidth: 'none' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14, textAlign: 'left', color: 'rgba(255,255,255,0.8)' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <th style={{ padding: '18px 24px', fontWeight: 700, color: '#fff' }}>{language === 'vi' ? 'Tính năng' : 'Feature'}</th>
                    <th style={{ padding: '18px 24px', fontWeight: 700, color: '#e879f9' }}>Pianify Super</th>
                    <th style={{ padding: '18px 24px', fontWeight: 700, color: 'rgba(255,255,255,0.6)' }}>Pianify Free</th>
                    <th style={{ padding: '18px 24px', fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>{language === 'vi' ? 'App Khác' : 'Other Apps'}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{language === 'vi' ? 'Chi phí hàng tháng' : 'Monthly Cost'}</td>
                    <td style={{ padding: '16px 24px', color: '#e879f9', fontWeight: 700 }}>{language === 'vi' ? 'Từ $3.33/tháng' : 'From $3.33/mo'}</td>
                    <td style={{ padding: '16px 24px', color: '#4ade80' }}>$0 (Free)</td>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.4)' }}>$15+ / mo</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{language === 'vi' ? 'Năng lượng luyện tập' : 'Practice Energy'}</td>
                    <td style={{ padding: '16px 24px', color: '#e879f9', fontWeight: 700 }}>⚡ {language === 'vi' ? 'Không giới hạn' : 'Unlimited'}</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Giới hạn tim năng lượng' : 'Limited energy hearts'}</td>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.4)' }}>{language === 'vi' ? 'Bị khóa bài học' : 'Locked lessons'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{language === 'vi' ? 'Quảng cáo' : 'Ads'}</td>
                    <td style={{ padding: '16px 24px', color: '#e879f9', fontWeight: 700 }}>❌ {language === 'vi' ? 'Không quảng cáo' : 'No Ads'}</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Có quảng cáo' : 'Ad-supported'}</td>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.4)' }}>No Ads (Paid only)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{language === 'vi' ? 'Kho bài học & Bài hát' : 'Lessons & Song Library'}</td>
                    <td style={{ padding: '16px 24px', color: '#e879f9' }}>⚡ {language === 'vi' ? 'Truy cập đầy đủ' : 'Full Access'}</td>
                    <td style={{ padding: '16px 24px', color: '#4ade80' }}>⚡ {language === 'vi' ? 'Truy cập đầy đủ' : 'Full Access'}</td>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.4)' }}>{language === 'vi' ? 'Bị giới hạn' : 'Limited'}</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{language === 'vi' ? 'Phản hồi nốt nhạc AI' : 'AI Sound Feedback'}</td>
                    <td style={{ padding: '16px 24px', color: '#e879f9' }}>⚡ {language === 'vi' ? 'Hoạt động 100%' : '100% Active'}</td>
                    <td style={{ padding: '16px 24px', color: '#4ade80' }}>⚡ {language === 'vi' ? 'Hoạt động 100%' : '100% Active'}</td>
                    <td style={{ padding: '16px 24px', color: 'rgba(255,255,255,0.4)' }}>{language === 'vi' ? 'Yêu cầu trả phí' : 'Requires premium'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Pricing FAQ */}
          <div style={{ maxWidth: 780, margin: '0 auto' }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#fff' }}>
              ❓ Pricing & Value FAQs
            </h2>
            <div className="faq-box">
              <div className={`faq-item ${activeFaq === 0 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(0)}>
                  <span>{language === 'vi' ? 'Sự khác biệt giữa gói Pianify Free và gói Pianify Super là gì?' : 'What is the difference between Pianify Free and Pianify Super?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel" style={{ maxHeight: activeFaq === 0 ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s ease-out' }}>
                  <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {language === 'vi' 
                      ? 'Gói Pianify Free cho phép bạn học đầy đủ bài giảng và thư viện bài hát bằng việc sử dụng tim năng lượng hàng ngày (kèm quảng cáo). Gói Pianify Super mở khóa năng lượng vô hạn (Unlimited Energy), gỡ bỏ hoàn toàn quảng cáo để quá trình tập đàn không bị gián đoạn.'
                      : 'The Pianify Free plan allows you to study all lessons and songs using daily energy hearts (with ads). The Pianify Super plan unlocks unlimited energy and removes all ads for an uninterrupted learning experience.'}
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                  <span>{language === 'vi' ? 'Làm thế nào để đăng ký gói Pianify Super?' : 'How do I subscribe to the Pianify Super plan?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel" style={{ maxHeight: activeFaq === 1 ? '200px' : '0px', overflow: 'hidden', transition: 'max-height 0.2s ease-out' }}>
                  <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {language === 'vi'
                      ? 'Bạn có thể dễ dàng đăng ký ngay trong ứng dụng Pianify trên điện thoại hoặc máy tính bảng. Chúng tôi cung cấp các gói linh hoạt theo tháng, theo quý, hoặc gói 1 năm đi kèm dùng thử miễn phí để bạn trải nghiệm trước khi thanh toán.'
                      : 'You can subscribe directly inside the Pianify app on your mobile phone or tablet. We offer flexible monthly, quarterly, and annual packages, including a free trial so you can experience it before subscribing.'}
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
