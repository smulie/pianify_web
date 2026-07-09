'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useI18n } from '../LanguageContext';

type OS = 'mac' | 'windows' | 'linux' | 'unknown';

export default function DownloadClient() {
  const { t, language, setLanguage } = useI18n();
  const [detectedOS, setDetectedOS] = useState<OS>('unknown');
  const [selectedChannel, setSelectedChannel] = useState<'stable' | 'beta'>('stable');

  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    if (userAgent.includes('mac')) {
      setDetectedOS('mac');
    } else if (userAgent.includes('win')) {
      setDetectedOS('windows');
    } else if (userAgent.includes('linux')) {
      setDetectedOS('linux');
    }
  }, []);

  const getPlatformLabel = (os: OS) => {
    switch (os) {
      case 'mac': return t('downloadMac');
      case 'windows': return t('downloadWindows');
      case 'linux': return t('downloadLinux');
      default: return 'Desktop Platform';
    }
  };

  const handleDownloadAlert = (platform: string) => {
    alert(`${language === 'vi' ? 'Đang chuẩn bị tải về bản cài đặt cho' : 'Preparing installer download for'} ${platform}.\n\n${t('downloadPrivateWaitlist')}`);
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
        <div className="container" style={{ maxWidth: 840 }}>
          <div className="section-header" style={{ marginBottom: 40 }}>
            <h1 className="section-title">{t('downloadTitle')}</h1>
            <p className="section-subtitle">{t('downloadSubtitle')}</p>
          </div>

          {/* OS Auto-Detect Banner */}
          {detectedOS !== 'unknown' && (
            <div style={{
              background: 'rgba(196, 66, 240, 0.1)',
              border: '1px solid rgba(196, 66, 240, 0.25)',
              borderRadius: 16,
              padding: '20px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 40,
              flexWrap: 'wrap',
              gap: 16
            }}>
              <div>
                <div style={{ fontSize: 12, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: 0.5, marginBottom: 4 }}>
                  {t('downloadDetectedOS')}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>
                  {getPlatformLabel(detectedOS)}
                </div>
              </div>
              <button 
                onClick={() => handleDownloadAlert(getPlatformLabel(detectedOS))}
                className="btn-primary" 
                style={{ width: 'auto', padding: '10px 24px', borderRadius: 30, marginTop: 0 }}
              >
                📥 {language === 'vi' ? 'Tải xuống ngay' : 'Download Now'}
              </button>
            </div>
          )}

          {/* Channel Selector */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 32, justifyContent: 'center' }}>
            <button 
              onClick={() => setSelectedChannel('stable')}
              style={{
                background: selectedChannel === 'stable' ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: selectedChannel === 'stable' ? '1px solid rgba(196, 66, 240, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                flex: 1,
                maxWidth: 280,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>🚀 {t('downloadStable')}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t('downloadStableDesc')}</div>
            </button>
            <button 
              onClick={() => setSelectedChannel('beta')}
              style={{
                background: selectedChannel === 'beta' ? 'rgba(255,255,255,0.06)' : 'transparent',
                border: selectedChannel === 'beta' ? '1px solid rgba(196, 66, 240, 0.3)' : '1px solid rgba(255,255,255,0.1)',
                color: '#fff',
                padding: '14px 28px',
                borderRadius: 12,
                cursor: 'pointer',
                textAlign: 'left',
                flex: 1,
                maxWidth: 280,
                transition: 'all 0.2s'
              }}
            >
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>⚡ {t('downloadBeta')}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{t('downloadBetaDesc')}</div>
            </button>
          </div>

          {/* Platform Manual selector grid */}
          <div className="support-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 48 }}>
            <div className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🍎</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#fff' }}>macOS</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>Intel & Apple Silicon</p>
              <button 
                onClick={() => handleDownloadAlert('macOS')}
                className="btn-primary" 
                style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10 }}
              >
                Download (.dmg)
              </button>
            </div>
            <div className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🪟</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Windows</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>64-bit Installer</p>
              <button 
                onClick={() => handleDownloadAlert('Windows')}
                className="btn-primary" 
                style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10 }}
              >
                Download (.exe)
              </button>
            </div>
            <div className="card" style={{ padding: '24px', background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16 }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>🐧</div>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, color: '#fff' }}>Linux</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', marginBottom: 20 }}>AppImage & Debian</p>
              <button 
                onClick={() => handleDownloadAlert('Linux')}
                className="btn-primary" 
                style={{ width: '100%', padding: '10px', fontSize: 13, borderRadius: 10 }}
              >
                Download (.AppImage)
              </button>
            </div>
          </div>

          {/* Installation Instructions */}
          <div className="card" style={{ padding: '36px', maxWidth: 'none', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: 16 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.04)', paddingBottom: 10 }}>
              📖 {t('downloadInstallInstructions')}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 14, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: 4 }}>🍎 macOS</strong>
                <p>{t('downloadMacInstructions')}</p>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: 4 }}>🪟 Windows</strong>
                <p>{t('downloadWinInstructions')}</p>
              </div>
              <div>
                <strong style={{ color: '#fff', display: 'block', marginBottom: 4 }}>🐧 Linux</strong>
                <p>{t('downloadLinInstructions')}</p>
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
