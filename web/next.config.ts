import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://d2zia2w5autnlg.cloudfront.net/**')],
  },
};

export default nextConfig;
