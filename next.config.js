/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: 'dist',
  images: {
    qualities: [75, 100],
  },
  allowedDevOrigins: ['192.168.1.96'],
}

module.exports = nextConfig
