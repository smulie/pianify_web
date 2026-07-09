'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function DataUsePage() {
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
        <div className="container" style={{ maxWidth: 800 }}>
          <div className="section-header" style={{ marginBottom: 40, textAlign: 'left' }}>
            <h1 className="section-title" style={{ fontSize: 32 }}>{language === 'vi' ? 'Chính sách Sử dụng Dữ liệu' : 'Data Use Policy'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t('legalLastUpdated')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            <div style={{ padding: '12px 18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)', color: '#fcd34d', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {t('legalDraftMarker')}
            </div>

            <p>
              {language === 'vi'
                ? 'Tại Orbit, chúng tôi tôn trọng quyền sở hữu trí tuệ đối với mã nguồn của bạn. Dưới đây là bảng phân loại chi tiết các loại dữ liệu được thu thập, cách xử lý và phương án kiểm soát của bạn.'
                : 'At Orbit, we highly respect your intellectual property rights. Below is a detailed breakdown of how we classify collected data, where it is processed, and your opt-out controls.'}
            </p>

            {/* Classification Table */}
            <div style={{ overflowX: 'auto', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, margin: '16px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: 13.5 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', color: '#fff' }}>
                    <th style={{ padding: '12px 18px', fontWeight: 600 }}>Data Type</th>
                    <th style={{ padding: '12px 18px', fontWeight: 600 }}>Processing / Storage</th>
                    <th style={{ padding: '12px 18px', fontWeight: 600 }}>Purpose</th>
                    <th style={{ padding: '12px 18px', fontWeight: 600 }}>Opt-Out</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 600 }}>Telemetry</td>
                    <td style={{ padding: '12px 18px' }}>Cloud (Secure Server)</td>
                    <td style={{ padding: '12px 18px' }}>IDE Usage Metrics</td>
                    <td style={{ padding: '12px 18px', color: '#e879f9' }}>Settings &rarr; Telemetry</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                    <td style={{ padding: '12px 18px', fontWeight: 600 }}>Codebase Indexing</td>
                    <td style={{ padding: '12px 18px' }}>Local Sandbox Only</td>
                    <td style={{ padding: '12px 18px' }}>Semantic File Context</td>
                    <td style={{ padding: '12px 18px', color: '#10b981' }}>Always Local</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px 18px', fontWeight: 600 }}>Code Snippets</td>
                    <td style={{ padding: '12px 18px' }}>In-Transit (Encrypted)</td>
                    <td style={{ padding: '12px 18px' }}>LLM Code Generation</td>
                    <td style={{ padding: '12px 18px', color: '#e879f9' }}>Enterprise ZDR Plan</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>{language === 'vi' ? 'Cách tắt Telemetry' : 'Opt-Out Details'}</h2>
              <p>
                {language === 'vi'
                  ? 'Bạn có thể tắt tính năng thu thập dữ liệu sử dụng telemetry bất kỳ lúc nào bằng cách mở File > Settings > Privacy trong Orbit IDE và bỏ chọn hộp kiểm Telemetry. Đối với tài khoản cá nhân, mã nguồn chỉ được gửi lên LLM khi bạn yêu cầu sửa đổi mã nguồn.'
                  : 'You can disable telemetry collection at any time by navigating to File > Settings > Privacy in the Orbit IDE and unchecking the Telemetry option. For standard accounts, code snippets are only sent to the LLM when you prompt the agent to perform modifications.'}
              </p>
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
            <Link href="/privacy" className="footer-link">{language === 'vi' ? 'Chính sách bảo mật' : 'Privacy Policy'}</Link>
            <Link href="/terms" className="footer-link">{language === 'vi' ? 'Điều khoản sử dụng' : 'Terms of Service'}</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
