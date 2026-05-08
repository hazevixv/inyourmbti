"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Profile page is merged into /test — redirect there
export default function ProfilePage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/test');
  }, [router]);

  return null;
}
