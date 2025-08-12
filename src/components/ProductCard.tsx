'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from 'next-auth/react';

interface Product {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  seller: {
    _id: string;
    name: string;
    username: string;
  };
  rating: number;
  reviewCount: number;
  inStock: boolean;
  tags: string[];
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { data: session } = useSession();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState('');

  // Debug: Log image URL
  console.log('Product image URL:', product.image);

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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!session) {
      setCartMessage('Please sign in to add items to cart');
      setTimeout(() => setCartMessage(''), 3000);
      return;
    }

    setAddingToCart(true);
    setCartMessage('');

    try {
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to add to cart');
      }

      setCartMessage('Added to cart!');
      setTimeout(() => setCartMessage(''), 3000);
    } catch (error) {
      setCartMessage(error instanceof Error ? error.message : 'Failed to add to cart');
      setTimeout(() => setCartMessage(''), 3000);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <Link 
      href={`/product/${product._id}`} 
      style={{ display: 'block' }}
      aria-label={`View details for ${product.title} by ${product.seller.name}`}
    >
      <article
        style={{
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          overflow: 'hidden',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }} 
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = '#d1d5db';
        }} 
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.1)';
          e.currentTarget.style.borderColor = '#e5e7eb';
        }}
        tabIndex={0}
        role="article"
        aria-labelledby={`product-title-${product._id}`}
      >
        {/* Product Image */}
        <div style={{
          aspectRatio: '1',
          backgroundColor: '#f3f4f6',
          position: 'relative',
          overflow: 'hidden'
        }}>
          {!imageError ? (
            <Image
              src={product.image}
              alt={`${product.title} by ${product.seller.name}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                opacity: imageLoaded ? 1 : 0,
                transition: 'opacity 0.3s ease'
              }}
              onLoad={() => {
                console.log('Image loaded successfully:', product.image);
                setImageLoaded(true);
              }}
              onError={(e) => {
                console.error('Image failed to load:', product.image, e);
                setImageError(true);
              }}
              loading="lazy"
              unoptimized={product.image.includes('blob.vercel-storage.com')}
            />
          ) : (
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(135deg, var(--border-light) 0%, #d1d5db 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span 
                style={{ color: '#6b7280', fontSize: '14px' }}
                aria-label={`Product image placeholder for ${product.title}`}
              >
                Product Image
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div style={{ padding: '16px', flex: '1', display: 'flex', flexDirection: 'column' }}>
          {/* Title */}
          <h3 
            id={`product-title-${product._id}`}
            style={{
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
            }}
          >
            {product.title}
          </h3>

          {/* Seller */}
          <p style={{
            fontSize: '12px',
            color: '#6b7280',
            marginBottom: '8px'
          }}>
            by <span aria-label={`Seller: ${product.seller.name}`}>{product.seller.name}</span>
          </p>

          {/* Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            marginBottom: '8px'
          }}>
            <span 
              style={{ color: '#f59e0b', fontSize: '12px' }}
              aria-label={`Rating: ${product.rating} out of 5 stars`}
            >
              {renderStars(product.rating)}
            </span>
            <span 
              style={{ fontSize: '12px', color: '#6b7280' }}
              aria-label={`${product.reviewCount} reviews`}
            >
              ({product.reviewCount})
            </span>
          </div>

          {/* Price and Stock Status */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto'
          }}>
            <span 
              style={{
                fontWeight: 'bold',
                fontSize: '18px',
                color: '#111827'
              }}
              aria-label={`Price: ${formatPrice(product.price)}`}
            >
              {formatPrice(product.price)}
            </span>
            {!product.inStock && (
              <span 
                style={{
                  fontSize: '12px',
                  color: '#dc2626',
                  fontWeight: '500'
                }}
                aria-label="This item is out of stock"
              >
                Out of Stock
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          {product.inStock && (
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              style={{
                width: '100%',
                padding: '8px 12px',
                backgroundColor: 'var(--accent-terracotta)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '500',
                cursor: addingToCart ? 'not-allowed' : 'pointer',
                marginTop: '8px',
                opacity: addingToCart ? 0.6 : 1,
                transition: 'all 0.2s ease'
              }}
            >
              {addingToCart ? 'Adding...' : 'Add to Cart'}
            </button>
          )}

          {/* Cart Message */}
          {cartMessage && (
            <div style={{
              padding: '8px',
              backgroundColor: cartMessage.includes('Added') ? '#f0fdf4' : '#fef2f2',
              border: `1px solid ${cartMessage.includes('Added') ? '#bbf7d0' : '#fecaca'}`,
              borderRadius: '4px',
              color: cartMessage.includes('Added') ? '#166534' : '#dc2626',
              fontSize: '11px',
              textAlign: 'center',
              marginTop: '8px'
            }}>
              {cartMessage}
            </div>
          )}

          {/* Category Badge */}
          <div style={{ marginTop: '8px' }}>
            <span 
              style={{
                display: 'inline-block',
                padding: '4px 8px',
                fontSize: '12px',
                borderRadius: '9999px',
                backgroundColor: 'var(--accent-green)',
                color: 'white',
                opacity: 0.8
              }}
              aria-label={`Category: ${product.category}`}
            >
              {product.category}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
} 