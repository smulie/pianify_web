'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { confirmPasswordReset, verifyPasswordResetCode } from 'firebase/auth';
import { auth } from '../../lib/firebase';

/* ── Password strength ── */
function getStrength(pw: string): { score: number; label: string } {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
  const labels = ['', 'Yếu', 'Trung bình', 'Khá', 'Mạnh'];
  return { score, label: pw.length > 0 ? labels[score] || 'Mạnh' : '' };
}

/* ── Eye icon ── */
function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
      <line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

/* ── Piano logo ── */
function PianifyLogo() {
  return (
    <div className="logo-wrapper" style={{ marginBottom: 24 }}>
      <img src="/logo.png" alt="Pianify" style={{ width: 140, height: 'auto' }} />
    </div>
  );
}

/* ── PianoGo Brand Palette Tokens ── */
const PIANOGO_PALETTE = {
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

/* ── PianoGo Logo ── */
function PianoGoLogo() {
  return (
    <div className="logo-wrapper" style={{ marginBottom: 24, display: 'flex', justifyContent: 'center' }}>
      <img src="/pianogo.png" alt="PianoGo" style={{ height: 140, maxWidth: 360, width: '100%', objectFit: 'contain' }} />
    </div>
  );
}

type Stage = 'loading' | 'form' | 'success' | 'invalid';

export default function ActionHandler() {
  const params = useSearchParams();
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');
  const brandParam = params.get('brand');
  const continueUrl = params.get('continueUrl');

  const isPianoGo = brandParam === 'pianogo' || 
                    brandParam === 'piano-go' || 
                    (continueUrl !== null && (continueUrl.includes('piano-go') || continueUrl.includes('pianogo')));

  const wrapperStyle: React.CSSProperties = isPianoGo ? {
    minHeight: '100vh',
    background: PIANOGO_PALETTE.bgGradient,
    color: PIANOGO_PALETTE.textPrimary,
  } : {};

  const getCardStyle = (extra?: React.CSSProperties) => {
    if (!isPianoGo) return extra;
    return {
      background: PIANOGO_PALETTE.surfaceWhite,
      borderRadius: 24,
      boxShadow: `0 20px 48px -12px rgba(108, 65, 234, 0.12), 0 0 0 1px ${PIANOGO_PALETTE.borderLavender}`,
      color: PIANOGO_PALETTE.textPrimary,
      padding: '40px 32px',
      ...extra,
    };
  };

  const getInputStyle = (hasError: boolean) => {
    if (!isPianoGo) return hasError ? { borderColor: '#ef4444' } : undefined;
    return {
      background: '#FFFFFF',
      borderColor: hasError ? '#ef4444' : PIANOGO_PALETTE.borderLavender,
      color: PIANOGO_PALETTE.textPrimary,
      padding: '13px 16px',
      borderRadius: 12,
      borderWidth: 1.5,
      borderStyle: 'solid',
    };
  };

  const [stage, setStage] = useState<Stage>('loading');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const strength = getStrength(password);
  const strengthColors = ['', 'weak', 'fair', 'fair', 'strong'];

  /* Verify oobCode on mount */
  useEffect(() => {
    if (mode !== 'resetPassword' || !oobCode) {
      // If redirected back from Firebase after password reset completion without oobCode
      if (brandParam) {
        setStage('success');
        return;
      }
      setStage('invalid');
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setStage('form');
      })
      .catch(() => {
        // If oobCode was already consumed just moments ago by Firebase form redirect
        if (brandParam) {
          setStage('success');
        } else {
          setStage('invalid');
        }
      });
  }, [mode, oobCode, brandParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('Mật khẩu cần ít nhất 8 ký tự.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }

    setSubmitting(true);
    try {
      await confirmPasswordReset(auth, oobCode!, password);
      setStage('success');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/expired-action-code') {
        setError('Link đã hết hạn. Vui lòng gửi lại yêu cầu đặt lại mật khẩu.');
      } else if (code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu. Hãy thử mật khẩu phức tạp hơn.');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  /* ── Loading ── */
  if (stage === 'loading') {
    return (
      <div className="page-wrapper" style={wrapperStyle}>
        <div className="card" style={getCardStyle({ textAlign: 'center' })}>
          {isPianoGo ? <PianoGoLogo /> : <PianifyLogo />}
          <div className="spinner" style={{
            margin: '24px auto 0',
            ...(isPianoGo ? { border: '2px solid rgba(108, 65, 234, 0.2)', borderTopColor: PIANOGO_PALETTE.primaryPurple } : {})
          }} />
          <p style={{
            marginTop: 14,
            fontSize: 14,
            color: isPianoGo ? PIANOGO_PALETTE.textSecondary : 'rgba(249,249,251,0.45)'
          }}>
            Đang xác minh link…
          </p>
        </div>
      </div>
    );
  }

  /* ── Invalid / expired ── */
  if (stage === 'invalid') {
    return (
      <div className="page-wrapper" style={wrapperStyle}>
        <div className="card" style={getCardStyle()}>
          {isPianoGo ? <PianoGoLogo /> : <PianifyLogo />}
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{
              width: 56, height: 56,
              background: 'rgba(239,68,68,0.12)',
              border: '2px solid rgba(239,68,68,0.35)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round" style={isPianoGo ? { stroke: '#ef4444' } : undefined}>
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h1 className="card-title" style={isPianoGo ? { color: PIANOGO_PALETTE.textPrimary, fontWeight: 800 } : undefined}>Link không hợp lệ</h1>
            <p className="card-subtitle" style={isPianoGo ? { color: PIANOGO_PALETTE.textSecondary, lineHeight: 1.55 } : undefined}>
              Link đặt lại mật khẩu đã hết hạn hoặc đã được sử dụng.
              Vui lòng mở ứng dụng {isPianoGo ? 'PianoGo' : 'Pianify'} và yêu cầu gửi lại.
            </p>
            {isPianoGo && (
              <div style={{ textAlign: 'center', marginTop: 24 }}>
                <Link href="/piano-go/reset-password" style={{ color: PIANOGO_PALETTE.primaryPurple, fontSize: 13.5, textDecoration: 'none', fontWeight: 600 }}>
                  ← Quay lại
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  if (stage === 'success') {
    return (
      <div className="page-wrapper" style={wrapperStyle}>
        <div className="card" style={getCardStyle()}>
          {isPianoGo ? <PianoGoLogo /> : <PianifyLogo />}
          <div className="success-icon" style={isPianoGo ? {
            background: PIANOGO_PALETTE.lavender,
            border: `1px solid ${PIANOGO_PALETTE.borderLavender}`,
          } : undefined}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={isPianoGo ? PIANOGO_PALETTE.primaryPurple : '#86efac'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="card-title" style={isPianoGo ? { color: PIANOGO_PALETTE.textPrimary, fontWeight: 800 } : undefined}>Đặt lại thành công!</h1>
          <p className="card-subtitle" style={isPianoGo ? { color: PIANOGO_PALETTE.textSecondary, marginBottom: 24, lineHeight: 1.55 } : { marginBottom: 0 }}>
            Mật khẩu của bạn đã được cập nhật.<br />
            Hãy quay lại ứng dụng {isPianoGo ? 'PianoGo' : 'Pianify'} và đăng nhập.
          </p>
          {isPianoGo && (
            <div style={{ textAlign: 'center', marginTop: 12 }}>
              <Link href="/piano-go/reset-password" style={{ color: PIANOGO_PALETTE.primaryPurple, fontSize: 13.5, textDecoration: 'none', fontWeight: 600 }}>
                ← Quay lại
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="page-wrapper" style={wrapperStyle}>
      <div className="card" style={getCardStyle()}>
        {isPianoGo ? <PianoGoLogo /> : <PianifyLogo />}
        <h1 className="card-title" style={isPianoGo ? { color: PIANOGO_PALETTE.textPrimary, fontWeight: 800, letterSpacing: '-0.4px' } : undefined}>Đặt lại mật khẩu</h1>
        <p className="card-subtitle" style={isPianoGo ? { color: PIANOGO_PALETTE.textSecondary } : undefined}>
          Tạo mật khẩu mới cho tài khoản<br />
          <strong style={{ color: isPianoGo ? PIANOGO_PALETTE.deepPurple : 'rgba(249,249,251,0.75)' }}>{email}</strong>
        </p>

        {error && (
          <div className="alert alert-error" style={isPianoGo ? {
            background: '#FEF2F2',
            border: '1px solid #FCA5A5',
            color: '#DC2626',
          } : undefined}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* New password */}
          <div className="form-group">
            <label className="form-label" style={isPianoGo ? { color: PIANOGO_PALETTE.deepPurple, fontWeight: 600 } : undefined}>Mật khẩu mới</label>
            <div className="input-wrapper">
              <input
                className="form-input"
                type={showPw ? 'text' : 'password'}
                placeholder="Tối thiểu 8 ký tự"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={submitting}
                required
                autoComplete="new-password"
                style={getInputStyle(false)}
              />
              <button type="button" className="toggle-password" onClick={() => setShowPw(v => !v)} tabIndex={-1} style={isPianoGo ? { color: PIANOGO_PALETTE.textSecondary } : undefined}>
                <EyeIcon open={showPw} />
              </button>
            </div>
            {/* Strength bar */}
            {password.length > 0 && (
              <>
                <div className="strength-bar">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className={`strength-segment ${i <= strength.score ? strengthColors[strength.score] : ''}`}
                    />
                  ))}
                </div>
                <p className="strength-label" style={isPianoGo ? { color: PIANOGO_PALETTE.textMuted } : undefined}>{strength.label}</p>
              </>
            )}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label className="form-label" style={isPianoGo ? { color: PIANOGO_PALETTE.deepPurple, fontWeight: 600 } : undefined}>Xác nhận mật khẩu</label>
            <div className="input-wrapper">
              <input
                className="form-input"
                type={showConfirm ? 'text' : 'password'}
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={submitting}
                required
                autoComplete="new-password"
                style={getInputStyle(!!(confirmPassword && confirmPassword !== password))}
              />
              <button type="button" className="toggle-password" onClick={() => setShowConfirm(v => !v)} tabIndex={-1} style={isPianoGo ? { color: PIANOGO_PALETTE.textSecondary } : undefined}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p style={{ fontSize: 12, color: isPianoGo ? '#ef4444' : '#fca5a5', marginTop: 2 }}>Mật khẩu không khớp</p>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={submitting} style={isPianoGo ? {
            background: PIANOGO_PALETTE.productGradient,
            color: '#FFFFFF',
            boxShadow: `0 8px 20px -4px rgba(108, 65, 234, 0.35)`,
            padding: '14px',
            borderRadius: 12,
            fontSize: 15,
            fontWeight: 700,
            border: 'none',
            cursor: submitting ? 'not-allowed' : 'pointer',
          } : undefined}>
            {submitting ? <><div className="spinner" style={isPianoGo ? { border: '2px solid rgba(255, 255, 255, 0.3)', borderTopColor: '#fff' } : undefined} />Đang xử lý…</> : 'Xác nhận đặt lại mật khẩu'}
          </button>
        </form>

        <Link href={isPianoGo ? "/piano-go/reset-password" : "/"} className="back-link" style={isPianoGo ? {
          color: PIANOGO_PALETTE.primaryPurple,
          fontWeight: 600,
          textDecoration: 'none',
        } : undefined}>
          {isPianoGo ? '← Quay lại' : '← Quay lại trang chủ'}
        </Link>
      </div>
    </div>
  );
}
