'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products } from '@/data/products';
import { use } from 'react';

interface ProductDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { id } = use(params);
  const product = products.find(p => p.id === id);

  if (!product) {
    notFound();
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }
    if (hasHalfStar) {
      stars.push('☆');
    }
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push('☆');
    }

    return stars.join('');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Breadcrumb Navigation */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <Link href="/products" style={{ color: '#6b7280', textDecoration: 'none' }}>
              Products
            </Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#111827' }}>{product.title}</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '48px', 
          alignItems: 'start' 
        }}>
          {/* Product Images */}
          <div>
            <div style={{
              aspectRatio: '1',
              backgroundColor: '#f3f4f6',
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '16px'
            }}>
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, var(--border-light) 0%, #d1d5db 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: '#6b7280', fontSize: '18px' }}>Product Image</span>
              </div>
            </div>
            
            {/* Thumbnail Gallery (placeholder) */}
            <div style={{ display: 'flex', gap: '8px' }}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#e5e7eb',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#9ca3af'
                }}>
                  {i}
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Title and Category */}
            <div style={{ marginBottom: '16px' }}>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '8px',
                fontFamily: "var(--font-playfair), 'Playfair Display', serif"
              }}>
                {product.title}
              </h1>
              <span style={{
                display: 'inline-block',
                padding: '6px 12px',
                fontSize: '14px',
                borderRadius: '9999px',
                backgroundColor: 'var(--accent-green)',
                color: 'white',
                opacity: 0.8
              }}>
                {product.category}
              </span>
            </div>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <span style={{ color: '#f59e0b', fontSize: '16px' }}>
                {renderStars(product.rating)}
              </span>
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div style={{ marginBottom: '24px' }}>
              <span style={{
                fontSize: '36px',
                fontWeight: 'bold',
                color: '#111827'
              }}>
                {formatPrice(product.price)}
              </span>
              {!product.inStock && (
                <div style={{
                  marginTop: '8px',
                  padding: '8px 12px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  color: '#dc2626',
                  fontSize: '14px'
                }}>
                  Out of Stock
                </div>
              )}
            </div>

            {/* Seller Info */}
            <div style={{
              padding: '16px',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                Handcrafted by
              </h3>
              <Link 
                href={`/seller/${product.seller.username}`}
                style={{
                  color: 'var(--accent-terracotta)',
                  textDecoration: 'none',
                  fontSize: '18px',
                  fontWeight: '500'
                }}
              >
                {product.seller.name}
              </Link>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                Description
              </h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#374151'
              }}>
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {product.tags.map((tag) => (
                  <span key={tag} style={{
                    padding: '4px 12px',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '9999px',
                    fontSize: '14px',
                    color: '#374151'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ 
              display: 'flex', 
              gap: '16px', 
              marginBottom: '32px',
              flexDirection: 'column'
            }}>
              <button style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: product.inStock ? 'var(--accent-terracotta)' : '#9ca3af',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: product.inStock ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s ease'
              }} disabled={!product.inStock}>
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: 'transparent',
                color: 'var(--accent-terracotta)',
                border: '2px solid var(--accent-terracotta)',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}>
                Write Review
              </button>
            </div>

            {/* Additional Info */}
            <div style={{
              padding: '16px',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px'
            }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '12px' }}>
                Product Details
              </h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                <li style={{ padding: '4px 0', fontSize: '14px', color: '#6b7280' }}>
                  • Handcrafted with care and attention to detail
                </li>
                <li style={{ padding: '4px 0', fontSize: '14px', color: '#6b7280' }}>
                  • Each piece is unique with slight variations
                </li>
                <li style={{ padding: '4px 0', fontSize: '14px', color: '#6b7280' }}>
                  • Made by artisan {product.seller.name}
                </li>
                <li style={{ padding: '4px 0', fontSize: '14px', color: '#6b7280' }}>
                  • Ships within 3-5 business days
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 