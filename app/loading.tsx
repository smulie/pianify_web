export default function GlobalLoading() {
  return (
    <div className="page-wrapper" style={{ flexDirection: 'column', padding: '0 20px', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ animation: 'pulse 1.5s infinite ease-in-out', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Placeholder cho Logo */}
        <div style={{ width: 140, height: 46, background: 'rgba(255,255,255,0.05)', borderRadius: 8, marginBottom: 40 }} />
        
        {/* Placeholder cho Text */}
        <div style={{ width: 280, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 4, marginBottom: 12 }} />
        <div style={{ width: 220, height: 16, background: 'rgba(255,255,255,0.05)', borderRadius: 4, marginBottom: 60 }} />

        {/* Vòng xoay Loading */}
        <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.1)', borderTopColor: '#fff', width: 36, height: 36 }} />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
