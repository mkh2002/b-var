/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: "anonymous",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.hdslb.com", // Add this hostname
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i1.hdslb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i2.hdslb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i3.hdslb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i4.hdslb.com",
        pathname: "**",
      },
      {
        protocol: "https",
        hostname: "i5.hdslb.com",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;
