'use client';

import { useState, useMemo } from 'react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter products based on category and search
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

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
            Discover Handcrafted Treasures
          </h1>
          <p style={{ color: '#6b7280' }}>
            Explore unique creations from talented artisans around the world
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Filters and Search */}
        <div style={{ marginBottom: '32px' }}>
          {/* Search Bar */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="Search products, sellers, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 40px',
                border: '1px solid #d1d5db',
                borderRadius: '8px',
                fontSize: '16px'
              }}
            />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '12px',
              transform: 'translateY(-50%)',
              pointerEvents: 'none'
            }}>
              <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Category Filters */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  ...(selectedCategory === category.id
                    ? {
                        backgroundColor: '#2563eb',
                        color: 'white',
                        border: 'none'
                      }
                    : {
                        backgroundColor: 'white',
                        color: '#374151',
                        border: '1px solid #d1d5db'
                      }
                  )
                }}
                onMouseEnter={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = '#f9fafb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedCategory !== category.id) {
                    e.currentTarget.style.backgroundColor = 'white';
                  }
                }}
              >
                {category.name}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div style={{ fontSize: '14px', color: '#6b7280' }}>
            Showing {filteredProducts.length} of {products.length} products
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '48px 0' }}>
            <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
              <svg style={{ width: '48px', height: '48px', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>No products found</h3>
            <p style={{ color: '#6b7280' }}>
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 