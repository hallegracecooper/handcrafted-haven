import { MetadataRoute } from 'next'
import connectDB from '@/lib/mongodb'
import Product from '@/models/Product'
import User from '@/models/User'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://handcrafted-haven.vercel.app'
  
  // Connect to database
  await connectDB()
  
  // Fetch products and sellers from database
  const products = await Product.find().populate('seller', 'username')
  const sellers = await User.find({ role: 'seller' })
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/sell`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/auth/signin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/auth/signup`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  // Product pages
  const productPages = products.map((product) => ({
    url: `${baseUrl}/product/${product._id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Seller pages
  const sellerPages = sellers.map((seller) => ({
    url: `${baseUrl}/seller/${seller.username}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...productPages, ...sellerPages]
}
