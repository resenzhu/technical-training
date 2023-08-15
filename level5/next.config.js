'use strict';

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/login',
        permanent: false
      }
    ];
  }
};

module.exports = nextConfig;
