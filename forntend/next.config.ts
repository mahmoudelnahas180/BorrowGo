import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
const nextIntlPlugin = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: false,
};

export default nextIntlPlugin(nextConfig);
