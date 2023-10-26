/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pt.deyeinverter.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
