import Link from 'next/link';

export const metadata = {
  title: 'Pianify - Học Piano Dễ Dàng',
  description: 'Đánh thức đam mê âm nhạc. Tự học trọn bộ kỹ năng từ cơ bản đến nâng cao cùng Pianify.',
};

export default function Home() {
  return (
    <div className="page-wrapper" style={{ flexDirection: 'column', padding: '0 20px' }}>
      
      {/* Header & Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40, animation: 'pop-in 0.5s ease' }}>
        <div style={{ 
          width: 80, height: 80, 
          background: 'linear-gradient(135deg, #C442F0 0%, #7B2FBE 100%)',
          borderRadius: 20,
          margin: '0 auto 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 12px 32px rgba(196, 66, 240, 0.4)'
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12h18"/><path d="M3 18h18"/><path d="M3 6h18"/><path d="M8 6v12"/><path d="M16 6v12"/>
          </svg>
        </div>
        <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12, letterSpacing: -1, background: 'linear-gradient(90deg, #fff 0%, #d8b4fe 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Pianify
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(249, 249, 251, 0.7)', maxWidth: 400, margin: '0 auto', lineHeight: 1.6 }}>
          Người bạn đồng hành đánh thức đam mê âm nhạc. Ứng dụng tự học hiệu quả dành cho người mới và nâng cao.
        </p>
      </div>

      {/* Download Buttons (Placeholder) */}
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60 }}>
        <button style={{ 
          background: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, 
          padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'transform 0.2s' 
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff"><path d="M16.36 10.99c.02-3.1 2.5-4.57 2.6-4.63-1.44-2.12-3.66-2.43-4.46-2.48-1.9-.19-3.72 1.13-4.7 1.13-.98 0-2.45-1.12-4.04-1.09-2.07.03-3.99 1.2-5.06 3.08-2.16 3.75-.55 9.3 1.54 12.33 1.02 1.48 2.21 3.16 3.8 3.1 1.52-.06 2.1-.98 3.9-.98s2.34.98 3.92.95c1.64-.02 2.67-1.52 3.67-3.01 1.15-1.68 1.63-3.32 1.65-3.4-.04-.01-3.13-1.2-3.15-4.78M14.93 5.4c.84-1.02 1.41-2.43 1.26-3.85-1.22.05-2.69.82-3.55 1.84-.77.91-1.42 2.35-1.24 3.75 1.36.1 2.7-.68 3.53-1.74"/></svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>Download on the</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>App Store</div>
          </div>
        </button>
        <button style={{ 
          background: '#000', border: '1px solid rgba(255,255,255,0.2)', borderRadius: 12, 
          padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', transition: 'transform 0.2s' 
        }}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="#4ade80"><path d="M3 1.5l14 10.5-14 10.5V1.5z"/></svg>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>GET IT ON</div>
            <div style={{ fontSize: 16, fontWeight: 600, color: '#fff' }}>Google Play</div>
          </div>
        </button>
      </div>

      {/* Utilities Base */}
      <div className="card" style={{ padding: '24px', maxWidth: 460, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'none', borderRadius: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'rgba(249,249,251,0.9)', textAlign: 'center' }}>
          Hỗ trợ người dùng
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 12 }}>
          <Link href="/reset-password" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(196, 66, 240, 0.1)', border: '1px solid rgba(196, 66, 240, 0.2)', padding: '16px', borderRadius: 12, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🔑</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e879f9' }}>Lấy lại mật khẩu</div>
            </div>
          </Link>
          <Link href="/delete-account" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: 12, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>🗑️</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#fca5a5' }}>Yêu cầu xóa dữ liệu</div>
            </div>
          </Link>
        </div>
      </div>
      
      {/* Footer minimal */}
      <div style={{ marginTop: 40, fontSize: 13, color: 'rgba(249,249,251,0.3)', textAlign: 'center' }}>
        © {new Date().getFullYear()} Pianify (Smulie Studio). All rights reserved.
      </div>
    </div>
  );
}

