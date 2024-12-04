/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "imagedelivery.net",
      },
      {
        hostname: "dashboard.mundipagg.com",
      },
    ],
  },
};

export default nextConfig;
