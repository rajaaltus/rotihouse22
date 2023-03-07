/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["api2.rotihouselao.com", "localhost", "nextui.org"],
  },
  env: {
    API_URL: "https://api2.rotihouselao.com",
    GTM_ID: "G-G0S874M3ST",
  },
};

module.exports = nextConfig;
