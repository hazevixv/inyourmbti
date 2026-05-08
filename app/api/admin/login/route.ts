import { NextRequest, NextResponse } from 'next/server';
import { validateAdminCredentials } from '@/lib/admin-auth';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { success: false, error: 'Username dan password harus diisi' },
        { status: 400 }
      );
    }

    const isValid = validateAdminCredentials(username, password);

    if (isValid) {
      return NextResponse.json({
        success: true,
        message: 'Login berhasil',
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Username atau password salah' },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { success: false, error: 'Terjadi kesalahan server' },
      { status: 500 }
    );
  }
}
