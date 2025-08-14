"use client";

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';

export default function ConditionalNavigation() {
  const pathname = usePathname();
  
  // Don't show navigation on the home page and auth pages
  if (pathname === '/' || pathname === '/auth/signin' || pathname === '/auth/signup') {
    return null;
  }
  
  return <Navigation />;
}
