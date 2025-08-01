import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#f9fafb',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{ 
        textAlign: 'center',
        maxWidth: '480px',
        padding: '32px 16px'
      }}>
        <div style={{ 
          fontSize: '64px',
          marginBottom: '16px',
          color: '#9ca3af'
        }}>
          👨‍🎨
        </div>
        
        <h1 style={{
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#111827',
          marginBottom: '16px',
          fontFamily: "var(--font-playfair), 'Playfair Display', serif"
        }}>
          Artisan Not Found
        </h1>
        
        <p style={{
          fontSize: '18px',
          color: '#6b7280',
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Sorry, we couldn't find the artisan you're looking for. They may have moved their shop or the link might be incorrect.
        </p>
        
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/products" style={{
            padding: '12px 24px',
            backgroundColor: 'var(--accent-terracotta)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}>
            Browse All Products
          </Link>
          
          <Link href="/" style={{
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: 'var(--accent-terracotta)',
            textDecoration: 'none',
            border: '2px solid var(--accent-terracotta)',
            borderRadius: '8px',
            fontWeight: '600',
            transition: 'all 0.2s ease'
          }}>
            Go Home
          </Link>
        </div>
      </div>
    </div>
  );
} 