'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    // Automatically redirect to /auth/login when this page loads
    router.push('/auth/login');
  }, [router]);

  return (
    <div>
      <p>Redirecting to login page...</p>
    </div>
  );
};

export default Page;
