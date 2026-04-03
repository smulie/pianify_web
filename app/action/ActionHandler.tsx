'use client';

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
    <div className="logo-wrapper">
      <div className="logo-icon">
        <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="5" width="22" height="16" rx="2" fill="white" fillOpacity="0.15"/>
          <rect x="3" y="5" width="22" height="11" rx="2" fill="white" fillOpacity="0.9"/>
          <rect x="7" y="5" width="4" height="8" rx="1" fill="#1e1c31"/>
          <rect x="13" y="5" width="4" height="8" rx="1" fill="#1e1c31"/>
          <rect x="19" y="5" width="4" height="8" rx="1" fill="#1e1c31"/>
        </svg>
      </div>
      <span className="logo-name">Pianify</span>
    </div>
  );
}

type Stage = 'loading' | 'form' | 'success' | 'invalid';

export default function ActionHandler() {
  const params = useSearchParams();
  const mode = params.get('mode');
  const oobCode = params.get('oobCode');

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
      setStage('invalid');
      return;
    }
    verifyPasswordResetCode(auth, oobCode)
      .then((userEmail) => {
        setEmail(userEmail);
        setStage('form');
      })
      .catch(() => setStage('invalid'));
  }, [mode, oobCode]);

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
      <div className="page-wrapper">
        <div className="card" style={{ textAlign: 'center' }}>
          <PianifyLogo />
          <div className="spinner" style={{ margin: '24px auto 0' }} />
          <p style={{ marginTop: 14, fontSize: 14, color: 'rgba(249,249,251,0.45)' }}>
            Đang xác minh link…
          </p>
        </div>
      </div>
    );
  }

  /* ── Invalid / expired ── */
  if (stage === 'invalid') {
    return (
      <div className="page-wrapper">
        <div className="card">
          <PianifyLogo />
          <div style={{ textAlign: 'center', marginBottom: 12 }}>
            <div style={{
              width: 56, height: 56,
              background: 'rgba(239,68,68,0.12)',
              border: '2px solid rgba(239,68,68,0.35)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fca5a5" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </div>
            <h1 className="card-title">Link không hợp lệ</h1>
            <p className="card-subtitle">
              Link đặt lại mật khẩu đã hết hạn hoặc đã được sử dụng.
              Vui lòng mở ứng dụng Pianify và yêu cầu gửi lại.
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* ── Success ── */
  if (stage === 'success') {
    return (
      <div className="page-wrapper">
        <div className="card">
          <PianifyLogo />
          <div className="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="card-title">Đặt lại thành công!</h1>
          <p className="card-subtitle" style={{ marginBottom: 0 }}>
            Mật khẩu của bạn đã được cập nhật.<br />
            Hãy quay lại ứng dụng Pianify và đăng nhập.
          </p>
        </div>
      </div>
    );
  }

  /* ── Form ── */
  return (
    <div className="page-wrapper">
      <div className="card">
        <PianifyLogo />
        <h1 className="card-title">Đặt lại mật khẩu</h1>
        <p className="card-subtitle">
          Tạo mật khẩu mới cho tài khoản<br />
          <strong style={{ color: 'rgba(249,249,251,0.75)' }}>{email}</strong>
        </p>

        {error && (
          <div className="alert alert-error">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* New password */}
          <div className="form-group">
            <label className="form-label">Mật khẩu mới</label>
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
              />
              <button type="button" className="toggle-password" onClick={() => setShowPw(v => !v)} tabIndex={-1}>
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
                <p className="strength-label">{strength.label}</p>
              </>
            )}
          </div>

          {/* Confirm password */}
          <div className="form-group">
            <label className="form-label">Xác nhận mật khẩu</label>
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
                style={confirmPassword && confirmPassword !== password ? { borderColor: '#ef4444' } : {}}
              />
              <button type="button" className="toggle-password" onClick={() => setShowConfirm(v => !v)} tabIndex={-1}>
                <EyeIcon open={showConfirm} />
              </button>
            </div>
            {confirmPassword && confirmPassword !== password && (
              <p style={{ fontSize: 12, color: '#fca5a5', marginTop: 2 }}>Mật khẩu không khớp</p>
            )}
          </div>

          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? <><div className="spinner" />Đang xử lý…</> : 'Xác nhận đặt lại mật khẩu'}
          </button>
        </form>

        <a href="pianify://" className="back-link">← Quay lại ứng dụng Pianify</a>
      </div>
    </div>
  );
}
