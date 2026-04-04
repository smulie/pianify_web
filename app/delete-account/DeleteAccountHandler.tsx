'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, deleteUser, signOut, signInWithPopup, GoogleAuthProvider, OAuthProvider, getAdditionalUserInfo } from 'firebase/auth';
import { auth } from '../../lib/firebase';

/* ── Piano logo ── */
function PianifyLogo() {
  return (
    <div className="logo-wrapper" style={{ marginBottom: 24 }}>
      <img src="/logo.png" alt="Pianify" style={{ width: 140, height: 'auto' }} />
    </div>
  );
}

type Stage = 'auth' | 'warning' | 'success';

export default function DeleteAccountHandler() {
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
    // Không dùng Redirect nữa do kém ổn định với domain chưa setup kỹ
  }, []);

  /* ── 1. Đăng nhập để định danh ── */
  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    setError('');
    setLoadingEmail(true);
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Đăng nhập thành công, chuyển sang bước cảnh báo
      setStage('warning');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/wrong-password' || code === 'auth/user-not-found' || code === 'auth/invalid-credential') {
        setError('Email hoặc mật khẩu không chính xác.');
      } else if (code === 'auth/too-many-requests') {
        setError('Tài khoản tạm thời bị khóa. Hãy thử lại sau.');
      } else {
        setError('Đã xảy ra lỗi đăng nhập. Vui lòng thử lại.');
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
        try {
          await deleteUser(result.user);
        } catch (e) {
          console.error('Lỗi khi xóa tài khoản tạm:', e);
        }
        setError('Tài khoản này chưa được đăng ký trên hệ thống. Không thể xoá dữ liệu.');
      } else {
        if (result.user.email) setEmail(result.user.email);
        setStage('warning');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else if (code === 'auth/unauthorized-domain') {
        setError('Tên miền chưa được cấp phép trong Firebase Auth.');
      } else {
        setError('Đã xảy ra lỗi đăng nhập Google. Vui lòng thử lại.');
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
        try {
          await deleteUser(result.user);
        } catch (e) {
          console.error('Lỗi khi xóa tài khoản tạm:', e);
        }
        setError('Tài khoản này chưa được đăng ký trên hệ thống. Không thể xoá dữ liệu.');
      } else {
        if (result.user.email) setEmail(result.user.email);
        setStage('warning');
      }
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') {
        setError('');
      } else if (code === 'auth/unauthorized-domain') {
        setError('Tên miền chưa được cấp phép trong Firebase Auth.');
      } else {
        setError('Đã xảy ra lỗi đăng nhập Apple. Vui lòng thử lại.');
      }
    } finally {
      setLoadingSocial(false);
    }
  };

  /* ── 2. Thực hiện Xóa tài khoản ── */
  const handleDelete = async () => {
    if (confirmText.trim().toUpperCase() !== 'DELETE') return;
    
    setError('');
    setLoadingDelete(true);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('User not authenticated');
      }

      await deleteUser(user);
      setStage('success');
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === 'auth/requires-recent-login') {
        setError('Phiên đăng nhập đã hết hạn. Vui lòng tải lại trang và đăng nhập lại.');
      } else {
        setError('Đã xảy ra lỗi khi xóa tài khoản. Vui lòng thử lại.');
      }
    } finally {
      setLoadingDelete(false);
    }
  };

  /* ── Hủy yêu cầu ── */
  const handleCancel = async () => {
    await signOut(auth);
    setStage('auth');
    setPassword('');
    setConfirmText('');
    setError('');
    setLoadingDelete(false);
  };

  /* ──────────────────────────────────────────────────────── */
  /* ── BƯỚC 1: XÁC THỰC (AUTH) ── */
  if (stage === 'auth') {
    return (
      <div className="page-wrapper">
        <div className="card">
          <PianifyLogo />
          <h1 className="card-title">Xóa tài khoản</h1>
          <p className="card-subtitle">
            Vui lòng đăng nhập để xác nhận quyền sở hữu tài khoản trước khi yêu cầu xóa dữ liệu.
          </p>

          {error && (
            <div className="alert alert-error">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ flexShrink: 0, marginTop: 1 }}>
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          <form onSubmit={handleAuth}>
            <div className="form-group">
              <label className="form-label">Email tài khoản</label>
              <input
                className="form-input"
                type="email"
                placeholder="nguoidung@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Mật khẩu</label>
              <input
                className="form-input"
                type="password"
                placeholder="Mật khẩu của bạn"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <button type="submit" className="btn-primary" disabled={isLoading}>
              {loadingEmail ? <><div className="spinner" />Đang xác thực…</> : 'Tiếp tục'}
            </button>
          </form>

          <div style={{ margin: '16px 0', textAlign: 'center', fontSize: 13, color: 'rgba(249,249,251,0.5)' }}>— HOẶC —</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <button type="button" onClick={handleGoogleAuth} disabled={isLoading} style={{
              width: '100%', padding: '12px', background: 'transparent',
              border: '1px solid rgba(255,255,255,0.2)', borderRadius: 10,
              color: '#fff', fontSize: 14, fontWeight: 500, cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              opacity: isLoading ? 0.5 : 1
            }}>
              {loadingSocial ? <><div className="spinner"/>Đang thiết lập…</> : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Tiếp tục với Google
                </>
              )}
            </button>

            <button type="button" onClick={handleAppleAuth} disabled={isLoading} style={{
              width: '100%', padding: '12px', background: '#e5e7eb',
              border: 'none', borderRadius: 10,
              color: '#000', fontSize: 14, fontWeight: 500, cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
              opacity: isLoading ? 0.5 : 1
            }}>
              {loadingSocial ? <><div className="spinner" style={{ borderColor: 'rgba(0,0,0,0.2)', borderTopColor: '#000' }}/>Đang thiết lập…</> : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#000" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.36 10.99c.02-3.1 2.5-4.57 2.6-4.63-1.44-2.12-3.66-2.43-4.46-2.48-1.9-.19-3.72 1.13-4.7 1.13-.98 0-2.45-1.12-4.04-1.09-2.07.03-3.99 1.2-5.06 3.08-2.16 3.75-.55 9.3 1.54 12.33 1.02 1.48 2.21 3.16 3.8 3.1 1.52-.06 2.1-.98 3.9-.98s2.34.98 3.92.95c1.64-.02 2.67-1.52 3.67-3.01 1.15-1.68 1.63-3.32 1.65-3.4-.04-.01-3.13-1.2-3.15-4.78M14.93 5.4c.84-1.02 1.41-2.43 1.26-3.85-1.22.05-2.69.82-3.55 1.84-.77.91-1.42 2.35-1.24 3.75 1.36.1 2.7-.68 3.53-1.74"/>
                  </svg>
                  Tiếp tục với Apple
                </>
              )}
            </button>
          </div>

          <Link href="/" className="back-link">← Quay lại trang chủ</Link>
        </div>
      </div>
    );
  }


  /* ── BƯỚC 2: CẢNH BÁO & FRICTION (WARNING) ── */
  if (stage === 'warning') {
    const canDelete = (confirmText.trim().toUpperCase() === 'DELETE');

    return (
      <div className="page-wrapper" style={{ flexDirection: 'column' }}>
        <div className="card" style={{ padding: '40px 24px', position: 'relative', marginBottom: 24, background: '#1c1b29', width: '100%', maxWidth: 440 }}>
          {/* Close button */}
          <button 
            type="button"
            onClick={handleCancel}
            style={{ 
              position: 'absolute', top: 16, right: 16, 
              background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.4)', 
              cursor: 'pointer', fontSize: 20, padding: 8
            }}
          >
            ✕
          </button>
          
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <div style={{ fontSize: 44, marginBottom: 12, display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center' }}>
              <span>🥺</span>
              <span>🎹</span>
            </div>
            <h1 className="card-title" style={{ fontSize: 22, marginBottom: 8, fontWeight: 800 }}>Bạn muốn rời đi?</h1>
            <p className="card-subtitle" style={{ fontSize: 13, marginBottom: 0 }}>
              Tài khoản và toàn bộ dữ liệu sẽ bị xóa vĩnh viễn.
            </p>
          </div>

          <div style={{ 
            display: 'flex', justifyContent: 'space-between', 
            background: 'transparent', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 12, padding: '16px 0', marginBottom: 28
          }}>
            <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🔥</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(249,249,251,0.6)' }}>Streak</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🏆</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(249,249,251,0.6)' }}>Huy hiệu</div>
            </div>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>🎵</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: 'rgba(249,249,251,0.6)' }}>Bài học</div>
            </div>
          </div>

          {/* Đoạn text cảnh báo được đẩy lên đây và làm đẹp hơn */}
          <div style={{ fontSize: 14, color: 'rgba(249,249,251,0.85)', lineHeight: 1.6, marginBottom: 32 }}>
            <p style={{ marginBottom: 16 }}>
              Bạn đang yêu cầu xóa vĩnh viễn tài khoản:<br/>
              <strong style={{ color: '#fff', fontSize: 15 }}>{auth.currentUser?.email || email}</strong>
            </p>
            <ul style={{ paddingLeft: 20, marginBottom: 20, listStyle: 'disc' }}>
              <li style={{ marginBottom: 8 }}>Hồ sơ, tiến trình học và các bài tập luyện sẽ bị xóa vĩnh viễn.</li>
              <li>Thao tác này <strong style={{ color: '#ef4444' }}>KHÔNG THỂ</strong> hoàn tác sau khi thực hiện.</li>
            </ul>
            <div style={{ 
              padding: '16px 20px', background: 'rgba(245, 158, 11, 0.08)', 
              border: '1px solid rgba(245, 158, 11, 0.15)', borderRadius: 12, 
              color: '#fcd34d', fontSize: 13.5, lineHeight: 1.5 
            }}>
              <strong style={{ display: 'block', color: '#fbbf24', marginBottom: 4 }}>Lưu ý quan trọng:</strong> 
              Xóa tài khoản sẽ KHÔNG tự động hủy các gói dùng thử hoặc đăng ký trả phí (Premium) của bạn. Bạn phải tự quản lý việc hủy gói trên Google Play hoặc App Store.
            </div>
          </div>

          {error && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              {error}
            </div>
          )}

          <div className="form-group" style={{ marginBottom: 20, textAlign: 'center' }}>
            <label className="form-label" style={{ fontWeight: 500, color: 'rgba(249,249,251,0.5)', marginBottom: 12, fontSize: 13 }}>Gõ DELETE để xác nhận</label>
            <input
              className="form-input"
              type="text"
              placeholder="D E L E T E"
              value={confirmText}
              onChange={e => setConfirmText(e.target.value)}
              disabled={loadingEmail}
              autoComplete="off"
              style={{ 
                textAlign: 'center', fontWeight: '800', 
                letterSpacing: confirmText ? 6 : 2, 
                fontSize: 18, textTransform: 'uppercase',
                background: '#13111c', border: '1px solid rgba(255,255,255,0.05)',
                padding: '16px', borderRadius: 10, outline: 'none', color: '#fff'
              }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, alignItems: 'center' }}>
            <button 
              type="button" 
              disabled={!canDelete || loadingDelete}
              onClick={handleDelete}
              style={{
                width: '100%', maxWidth: 280, padding: '14px', borderRadius: 10,
                fontSize: 15, fontWeight: 700, cursor: canDelete ? 'pointer' : 'not-allowed',
                background: canDelete ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : 'rgba(255,255,255,0.03)',
                color: canDelete ? '#fff' : 'rgba(255,255,255,0.3)',
                border: canDelete ? 'none' : '1px solid rgba(255,255,255,0.1)',
                transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8
              }}
            >
              {loadingDelete ? <><div className="spinner" />Đang xử lý…</> : 'Xóa tài khoản'}
            </button>
          </div>
        </div>
      </div>
    );
  }



  /* ── BƯỚC 3: HOÀN TẤT (SUCCESS) ── */
  if (stage === 'success') {
    return (
      <div className="page-wrapper">
        <div className="card">
          <PianifyLogo />
          <div className="success-icon" style={{ marginTop: 20 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <h1 className="card-title">Đã xóa tài khoản</h1>
          <p className="card-subtitle" style={{ marginBottom: 24 }}>
            Yêu cầu của bạn đã được thực hiện. Tài khoản và quyền truy cập của bạn đã bị gỡ bỏ khỏi hệ thống.
          </p>
          <p className="card-subtitle" style={{ fontSize: 13, color: 'rgba(249,249,251,0.45)' }}>
            Tiến trình xóa dữ liệu trên hệ thống sẽ hoàn tất hoàn toàn trong vài ngày tới theo Chính sách bảo mật. Cảm ơn bạn đã tin tưởng kết nối cùng Pianify.
          </p>
          <Link href="/" className="btn-primary" style={{ textDecoration: 'none' }}>Về lại trang chủ</Link>
        </div>
      </div>
    );
  }

  return null;
}
