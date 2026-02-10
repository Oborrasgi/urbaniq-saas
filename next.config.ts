import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  outputFileTracingRoot: path.join(__dirname),
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "randomuser.me",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "i.pravatar.cc",
        port: "",
        pathname: "/**"
      },
      {
        protocol: "https",
        hostname: "bazaar-vendor.s3.eu-north-1.amazonaws.com",
        port: "",
        pathname: "/**"
      }
    ]
  }
};

export default nextConfig;