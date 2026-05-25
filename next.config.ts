import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { withSentryConfig } from "@sentry/nextjs";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default withSentryConfig(withNextIntl(nextConfig), {
  org: "nasus-digital",
  project: "javascript-nextjs",
  silent: !process.env.CI,
  disableLogger: true,
});
