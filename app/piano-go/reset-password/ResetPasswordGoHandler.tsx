'use client';

import Link from 'next/link';
import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../../lib/firebase';
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

/* ── PianoGo Logo Component ── */
function PianoGoLogo() {
  return (
    <div className="logo-wrapper" style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
      <img src="/pianogo.png" alt="PianoGo" style={{ height: 140, maxWidth: 360, width: '100%', objectFit: 'contain' }} />
    </div>
  );
}

type Stage = 'form' | 'sent';

export default function ResetPasswordGoHandler() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [stage, setStage] = useState<Stage>('form');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const actionCodeSettings = {
        url: `${window.location.origin}/action`,
        handleCodeInApp: false,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setStage('sent');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        setError(t('errEmailNotFound'));
      } else if (code === 'auth/too-many-requests') {
        setError(t('errTooManyRequests'));
      } else {
        setError(t('errGeneric'));
      }
    } finally {
      setLoading(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: '100vh',
    background: PALETTE.bgGradient,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 16px',
    color: PALETTE.textPrimary,
    position: 'relative',
  };

  const cardStyle: React.CSSProperties = {
    background: PALETTE.surfaceWhite,
    borderRadius: 24,
    padding: '40px 32px',
    width: '100%',
    maxWidth: 440,
    boxShadow: `0 20px 48px -12px rgba(108, 65, 234, 0.12), 0 0 0 1px ${PALETTE.borderLavender}`,
    position: 'relative',
    overflow: 'hidden',
  };

  /* ── Success state ── */
  if (stage === 'sent') {
    return (
      <div style={containerStyle}>
        <LanguageSwitcher />
        <div style={{ ...cardStyle, textAlign: 'center' }}>
          <PianoGoLogo />
          <div style={{
            width: 64, height: 64, borderRadius: 32, background: PALETTE.lavender,
            border: `1px solid ${PALETTE.borderLavender}`, display: 'flex',
            alignItems: 'center', justifyContent: 'center', margin: '20px auto 16px'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={PALETTE.primaryPurple} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: PALETTE.textPrimary, marginBottom: 8 }}>{t('requestSuccess')}</h1>
          <p style={{ fontSize: 14, color: PALETTE.textSecondary, marginBottom: 12, lineHeight: 1.55 }}>
            {t('requestSuccessDesc')}<br/>
            <strong style={{ color: PALETTE.deepPurple, fontSize: 15 }}>{email}</strong>
          </p>
          <p style={{ fontSize: 13, color: PALETTE.textMuted, marginBottom: 24 }}>
            {t('checkInbox')}
          </p>
          <button
            onClick={() => { setStage('form'); setEmail(''); }}
            style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: PALETTE.productGradient, color: '#FFFFFF',
              border: 'none', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              boxShadow: `0 8px 20px -4px rgba(108, 65, 234, 0.35)`, marginBottom: 16
            }}
          >
            {t('resendEmail')}
          </button>
          <Link href="/" style={{ color: PALETTE.primaryPurple, fontSize: 13.5, textDecoration: 'none', fontWeight: 600 }}>
            ← {t('backToHome')}
          </Link>
        </div>
      </div>
    );
  }

  /* ── Form state ── */
  return (
    <div style={containerStyle}>
      <LanguageSwitcher />
      <div style={cardStyle}>
        <PianoGoLogo />
        <h1 style={{ fontSize: 24, fontWeight: 800, color: PALETTE.textPrimary, textAlign: 'center', marginBottom: 8, letterSpacing: '-0.4px' }}>
          {t('resetPassTitle')}
        </h1>
        <p style={{ fontSize: 14, color: PALETTE.textSecondary, textAlign: 'center', marginBottom: 28, lineHeight: 1.55 }}>
          {t('resetPassSubtitle')}
        </p>

        {error && (
          <div style={{
            padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FCA5A5',
            borderRadius: 12, color: '#DC2626', fontSize: 13.5, marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 10
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.deepPurple }}>{t('emailLabel')}</label>
            <input
              type="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
              autoFocus
              autoComplete="email"
              style={{
                width: '100%', padding: '13px 16px', borderRadius: 12,
                border: `1px solid ${PALETTE.borderLavender}`, background: '#FFFFFF',
                color: PALETTE.textPrimary, fontSize: 14, outline: 'none', transition: 'border 0.2s',
              }}
            />
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: PALETTE.productGradient, color: '#FFFFFF',
            border: 'none', fontSize: 15, fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
            boxShadow: `0 8px 20px -4px rgba(108, 65, 234, 0.35)`, opacity: loading ? 0.6 : 1,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s',
            marginBottom: 20
          }}>
            {loading ? t('sending') : t('sendRequest')}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <Link href="/" style={{ color: PALETTE.primaryPurple, fontSize: 13.5, textDecoration: 'none', fontWeight: 600 }}>
            ← {t('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
}
