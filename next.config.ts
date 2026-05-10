import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  async redirects() {
    return [
      { source: "/cheatsheet", destination: "/tools/claude/cheatsheet", permanent: true },
      { source: "/guide/:path*", destination: "/tools/claude/:path*", permanent: true },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
