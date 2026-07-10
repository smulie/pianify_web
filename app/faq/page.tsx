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
      q: t('faqQ1'),
      a: t('faqA1')
    },
    {
      q: t('faqQ2'),
      a: t('faqA2')
    },
    {
      q: t('faqQ3'),
      a: t('faqA3')
    },
    {
      q: language === 'vi' ? 'Trẻ em hoặc người lớn tuổi có thể học bằng Pianify không?' : 'Can children or older adults learn with Pianify?',
      a: language === 'vi'
        ? 'Tất nhiên! Giáo trình của chúng tôi được thiết kế trực quan sinh động bằng hình ảnh, mini-game nhịp điệu dễ tiếp cận cho trẻ nhỏ và lộ trình đệm hát rõ ràng cho người lớn. Thích hợp cho mọi lứa tuổi bắt đầu học piano.'
        : 'Absolutely! Our curriculum features visual guides, mini-games for children, and clear pop/chords paths for adults. Learning piano is simplified for all age groups.'
    },
    {
      q: language === 'vi' ? 'Luyện tập 10 phút hàng ngày hoạt động thế nào?' : 'How does the 10-minute daily habit work?',
      a: language === 'vi'
        ? 'Pianify vay mượn các yếu tố game di động. Mỗi ngày, bạn chỉ cần hoàn thành các nhiệm vụ ngắn (Quests) để nhận XP điểm kinh nghiệm, nâng cấp tài khoản, và duy trì chuỗi Streak học tập không bị đứt đoạn.'
        : 'Pianify borrows mobile game designs. Every day, you complete quick Quests to earn XP, level up your account, and maintain your practice Streak.'
    },
    {
      q: t('faqQ4'),
      a: t('faqA4')
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
        <div className="container" style={{ maxWidth: 780 }}>
          
          <div className="section-header" style={{ marginBottom: 50, display: 'flex', alignItems: 'center', gap: 24, justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 500px', textAlign: 'left' }}>
              <h1 className="section-title" style={{ margin: 0 }}>{t('faqTitle')}</h1>
              <p className="section-subtitle" style={{ margin: '8px 0 0 0' }}>{t('faqSubtitle')}</p>
            </div>
            <div style={{ flex: '0 0 100px', display: 'flex', justifyContent: 'center' }}>
              <img src="/mascot_status_sleepy.webp" alt="FAQ Mascot" style={{ width: 100, height: 'auto', objectFit: 'contain' }} />
            </div>
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
