/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Permitir solicitudes de origen cruzado desde IPs específicas
  allowedDevOrigins: ['10.6.9.229', '192.168.1.6'],
  // Configuración para resolver problemas con pnpm y tsparticles
  transpilePackages: [
    '@tsparticles/engine',
    '@tsparticles/basic',
    '@tsparticles/move-base',
    '@tsparticles/shape-circle',
    '@tsparticles/updater-color',
    '@tsparticles/updater-opacity',
    '@tsparticles/updater-out-modes',
    '@tsparticles/updater-size',
    'tsparticles'
  ],
}

export default nextConfig
