"use client";

import { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        const session = await getSession();
        if (session?.user && 'role' in session.user && session.user.role === "seller") {
          const user = session.user as any;
          router.push(`/seller/${user.username}`);
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
            Sign In
          </h1>
          <p style={{ color: '#6b7280' }}>
            Welcome back to Handcrafted Haven
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ 
          maxWidth: '400px', 
          margin: '0 auto',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          padding: '32px'
        }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label htmlFor="email" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: '80%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  textAlign: 'center',
                  margin: '0 auto',
                  display: 'block',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            <div>
              <label htmlFor="password" style={{ 
                display: 'block', 
                fontSize: '14px', 
                fontWeight: '500', 
                color: '#374151', 
                marginBottom: '8px' 
              }}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{
                  width: '80%',
                  padding: '12px 16px',
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  fontSize: '16px',
                  textAlign: 'center',
                  margin: '0 auto',
                  display: 'block',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#2563eb';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '#d1d5db';
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: '12px 16px',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '8px',
                color: '#dc2626',
                fontSize: '14px'
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '80%',
                padding: '12px 24px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '500',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1,
                transition: 'all 0.2s ease',
                margin: '0 auto',
                display: 'block'
              }}
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }
              }}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '16px' }}>
              Don't have an account?{' '}
              <Link href="/auth/signup" style={{
                color: '#2563eb',
                textDecoration: 'none',
                fontWeight: '500'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.color = '#1d4ed8';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.color = '#2563eb';
              }}>
                Sign up
              </Link>
            </p>
          </div>

          {/* Demo Accounts */}
          <div style={{
            marginTop: '24px',
            padding: '20px',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            <h4 style={{ 
              fontSize: '16px', 
              fontWeight: '600', 
              color: '#111827', 
              marginBottom: '16px' 
            }}>
              Demo Accounts
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '4px' 
                }}>
                  Customer Account
                </h5>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>
                  Email: john@example.com
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Password: password
                </p>
              </div>
              
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '4px' 
                }}>
                  Seller Account
                </h5>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>
                  Email: jane@example.com
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Password: password
                </p>
              </div>
              
              <div style={{
                padding: '12px',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <h5 style={{ 
                  fontSize: '14px', 
                  fontWeight: '600', 
                  color: '#111827', 
                  marginBottom: '4px' 
                }}>
                  Admin Account
                </h5>
                <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>
                  Email: admin@example.com
                </p>
                <p style={{ fontSize: '12px', color: '#6b7280' }}>
                  Password: password
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
