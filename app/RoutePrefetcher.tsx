'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Routes to prefetch in background on first load
const ROUTES_TO_PREFETCH = ['/reset-password', '/delete-account', '/action'];

/**
 * Invisibly prefetches all app routes on mount.
 * This warms up the Cloud Run container in background while the user
 * is reading the current page, so subsequent navigation is instant.
 */
export default function RoutePrefetcher() {
  const router = useRouter();

  useEffect(() => {
    // Stagger prefetches slightly to avoid hammering the server simultaneously
    ROUTES_TO_PREFETCH.forEach((route, index) => {
      setTimeout(() => {
        router.prefetch(route);
      }, index * 300);
    });
  }, [router]);

  return null;
}
