import { Suspense } from 'react';
import ActionHandler from './ActionHandler';

export const dynamic = 'force-static';

export default function ActionPage() {
  return (
    <Suspense fallback={
      <div className="page-wrapper">
        <div className="card">
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <div className="spinner" style={{ margin: '0 auto' }} />
          </div>
        </div>
      </div>
    }>
      <ActionHandler />
    </Suspense>
  );
}
