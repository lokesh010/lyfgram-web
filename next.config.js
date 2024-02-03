/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects() {
    return [
      {
        source: "/communities/:id",
        destination: "lyfgram:///communities/:id",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
