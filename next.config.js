/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      // domains: ['placekitten.com','localhost'], // Add any external image domains you might use
      unoptimized: true,
    },
  }
  
  module.exports = nextConfig