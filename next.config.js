/** @type {import('next').NextConfig} */
require('dotenv').config()

const nextConfig = {
  reactStrictMode: true,
  env: {
    RESAS_API_KEY: process.env.RESAS_API_KEY,
    RESAS_ENDPOINT: process.env.RESAS_ENDPOINT,
  },
}

module.exports = nextConfig
