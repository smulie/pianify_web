'use client';

import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../lib/firebase';

/* ── Piano logo ── */
function PianifyLogo() {
  return (
    <div className="logo-wrapper" style={{ marginBottom: 24 }}>
      <img src="/logo.png" alt="Pianify" style={{ width: 140, height: 'auto' }} />
    </div>
  );
}

type Stage = 'form' | 'sent';

export default function ResetPasswordPage() {
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
        // After setting new password, redirect back to app
        url: `${window.location.origin}/action`,
        handleCodeInApp: false,
      };
      await sendPasswordResetEmail(auth, email, actionCodeSettings);
      setStage('sent');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/user-not-found' || code === 'auth/invalid-email') {
        setError('Email không tồn tại trong hệ thống.');
      } else if (code === 'auth/too-many-requests') {
        setError('Quá nhiều yêu cầu. Vui lòng thử lại sau vài phút.');
      } else {
        setError('Đã xảy ra lỗi. Vui lòng thử lại.');
      }
    } finally {
      setLoading(false);
    }
  };

  /* ── Success state ── */
  if (stage === 'sent') {
    return (
      <div className="page-wrapper">
        <div className="card">
          <PianifyLogo />
          <div className="success-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="card-title">Yêu cầu thành công!</h1>
          <p className="card-subtitle">
            Chúng tôi đã gửi email hướng dẫn đặt lại mật khẩu đến<br/>
            <strong style={{ color: 'rgba(249,249,251,0.85)' }}>{email}</strong>
          </p>
          <p className="card-subtitle" style={{ marginTop: -16 }}>
            Vui lòng kiểm tra hộp thư (cả mục spam/quảng cáo).
          </p>
          <button
            className="btn-primary"
            onClick={() => { setStage('form'); setEmail(''); }}
            style={{ marginTop: 4 }}
          >
            Gửi lại email
          </button>
          <a href="pianify://" className="back-link">← Quay lại ứng dụng Pianify</a>
        </div>
      </div>
    );
  }

  /* ── Form state ── */
  return (
    <div className="page-wrapper">
      <div className="card">
        <PianifyLogo />
        <h1 className="card-title">Quên mật khẩu?</h1>
        <p className="card-subtitle">
          Nhập email để nhận hướng dẫn đặt lại mật khẩu.
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
          <div className="form-group">
            <label className="form-label">Email của bạn</label>
            <input
              className="form-input"
              type="email"
              placeholder="nguoidung@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
              required
              autoFocus
              autoComplete="email"
            />
          </div>

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? <><div className="spinner" />Đang gửi…</> : 'Gửi yêu cầu'}
          </button>
        </form>

        <a href="pianify://" className="back-link">← Quay lại đăng nhập</a>
      </div>
    </div>
  );
}
