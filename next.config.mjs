/** @type {import('next').NextConfig} */

import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(process.cwd(), 'styles')],
  },
  output: 'export',
};

export default nextConfig;