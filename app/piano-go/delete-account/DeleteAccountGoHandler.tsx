'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, deleteUser, signOut, signInWithPopup, GoogleAuthProvider, OAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { auth, app } from '../../../lib/firebase';
import { getFunctions, httpsCallable } from 'firebase/functions';
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

type Stage = 'auth' | 'warning' | 'success';

export default function DeleteAccountGoHandler() {
  const { t } = useI18n();
  const [stage, setStage] = useState<Stage>('auth');

  // Auth Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadingEmail, setLoadingEmail] = useState(false);
  const [loadingSocial, setLoadingSocial] = useState(false);
  const [error, setError] = useState('');

  // Warning Form State
  const [confirmText, setConfirmText] = useState('');
  const [loadingDelete, setLoadingDelete] = useState(false);

  const isLoading = loadingEmail || loadingSocial;

  /* ── 0. Handle Redirect Result ── */
  useEffect(() => {
    // Redirect handling if needed
  }, []);

  /* ── 1. Đăng nhập để định danh ── */
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setLoadingEmail(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setStage('warning');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setError(t('errIncorrectCreds'));
      } else if (code === 'auth/too-many-requests') {
        setError(t('errAccountLocked'));
      } else {
        setError(t('errLogin'));
      }
    } finally {
      setLoadingEmail(false);
    }
  };

  /* ── Đăng nhập bằng Google ── */
  const handleGoogleAuth = async () => {
    if (isLoading) return;
    setError('');
    setLoadingSocial(true);
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      const result = await signInWithPopup(auth, provider);

      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser) {
        try { await deleteUser(result.user); } catch (e) { console.error('Error deleting temp account:', e); }
        setError(t('errNotRegistered'));
      } else {
        if (result.user.email) setEmail(result.user.email);
        setStage('warning');
      }
    } catch (err: unknown) {
      console.error('Google Auth Error:', err);
      const code = (err as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else if (code === 'auth/unauthorized-domain') {
        setError(t('errUnauthorizedDomain'));
      } else {
        setError(t('errGoogleLogin'));
      }
    } finally {
      setLoadingSocial(false);
    }
  };

  /* ── Đăng nhập bằng Apple ── */
  const handleAppleAuth = async () => {
    if (isLoading) return;
    setError('');
    setLoadingSocial(true);
    try {
      const provider = new OAuthProvider('apple.com');
      provider.addScope('email');
      provider.addScope('name');
      const result = await signInWithPopup(auth, provider);

      const additionalInfo = getAdditionalUserInfo(result);
      if (additionalInfo?.isNewUser) {
        try { await deleteUser(result.user); } catch (e) { console.error('Error deleting temp account:', e); }
        setError(t('errNotRegistered'));
      } else {
        if (result.user.email) setEmail(result.user.email);
        setStage('warning');
      }
    } catch (err: unknown) {
      console.error('Apple Auth Error:', err);
      const code = (err as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else if (code === 'auth/unauthorized-domain') {
        setError(t('errUnauthorizedDomain'));
      } else {
        setError(t('errAppleLogin'));
      }
    } finally {
      setLoadingSocial(false);
    }
  };

  /* ── 2. Xoá tài khoản vĩnh viễn ── */
  const handleDelete = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError(t('errSessionExpired'));
      setStage('auth');
      return;
    }
    if (confirmText.trim().toUpperCase() !== 'DELETE') return;

    setLoadingDelete(true);
    setError('');

    try {
      const functions = getFunctions(app, 'us-central1');
      const deleteUserAccountCallable = httpsCallable(functions, 'user_delete_account');
      await deleteUserAccountCallable();

      try { await deleteUser(user); } catch (clientErr) { console.log('Client deleteUser skipped or succeeded upstream:', clientErr); }

      await signOut(auth);
      setStage('success');
    } catch (err: unknown) {
      console.error('Error calling delete account:', err);
      setError(t('errDeleteAccount'));
    } finally {
      setLoadingDelete(false);
    }
  };

  const handleCancel = async () => {
    try { await signOut(auth); } catch (e) { console.error(e); }
    setStage('auth');
    setConfirmText('');
    setError('');
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

  /* ── BƯỚC 1: XÁC THỰC (AUTH) ── */
  if (stage === 'auth') {
    return (
      <div style={containerStyle}>
        <LanguageSwitcher />
        <div style={cardStyle}>
          <PianoGoLogo />
          <h1 style={{ fontSize: 24, fontWeight: 800, color: PALETTE.textPrimary, textAlign: 'center', marginBottom: 8, letterSpacing: '-0.4px' }}>
            {t('goDeleteTitle')}
          </h1>
          <p style={{ fontSize: 14, color: PALETTE.textSecondary, textAlign: 'center', marginBottom: 28, lineHeight: 1.55 }}>
            {t('goDeleteSubtitle')}
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

          <form onSubmit={handleAuth}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 18 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.deepPurple }}>{t('accountEmail')}</label>
              <input type="email" placeholder="user@example.com"
                value={email} onChange={e => setEmail(e.target.value)} disabled={isLoading} required
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  border: `1px solid ${PALETTE.borderLavender}`, background: '#FFFFFF',
                  color: PALETTE.textPrimary, fontSize: 14, outline: 'none', transition: 'border 0.2s',
                }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
              <label style={{ fontSize: 13, fontWeight: 600, color: PALETTE.deepPurple }}>{t('passwordLabel')}</label>
              <input type="password" placeholder={t('passwordPlaceholder')}
                value={password} onChange={e => setPassword(e.target.value)} disabled={isLoading} required
                style={{
                  width: '100%', padding: '13px 16px', borderRadius: 12,
                  border: `1px solid ${PALETTE.borderLavender}`, background: '#FFFFFF',
                  color: PALETTE.textPrimary, fontSize: 14, outline: 'none', transition: 'border 0.2s',
                }}
              />
            </div>
            <button type="submit" disabled={isLoading} style={{
              width: '100%', padding: '14px', borderRadius: 12,
              background: PALETTE.productGradient, color: '#FFFFFF',
              border: 'none', fontSize: 15, fontWeight: 700, cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: `0 8px 20px -4px rgba(108, 65, 234, 0.35)`, opacity: isLoading ? 0.6 : 1,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, transition: 'all 0.2s'
            }}>
              {loadingEmail ? t('authenticating') : t('continue')}
            </button>
          </form>

          <div style={{ margin: '20px 0', textAlign: 'center', fontSize: 13, color: PALETTE.textMuted, position: 'relative' }}>
            <span style={{ background: PALETTE.surfaceWhite, padding: '0 12px', position: 'relative', zIndex: 1 }}>{t('or')}</span>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: 1, background: PALETTE.borderLavender, zIndex: 0 }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <button type="button" onClick={handleGoogleAuth} disabled={isLoading} style={{
              width: '100%', padding: '12px', background: '#FFFFFF',
              border: `1px solid ${PALETTE.borderLavender}`, borderRadius: 12,
              color: PALETTE.textPrimary, fontSize: 14, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.03)', opacity: isLoading ? 0.5 : 1
            }}>
              {loadingSocial ? t('settingUp') : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  {t('continueWithGoogle')}
                </>
              )}
            </button>

            <button type="button" onClick={handleAppleAuth} disabled={isLoading} style={{
              width: '100%', padding: '12px', background: PALETTE.textPrimary,
              border: 'none', borderRadius: 12,
              color: '#FFFFFF', fontSize: 14, fontWeight: 600, cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              boxShadow: '0 4px 12px rgba(45, 31, 80, 0.2)', opacity: isLoading ? 0.5 : 1
            }}>
              {loadingSocial ? t('settingUp') : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFFFFF" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.36 10.99c.02-3.1 2.5-4.57 2.6-4.63-1.44-2.12-3.66-2.43-4.46-2.48-1.9-.19-3.72 1.13-4.7 1.13-.98 0-2.45-1.12-4.04-1.09-2.07.03-3.99 1.2-5.06 3.08-2.16 3.75-.55 9.3 1.54 12.33 1.02 1.48 2.21 3.16 3.8 3.1 1.52-.06 2.1-.98 3.9-.98s2.34.98 3.92.95c1.64-.02 2.67-1.52 3.67-3.01 1.15-1.68 1.63-3.32 1.65-3.4-.04-.01-3.13-1.2-3.15-4.78M14.93 5.4c.84-1.02 1.41-2.43 1.26-3.85-1.22.05-2.69.82-3.55 1.84-.77.91-1.42 2.35-1.24 3.75 1.36.1 2.7-.68 3.53-1.74"/>
                  </svg>
                  {t('continueWithApple')}
                </>
              )}
            </button>
          </div>

          <div style={{ textAlign: 'center', marginTop: 16 }}>
            <Link href="/" style={{ color: PALETTE.primaryPurple, fontSize: 13.5, textDecoration: 'none', fontWeight: 600 }}>
              ← {t('backToHome')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── BƯỚC 2: CẢNH BÁO & FRICTION (WARNING) ── */
  if (stage === 'warning') {
    const canDelete = (confirmText.trim().toUpperCase() === 'DELETE');

    return (
      <div style={containerStyle}>
        <LanguageSwitcher />
        <div style={cardStyle}>
          {/* Close button */}
          <button type="button" onClick={handleCancel}
            style={{ position: 'absolute', top: 18, right: 18, background: PALETTE.lavender, border: `1px solid ${PALETTE.borderLavender}`, color: PALETTE.deepPurple, cursor: 'pointer', fontSize: 16, width: 32, height: 32, borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ✕
          </button>

          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center' }}>
              <span>🥺</span><span>🎹</span>
            </div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: PALETTE.textPrimary, marginBottom: 8, letterSpacing: '-0.3px' }}>
              {t('goDeleteWarnTitle')}
            </h1>
            <p style={{ fontSize: 14, color: PALETTE.textSecondary, marginBottom: 0 }}>
              {t('goDeleteWarnDesc')}
            </p>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between',
            background: PALETTE.appBackground, border: `1px solid ${PALETTE.borderLavender}`,
            borderRadius: 16, padding: '16px 0', marginBottom: 24
          }}>
            <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${PALETTE.borderLavender}` }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🔥</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: PALETTE.textSecondary }}>{t('streak')}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderRight: `1px solid ${PALETTE.borderLavender}` }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: PALETTE.textSecondary }}>{t('badges')}</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🎵</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: PALETTE.textSecondary }}>{t('lessons')}</div>
            </div>
          </div>

          <div style={{ fontSize: 14, color: PALETTE.textPrimary, lineHeight: 1.6, marginBottom: 24 }}>
            <p style={{ marginBottom: 12 }}>
              {t('goDeleteConfirmTitle')}<br/>
              <strong style={{ color: PALETTE.deepPurple, fontSize: 15 }}>{auth.currentUser?.email || email}</strong>
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 20, listStyle: 'disc', color: PALETTE.textSecondary }}>
              <li style={{ marginBottom: 6 }}>{t('goDeleteConfirmDesc1')}</li>
              <li>{t('goDeleteConfirmDesc2')}</li>
            </ul>
            <div style={{
              padding: '16px 18px', background: '#FFFBEB',
              border: '1px solid #FCD34D', borderRadius: 14,
              color: '#92400E', fontSize: 13.5, lineHeight: 1.5
            }}>
              <strong style={{ display: 'block', color: '#B45309', marginBottom: 4 }}>{t('goDeleteImportant')}</strong>
              {t('goDeleteImportantDesc')}
            </div>
          </div>

          {error && (
            <div style={{
              padding: '12px 16px', background: '#FEF2F2', border: '1px solid #FCA5A5',
              borderRadius: 12, color: '#DC2626', fontSize: 13.5, marginBottom: 20
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 20, textAlign: 'center' }}>
            <label style={{ fontWeight: 600, color: PALETTE.textSecondary, marginBottom: 10, fontSize: 13, display: 'block' }}>
              {t('typeDelete')}
            </label>
            <input type="text" placeholder="D E L E T E"
              value={confirmText} onChange={e => setConfirmText(e.target.value)}
              disabled={loadingEmail} autoComplete="off"
              style={{
                width: '100%', textAlign: 'center', fontWeight: '800',
                letterSpacing: confirmText ? 6 : 2,
                fontSize: 18, textTransform: 'uppercase',
                background: '#FFFFFF', border: `2px solid ${confirmText ? PALETTE.primaryPurple : PALETTE.borderLavender}`,
                padding: '14px', borderRadius: 12, outline: 'none', color: PALETTE.textPrimary,
                transition: 'border 0.2s'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <button type="button" disabled={!canDelete || loadingDelete} onClick={handleDelete}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                fontSize: 15, fontWeight: 700, cursor: canDelete ? 'pointer' : 'not-allowed',
                background: canDelete ? 'linear-gradient(135deg, #EF4444 0%, #DC2626 100%)' : PALETTE.lavender,
                color: canDelete ? '#FFFFFF' : PALETTE.textMuted,
                border: canDelete ? 'none' : `1px solid ${PALETTE.borderLavender}`,
                boxShadow: canDelete ? '0 8px 20px -4px rgba(239, 68, 68, 0.35)' : 'none',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}>
              {loadingDelete ? t('processing') : t('deleteBtn')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── BƯỚC 3: HOÀN TẤT (SUCCESS) ── */
  if (stage === 'success') {
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
          <h1 style={{ fontSize: 24, fontWeight: 800, color: PALETTE.textPrimary, marginBottom: 8 }}>{t('goDeleteSuccess')}</h1>
          <p style={{ fontSize: 14, color: PALETTE.textSecondary, marginBottom: 20, lineHeight: 1.55 }}>{t('goDeleteSuccessDesc')}</p>
          <p style={{ fontSize: 13, color: PALETTE.textMuted, marginBottom: 28 }}>{t('goDeletePrivacyNotice')}</p>
          <Link href="/" style={{
            display: 'inline-block', width: '100%', padding: '14px', borderRadius: 12,
            background: PALETTE.productGradient, color: '#FFFFFF',
            fontWeight: 700, fontSize: 15, textDecoration: 'none',
            boxShadow: `0 8px 20px -4px rgba(108, 65, 234, 0.35)`
          }}>
            {t('backToHomeBtn')}
          </Link>
        </div>
      </div>
    );
  }

  return null;
}
