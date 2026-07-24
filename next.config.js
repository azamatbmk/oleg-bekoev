/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  // folder/index.html — посадочные открываются на static-хостинге без rewrite на .html
  trailingSlash: true,
  images: {
    unoptimized: true,
    qualities: [75, 100],
  },
  allowedDevOrigins: ['192.168.1.96'],
}

module.exports = nextConfig
