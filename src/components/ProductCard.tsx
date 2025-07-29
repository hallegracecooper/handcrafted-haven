'use client';

import { Product } from '@/data/products';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
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
    <Link href={`/product/${product.id}`} style={{ display: 'block' }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        border: '1px solid #e5e7eb',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }} onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#d1d5db';
      }} onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}>
        {/* Product Image */}
        <div style={{
          aspectRatio: '1',
          backgroundColor: '#f3f4f6',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(135deg, var(--border-light) 0%, #d1d5db 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <span style={{ color: '#6b7280', fontSize: '14px' }}>Product Image</span>
          </div>
        </div>

        {/* Product Info */}
        <div style={{ padding: '16px' }}>
          {/* Title */}
          <h3 style={{
            fontWeight: '600',
            color: '#111827',
            fontSize: '14px',
            marginBottom: '4px',
            lineHeight: '1.4',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>
            {product.title}
          </h3>

          {/* Seller */}
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            by {product.seller.name}
          </p>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px'
          }}>
            <span style={{ color: '#f59e0b', fontSize: '12px' }}>
              {renderStars(product.rating)}
            </span>
            <span style={{ fontSize: '12px', color: '#6b7280' }}>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <span style={{
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#111827'
            }}>
              {formatPrice(product.price)}
            </span>
            {!product.inStock && (
              <span style={{
                fontSize: '12px',
                color: '#dc2626',
                fontWeight: '500'
              }}>
                Out of Stock
              </span>
            )}
          </div>

          {/* Category Badge */}
          <div style={{ marginTop: '8px' }}>
            <span style={{
              display: 'inline-block',
              padding: '4px 8px',
              fontSize: '12px',
              borderRadius: '9999px',
              backgroundColor: 'var(--accent-green)',
              color: 'white',
              opacity: 0.8
            }}>
              {product.category}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
} 