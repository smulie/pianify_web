'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

export default function FAQPage() {
  const { t, language, setLanguage } = useI18n();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqItems = [
    {
      q: language === 'vi' ? 'Orbit là gì?' : 'What is Orbit?',
      a: language === 'vi' 
        ? 'Orbit là một Agent lập trình tự động (AI Coding Agent) có khả năng đọc hiểu cấu trúc toàn bộ codebase, lên kế hoạch sửa code, chạy lệnh terminal, chạy test, review code và cập nhật tài liệu kỹ thuật.'
        : 'Orbit is an agentic coding assistant that indexes your entire repository, creates structured plans, runs command lines, executes tests, drafts reviews, and documents updates.'
    },
    {
      q: language === 'vi' ? 'Orbit có tự động chạy các dòng lệnh terminal tùy ý không?' : 'Does Orbit run terminal commands arbitrarily?',
      a: language === 'vi'
        ? 'Không. Bạn có toàn quyền kiểm soát. Orbit đề xuất các câu lệnh, nhưng hệ thống chỉ thực thi sau khi bạn nhấn phê duyệt trực tiếp trên giao diện IDE.'
        : 'No. You are in full control of the execution loop. Orbit proposes terminal commands, but they only run after your explicit approval in the interactive prompt.'
    },
    {
      q: language === 'vi' ? 'Mã nguồn của tôi được sử dụng như thế nào?' : 'How is my codebase data utilized?',
      a: language === 'vi'
        ? 'Chúng tôi lập chỉ mục codebase cục bộ (local) trên thiết bị của bạn. Chỉ các đoạn code snippet liên quan đến truy vấn hiện tại mới được gửi lên API đám mây mã hóa để phân tích.'
        : 'Your codebase indexing happens locally on your machine. Only relevant code blocks and file context needed for the active query are sent via encrypted HTTPS to cloud API models.'
    },
    {
      q: language === 'vi' ? 'Orbit có train mô hình AI công cộng trên code của tôi không?' : 'Do you train public AI models on customer code?',
      a: language === 'vi'
        ? 'Tuyệt đối không. Chúng tôi không bao giờ lưu trữ lâu dài hay huấn luyện các mô hình AI thương mại công cộng trên mã nguồn của khách hàng.'
        : 'Absolutely not. We never train public commercial models or retain proprietary customer source code on our servers.'
    },
    {
      q: language === 'vi' ? 'Orbit hỗ trợ những Game Engine nào?' : 'Which game engines are supported?',
      a: language === 'vi'
        ? 'Orbit được tối ưu hóa đặc biệt cho Godot Engine (GDScript, C#) và Unity (C#). Hệ thống hiểu rõ cấu trúc tệp cảnh (.tscn) và cầu biên dịch NDK.'
        : 'Orbit is optimized for Godot Engine (GDScript, C#) and Unity (C#). It parses custom configuration and engine scene formats natively.'
    },
    {
      q: language === 'vi' ? 'Orbit hỗ trợ những framework mobile nào?' : 'Which mobile app frameworks are supported?',
      a: language === 'vi'
        ? 'Chúng tôi hỗ trợ đầy đủ các dự án React Native, Flutter, Native Android (Java/Kotlin) và iOS (Swift/Objective-C).'
        : 'We offer out-of-the-box support for React Native, Flutter, Native Android (Java/Kotlin), and native iOS (Swift/Objective-C).'
    },
    {
      q: language === 'vi' ? 'Quy trình kiểm thử tự động hoạt động thế nào?' : 'How does automated verification work?',
      a: language === 'vi'
        ? 'Sau khi sửa đổi mã nguồn, Orbit tự động đề xuất chạy các bộ test case khói (smoke tests) hoặc unit tests được thiết lập trong dự án của bạn để xác nhận biên dịch thành công.'
        : 'After making code modifications, Orbit runs local compiler checks and smoke tests defined in your project to verify the build is safe before delivering.'
    },
    {
      q: language === 'vi' ? 'Tôi có thể triển khai Orbit offline hoàn toàn không?' : 'Can I deploy Orbit completely offline?',
      a: language === 'vi'
        ? 'Gói Enterprise của chúng tôi hỗ trợ chế độ On-Premise hoặc kết nối qua mạng VPC khép kín của doanh nghiệp để đảm bảo an ninh tối đa.'
        : 'Our Enterprise package supports On-Premise installations or secure private VPC configurations to meet strict offline security policies.'
    },
    {
      q: language === 'vi' ? 'Ai là người đứng sau phát triển Orbit?' : 'Who is behind Orbit development?',
      a: language === 'vi'
        ? 'Orbit được phát triển bởi Smulie Studio, cùng đội ngũ kỹ sư đã xây dựng và vận hành ứng dụng học piano Pianify.'
        : 'Orbit is engineered by Smulie Studio, the same team of developers that built and scaled the Pianify music education application.'
    },
    {
      q: language === 'vi' ? 'Cách liên hệ nhận hỗ trợ hoặc giải đáp chuyên sâu?' : 'How can I get technical assistance?',
      a: language === 'vi'
        ? 'Bạn có thể gửi yêu cầu hỗ trợ qua hòm thư support@pianify.co hoặc truy cập trang /request-demo để đặt lịch tư vấn trực tiếp cùng kỹ sư Orbit.'
        : 'You can email our engineering support at support@pianify.co or visit the /request-demo page to arrange a direct technical call.'
    }
  ];

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
        <div className="container" style={{ maxWidth: 780 }}>
          
          <div className="section-header" style={{ marginBottom: 50 }}>
            <h1 className="section-title">Frequently Asked Questions</h1>
            <p className="section-subtitle">{language === 'vi' ? 'Mọi thắc mắc của bạn về Agent lập trình Orbit đều được giải đáp dưới đây.' : 'Everything you need to know about Orbit agent capabilities, data use, and privacy.'}</p>
          </div>

          <div className="faq-box" style={{ background: 'transparent', padding: 0 }}>
            {faqItems.map((item, index) => (
              <div key={index} className={`faq-item ${activeFaq === index ? 'active' : ''}`} style={{
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
                borderRadius: 12,
                marginBottom: 16,
                overflow: 'hidden'
              }}>
                <button 
                  className="faq-question-btn" 
                  onClick={() => toggleFaq(index)}
                  style={{
                    width: '100%',
                    padding: '20px 24px',
                    textAlign: 'left',
                    background: 'transparent',
                    border: 'none',
                    color: '#fff',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span>{item.q}</span>
                  <span style={{ fontSize: 11, color: '#e879f9', transform: activeFaq === index ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>▼</span>
                </button>
                <div className="faq-answer-panel" style={{
                  maxHeight: activeFaq === index ? '300px' : '0px',
                  overflow: 'hidden',
                  transition: 'max-height 0.2s ease-out'
                }}>
                  <div className="faq-answer-text" style={{ padding: '0 24px 20px 24px', fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                    {item.a}
                  </div>
                </div>
              </div>
            ))}
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
