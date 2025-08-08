import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { createUser, findUserByEmail } from '@/data/users';

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, username, role = 'user' } = await request.json();

    // Validate required fields
    if (!name || !email || !password || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Create user (password will be hashed in createUser function)
    const newUser = await createUser({
      name,
      email,
      password,
      username,
      role
    });

    // Return success (don't return the password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: userWithoutPassword
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
