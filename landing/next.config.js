const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['three'],
  outputFileTracingRoot: path.join(__dirname, '..'),
}

module.exports = nextConfig
