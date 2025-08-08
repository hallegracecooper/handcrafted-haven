'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

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

          {/* Authentication Links */}
          {status === 'loading' ? (
            <div style={{ color: '#6b7280', fontSize: '16px' }}>Loading...</div>
          ) : session ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#6b7280',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                {session.user?.name}
                <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isMenuOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                  minWidth: '200px',
                  zIndex: 1000,
                  marginTop: '8px'
                }}>
                  <div style={{ padding: '12px 16px', borderBottom: '1px solid #f3f4f6' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600', color: '#111827' }}>
                      {session.user?.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>
                      {session.user?.email}
                    </div>
                  </div>
                  
                  <Link href="/dashboard" style={{
                    display: 'block',
                    padding: '12px 16px',
                    color: '#374151',
                    textDecoration: 'none',
                    fontSize: '14px',
                    borderBottom: '1px solid #f3f4f6'
                  }}>
                    Dashboard
                  </Link>
                  
                  {session.user && 'role' in session.user && (session.user as any).role === 'seller' && (
                    <Link href={`/seller/${(session.user as any).username}`} style={{
                      display: 'block',
                      padding: '12px 16px',
                      color: '#374151',
                      textDecoration: 'none',
                      fontSize: '14px',
                      borderBottom: '1px solid #f3f4f6'
                    }}>
                      Seller Dashboard
                    </Link>
                  )}
                  
                  <button
                    onClick={handleSignOut}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'left',
                      padding: '12px 16px',
                      background: 'none',
                      border: 'none',
                      color: '#dc2626',
                      fontSize: '14px',
                      cursor: 'pointer'
                    }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <Link href="/auth/signin" style={{
                color: '#6b7280',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'color 0.2s ease'
              }}>
                Sign In
              </Link>
              <Link href="/auth/signup" style={{
                backgroundColor: '#4f46e5',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
                transition: 'background-color 0.2s ease'
              }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
} 