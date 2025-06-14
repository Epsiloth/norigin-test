/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/epg',  // REDIRECT ROOT URL TO EPG
        permanent: true,
      },
    ]
  },
sassOptions: {
    additionalData: `@import "src/styles/_variables.scss"; @import "src/styles/_functions.scss";`,
  },
};

export default nextConfig;
