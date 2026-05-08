import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disable for better dev performance
  poweredByHeader: false,
  compress: true,
  
  // Fix Windows cache issues
  generateBuildId: async () => {
    return 'build-' + Date.now();
  },
  
  // Reduce Fast Refresh overhead
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 2,
  },
  
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    // Configure allowed quality values for Next.js 16+
    qualities: [50, 60, 75, 90, 100],
  },
  
  experimental: {
    optimizePackageImports: ["lucide-react"],
    // Disable turbopack for more stable builds
    turbo: undefined,
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Reduce memory usage in development
    if (dev && !isServer) {
      config.watchOptions = {
        poll: 1000,
        aggregateTimeout: 300,
        ignored: ['**/node_modules', '**/.next', '**/.git'],
      };
      
      // Fix Windows file system issues
      config.snapshot = {
        managedPaths: [],
        immutablePaths: [],
      };
    }
    
    return config;
  },
};

export default nextConfig;
