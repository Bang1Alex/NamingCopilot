import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',        // 生成 dist 目录（解决部署报错）
  distDir: 'dist',        // 明确输出 dist
  trailingSlash: true,     // 静态托管路由稳定
  images: { unoptimized: true }, // 静态导出必须关
  env: {
    ARK_API_KEY: process.env.ARK_API_KEY,
    ARK_BASE_URL: process.env.ARK_BASE_URL,
    ARK_MODEL: process.env.ARK_MODEL,
  },
};

export default nextConfig;
