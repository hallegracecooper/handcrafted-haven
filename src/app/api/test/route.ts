import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

export async function GET() {
  try {
    await connectDB();
    
    const productCount = await Product.countDocuments();
    const products = await Product.find().limit(3);
    
    return NextResponse.json({
      success: true,
      productCount,
      sampleProducts: products.map(p => ({
        id: p._id,
        title: p.title,
        image: p.image
      }))
    });
  } catch (error) {
    console.error('Test API error:', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
