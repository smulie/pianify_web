'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function PrivacyPage() {
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
            <h1 className="section-title" style={{ fontSize: 32 }}>{language === 'vi' ? 'Chính sách Bảo mật' : 'Privacy Policy'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t('legalLastUpdated')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            <div style={{ padding: '12px 18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)', color: '#fcd34d', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {t('legalDraftMarker')}
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>1. {language === 'vi' ? 'Dữ liệu Thu thập' : 'Information We Collect'}</h2>
              <p>
                {language === 'vi'
                  ? 'Chúng tôi thu thập thông tin tài khoản (email, tên, mật khẩu băm), dữ liệu telemetry khi sử dụng IDE và các cấu hình thiết lập Agent để phục vụ cải thiện chất lượng xử lý của Orbit.'
                  : 'We collect account details (email, name, hashed credentials), telemetry logs when using the Orbit IDE environment, and custom agent parameters to improve command executions.'}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>2. {language === 'vi' ? 'Bảo mật Mã nguồn' : 'Codebase Security'}</h2>
              <p>
                {language === 'vi'
                  ? 'Mã nguồn của bạn được lập chỉ mục tại local. Các yêu cầu phân tích gửi lên cloud được truyền mã hóa và không bao giờ lưu trữ lâu dài trừ khi có sự đồng ý rõ ràng. Chúng tôi KHÔNG train các mô hình AI công cộng trên code của bạn.'
                  : 'Your codebase is indexed locally. Analysis requests sent to the cloud are encrypted in transit and never stored persistently without explicit consent. We DO NOT train public models on your code.'}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>3. {language === 'vi' ? 'Quyền xóa dữ liệu' : 'Data Deletion'}</h2>
              <p>
                {language === 'vi'
                  ? 'Người dùng có quyền yêu cầu xóa tài khoản và mọi dữ liệu liên quan bất kỳ lúc nào thông qua cổng hỗ trợ của chúng tôi tại /delete-account.'
                  : 'Users have the right to request deletion of their account and all associated logs at any time through our support portal at /delete-account.'}
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
