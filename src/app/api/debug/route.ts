import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';
import User from '@/models/User';
import mongoose from 'mongoose';

export async function GET() {
  try {
    console.log('=== DEBUG API START ===');
    
    // Connect to database
    await connectDB();
    console.log('Database connected');
    
    // Check database info
    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    console.log('Collections:', collections.map(c => c.name));
    
    // Check products
    const productCount = await Product.countDocuments();
    console.log('Product count:', productCount);
    
    // Check users
    const userCount = await User.countDocuments();
    console.log('User count:', userCount);
    
    // Get sample data
    const sampleProducts = await Product.find().limit(3);
    const sampleUsers = await User.find().limit(3);
    
    console.log('=== DEBUG API END ===');
    
    return NextResponse.json({
      success: true,
      database: mongoose.connection.name,
      collections: collections.map(c => c.name),
      productCount,
      userCount,
      sampleProducts: sampleProducts.map(p => ({
        id: p._id,
        title: p.title,
        image: p.image
      })),
      sampleUsers: sampleUsers.map(u => ({
        id: u._id,
        name: u.name,
        email: u.email
      }))
    });
  } catch (error) {
    console.error('Debug API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
