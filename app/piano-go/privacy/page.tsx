'use client';

import Link from 'next/link';
import { useI18n } from '../../LanguageContext';
import LanguageSwitcher from '../../LanguageSwitcher';

export default function PianoGoPrivacyPage() {
  const { t } = useI18n();

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
            {t('goPrivacyTitle')}
          </h1>
          <p style={{ color: 'rgba(249,249,251,0.5)', fontSize: 14 }}>{t('goPrivacyEffective')}</p>
        </div>

        {/* Intro */}
        <p style={{ marginBottom: 32, color: 'rgba(249,249,251,0.75)' }}>{t('goPrivacyIntro')}</p>

        {/* Data Collection */}
        <Section title={t('goPrivacyDataTitle')}>
          <p style={{ marginBottom: 16, color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyDataDesc')}</p>
          <ul style={{ paddingLeft: 20, listStyle: 'disc', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <li style={{ color: 'rgba(249,249,251,0.7)' }}><strong style={{ color: '#F9F9FB' }}>Firebase</strong> — {t('goPrivacySdkFirebase')}</li>
            <li style={{ color: 'rgba(249,249,251,0.7)' }}><strong style={{ color: '#F9F9FB' }}>AppsFlyer</strong> — {t('goPrivacySdkAppsflyer')}</li>
            <li style={{ color: 'rgba(249,249,251,0.7)' }}><strong style={{ color: '#F9F9FB' }}>Mixpanel</strong> — {t('goPrivacySdkMixpanel')}</li>
            <li style={{ color: 'rgba(249,249,251,0.7)' }}><strong style={{ color: '#F9F9FB' }}>Sentry</strong> — {t('goPrivacySdkSentry')}</li>
          </ul>
        </Section>

        {/* Microphone */}
        <Section title={t('goPrivacyMicTitle')}>
          <Highlight>{t('goPrivacyMicDesc')}</Highlight>
        </Section>

        {/* Bluetooth */}
        <Section title={t('goPrivacyBluetoothTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyBluetoothDesc')}</p>
        </Section>

        {/* Rights */}
        <Section title={t('goPrivacyRightsTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyRightsDesc')}</p>
        </Section>

        {/* Data Retention */}
        <Section title={t('goPrivacyRetentionTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyRetentionDesc')}</p>
        </Section>

        {/* Children */}
        <Section title={t('goPrivacyChildrenTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyChildrenDesc')}</p>
        </Section>

        {/* Transfer */}
        <Section title={t('goPrivacyTransferTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyTransferDesc')}</p>
        </Section>

        {/* Changes */}
        <Section title={t('goPrivacyChangesTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)' }}>{t('goPrivacyChangesDesc')}</p>
        </Section>

        {/* Contact */}
        <Section title={t('goPrivacyContactTitle')}>
          <p style={{ color: 'rgba(249,249,251,0.7)', marginBottom: 12 }}>{t('goPrivacyContactDesc')}</p>
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
        </Section>

        {/* Footer */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 24, marginTop: 40, textAlign: 'center' }}>
          <Link href="/piano-go/terms" style={{ color: '#06b6d4', textDecoration: 'none', marginRight: 24, fontSize: 14 }}>
            {t('goSupportTerms')}
          </Link>
          <Link href="/piano-go/support" style={{ color: '#06b6d4', textDecoration: 'none', fontSize: 14 }}>
            {t('goSupportTitle')}
          </Link>
        </div>
      </article>
    </div>
  );
}

/* ── Shared components ── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, color: '#F9F9FB', letterSpacing: -0.3 }}>{title}</h2>
      {children}
    </section>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      padding: '16px 20px', background: 'rgba(52, 211, 153, 0.06)',
      border: '1px solid rgba(52, 211, 153, 0.12)', borderRadius: 12,
      color: 'rgba(249,249,251,0.8)', fontSize: 14, lineHeight: 1.6,
    }}>
      {children}
    </div>
  );
}
