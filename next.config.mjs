/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export so the site can deploy to GitHub Pages (custom domain: cualli.bio)
  // as well as Vercel. Remove `output: 'export'` to use Next server features.
  output: "export",
  trailingSlash: true,
  images: {
    // next/image optimization is incompatible with static export.
    unoptimized: true,
  },
};

export default nextConfig;
