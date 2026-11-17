import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Carpeta de compilación aparte para revisar en paralelo sin pisar `.next`
  // (la que sirve `next start`). Por defecto, `.next`.
  distDir: process.env.PEDILY_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [390, 640, 828, 1080, 1440, 1920],
    imageSizes: [160, 256, 320, 384, 480],
  },
};

export default nextConfig;
