import dynamic from 'next/dynamic';

const DeleteAccountHandler = dynamic(() => import('./DeleteAccountHandler'), { 
  ssr: false,
  loading: () => (
    <div className="page-wrapper">
      <div className="card" style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
        <div className="spinner" style={{ borderColor: 'rgba(255,255,255,0.2)', borderTopColor: '#fff', width: 30, height: 30 }} />
      </div>
    </div>
  )
});

export default function DeleteAccountPage() {
  return <DeleteAccountHandler />;
}
