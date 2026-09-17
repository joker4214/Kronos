/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    instrumentationHook: true,
  },
  async redirects() {
    return [
      { source: '/quiz.html', destination: 'https://ai-business-empire.netlify.app/quiz.html', permanent: true },
      { source: '/starter-kit.html', destination: 'https://ai-business-empire.netlify.app/starter-kit.html', permanent: true },
      { source: '/free-map.html', destination: 'https://ai-business-empire.netlify.app/free-map.html', permanent: true },
      { source: '/start.html', destination: 'https://ai-business-empire.netlify.app/', permanent: true },
    ];
  },
};

module.exports = nextConfig;
