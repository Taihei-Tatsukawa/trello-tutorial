/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', //remotePatternsでprotocolの指定もできる
        hostname: 'img.clerk.com', //clerkの画像を使用できるようにする
      },
    ],
  },
};

module.exports = nextConfig;
