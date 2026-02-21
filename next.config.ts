import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'zlhtycoypzkykjvfnjgu.supabase.co',
      port: '',
      pathname: '/**',
    },],
  },
  productionBrowserSourceMaps: true
};

export default withSentryConfig(nextConfig, {
  org: "morah-stephen",
  project: "javascript-nextjs",
  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,
});
