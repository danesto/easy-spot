/** @type {import('next').NextConfig} */
const nextConfig = {
  plugins: [['styled-components', { ssr: true }]],
};

module.exports = nextConfig;
