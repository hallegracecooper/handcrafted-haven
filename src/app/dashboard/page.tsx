"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    
    if (!session) {
      router.push("/auth/signin");
    } else if (session.user && 'role' in session.user && session.user.role === "seller") {
      const user = session.user as any;
      router.push(`/seller/${user.username}`);
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '32px', 
            height: '32px', 
            border: '2px solid #2563eb', 
            borderTop: '2px solid transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 8px'
          }}></div>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
          <h1 style={{
            fontSize: '30px',
            fontWeight: 'bold',
            marginBottom: '8px',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Welcome back, {session.user?.name}!
          </h1>
          <p style={{ color: '#6b7280' }}>
            Your Handcrafted Haven dashboard
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Quick Actions */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <Link href="/products">
              <button style={{
                padding: '12px 24px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}>
                Browse Products
              </button>
            </Link>
            <Link href="/sell">
              <button style={{
                padding: '12px 24px',
                backgroundColor: 'white',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f9fafb';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'white';
              }}>
                Become a Seller
              </button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '24px', 
          marginBottom: '32px' 
        }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '24px'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Orders</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>0</p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '24px'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Wishlist</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>0</p>
            </div>
          </div>

          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '24px'
          }}>
            <div>
              <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>Total Spent</p>
              <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>$0.00</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
          {/* Recent Activity */}
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            padding: '24px'
          }}>
            <h3 style={{ 
              fontSize: '18px', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '16px' 
            }}>
              Recent Activity
            </h3>
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                padding: '16px', 
                backgroundColor: '#f9fafb', 
                borderRadius: '8px',
                border: '1px solid #e5e7eb'
              }}>
                <p style={{ fontSize: '14px', fontWeight: '500', color: '#111827', marginBottom: '4px' }}>
                  Welcome to Handcrafted Haven!
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Start exploring unique handmade treasures
                </p>
              </div>
            </div>
            <Link href="/products" style={{
              color: '#2563eb',
              fontSize: '14px',
              fontWeight: '500',
              textDecoration: 'none'
            }} onMouseEnter={(e) => {
              e.currentTarget.style.color = '#1d4ed8';
            }} onMouseLeave={(e) => {
              e.currentTarget.style.color = '#2563eb';
            }}>
              Browse all products →
            </Link>
          </div>

          {/* Account Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Account Info
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Name</p>
                  <p style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{session.user?.name}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Email</p>
                  <p style={{ fontSize: '14px', color: '#111827', fontWeight: '500' }}>{session.user?.email}</p>
                </div>
                <div>
                  <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>Account Type</p>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 8px',
                    fontSize: '12px',
                    borderRadius: '9999px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    fontWeight: '500'
                  }}>
                    {session.user && 'role' in session.user ? (session.user as any).role : 'N/A'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              border: '1px solid #e5e7eb',
              padding: '24px'
            }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#111827', 
                marginBottom: '16px' 
              }}>
                Quick Actions
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Link href="/products" style={{
                  display: 'block',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}>
                  Browse Products
                </Link>
                <Link href="/sell" style={{
                  display: 'block',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}>
                  Become a Seller
                </Link>
                <button style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#374151',
                  backgroundColor: '#f9fafb',
                  borderRadius: '8px',
                  border: '1px solid #e5e7eb',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#f9fafb';
                }}>
                  View Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
