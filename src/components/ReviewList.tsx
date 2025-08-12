'use client';

import { useEffect, useState } from 'react';

interface Review {
  _id: string;
  rating: number;
  title: string;
  comment: string;
  createdAt: string;
  user: {
    name: string;
    username: string;
  };
}

interface ReviewListProps {
  productId: string;
  refreshTrigger: number;
}

export default function ReviewList({ productId, refreshTrigger }: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/reviews?productId=${productId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch reviews');
        }
        
        const data = await response.json();
        setReviews(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch reviews');
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId, refreshTrigger]);

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ color: '#6b7280' }}>Loading reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '8px',
        color: '#dc2626'
      }}>
        {error}
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '24px' }}>
        <p style={{ color: '#6b7280' }}>No reviews yet. Be the first to review this product!</p>
      </div>
    );
  }

  return (
    <div>
      <h3 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '16px' }}>
        Customer Reviews ({reviews.length})
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {reviews.map((review) => (
          <div
            key={review._id}
            style={{
              padding: '16px',
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
            }}
          >
            {/* Review Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
              <div>
                <h4 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '4px' }}>
                  {review.title}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '14px' }}>
                    {renderStars(review.rating)}
                  </span>
                  <span style={{ fontSize: '14px', color: '#6b7280' }}>
                    {review.rating} out of 5
                  </span>
                </div>
              </div>
              <span style={{ fontSize: '12px', color: '#9ca3af' }}>
                {formatDate(review.createdAt)}
              </span>
            </div>

            {/* Review Content */}
            <p style={{
              fontSize: '14px',
              lineHeight: '1.5',
              color: '#374151',
              marginBottom: '8px'
            }}>
              {review.comment}
            </p>

            {/* Reviewer Info */}
            <div style={{ fontSize: '12px', color: '#6b7280' }}>
              Reviewed by {review.user.name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
