import type { NextConfig } from "next";

// const rootDomain =
//   process.env.NODE_ENV === "production" ? "victoriaajuwon.com" : "localhost";

const nextConfig: NextConfig = {
  /* config options here */
  typedRoutes: true,
  rewrites: async () => ({}),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    qualities: [75, 85, 90, 95],
  },
};

export default nextConfig;
