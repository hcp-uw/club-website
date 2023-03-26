/** @type {import('next').NextConfig} */
const path = require("path");

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    // for GitHub Pages
    assetPrefix: isProd ? '/club-website/' : '',
    images: {
        unoptimized: true,
    },

    reactStrictMode: true,
    webpack: (config) => {
        config.resolve.alias["@"] = path.resolve(__dirname);
        return config;
    },
};

module.exports = nextConfig;
