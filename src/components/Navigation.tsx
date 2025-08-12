"use client";

import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { useState, useRef, useEffect } from 'react';
import CartIcon from './CartIcon';

export default function Navigation() {
  const { data: session, status } = useSession();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  const handleDropdownKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      setIsDropdownOpen(!isDropdownOpen);
    }
  };

  return (
    <nav 
      role="navigation" 
      aria-label="Main navigation"
      style={{
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        padding: '16px 0'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center' 
        }}>
          {/* Logo */}
          <Link 
            href="/" 
            style={{
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#111827',
              textDecoration: 'none',
              fontFamily: "var(--font-playfair), 'Playfair Display', serif"
            }}
            aria-label="Handcrafted Haven - Home"
          >
            Handcrafted Haven
          </Link>

          {/* Navigation Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <Link 
              href="/products" 
              style={{
                color: '#374151',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}
              aria-label="Browse all products"
            >
              Products
            </Link>
            
            <Link 
              href="/sell" 
              style={{
                color: '#374151',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500'
              }}
              aria-label="Sell your handcrafted items"
            >
              Sell
            </Link>

            <CartIcon />

            {status === 'loading' ? (
              <div 
                style={{ fontSize: '14px', color: '#6b7280' }}
                aria-live="polite"
                aria-label="Loading user session"
              >
                Loading...
              </div>
            ) : session ? (
              <div ref={dropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onKeyDown={handleDropdownKeyDown}
                  aria-expanded={isDropdownOpen}
                  aria-haspopup="true"
                  aria-label={`User menu for ${session.user?.name || 'User'}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: '#374151',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                >
                  <span>Hi, {session.user?.name}</span>
                  <span aria-hidden="true">▼</span>
                </button>

                {isDropdownOpen && (
                  <div
                    role="menu"
                    aria-label="User account options"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: '0',
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                      minWidth: '200px',
                      zIndex: 1000,
                      padding: '8px 0'
                    }}
                  >
                    <Link
                      href="/dashboard"
                      role="menuitem"
                      style={{
                        display: 'block',
                        padding: '8px 16px',
                        color: '#374151',
                        textDecoration: 'none',
                        fontSize: '14px'
                      }}
                      onClick={() => setIsDropdownOpen(false)}
                      onKeyDown={handleKeyDown}
                    >
                      Dashboard
                    </Link>
                    
                    {session.user && 'role' in session.user && (session.user as any).role === 'seller' && (
                      <Link
                        href={`/seller/${(session.user as any).username}`}
                        role="menuitem"
                        style={{
                          display: 'block',
                          padding: '8px 16px',
                          color: '#374151',
                          textDecoration: 'none',
                          fontSize: '14px'
                        }}
                        onClick={() => setIsDropdownOpen(false)}
                        onKeyDown={handleKeyDown}
                      >
                        Seller Dashboard
                      </Link>
                    )}
                    
                    <button
                      onClick={() => {
                        signOut();
                        setIsDropdownOpen(false);
                      }}
                      onKeyDown={handleKeyDown}
                      role="menuitem"
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        padding: '8px 16px',
                        color: '#dc2626',
                        cursor: 'pointer',
                        fontSize: '14px'
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '12px' }}>
                <Link
                  href="/auth/signin"
                  style={{
                    color: '#374151',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  aria-label="Sign in to your account"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  style={{
                    backgroundColor: '#2563eb',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}
                  aria-label="Create a new account"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 