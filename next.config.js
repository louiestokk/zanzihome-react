/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  compiler: {
    styledComponents: true,
  },
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
    cpus: 6
  },
  images: {
    domains: [
      'lh3.googleusercontent.com',
      'i.ibb.co',
      'imgbb.com',
      'images.pexels.com',
      'randomuser.me',
      'www.stadsmissionen.org',
      'img.freepik.com',
      'mnd-assets.mynewsdesk.com',
      'www.mynewsdesk.com',
      'res.cloudinary.com',
      'zanzipalms.com',
      'www.snijpunt.com',
      'images.unsplash.com',
      'www.svgrepo.com',
      'huba-tours.com',
      'firebasestorage.googleapis.com',
      'invest.coccolagoon.com'
    ],
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false;
    }
    return config;
  },
  async redirects() {
    return [
      {
        source: '/admin-dashboard',
        destination: '/admin-dashboard_user_admin_dash',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
