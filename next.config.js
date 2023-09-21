/** @type {import('next').NextConfig} */
const nextConfig = {
  plugins: [['styled-components', { ssr: true }]],
  experimental: {
    serverActions: true,
  },
};

module.exports = nextConfig;
