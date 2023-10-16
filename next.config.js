/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Add a custom rule to handle node:buffer modules
    config.module.rules.push({
      test: /node_modules\/node-fetch\/.*\.js$/,
      loader: 'null-loader',
    });

    return config;
  },
  images: { domains: ["arweave.net", 'image-cache-service-z3w7d7dnea-ew.a.run.app'] },
};

module.exports = nextConfig;
