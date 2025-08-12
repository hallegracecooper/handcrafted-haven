'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

export default function CartIcon() {
  const { data: session } = useSession();
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setItemCount(0);
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      try {
        const response = await fetch('/api/cart');
        if (response.ok) {
          const cart = await response.json();
          const count = cart.items?.reduce((total: number, item: any) => total + item.quantity, 0) || 0;
          setItemCount(count);
        }
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [session]);

  if (!session) {
    return null;
  }

  return (
    <Link href="/cart" style={{ position: 'relative', textDecoration: 'none' }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: 'inherit',
        textDecoration: 'none',
      }}>
        <span style={{ fontSize: '20px' }}>🛒</span>
        <span>Cart</span>
        {!loading && itemCount > 0 && (
          <span style={{
            position: 'absolute',
            top: '-8px',
            right: '-8px',
            backgroundColor: 'var(--accent-terracotta)',
            color: 'white',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
            {itemCount > 99 ? '99+' : itemCount}
          </span>
        )}
      </div>
    </Link>
  );
}
