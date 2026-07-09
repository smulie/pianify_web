'use client';

import Link from 'next/link';
import { useI18n } from '../LanguageContext';

export default function SecurityPage() {
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
            <h1 className="section-title" style={{ fontSize: 32 }}>{language === 'vi' ? 'Hồ sơ An ninh & Bảo mật' : 'Security Profile'}</h1>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>{t('legalLastUpdated')}</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, fontSize: 15, color: 'rgba(255,255,255,0.75)', lineHeight: 1.7 }}>
            <div style={{ padding: '12px 18px', background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)', color: '#fcd34d', borderRadius: 8, fontSize: 13, fontWeight: 600 }}>
              ⚠️ {t('legalDraftMarker')}
            </div>

            {/* Current Measures */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>🛡️ {language === 'vi' ? 'Biện pháp An ninh Hiện tại' : 'Current Security Measures'}</h2>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>
                  <strong>{language === 'vi' ? 'Mã hóa Luồng truyền' : 'TLS In-Transit Encryption'}:</strong>
                  {' '}{language === 'vi' ? 'Mọi yêu cầu gửi lên AI server đều bắt buộc sử dụng giao thức HTTPS/TLS 1.3.' : 'All connections between Orbit IDE and our AI endpoints are encrypted using TLS 1.3.'}
                </li>
                <li>
                  <strong>{language === 'vi' ? 'Sandboxing & Xác thực lệnh' : 'Terminal Sandbox Guard'}:</strong>
                  {' '}{language === 'vi' ? 'Orbit chạy các câu lệnh đề xuất trong terminal được kiểm soát. Agent không thể tự ý kích hoạt terminal nếu thiếu sự đồng ý.' : 'Orbit prompts users for permission before executing local terminal commands, preventing unauthorized scripts.'}
                </li>
                <li>
                  <strong>{language === 'vi' ? 'Không lưu trữ cố định' : 'Ephemeral Code Storage'}:</strong>
                  {' '}{language === 'vi' ? 'Các đoạn mã snippet gửi lên API xử lý sẽ được lưu hoàn toàn ở RAM và giải phóng ngay lập tức sau khi mô hình trả về kết quả.' : 'Code snippets sent for inference are processed in memory and released immediately upon model output.'}
                </li>
              </ul>
            </div>

            {/* Roadmap */}
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 12 }}>🗓️ {language === 'vi' ? 'Lộ trình An ninh (Roadmap)' : 'Security Roadmap'}</h2>
              <ul style={{ paddingLeft: 20, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <li>
                  <strong>SOC 2 Type II:</strong>
                  {' '}{language === 'vi' ? 'Đang tiến hành đánh giá hệ thống, dự kiến hoàn thành cấp chứng chỉ vào Q4 2026.' : 'System auditing under progress. Certification expected in Q4 2026.'}
                </li>
                <li>
                  <strong>Role-Based Access (RBAC):</strong>
                  {' '}{language === 'vi' ? 'Bổ sung quyền quản trị nhóm nâng cao, cho phép hạn chế thư mục mã nguồn nhạy cảm đối với Agent.' : 'Enabling team controls to restrict agent access from reading pre-defined blacklisted files.'}
                </li>
                <li>
                  <strong>VPC Deployment:</strong>
                  {' '}{language === 'vi' ? 'Hỗ trợ đóng gói deploy dịch vụ Orbit hoàn toàn trong VPC riêng của doanh nghiệp.' : 'Deploying Orbit services entirely within private enterprise VPC clouds.'}
                </li>
              </ul>
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
