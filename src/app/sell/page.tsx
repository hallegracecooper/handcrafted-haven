'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    tags: '',
    inStock: true
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    if (!formData.price || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Here you would typically send the data to your API
    console.log('Form submitted:', formData);
    
    // For demo purposes, redirect to products page
    router.push('/products');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const inputStyle = {
    width: '80%',
    padding: '12px 16px',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '16px',
    marginBottom: '16px',
    textAlign: 'center' as const,
    margin: '0 auto 16px',
    display: 'block' as const,
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '600',
    color: '#374151',
    textAlign: 'center' as const
  };

  const errorStyle = {
    color: '#dc2626',
    fontSize: '14px',
    marginTop: '4px',
    textAlign: 'center' as const
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', padding: '32px 16px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '32px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb'
        }}>
          <h1 style={{
            fontSize: '28px',
            fontWeight: 'bold',
            marginBottom: '8px',
            textAlign: 'center',
            fontFamily: "var(--font-playfair), 'Playfair Display', serif"
          }}>
            Sell Your Handcrafted Items
          </h1>
          <p style={{
            color: '#6b7280',
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            Share your unique creations with the world
          </p>

          <form onSubmit={handleSubmit} noValidate>
            {/* Product Title */}
            <div>
              <label htmlFor="title" style={labelStyle}>
                Product Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.title ? '#dc2626' : '#d1d5db'
                }}
                placeholder="Enter product title"
                aria-describedby={errors.title ? 'title-error' : undefined}
                aria-invalid={!!errors.title}
                required
              />
              {errors.title && (
                <div id="title-error" style={errorStyle} role="alert">
                  {errors.title}
                </div>
              )}
            </div>

            {/* Product Description */}
            <div>
              <label htmlFor="description" style={labelStyle}>
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  minHeight: '120px',
                  resize: 'vertical',
                  textAlign: 'left' // Kept left-aligned
                }}
                placeholder="Describe your product in detail"
                aria-describedby={errors.description ? 'description-error' : undefined}
                aria-invalid={!!errors.description}
                required
              />
              {errors.description && (
                <div id="description-error" style={errorStyle} role="alert">
                  {errors.description}
                </div>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" style={labelStyle}>
                Price (USD) *
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                min="0"
                step="0.01"
                style={{
                  ...inputStyle,
                  borderColor: errors.price ? '#dc2626' : '#d1d5db'
                }}
                placeholder="0.00"
                aria-describedby={errors.price ? 'price-error' : undefined}
                aria-invalid={!!errors.price}
                required
              />
              {errors.price && (
                <div id="price-error" style={errorStyle} role="alert">
                  {errors.price}
                </div>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" style={labelStyle}>
                Category *
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                style={{
                  ...inputStyle,
                  borderColor: errors.category ? '#dc2626' : '#d1d5db'
                }}
                aria-describedby={errors.category ? 'category-error' : undefined}
                aria-invalid={!!errors.category}
                required
              >
                <option value="">Select a category</option>
                <option value="art">Art</option>
                <option value="textiles">Textiles</option>
                <option value="jewelry">Jewelry</option>
                <option value="home">Home & Garden</option>
                <option value="accessories">Accessories</option>
              </select>
              {errors.category && (
                <div id="category-error" style={errorStyle} role="alert">
                  {errors.category}
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <label htmlFor="tags" style={labelStyle}>
                Tags
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                style={inputStyle}
                placeholder="handmade, unique, sustainable"
              />
              <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px', textAlign: 'center' }}>
                Tags help customers find your product. Use descriptive keywords separated by commas.
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="image" style={labelStyle}>
                Product Images
              </label>
              <div style={{
                border: '2px dashed #d1d5db',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                backgroundColor: '#f9fafb',
                width: '80%',
                margin: '0 auto'
              }}>
                <div style={{ color: '#6b7280', marginBottom: '8px' }}>
                  <svg style={{ width: '24px', height: '24px', margin: '0 auto 8px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p style={{ margin: '0 0 8px 0', color: '#374151' }}>
                  Click to upload or drag and drop
                </p>
                <p style={{ margin: 0, fontSize: '14px', color: '#6b7280' }}>
                  PNG, JPG, GIF up to 10MB
                </p>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  style={{ display: 'none' }}
                  aria-describedby="image-help"
                />
                <button
                  type="button"
                  onClick={() => document.getElementById('image')?.click()}
                  style={{
                    marginTop: '16px',
                    padding: '8px 16px',
                    backgroundColor: '#2563eb',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                >
                  Choose Files
                </button>
              </div>
              <p id="image-help" style={{ fontSize: '14px', color: '#6b7280', marginTop: '8px', textAlign: 'center' }}>
                Upload high-quality images to showcase your product
              </p>
            </div>

            {/* Stock Status */}
            <div style={{ marginTop: '24px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', justifyContent: 'center' }}>
                <input
                  type="checkbox"
                  name="inStock"
                  checked={formData.inStock}
                  onChange={handleInputChange}
                  style={{ width: '16px', height: '16px' }}
                />
                <span>In Stock</span>
              </label>
            </div>

            {/* Submit Button */}
            <div style={{ marginTop: '32px', textAlign: 'center' }}>
              <button
                type="submit"
                style={{
                  width: '80%',
                  padding: '12px 24px',
                  backgroundColor: '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  margin: '0 auto',
                  display: 'block'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#2563eb';
                }}
              >
                List Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 