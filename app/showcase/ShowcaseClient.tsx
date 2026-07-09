'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useI18n } from '../LanguageContext';

type Category = 'all' | 'games' | 'mobile' | 'ai' | 'qa';

export default function ShowcaseClient() {
  const { t, language, setLanguage } = useI18n();
  const [activeCategory, setActiveCategory] = useState<Category>('all');

  const cases = [
    {
      id: 'rhythm-game',
      category: 'games',
      categoryLabel: t('showcaseFilterGames'),
      title: language === 'vi' ? 'Tích hợp Game Engine Godot cho Pianify' : 'Godot Game Engine Integration',
      problem: language === 'vi' 
        ? 'Độ trễ phản hồi xúc giác (haptic) cao và lỗi kết nối giữa lớp React Native và engine Godot.' 
        : 'High touch-to-haptic latency and bridge bridge breaks between React Native container and Godot sub-engine.',
      workflow: language === 'vi'
        ? 'Orbit thiết lập kế hoạch kết nối native, sửa đổi các sự kiện xúc giác và tự chạy biên dịch NDK/C++.'
        : 'Orbit drafted a native bridge plan, refactored haptic events, and compiled C++ wrapper modules in background threads.',
      metrics: language === 'vi' ? 'Trễ phản hồi giảm 72% (từ 85ms còn 24ms)' : 'Haptic lag reduced by 72% (from 85ms to 24ms)',
      status: 'Verified',
      image: '/pianify-game-screenshot.png'
    },
    {
      id: 'note-detection',
      category: 'ai',
      categoryLabel: t('showcaseFilterAI'),
      title: language === 'vi' ? 'Nhận diện nốt nhạc AI & Vòng đời Audio' : 'AI Note Detection & Audio Lifecycle',
      problem: language === 'vi'
        ? 'Lỗi crash JNI khi bật/tắt micro liên tục trên một số thiết bị Android cũ.'
        : 'JNI callback crashes during rapid microphone toggles on specific Android devices.',
      workflow: language === 'vi'
        ? 'Orbit lập sơ đồ cấu trúc JNI, tái cấu trúc luồng Audio Record Java và tự động viết lại tài liệu NDK.'
        : 'Orbit mapped native JNI pointers, refactored Java audio loops, and auto-generated internal developer reference guides.',
      metrics: language === 'vi' ? 'Tỷ lệ lỗi crash JNI giảm về 0%' : 'JNI thread crash rate dropped to 0%',
      status: 'Verified',
      image: '/note-detection-workflow.png'
    },
    {
      id: 'course-crawler',
      category: 'qa',
      categoryLabel: t('showcaseFilterQA'),
      title: language === 'vi' ? 'Crawler QA Bài học tự động' : 'Automated Course QA Crawler',
      problem: language === 'vi'
        ? 'Quy trình kiểm thử thủ công 100+ tệp JSON bài học nhạc lý tốn nhiều tuần và dễ bỏ sót nốt sai.'
        : 'Manual verification of 100+ music sheet JSON tracks was extremely slow and error-prone.',
      workflow: language === 'vi'
        ? 'Orbit xây dựng tool crawler tự phân tích, kiểm thử cấu trúc phím nốt nhạc lý, và xuất kết quả JUnit XML.'
        : 'Orbit coded an autonomous crawler script that parses JSON tracks, validates sheet note ranges, and writes JUnit test results.',
      metrics: language === 'vi' ? 'Tốc độ xác thực bài học tăng gấp 12 lần' : 'Lesson validation cycle speedup by 12x',
      status: 'Verified',
      image: '/qa-crawler-screenshot.png'
    }
  ];

  const filteredCases = activeCategory === 'all' 
    ? cases 
    : cases.filter(c => c.category === activeCategory);

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
            <h1 className="section-title">{t('showcaseTitle')}</h1>
            <p className="section-subtitle">{t('showcaseSubtitle')}</p>
          </div>

          {/* Filtering tabs */}
          <div style={{
            display: 'flex',
            gap: 10,
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: 48
          }}>
            <button 
              onClick={() => setActiveCategory('all')}
              style={{
                background: activeCategory === 'all' ? '#C442F0' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t('showcaseFilterAll')}
            </button>
            <button 
              onClick={() => setActiveCategory('games')}
              style={{
                background: activeCategory === 'games' ? '#C442F0' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t('showcaseFilterGames')}
            </button>
            <button 
              onClick={() => setActiveCategory('mobile')}
              style={{
                background: activeCategory === 'mobile' ? '#C442F0' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t('showcaseFilterMobile')}
            </button>
            <button 
              onClick={() => setActiveCategory('ai')}
              style={{
                background: activeCategory === 'ai' ? '#C442F0' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t('showcaseFilterAI')}
            </button>
            <button 
              onClick={() => setActiveCategory('qa')}
              style={{
                background: activeCategory === 'qa' ? '#C442F0' : 'rgba(255,255,255,0.05)',
                border: 'none',
                color: '#fff',
                padding: '8px 18px',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              {t('showcaseFilterQA')}
            </button>
          </div>

          {/* Cases grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 60 }}>
            {filteredCases.map((item) => (
              <div key={item.id} className="card" style={{
                maxWidth: 'none',
                background: 'rgba(255,255,255,0.015)',
                border: '1px solid rgba(255,255,255,0.04)',
                padding: 40,
                borderRadius: 20,
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                gap: 40,
                alignItems: 'center'
              }}>
                <div>
                  <div style={{
                    display: 'inline-block',
                    background: 'rgba(196, 66, 240, 0.15)',
                    color: '#e879f9',
                    fontSize: 12,
                    fontWeight: 700,
                    padding: '4px 12px',
                    borderRadius: 20,
                    marginBottom: 16
                  }}>
                    {item.categoryLabel}
                  </div>
                  <h2 style={{ fontSize: 24, fontWeight: 800, color: '#fff', marginBottom: 20 }}>{item.title}</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginBottom: 28 }}>
                    <div>
                      <strong style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
                        {language === 'vi' ? 'Bài toán rào cản' : 'Objection / Problem'}
                      </strong>
                      <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{item.problem}</p>
                    </div>
                    <div>
                      <strong style={{ display: 'block', fontSize: 13, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: 4 }}>
                        {language === 'vi' ? 'Quy trình xử lý của Agent' : 'Orbit Agent Workflow'}
                      </strong>
                      <p style={{ fontSize: 14.5, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)' }}>{item.workflow}</p>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    background: 'rgba(16, 185, 129, 0.08)',
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    padding: '12px 18px',
                    borderRadius: 12,
                    width: 'fit-content'
                  }}>
                    <span style={{ fontSize: 14 }}>🏆</span>
                    <span style={{ fontSize: 13.5, color: '#10b981', fontWeight: 600 }}>
                      {item.metrics}
                    </span>
                    <span style={{
                      background: '#10b981',
                      color: '#fff',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 8px',
                      borderRadius: 10,
                      textTransform: 'uppercase'
                    }}>
                      {item.status}
                    </span>
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    style={{
                      width: '100%',
                      maxHeight: 280,
                      objectFit: 'contain',
                      borderRadius: 12,
                      border: '1px solid rgba(255,255,255,0.06)',
                      boxShadow: '0 12px 32px rgba(0,0,0,0.4)'
                    }}
                  />
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
