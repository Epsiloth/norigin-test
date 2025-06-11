/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    additionalData: `@import "src/styles/_variables.scss"; @import "src/styles/_functions.scss";`,
  },
};

export default nextConfig;
