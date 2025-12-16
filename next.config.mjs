/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Optimize for modern browsers - reduce legacy JavaScript
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },
  // Target modern browsers to reduce transpilation
  experimental: {
    // Use modern output for better performance
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  // Optimize CSS loading
  swcMinify: true,
}

export default nextConfig
