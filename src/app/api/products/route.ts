import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Product from '@/models/Product';

// GET all products
export async function GET(request: NextRequest) {
  try {
    console.log('Connecting to database...');
    await connectDB();
    console.log('Database connected successfully');
    
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    
    let query: any = {};
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } }
      ];
    }
    
    console.log('Query:', query);
    
    const products = await Product.find(query)
      .populate('seller', 'name username')
      .sort({ createdAt: -1 });
    
    console.log(`Found ${products.length} products`);
    
    return NextResponse.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST new product
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { title, description, price, category, image, tags, sellerId } = body;
    
    // Validate required fields
    if (!title || !description || !price || !category || !image || !sellerId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const newProduct = new Product({
      title,
      description,
      price: parseFloat(price),
      category,
      image,
      tags: tags || [],
      seller: sellerId
    });
    
    await newProduct.save();
    
    const populatedProduct = await Product.findById(newProduct._id)
      .populate('seller', 'name username');
    
    return NextResponse.json(populatedProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
