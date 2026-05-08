"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminAuthenticated, setAdminAuthenticated } from '@/lib/admin-auth';
import { Lock, LogOut } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    if (isAdminAuthenticated()) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setAdminAuthenticated(true);
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Login gagal');
      }
    } catch (error) {
      setError('Terjadi kesalahan. Silakan coba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full glass mb-4 shadow-lg">
            <Lock className="w-8 h-8 text-sky-500" />
          </div>
          <h1 className="text-3xl font-black mb-2 text-navy-800">Admin Login</h1>
          <p className="text-navy-600">Haze MBTI Dashboard</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="glass rounded-3xl p-8">
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-red-100 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-sky-400 text-navy-800"
                placeholder="admin"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-navy-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl glass border-none focus:outline-none focus:ring-2 focus:ring-sky-400 text-navy-800"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-full bg-gradient-to-br from-sky-400 to-teal-400 text-white font-bold disabled:opacity-50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              {isLoading ? 'Loading...' : 'Login'}
            </button>
          </div>

          <div className="mt-6 text-center text-sm text-navy-500">
            <p>Default credentials:</p>
            <p className="font-mono">admin / HazeMBTI2026!</p>
          </div>
        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-navy-600 hover:text-navy-900">
            ← Back to website
          </a>
        </div>
      </div>
    </main>
  );
}
