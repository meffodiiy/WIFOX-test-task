import pwa from "next-pwa"

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
    swcMinify: true,
  },
};

const withPWA = pwa({
  dest: "public",
  // disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: false,
});

export default withPWA(nextConfig);
