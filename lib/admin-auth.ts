// Simple admin authentication
// For production, use proper authentication like NextAuth.js

const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'HazeMBTI2026!', // Change this in production!
};

export function validateAdminCredentials(username: string, password: string): boolean {
  return username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password;
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  const token = localStorage.getItem('admin-token');
  return token === 'authenticated';
}

export function setAdminAuthenticated(authenticated: boolean) {
  if (typeof window === 'undefined') return;
  if (authenticated) {
    localStorage.setItem('admin-token', 'authenticated');
  } else {
    localStorage.removeItem('admin-token');
  }
}

export function getAdminToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('admin-token');
}
