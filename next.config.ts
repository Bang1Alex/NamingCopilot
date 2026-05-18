import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   output: 'export', // 开启静态导出，构建后会生成 dist 目录
  trailingSlash: true, // 可选，让路由更适配静态托管
};

export default nextConfig;
