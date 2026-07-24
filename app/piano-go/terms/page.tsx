'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';
import LanguageSwitcher from '../../LanguageSwitcher';

export default function PianoGoTermsPage() {
  const { t } = useI18n();

  const sections = [
    { title: t('goTermsProviderTitle'), content: t('goTermsProviderDesc') },
    { title: t('goTermsAccountTitle'), content: t('goTermsAccountDesc') },
    { title: t('goTermsUseTitle'), content: t('goTermsUseDesc') },
    { title: t('goTermsContentTitle'), content: t('goTermsContentDesc') },
    { title: t('goTermsSubscriptionTitle'), content: t('goTermsSubscriptionDesc') },
    { title: t('goTermsTerminationTitle'), content: t('goTermsTerminationDesc') },
    { title: t('goTermsLiabilityTitle'), content: t('goTermsLiabilityDesc') },
    { title: t('goTermsGoverningTitle'), content: t('goTermsGoverningDesc') },
    { title: t('goTermsChangesTitle'), content: t('goTermsChangesDesc') },
  ];

  return (
    <div className="page-wrapper" style={{ alignItems: 'flex-start', padding: '40px 16px 80px' }}>
      <LanguageSwitcher />
      <article style={{
        width: '100%', maxWidth: 720, margin: '0 auto',
        background: '#252239', borderRadius: 20,
        padding: '48px 36px',
        boxShadow: '0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        color: '#F9F9FB', lineHeight: 1.7, fontSize: 15,
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            fontSize: 22, fontWeight: 800,
            background: 'linear-gradient(90deg, #34d399 0%, #06b6d4 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>
            🎹 PianoGo
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 800, marginTop: 16, marginBottom: 8, letterSpacing: -0.5 }}>
            {t('goTermsTitle')}
          </h1>
          <p style={{ color: 'rgba(249,249,251,0.5)', fontSize: 14 }}>{t('goTermsEffective')}</p>
        </div>

        {/* Intro */}
        <p style={{ marginBottom: 32, color: 'rgba(249,249,251,0.75)' }}>{t('goTermsIntro')}</p>

        {/* Sections */}
        {sections.map((section, i) => (
          <section key={i} style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F9F9FB', letterSpacing: -0.3 }}>
              {i + 1}. {section.title}
            </h2>
            <p style={{ color: 'rgba(249,249,251,0.7)' }}>{section.content}</p>
          </section>
        ))}

        {/* Contact */}
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F9F9FB', letterSpacing: -0.3 }}>
            {sections.length + 1}. {t('goPrivacyContactTitle')}
          </h2>
          <div style={{
            padding: '16px 20px', background: 'rgba(52, 211, 153, 0.08)',
            border: '1px solid rgba(52, 211, 153, 0.15)', borderRadius: 12,
          }}>
            <strong style={{ color: '#34d399' }}>{t('goPrivacyEntityName')}</strong><br/>
            <span style={{ color: 'rgba(249,249,251,0.6)', fontSize: 14 }}>{t('goPrivacyEntityAddress')}</span><br/>
            <a href={`mailto:${t('goPrivacyEntityContact')}`} style={{ color: '#06b6d4', textDecoration: 'none', fontSize: 14 }}>
              {t('goPrivacyEntityContact')}
            </a>
          </div>
        </section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, marginTop: 40, textAlign: 'center' }}>
          <Link href="/piano-go/privacy" style={{ color: '#06b6d4', textDecoration: 'none', marginRight: 24, fontSize: 14 }}>
            {t('goSupportPrivacy')}
          </Link>
          <Link href="/piano-go/support" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: 14 }}>
            {t('goSupportTitle')}
          </Link>
        </div>
      </article>
    </div>
  );
}
