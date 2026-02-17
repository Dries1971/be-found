import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // www → non-www
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.be-found.online" }],
        destination: "https://be-found.online/:path*",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
