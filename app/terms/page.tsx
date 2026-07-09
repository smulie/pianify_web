'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function TermsPage() {
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
            <h1 className="section-title" style={{ fontSize: 32 }}>{language === 'vi' ? 'Điều khoản Sử dụng' : 'Terms of Service'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t('legalLastUpdated')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            <div style={{ padding: '12px 18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)', color: '#fcd34d', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {t('legalDraftMarker')}
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>1. {language === 'vi' ? 'Chấp thuận Điều khoản' : 'Acceptance of Terms'}</h2>
              <p>
                {language === 'vi'
                  ? 'Bằng việc tải xuống và sử dụng Orbit IDE hoặc dịch vụ web Orbit, bạn đồng ý tuân thủ các điều khoản pháp lý này.'
                  : 'By downloading and running Orbit IDE or accessing our web services, you agree to comply with these terms.'}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>2. {language === 'vi' ? 'Sử dụng Hợp pháp' : 'Acceptable Use'}</h2>
              <p>
                {language === 'vi'
                  ? 'Bạn chịu trách nhiệm hoàn toàn đối với các lệnh thực thi terminal, chỉnh sửa file hoặc hành động mà Agent thực hiện dưới tài khoản của bạn. Vui lòng kiểm duyệt kỹ kế hoạch trước khi phê duyệt thực thi.'
                  : 'You are solely responsible for any terminal executions, file edits, or workspace modifications performed by the agent under your credentials. Please review proposed plans carefully before giving approvals.'}
              </p>
            </div>

            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>3. {language === 'vi' ? 'Giới hạn Trách nhiệm' : 'Limitation of Liability'}</h2>
              <p>
                {language === 'vi'
                  ? 'Chúng tôi cung cấp công cụ "như hiện tại" (as-is). Smulie Studio không chịu trách nhiệm cho bất kỳ tổn thất dữ liệu hoặc lỗi codebase nào do mã nguồn tự động tạo ra.'
                  : 'We provide our tools on an "as-is" basis. Smulie Studio is not liable for any data loss, code damage, or software breaks caused by automatically generated codebase modifications.'}
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
