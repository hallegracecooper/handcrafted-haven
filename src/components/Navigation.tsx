'use client';

import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <h1 
              className="text-xl font-bold"
              style={{ fontFamily: "var(--font-playfair), 'Playfair Display', serif" }}
            >
              Handcrafted Haven
            </h1>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-8">
            <Link 
              href="/products" 
              className="text-gray-700 hover:text-accent-terracotta transition-colors font-medium"
            >
              Browse Products
            </Link>
            <Link 
              href="/sell" 
              className="text-gray-700 hover:text-accent-terracotta transition-colors font-medium"
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
} 