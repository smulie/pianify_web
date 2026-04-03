import Link from 'next/link';

export const dynamic = 'force-static';

export const metadata = {
  title: 'Pianify - Học Piano Dễ Dàng',
  description: 'Đánh thức đam mê âm nhạc. Tự học trọn bộ kỹ năng từ cơ bản đến nâng cao cùng Pianify.',
};

const PianifyLogo = () => (
  <div className="logo-wrapper" style={{ animation: 'pop-in 0.5s ease', marginBottom: 24, transform: 'scale(1.2)' }}>
    <div className="logo-icon">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 2A2 2 0 0 0 2 4v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4zm1 18V4h2v14H5zm4 0V4h2v9h-2v9zm4 0V4h2v9h-2v9zm4 0V4h2v14h-2z" fill="#fff" />
      </svg>
    </div>
    <h1 className="logo-name" style={{ fontSize: 28, marginTop: 4 }}>Pianify</h1>
  </div>
);

export default function Home() {
  return (
    <div className="page-wrapper" style={{ flexDirection: 'column', padding: '0 20px' }}>

      {/* Header & Logo */}
      <div style={{ textAlign: 'center', marginBottom: 40, animation: 'pop-in 0.5s ease' }}>
        <img
          src="/logo.png"
          alt="Pianify"
          style={{ width: 140, height: 'auto', marginBottom: 20 }}
        />
        <p style={{ fontSize: 17, color: 'rgba(249, 249, 251, 0.85)', maxWidth: 440, margin: '0 auto', lineHeight: 1.6 }}>
          Người bạn đồng hành đánh thức đam mê âm nhạc.<br />Ứng dụng tự học hiệu quả dành cho người mới và nâng cao.
        </p>
      </div>

      {/* Download Buttons */}
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 60, alignItems: 'center' }}>
        <a href="#" className="hover-scale" style={{ display: 'block' }}>
          <img src="/apple.svg" alt="Download on the App Store" style={{ height: 50, width: 'auto', display: 'block' }} />
        </a>
        <a href="#" className="hover-scale" style={{ display: 'block' }}>
          <img src="/ggplay.svg" alt="GET IT ON Google Play" style={{ height: 50, width: 'auto', display: 'block' }} />
        </a>
      </div>

      {/* Utilities Base */}
      <div className="card" style={{ padding: '24px', maxWidth: 460, background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', boxShadow: 'none', borderRadius: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 16, color: 'rgba(249,249,251,0.9)', textAlign: 'center' }}>
          Hỗ trợ người dùng
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: 12 }}>
          <Link href="/reset-password" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(196, 66, 240, 0.1)', border: '1px solid rgba(196, 66, 240, 0.2)', padding: '16px', borderRadius: 10, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: '#e879f9' }}>Lấy lại mật khẩu</div>
            </div>
          </Link>
          <Link href="/delete-account" style={{ textDecoration: 'none' }}>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', padding: '16px', borderRadius: 10, textAlign: 'center', transition: 'background 0.2s', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
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

