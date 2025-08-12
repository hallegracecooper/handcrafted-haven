"use client";

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#111827',
      color: '#f9fafb',
      padding: '48px 0 24px',
      marginTop: 'auto'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 16px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '32px',
          marginBottom: '32px'
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontSize: '24px',
              fontWeight: 'bold',
              marginBottom: '16px',
              fontFamily: "var(--font-playfair), 'Playfair Display', serif"
            }}>
              Handcrafted Haven
            </h3>
            <p style={{
              fontSize: '14px',
              lineHeight: '1.6',
              color: '#d1d5db',
              marginBottom: '16px'
            }}>
              Connecting artisans with art lovers. Discover unique handcrafted treasures 
              and support sustainable craftsmanship from talented creators worldwide.
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}>
                <span style={{ fontSize: '14px' }}>📧</span>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}>
                <span style={{ fontSize: '14px' }}>📱</span>
              </div>
              <div style={{
                width: '32px',
                height: '32px',
                backgroundColor: '#374151',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#4b5563';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#374151';
              }}>
                <span style={{ fontSize: '14px' }}>📷</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#f9fafb'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="/products" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Browse Products
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/sell" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Become a Seller
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="/auth/signup" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Create Account
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#f9fafb'
            }}>
              Support
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Help Center
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Contact Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Privacy Policy
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#" style={{
                  color: '#d1d5db',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s ease'
                }} onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#f9fafb';
                }} onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}>
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 style={{
              fontSize: '16px',
              fontWeight: '600',
              marginBottom: '16px',
              color: '#f9fafb'
            }}>
              Stay Connected
            </h4>
            <p style={{
              fontSize: '14px',
              color: '#d1d5db',
              marginBottom: '16px',
              lineHeight: '1.5'
            }}>
              Get updates on new products and artisan stories.
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: '1',
                  padding: '8px 12px',
                  border: '1px solid #374151',
                  borderRadius: '6px',
                  backgroundColor: '#1f2937',
                  color: '#f9fafb',
                  fontSize: '14px'
                }}
              />
              <button style={{
                padding: '8px 16px',
                backgroundColor: '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#1d4ed8';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#2563eb';
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '24px',
          textAlign: 'center'
        }}>
          <p style={{
            fontSize: '14px',
            color: '#9ca3af',
            margin: 0
          }}>
            © 2024 Handcrafted Haven. All rights reserved. Made with ❤️ for artisans everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
