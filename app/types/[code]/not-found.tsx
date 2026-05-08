import Link from 'next/link';
import { Brain, Home, ArrowLeft } from 'lucide-react';

export default function TypeNotFound() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-teal-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-red-400 to-orange-500 flex items-center justify-center shadow-2xl mx-auto mb-6">
          <Brain className="w-12 h-12 text-white" />
        </div>
        
        <h1 className="text-4xl font-black mb-4 text-navy-900">Type Not Found</h1>
        <p className="text-lg text-navy-600 mb-8">
          The personality type you're looking for doesn't exist. Please check the URL and try again.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/types"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-sky-400 to-teal-400 text-white font-bold hover:shadow-xl transition"
          >
            <ArrowLeft className="w-5 h-5" />
            View All Types
          </Link>
          
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white text-navy-800 font-bold border-2 border-navy-200 hover:border-sky-400 transition"
          >
            <Home className="w-5 h-5" />
            Go Home
          </Link>
        </div>
      </div>
    </main>
  );
}
