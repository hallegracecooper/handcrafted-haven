'use client';

import { notFound } from 'next/navigation';
import Link from 'next/link';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import Product from '@/models/Product';
import ProductCard from '@/components/ProductCard';

interface SellerProfilePageProps {
  params: {
    username: string;
  };
}

export default async function SellerProfilePage({ params }: SellerProfilePageProps) {
  const { username } = params;
  
  // Connect to database and find seller
  await connectDB();
  const seller = await User.findOne({ username, role: 'seller' });
  
  if (!seller) {
    notFound();
  }

  // Get seller's products
  const sellerProducts = await Product.find({ seller: seller._id });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
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
            <span style={{ color: '#111827' }}>{seller.name}</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Seller Header */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '32px', 
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '32px', 
            alignItems: 'start' 
          }}>
            {/* Seller Avatar */}
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-terracotta)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
                color: 'white',
                fontSize: '48px',
                fontWeight: 'bold'
              }}>
                {seller.name.charAt(0)}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                <span style={{ color: '#f59e0b', fontSize: '16px' }}>
                  {renderStars(4.5)} {/* Default rating for now */}
                </span>
                <span style={{ fontSize: '14px', color: '#6b7280' }}>
                  4.5 (12 reviews) {/* Default values for now */}
                </span>
              </div>
              <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>
                {seller.bio ? 'Artisan' : 'Handcrafted Haven Seller'}
              </p>
            </div>

            {/* Seller Info */}
            <div>
              <h1 style={{
                fontSize: '32px',
                fontWeight: 'bold',
                color: '#111827',
                marginBottom: '8px',
                fontFamily: "var(--font-playfair), 'Playfair Display', serif"
              }}>
                {seller.name}
              </h1>
              <p style={{
                fontSize: '18px',
                color: '#6b7280',
                marginBottom: '16px'
              }}>
                {seller.bio || 'Passionate artisan creating unique handcrafted pieces with love and attention to detail.'}
              </p>
              
              {/* Stats */}
              <div style={{ 
                display: 'flex', 
                gap: '24px', 
                marginBottom: '24px',
                flexWrap: 'wrap'
              }}>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    3
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Years Experience
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    {sellerProducts.length}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Products
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#111827' }}>
                    {formatDate(seller.createdAt)}
                  </div>
                  <div style={{ fontSize: '14px', color: '#6b7280' }}>
                    Member Since
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '32px', 
          marginBottom: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            About {seller.name}
          </h2>
          <p style={{
            fontSize: '16px',
            lineHeight: '1.7',
            color: '#374151',
            marginBottom: '24px'
          }}>
            {seller.bio || 'A dedicated artisan who pours heart and soul into every creation. Each piece is carefully crafted with attention to detail and a commitment to quality that makes every item truly special.'}
          </p>
          
          {/* Specialties */}
          <div>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px', color: '#111827' }}>
              Specialties
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Handcrafted', 'Unique Designs', 'Quality Materials'].map((specialty) => (
                <span key={specialty} style={{
                  padding: '6px 12px',
                  backgroundColor: 'var(--accent-green)',
                  color: 'white',
                  borderRadius: '9999px',
                  fontSize: '14px',
                  opacity: 0.8
                }}>
                  {specialty}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '24px',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Products by {seller.name}
          </h2>
          
          {sellerProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {sellerProducts.map((product) => (
                <ProductCard key={product._id.toString()} product={product} />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '48px 0' }}>
              <p style={{ fontSize: '18px', color: '#6b7280' }}>
                No products available at the moment.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 