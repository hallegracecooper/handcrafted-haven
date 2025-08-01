'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav style={{
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      padding: '16px 0'
    }}>
      <div style={{ 
        maxWidth: '1280px', 
        margin: '0 auto', 
        padding: '0 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none' }}>
          <h1 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            margin: 0,
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Handcrafted Haven
          </h1>
        </Link>

        {/* Navigation Links */}
        <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
          <Link href="/products" style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>
            Browse Products
          </Link>
          <Link href="/sell" style={{
            color: '#6b7280',
            textDecoration: 'none',
            fontSize: '16px',
            fontWeight: '500',
            transition: 'color 0.2s ease'
          }}>
            Become a Seller
          </Link>
        </div>
      </div>
    </nav>
  );
} 