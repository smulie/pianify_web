'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';
import LanguageSwitcher from '../../LanguageSwitcher';

export default function PianifyGoSupportPage() {
  const { t } = useI18n();

  const faqs = [
    { q: t('goSupportFaqQ1'), a: t('goSupportFaqA1') },
    { q: t('goSupportFaqQ2'), a: t('goSupportFaqA2') },
    { q: t('goSupportFaqQ3'), a: t('goSupportFaqA3') },
    { q: t('goSupportFaqQ4'), a: t('goSupportFaqA4') },
  ];

  return (
    <div className="page-wrapper" style={{ alignItems: 'flex-start', padding: '40px 16px 80px' }}>
      <LanguageSwitcher />
      <div style={{ width: '100%', maxWidth: 720, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* Header Card */}
        <div style={{
          background: '#252239', borderRadius: 20, padding: '48px 36px', textAlign: 'center',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 22, fontWeight: 800,
            background: 'linear-gradient(90deg, #34d399 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            🎹 Pianify Go
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16, marginBottom: 8, letterSpacing: -0.5, color: '#F9F9FB' }}>
            {t('goSupportTitle')}
          </h1>
          <p style={{ color: 'rgba(249,249,251,0.55)', fontSize: 15 }}>{t('goSupportSubtitle')}</p>
        </div>

        {/* Contact Card */}
        <div style={{
          background: '#252239', borderRadius: 16, padding: '32px 36px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F9F9FB' }}>
            📧 {t('goSupportEmailTitle')}
          </h2>
          <p style={{ color: 'rgba(249,249,251,0.7)', marginBottom: 16, fontSize: 15 }}>{t('goSupportEmailDesc')}</p>
          <a href="mailto:support@amanotes.com" style={{
            display: 'inline-block', padding: '12px 24px', borderRadius: 10,
            background: 'linear-gradient(135deg, #34d399 0%, #06b6d4 100%)',
            color: '#000', fontWeight: 700, fontSize: 15, textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}>
            support@amanotes.com
          </a>
        </div>

        {/* Delete Account Card */}
        <div style={{
          background: '#252239', borderRadius: 16, padding: '32px 36px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: '#F9F9FB' }}>
            🗑️ {t('goSupportDeleteTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div style={{
              padding: '16px 20px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
              color: 'rgba(249,249,251,0.7)', fontSize: 14, lineHeight: 1.6,
            }}>
              <strong style={{ color: '#F9F9FB', display: 'block', marginBottom: 4 }}>📱 In-App</strong>
              {t('goSupportDeleteInApp')}
            </div>
            <div style={{
              padding: '16px 20px', background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12,
              color: 'rgba(249,249,251,0.7)', fontSize: 14, lineHeight: 1.6,
            }}>
              <strong style={{ color: '#F9F9FB', display: 'block', marginBottom: 4 }}>🌐 Web</strong>
              {t('goSupportDeleteWeb')}
            </div>
          </div>
          <Link href="/pianify-go/delete-account" style={{
            display: 'inline-block', padding: '12px 24px', borderRadius: 10,
            background: 'rgba(239, 68, 68, 0.12)', border: '1px solid rgba(239, 68, 68, 0.25)',
            color: '#fca5a5', fontWeight: 600, fontSize: 14, textDecoration: 'none',
            transition: 'all 0.2s',
          }}>
            {t('goSupportDeleteLink')} →
          </Link>
        </div>

        {/* FAQ Card */}
        <div style={{
          background: '#252239', borderRadius: 16, padding: '32px 36px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#F9F9FB' }}>
            ❓ {t('goSupportFaqTitle')}
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{
                padding: '16px 20px', background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.06)', borderRadius: 12,
              }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: '#F9F9FB', marginBottom: 8 }}>{faq.q}</h3>
                <p style={{ fontSize: 14, color: 'rgba(249,249,251,0.6)', lineHeight: 1.6, margin: 0 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Links Card */}
        <div style={{
          background: '#252239', borderRadius: 16, padding: '24px 36px',
          boxShadow: '0 12px 32px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
          textAlign: 'center',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: 'rgba(249,249,251,0.5)', marginBottom: 16 }}>
            {t('goSupportLinksTitle')}
          </h3>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
            <Link href="/pianify-go/privacy" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: 14 }}>
              {t('goSupportPrivacy')}
            </Link>
            <Link href="/pianify-go/terms" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: 14 }}>
              {t('goSupportTerms')}
            </Link>
          </div>
        </div>

        {/* Back to Home */}
        <div style={{ textAlign: 'center', paddingTop: 8 }}>
          <Link href="/" style={{ color: 'rgba(249,249,251,0.4)', textDecoration: 'none', fontSize: 14 }}>
            {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
