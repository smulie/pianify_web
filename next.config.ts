import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/lessons',
        destination: '/',
        permanent: true,
      },
      {
        source: '/support',
        destination: '/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
