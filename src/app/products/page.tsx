'use client';

import { useState, useMemo, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Head from 'next/head';

// Define categories inline since we're not using the static data
const categories = [
  { id: 'all', name: 'All' },
  { id: 'art', name: 'Art' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'jewelry', name: 'Jewelry' },
  { id: 'home', name: 'Home' },
  { id: 'accessories', name: 'Accessories' }
];

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

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (selectedCategory !== 'all') {
          params.append('category', selectedCategory);
        }
        if (searchQuery) {
          params.append('search', searchQuery);
        }
        
        const response = await fetch(`/api/products?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  // Filter products based on category and search (client-side fallback)
  const filteredProducts = useMemo(() => {
    if (loading || error) return [];
    
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
                           product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           product.seller.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery, loading, error]);

  // Generate structured data for products
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Handcrafted Products",
    "description": "Unique handcrafted items from talented artisans",
    "url": "https://handcrafted-haven.vercel.app/products",
    "numberOfItems": filteredProducts.length,
    "itemListElement": filteredProducts.map((product, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Product",
        "name": product.title,
        "description": product.description,
        "image": product.image,
        "offers": {
          "@type": "Offer",
          "price": product.price,
          "priceCurrency": "USD",
          "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
        },
        "brand": {
          "@type": "Brand",
          "name": product.seller.name
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": product.rating,
          "reviewCount": product.reviewCount
        },
        "category": product.category
      }
    }))
  };

  return (
    <>
      <Head>
        <title>Browse Handcrafted Products | Handcrafted Haven</title>
        <meta name="description" content="Discover unique handcrafted items from talented artisans. Browse handmade jewelry, textiles, art, and home decor." />
        <meta name="keywords" content="handmade products, artisan crafts, handcrafted items, unique gifts, handmade jewelry, textiles, art" />
        <link rel="canonical" href="https://handcrafted-haven.vercel.app/products" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

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
                aria-label="Search products, sellers, or descriptions"
              />
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '12px',
                transform: 'translateY(-50%)',
                pointerEvents: 'none'
              }}>
                <svg style={{ width: '20px', height: '20px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
                  aria-pressed={selectedCategory === category.id}
                  aria-label={`Filter by ${category.name}`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Results Count */}
            <div style={{ fontSize: '14px', color: '#6b7280' }}>
              {loading ? 'Loading products...' : 
               error ? 'Error loading products' :
               `Showing ${filteredProducts.length} of ${products.length} products`}
            </div>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
                <svg style={{ width: '48px', height: '48px', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Loading products...</h3>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ color: '#ef4444', marginBottom: '16px' }}>
                <svg style={{ width: '48px', height: '48px', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#111827', marginBottom: '8px' }}>Error loading products</h3>
              <p style={{ color: '#6b7280' }}>{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <div style={{ color: '#9ca3af', marginBottom: '16px' }}>
                <svg style={{ width: '48px', height: '48px', margin: '0 auto' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
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
    </>
  );
} 