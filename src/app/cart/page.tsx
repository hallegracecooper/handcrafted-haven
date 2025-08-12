'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Image from 'next/image';

interface CartItem {
  _id: string;
  product: {
    _id: string;
    title: string;
    image: string;
    price: number;
    inStock: boolean;
    stockQuantity: number;
  };
  quantity: number;
  price: number;
}

interface Cart {
  _id: string;
  items: CartItem[];
  total: number;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const [cart, setCart] = useState<Cart | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingItems, setUpdatingItems] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      setLoading(false);
      return;
    }

    fetchCart();
  }, [session, status]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cart');
      
      if (!response.ok) {
        throw new Error('Failed to fetch cart');
      }
      
      const data = await response.json();
      setCart(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cart');
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (productId: string, quantity: number) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    
    try {
      const response = await fetch('/api/cart', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update cart');
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update cart');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const removeItem = async (productId: string) => {
    setUpdatingItems(prev => new Set(prev).add(productId));
    
    try {
      const response = await fetch(`/api/cart?productId=${productId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to remove item');
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to remove item');
    } finally {
      setUpdatingItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(productId);
        return newSet;
      });
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to clear cart');
      }

      const updatedCart = await response.json();
      setCart(updatedCart);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to clear cart');
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (status === 'loading') {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>Loading...</p>
      </div>
    );
  }

  if (!session) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px' }}>Shopping Cart</h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
            Please sign in to view your cart
          </p>
          <Link
            href="/auth/signin"
            style={{
              backgroundColor: 'var(--accent-terracotta)',
              color: 'white',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#6b7280' }}>Loading your cart...</p>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px' }}>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
            <Link href="/" style={{ color: '#6b7280', textDecoration: 'none' }}>
              Home
            </Link>
            <span style={{ color: '#9ca3af' }}>/</span>
            <span style={{ color: '#111827' }}>Shopping Cart</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '32px' }}>
          Shopping Cart
        </h1>

        {error && (
          <div style={{
            padding: '16px',
            backgroundColor: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '8px',
            color: '#dc2626',
            marginBottom: '24px'
          }}>
            {error}
          </div>
        )}

        {!cart || cart.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>🛒</div>
            <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '12px' }}>
              Your cart is empty
            </h2>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
              Start shopping to add items to your cart
            </p>
            <Link
              href="/products"
              style={{
                backgroundColor: 'var(--accent-terracotta)',
                color: 'white',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '16px',
                fontWeight: '500',
              }}
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '32px' }}>
            {/* Cart Items */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: '600' }}>
                  Items ({cart.items.length})
                </h2>
                <button
                  onClick={clearCart}
                  style={{
                    backgroundColor: 'transparent',
                    color: '#dc2626',
                    border: 'none',
                    fontSize: '14px',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Clear Cart
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {cart.items.map((item) => (
                  <div
                    key={item._id}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #e5e7eb',
                      borderRadius: '12px',
                      padding: '16px',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '16px' }}>
                      {/* Product Image */}
                      <div style={{
                        width: '80px',
                        height: '80px',
                        backgroundColor: '#f3f4f6',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        flexShrink: 0,
                      }}>
                        <img
                          src={item.product.image}
                          alt={item.product.title}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      </div>

                      {/* Product Info */}
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                          {item.product.title}
                        </h3>
                        <p style={{ fontSize: '14px', color: '#6b7280', marginBottom: '8px' }}>
                          {formatPrice(item.price)}
                        </p>
                        
                        {!item.product.inStock && (
                          <p style={{ fontSize: '12px', color: '#dc2626', marginBottom: '8px' }}>
                            Out of Stock
                          </p>
                        )}

                        {/* Quantity Controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || updatingItems.has(item.product._id)}
                            style={{
                              width: '32px',
                              height: '32px',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                              cursor: item.quantity <= 1 || updatingItems.has(item.product._id) ? 'not-allowed' : 'pointer',
                              opacity: item.quantity <= 1 || updatingItems.has(item.product._id) ? 0.5 : 1,
                            }}
                          >
                            -
                          </button>
                          
                          <span style={{ fontSize: '14px', minWidth: '20px', textAlign: 'center' }}>
                            {updatingItems.has(item.product._id) ? '...' : item.quantity}
                          </span>
                          
                          <button
                            onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                            disabled={!item.product.inStock || item.quantity >= item.product.stockQuantity || updatingItems.has(item.product._id)}
                            style={{
                              width: '32px',
                              height: '32px',
                              border: '1px solid #d1d5db',
                              backgroundColor: 'white',
                              borderRadius: '4px',
                              cursor: !item.product.inStock || item.quantity >= item.product.stockQuantity || updatingItems.has(item.product._id) ? 'not-allowed' : 'pointer',
                              opacity: !item.product.inStock || item.quantity >= item.product.stockQuantity || updatingItems.has(item.product._id) ? 0.5 : 1,
                            }}
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* Price and Remove */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '16px', fontWeight: '600', marginBottom: '8px' }}>
                          {formatPrice(item.price * item.quantity)}
                        </p>
                        <button
                          onClick={() => removeItem(item.product._id)}
                          disabled={updatingItems.has(item.product._id)}
                          style={{
                            backgroundColor: 'transparent',
                            color: '#dc2626',
                            border: 'none',
                            fontSize: '12px',
                            cursor: updatingItems.has(item.product._id) ? 'not-allowed' : 'pointer',
                            textDecoration: 'underline',
                            opacity: updatingItems.has(item.product._id) ? 0.5 : 1,
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div style={{ height: 'fit-content' }}>
              <div style={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
                  Order Summary
                </h3>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Subtotal</span>
                  <span style={{ fontSize: '14px' }}>{formatPrice(cart.total)}</span>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>Shipping</span>
                  <span style={{ fontSize: '14px' }}>Free</span>
                </div>
                
                <div style={{ 
                  borderTop: '1px solid #e5e7eb', 
                  marginTop: '16px', 
                  paddingTop: '16px',
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <span style={{ fontSize: '16px', fontWeight: '600' }}>Total</span>
                  <span style={{ fontSize: '18px', fontWeight: 'bold' }}>{formatPrice(cart.total)}</span>
                </div>

                <button
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--accent-terracotta)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '16px',
                    fontSize: '16px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    marginTop: '24px',
                  }}
                >
                  Proceed to Checkout
                </button>

                <p style={{ 
                  fontSize: '12px', 
                  color: '#6b7280', 
                  textAlign: 'center', 
                  marginTop: '12px' 
                }}>
                  Secure checkout powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
