'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';
import LanguageSwitcher from '../../LanguageSwitcher';

/* ── PianoGo Brand Palette Tokens ── */
const PALETTE = {
  primaryPurple: '#6C41EA',
  deepPurple: '#4E2CB3',
  primaryMid: '#8559EA',
  primaryLight: '#A377F5',
  lavender: '#EEE6FB',
  appBackground: '#F6F1FC',
  surfaceWhite: '#FDFCFE',
  borderLavender: '#DED3F3',
  textPrimary: '#2D1F50',
  textSecondary: '#6E628E',
  textMuted: '#9B8EB8',
  productGradient: 'linear-gradient(135deg, #8559EA 0%, #6C41EA 48%, #4E2CB3 100%)',
  bgGradient: 'linear-gradient(135deg, #FDFCFE 0%, #F6F1FC 48%, #EEE6FB 100%)',
};

export default function PianoGoSupportPage() {
  const { t } = useI18n();

  const faqs = [
    { q: t('goSupportFaqQ1'), a: t('goSupportFaqA1') },
    { q: t('goSupportFaqQ2'), a: t('goSupportFaqA2') },
    { q: t('goSupportFaqQ3'), a: t('goSupportFaqA3') },
    { q: t('goSupportFaqQ4'), a: t('goSupportFaqA4') },
  ];

  const cardStyle: React.CSSProperties = {
    background: PALETTE.surfaceWhite,
    borderRadius: 20,
    padding: '32px 36px',
    boxShadow: `0 16px 36px -10px rgba(108, 65, 234, 0.08), 0 0 0 1px ${PALETTE.borderLavender}`,
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: PALETTE.bgGradient,
      padding: '40px 16px 80px',
      color: PALETTE.textPrimary,
      position: 'relative',
    }}>
      <LanguageSwitcher />
      <div style={{ width: '100%', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header Card */}
        <div style={{ ...cardStyle, padding: '48px 36px', textAlign: 'center' }}>
          <img src="/pianogo.png" alt="PianoGo" style={{ height: 160, maxWidth: 480, width: '100%', display: 'block', margin: '0 auto 20px', objectFit: 'contain' }} />
          <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 14, marginBottom: 8, letterSpacing: '-0.5px', color: PALETTE.textPrimary }}>
            {t('goSupportTitle')}
          </h1>
          <p style={{ color: PALETTE.textSecondary, fontSize: 15 }}>{t('goSupportSubtitle')}</p>
        </div>

        {/* Contact Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: PALETTE.deepPurple }}>
            📧 {t('goSupportEmailTitle')}
          </h2>
          <p style={{ color: PALETTE.textSecondary, marginBottom: 18, fontSize: 15, lineHeight: 1.6 }}>
            {t('goSupportEmailDesc')}
          </p>
          <a href="mailto:support@amanotes.com" style={{
            display: 'inline-block', padding: '12px 24px', borderRadius: 12,
            background: PALETTE.productGradient,
            color: '#FFFFFF', fontWeight: 700, fontSize: 15, textDecoration: 'none',
            boxShadow: '0 8px 20px -4px rgba(108, 65, 234, 0.3)',
            transition: 'transform 0.2s',
          }}>
            support@amanotes.com
          </a>
        </div>

        {/* Delete Account Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: PALETTE.deepPurple }}>
            🗑️ {t('goSupportDeleteTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{
              padding: '16px 20px', background: PALETTE.appBackground,
              border: `1px solid ${PALETTE.borderLavender}`, borderRadius: 14,
              color: PALETTE.textSecondary, fontSize: 14, lineHeight: 1.6,
            }}>
              <strong style={{ color: PALETTE.textPrimary, display: 'block', marginBottom: 4 }}>📱 In-App</strong>
              {t('goSupportDeleteInApp')}
            </div>
            <div style={{
              padding: '16px 20px', background: PALETTE.appBackground,
              border: `1px solid ${PALETTE.borderLavender}`, borderRadius: 14,
              color: PALETTE.textSecondary, fontSize: 14, lineHeight: 1.6,
            }}>
              <strong style={{ color: PALETTE.textPrimary, display: 'block', marginBottom: 4 }}>🌐 Web</strong>
              {t('goSupportDeleteWeb')}
            </div>
          </div>
          <Link href="/piano-go/delete-account" style={{
            display: 'inline-block', padding: '12px 24px', borderRadius: 12,
            background: '#FEF2F2', border: '1px solid #FCA5A5',
            color: '#DC2626', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            {t('goSupportDeleteLink')} →
          </Link>
        </div>

        {/* FAQ Card */}
        <div style={cardStyle}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: PALETTE.deepPurple }}>
            ❓ {t('goSupportFaqTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                padding: '16px 20px', background: PALETTE.appBackground,
                border: `1px solid ${PALETTE.borderLavender}`, borderRadius: 14,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: PALETTE.textPrimary, marginBottom: 8 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: PALETTE.textSecondary, lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links Card */}
        <div style={{ ...cardStyle, textAlign: 'center', padding: '24px 36px' }}>
          <h3 style={{ fontSize: 14, fontWeight: 600, color: PALETTE.textMuted, marginBottom: 14 }}>
            {t('goSupportLinksTitle')}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            <a href="https://amanotes.com/privacy-policy/" target="_blank" rel="noopener noreferrer" style={{ color: PALETTE.primaryPurple, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
              {t('goSupportPrivacy')}
            </a>
            <a href="https://amanotes.com/terms-of-service/" target="_blank" rel="noopener noreferrer" style={{ color: PALETTE.primaryPurple, fontWeight: 600, textDecoration: 'none', fontSize: 14 }}>
              {t('goSupportTerms')}
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <Link href="/" style={{ color: PALETTE.textMuted, textDecoration: 'none', fontSize: 14, fontWeight: 500 }}>
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
