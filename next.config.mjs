/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{
      hostname: '**/*.giantbomb.com/**',
    }],
  },
};

export default nextConfig;

