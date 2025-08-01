'use client';

import { useState } from 'react';
import Link from 'next/link';

interface ProductFormData {
  title: string;
  description: string;
  price: string;
  category: string;
  tags: string;
  inStock: boolean;
  image: string;
}

export default function SellPage() {
  const [formData, setFormData] = useState<ProductFormData>({
    title: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    inStock: true,
    image: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const categories = [
    { id: 'art', name: 'Art' },
    { id: 'textiles', name: 'Textiles' },
    { id: 'jewelry', name: 'Jewelry' },
    { id: 'home', name: 'Home & Garden' },
    { id: 'accessories', name: 'Accessories' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate required fields
      if (!formData.title || !formData.description || !formData.price || !formData.category) {
        throw new Error('Please fill in all required fields');
      }

      // Validate price
      const price = parseFloat(formData.price);
      if (isNaN(price) || price <= 0) {
        throw new Error('Please enter a valid price');
      }

      setSubmitMessage('Product uploaded successfully! Your item is now live on Handcrafted Haven.');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        tags: '',
        inStock: true,
        image: ''
      });
    } catch (error) {
      setSubmitMessage(error instanceof Error ? error.message : 'An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: 'white',
    transition: 'border-color 0.2s ease'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    fontSize: '14px'
  };

  const requiredStyle = {
    color: '#ef4444'
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
            <span style={{ color: '#111827' }}>Sell Your Products</span>
          </nav>
        </div>
      </div>

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 16px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1 style={{
            fontSize: '36px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Sell Your Handcrafted Treasures
          </h1>
          <p style={{
            fontSize: '18px',
            color: '#6b7280',
            lineHeight: '1.6'
          }}>
            Share your unique creations with customers who appreciate handmade quality. 
            Join our community of talented artisans and start selling today.
          </p>
        </div>

        {/* Form */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <form onSubmit={handleSubmit}>
            {/* Product Title */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>
                Product Title <span style={requiredStyle}>*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Handwoven Cotton Throw Blanket"
                style={inputStyle}
                required
              />
            </div>

            {/* Product Description */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>
                Product Description <span style={requiredStyle}>*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product in detail. What makes it special? What materials did you use? What are its dimensions?"
                style={{
                  ...inputStyle,
                  minHeight: '120px',
                  resize: 'vertical'
                }}
                required
              />
            </div>

            {/* Price and Category Row */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '24px',
              marginBottom: '24px'
            }}>
              {/* Price */}
              <div>
                <label style={labelStyle}>
                  Price ($) <span style={requiredStyle}>*</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  style={inputStyle}
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label style={labelStyle}>
                  Category <span style={requiredStyle}>*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={inputStyle}
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>
                Tags
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                placeholder="handmade, cotton, sustainable, organic (separate with commas)"
                style={inputStyle}
              />
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                Tags help customers find your product. Use descriptive keywords separated by commas.
              </p>
            </div>

            {/* Image Upload */}
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>
                Product Image
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                backgroundColor: '#f9fafb'
              }}>
                <div style={{ fontSize: '48px', color: '#9ca3af', marginBottom: '16px' }}>
                  📷
                </div>
                <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '8px' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ fontSize: '14px', color: '#9ca3af' }}>
                  PNG, JPG up to 10MB
                </p>
                <input
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={{
                  display: 'inline-block',
                  padding: '8px 16px',
                  backgroundColor: 'var(--accent-terracotta)',
                  color: 'white',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  marginTop: '16px'
                }}>
                  Choose File
                </label>
              </div>
            </div>

            {/* Stock Status */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  style={{ width: '16px', height: '16px' }}
                />
                <span style={{ fontSize: '16px', color: '#374151' }}>
                  This item is currently in stock
                </span>
              </label>
            </div>

            {/* Submit Message */}
            {submitMessage && (
              <div style={{
                padding: '16px',
                borderRadius: '8px',
                marginBottom: '24px',
                backgroundColor: submitMessage.includes('successfully') ? '#dcfce7' : '#fef2f2',
                color: submitMessage.includes('successfully') ? '#166534' : '#dc2626',
                border: `1px solid ${submitMessage.includes('successfully') ? '#bbf7d0' : '#fecaca'}`
              }}>
                {submitMessage}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '16px 24px',
                backgroundColor: isSubmitting ? '#9ca3af' : 'var(--accent-terracotta)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '18px',
                fontWeight: '600',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {isSubmitting ? 'Uploading Product...' : 'Upload Product'}
            </button>
          </form>
        </div>

        {/* Additional Info */}
        <div style={{ 
          backgroundColor: 'white', 
          borderRadius: '12px', 
          padding: '32px',
          marginTop: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#111827',
            marginBottom: '16px',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Tips for Success
          </h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>✓</span>
              <span style={{ color: '#374151' }}>Use clear, high-quality photos that showcase your product's details</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>✓</span>
              <span style={{ color: '#374151' }}>Write detailed descriptions that highlight the craftsmanship and materials</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>✓</span>
              <span style={{ color: '#374151' }}>Include accurate measurements and care instructions</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
              <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>✓</span>
              <span style={{ color: '#374151' }}>Set competitive prices that reflect the quality and time invested</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
              <span style={{ color: 'var(--accent-green)', fontSize: '18px' }}>✓</span>
              <span style={{ color: '#374151' }}>Keep your inventory updated to avoid disappointing customers</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 