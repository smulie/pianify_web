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

      {/* Main Content */}
      <main className="section" style={{ paddingTop: 140 }}>
        <div className="container">
          
          <div className="section-header">
            <h1 className="section-title">{t('pricingTitle')}</h1>
            <p className="section-subtitle">{t('pricingSubtitle')}</p>
            <div style={{
              display: 'inline-block',
              marginTop: 16,
              background: 'rgba(245, 158, 11, 0.08)',
              border: '1px solid rgba(245, 158, 11, 0.15)',
              color: '#fcd34d',
              padding: '6px 14px',
              borderRadius: 30,
              fontSize: 12,
              fontWeight: 600
            }}>
              ⚠️ {t('pricingBetaBanner')}
            </div>
          </div>

          {/* Pricing Tiers Grid */}
          <div className="support-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24, marginBottom: 80, alignItems: 'stretch' }}>
            {/* Free Tier */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t('planFreeTitle')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{t('planFreePrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t('planFreeSub')}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planFreeDesc')}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }}></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.7)', padding: 0 }}>
                  <li>✓ 1 {language === 'vi' ? 'agent chạy nền' : 'parallel background task'}</li>
                  <li>✓ {language === 'vi' ? 'Lập chỉ mục mã nguồn cơ bản' : 'Basic codebase indexing'}</li>
                  <li>✓ {language === 'vi' ? 'Dùng API GPT-4o / Claude 3.5 tiêu chuẩn' : 'Standard GPT-4o / Claude 3.5 API'}</li>
                  <li>✓ {language === 'vi' ? 'Tự quản lý bảo mật' : 'Standard opt-out privacy'}</li>
                </ul>
              </div>
              <Link href="/download" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', marginTop: 32, borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none' }}>
                {language === 'vi' ? 'Bắt đầu ngay' : 'Get Started'}
              </Link>
            </div>

            {/* Team Tier */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(196, 66, 240, 0.02)', border: '1px solid rgba(196, 66, 240, 0.3)', borderRadius: 16, position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: -12,
                right: 24,
                background: 'linear-gradient(135deg, #C442F0 0%, #7B2FBE 100%)',
                color: '#fff',
                padding: '4px 12px',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: 0.5
              }}>
                Popular
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#e879f9', marginBottom: 8 }}>{t('planTeamTitle')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 40, fontWeight: 800, color: '#fff' }}>{t('planTeamPrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>{t('planTeamSub')}</span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planTeamDesc')}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }}></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.7)', padding: 0 }}>
                  <li>✓ 5 {language === 'vi' ? 'agent tác vụ song song' : 'parallel background tasks'}</li>
                  <li>✓ {language === 'vi' ? 'Lập chỉ mục nhanh toàn bộ codebase' : 'Full and fast codebase indexing'}</li>
                  <li>✓ {language === 'vi' ? 'Ưu tiên kết nối model LLM tốc độ cao' : 'Priority high-speed LLM access'}</li>
                  <li>✓ {language === 'vi' ? 'Hỗ trợ chính sách nhóm & SSO' : 'Group policies & SSO support'}</li>
                  <li>✓ {language === 'vi' ? 'Hỗ trợ kỹ thuật ưu tiên' : 'Priority technical support'}</li>
                </ul>
              </div>
              <Link href="/request-demo" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', marginTop: 32, borderRadius: 10 }}>
                {language === 'vi' ? 'Đăng ký thử nghiệm' : 'Join Private Beta'}
              </Link>
            </div>

            {/* Enterprise Tier */}
            <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '36px 30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>{t('planEntTitle')}</h3>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 36, fontWeight: 800, color: '#fff' }}>{t('planEntPrice')}</span>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}></span>
                </div>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5, marginBottom: 24 }}>{t('planEntDesc')}</p>
                <div style={{ height: 1, background: 'rgba(255,255,255,0.05)', marginBottom: 24 }}></div>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12, fontSize: 13, color: 'rgba(255,255,255,0.7)', padding: 0 }}>
                  <li>✓ {language === 'vi' ? 'Không giới hạn tác vụ song song' : 'Unlimited parallel agent tasks'}</li>
                  <li>✓ {language === 'vi' ? 'Mã hóa On-Premise hoặc Deploy riêng' : 'On-Premise / private cloud deploy'}</li>
                  <li>✓ {language === 'vi' ? 'Tùy chỉnh tinh chỉnh Model riêng' : 'Custom model fine-tuning'}</li>
                  <li>✓ {language === 'vi' ? 'Zero Data Retention (Không lưu dữ liệu)' : 'Zero Data Retention (ZDR) policy'}</li>
                  <li>✓ {language === 'vi' ? 'SLA cam kết hỗ trợ 24/7' : '24/7 dedicated support & SLA'}</li>
                </ul>
              </div>
              <Link href="/request-demo" className="btn-primary" style={{ textDecoration: 'none', textAlign: 'center', marginTop: 32, borderRadius: 10, background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', boxShadow: 'none' }}>
                {t('planEntSub')}
              </Link>
            </div>
          </div>

          {/* Compare Table */}
          <div style={{ marginBottom: 80 }}>
            <h2 style={{ fontSize: 24, fontWeight: 800, textAlign: 'center', marginBottom: 32, color: '#fff' }}>
              📊 {t('pricingMatrixTitle')}
            </h2>
            <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: 600 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                    <th style={{ padding: '16px 24px', fontSize: 14, color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Feature</th>
                    <th style={{ padding: '16px 24px', fontSize: 14, color: '#fff', fontWeight: 700 }}>{t('planFreeTitle')}</th>
                    <th style={{ padding: '16px 24px', fontSize: 14, color: '#e879f9', fontWeight: 700 }}>{t('planTeamTitle')}</th>
                    <th style={{ padding: '16px 24px', fontSize: 14, color: '#fca5a5', fontWeight: 700 }}>{t('planEntTitle')}</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: 13.5, color: 'rgba(255,255,255,0.85)' }}>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{t('pricingCompareAgentTasks')}</td>
                    <td style={{ padding: '16px 24px' }}>1 task</td>
                    <td style={{ padding: '16px 24px' }}>5 tasks</td>
                    <td style={{ padding: '16px 24px' }}>Unlimited</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{t('pricingCompareCodebase')}</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Cơ bản' : 'Basic'}</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Đầy đủ & Tốc độ cao' : 'Full & Fast'}</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Tùy biến On-Premise' : 'Custom / Private'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{t('pricingCompareModel')}</td>
                    <td style={{ padding: '16px 24px' }}>Standard</td>
                    <td style={{ padding: '16px 24px' }}>Priority</td>
                    <td style={{ padding: '16px 24px' }}>{language === 'vi' ? 'Tinh chỉnh / Custom Model' : 'Fine-Tuned / Dedicated'}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{t('pricingCompareTelemetry')}</td>
                    <td style={{ padding: '16px 24px' }}>Opt-out</td>
                    <td style={{ padding: '16px 24px' }}>Group Policy</td>
                    <td style={{ padding: '16px 24px' }}>Zero Data Retention (ZDR)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px 24px', fontWeight: 600 }}>{t('pricingCompareSupport')}</td>
                    <td style={{ padding: '16px 24px' }}>Community</td>
                    <td style={{ padding: '16px 24px' }}>Priority Email</td>
                    <td style={{ padding: '16px 24px' }}>24/7 Dedicated + SLA</td>
                  </tr>
                </tbody>
              </table>
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
                  <span>{language === 'vi' ? 'Orbit có bảo mật mã nguồn của tôi không?' : 'Does Orbit keep my code private?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel">
                  <div className="faq-answer-text">
                    {language === 'vi' 
                      ? 'Có, dữ liệu mã nguồn của bạn được mã hóa hoàn toàn. Chúng tôi không bao giờ sử dụng code của khách hàng để train các mô hình AI công cộng. Gói Enterprise hỗ trợ chế độ Zero Data Retention để bảo vệ mã nguồn tuyệt đối.'
                      : 'Yes. Your code data is fully encrypted. We never train public models on customer code. Enterprise tiers support Zero Data Retention (ZDR) for maximum compliance.'}
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 1 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(1)}>
                  <span>{language === 'vi' ? 'Cách quản lý hoặc hủy đăng ký thuê bao như thế nào?' : 'How do I cancel my plan?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel">
                  <div className="faq-answer-text">
                    {language === 'vi'
                      ? 'Bạn có thể tự quản lý và hủy thuê bao của mình bất kỳ lúc nào trực tiếp trong phần Settings của Orbit IDE. Thay đổi sẽ có hiệu lực từ chu kỳ thanh toán tiếp theo.'
                      : 'You can manage or cancel your subscription at any time directly through the Orbit IDE Settings panel. Changes apply at the start of the next billing cycle.'}
                  </div>
                </div>
              </div>

              <div className={`faq-item ${activeFaq === 2 ? 'active' : ''}`}>
                <button className="faq-question-btn" onClick={() => toggleFaq(2)}>
                  <span>{language === 'vi' ? 'Gói Team có giới hạn token sử dụng LLM không?' : 'Is there a token limit on the Team plan?'}</span>
                  <span className="faq-icon-arrow">▼</span>
                </button>
                <div className="faq-answer-panel">
                  <div className="faq-answer-text">
                    {language === 'vi'
                      ? 'Gói Team cung cấp khả năng sử dụng LLM ưu tiên không giới hạn cho các tác vụ lập trình hàng ngày dưới sự phân phối công bằng (fair-use policy).'
                      : 'The Team plan offers unlimited priority LLM usage for daily engineering tasks, subject to a fair-use policy.'}
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
