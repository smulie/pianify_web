'use client';

import Link from 'next/link';
import { useI18n } from './LanguageContext';

export default function HomeClient() {
  const { t } = useI18n();

  return (
    <div className="page-wrapper" style={{ flexDirection: 'column', padding: '0 20px' }}>

      {/* Header & Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40, animation: 'pop-in 0.5s ease' }}>
        <img
          src="/logo.png"
          alt="Pianify"
          style={{ width: 140, height: 'auto', marginBottom: 20 }}
        />
        <p style={{ fontSize: 17, color: 'rgba(249, 249, 251, 0.85)', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
          {t('heroSubtitle').split('\n').map((line, i) => (
            <span key={i}>{line}<br /></span>
          ))}
        </p>
      </div>

      {/* Download Buttons */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60, alignItems: 'center' }}>
        <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="hover-scale" style={{ display: 'block' }}>
          <img src="/apple.svg" alt="Download on the App Store" style={{ height: 50, width: 'auto', display: 'block' }} />
        </a>
        <a href="https://pianify.onelink.me/eBlV/zwsurowk" target="_blank" rel="noopener noreferrer" className="hover-scale" style={{ display: 'block' }}>
          <img src="/ggplay.svg" alt="GET IT ON Google Play" style={{ height: 50, width: 'auto', display: 'block' }} />
        </a>
      </div>

      {/* Utilities Base */}
      <div className="card" style={{ padding: '24px', maxWidth: 460, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'none', borderRadius: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'rgba(249,249,251,0.9)', textAlign: 'center' }}>
          {t('supportTitle')}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <Link href="/reset-password" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(196, 66, 240, 0.1)', border: '1px solid rgba(196, 66, 240, 0.2)', padding: '16px', borderRadius: 10, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e879f9' }}>{t('resetPassword')}</div>
            </div>
          </Link>
          <Link href="/delete-account" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: 10, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fca5a5' }}>{t('deleteAccount')}</div>
            </div>
          </Link>
        </div>
      </div>

      {/* Footer minimal */}
      <div style={{ marginTop: 40, fontSize: 13, color: 'rgba(249,249,251,0.3)', textAlign: 'center' }}>
        © {new Date().getFullYear()} Pianify (Smulie Studio). All rights reserved.
      </div>
    </div>
  );
}
