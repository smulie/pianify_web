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
      q: language === 'vi' ? 'Tôi có cần sở hữu đàn piano hay keyboard để dùng ứng dụng không?' : 'Do I need a piano or keyboard to use the app?',
      a: language === 'vi' 
        ? 'Có, bạn cần một nhạc cụ phím. Đó có thể là đàn đại cầm (grand), piano cơ đứng (upright), piano điện tử hoặc keyboard điều khiển qua cổng MIDI/USB.'
        : 'Yes, you need some form of keyboard instrument. It can be a grand piano, upright acoustic piano, digital piano, or a MIDI/USB controller keyboard.'
    },
    {
      q: language === 'vi' ? 'Làm thế nào ứng dụng nghe được những gì tôi chơi?' : 'How does the app hear what I play?',
      a: language === 'vi'
        ? 'Pianify sử dụng micro tích hợp của thiết bị để lắng nghe âm thanh từ đàn cơ, hoặc bạn có thể kết nối đàn điện qua cáp MIDI/USB để nhận diện nốt chính xác 100% không bị lẫn tạp âm.'
        : 'Pianify uses your device\'s built-in microphone to listen to acoustic piano sounds, or you can connect a digital piano/keyboard using a USB/MIDI cable for 100% accurate note recognition.'
    },
    {
      q: language === 'vi' ? 'Trẻ em hoặc người lớn tuổi có thể học bằng Pianify không?' : 'Can children or older adults learn with Pianify?',
      a: language === 'vi'
        ? 'Tất nhiên! Giáo trình của chúng tôi được thiết kế trực quan sinh động bằng hình ảnh, trò chơi nhịp điệu dễ tiếp cận cho trẻ nhỏ và lộ trình đệm hát rõ ràng cho người lớn.'
        : 'Absolutely! Our curriculum features visual guides, rhythm games for children, and clear pop/chords paths for adults. Learning piano is simplified for all age groups.'
    },
    {
      q: language === 'vi' ? 'Tôi có thể thử dùng ứng dụng miễn phí không?' : 'Can I try the app for free?',
      a: language === 'vi'
        ? 'Có! Bạn có thể tải ứng dụng miễn phí trên iOS hoặc Android và truy cập một số bài học cơ bản cũng như ca khúc phổ thông hoàn toàn miễn phí.'
        : 'Yes! You can download the app for free on iOS or Android and access several beginner lessons and popular songs without paying anything.'
    },
    {
      q: language === 'vi' ? 'Có hỗ trợ học cùng giáo viên không?' : 'Is there support for learning with live teachers?',
      a: language === 'vi'
        ? 'Có, ngoài chế độ tự học trên app, Pianify hỗ trợ đặt lịch học trực tuyến 1 kèm 1 với giảng viên piano chuyên nghiệp tại trang /lessons.'
        : 'Yes! In addition to app self-study, Pianify offers booking options for online 1-to-1 video tutor sessions with professional pianists at /lessons.'
    },
    {
      q: language === 'vi' ? 'Cách quản lý gói Premium và hủy gia hạn?' : 'How do I manage my Premium plan and cancellation?',
      a: language === 'vi'
        ? 'Gói đăng ký được thanh toán và quản lý bảo mật trực tiếp thông qua App Store hoặc Google Play Store. Bạn có thể hủy gia hạn bất kỳ lúc nào trong cài đặt tài khoản của hệ điều hành tương ứng.'
        : 'Subscriptions are billed and managed securely through the App Store or Google Play Store. You can cancel auto-renewal at any time via your device\'s account subscription settings.'
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
        <div className="container" style={{ maxWidth: 780 }}>
          
          <div className="section-header" style={{ marginBottom: 50 }}>
            <h1 className="section-title">{t('faqTitle')}</h1>
            <p className="section-subtitle">{t('faqSubtitle')}</p>
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
                  maxHeight: activeFaq === index ? '200px' : '0px',
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
