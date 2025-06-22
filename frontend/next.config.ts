import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    allowedDevOrigins: ["100.81.212.125", "localhost:8080"],
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '100.81.212.125', // or your actual IP/domain
                port: '8080',                   // leave blank unless using a non-standard port
                pathname: '/**',           // allow all paths
            },
            {
                protocol: 'https',
                hostname: 'img.freepik.com', // or your actual IP/domain
                port: '',                   // leave blank unless using a non-standard port
                pathname: '/**',           // allow all paths
            },
            {
                protocol: 'http',
                hostname: 'localhost', // or your actual IP/domain
                port: '8080',                   // leave blank unless using a non-standard port
                pathname: '/**',           // allow all paths
            },
        ],
    },
};

export default nextConfig;
