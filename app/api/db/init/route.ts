import { NextRequest, NextResponse } from 'next/server';
import { initDatabase } from '@/lib/database';

export async function POST(request: NextRequest) {
  try {
    // Simple authentication - only allow in development or with secret key
    const authHeader = request.headers.get('authorization');
    const isDev = process.env.NODE_ENV === 'development';
    const hasValidAuth = authHeader === `Bearer ${process.env.DB_INIT_SECRET || 'HazeMBTI2026!'}`;
    
    if (!isDev && !hasValidAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Initialize database
    await initDatabase();

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully',
      tables: ['users', 'test_results', 'chat_messages', 'analytics']
    });
  } catch (error) {
    console.error('Database initialization error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to initialize database',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
