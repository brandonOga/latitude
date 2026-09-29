import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the root to this folder; a lockfile higher up (C:\Projects) otherwise
  // makes Turbopack resolve packages from the wrong node_modules.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
