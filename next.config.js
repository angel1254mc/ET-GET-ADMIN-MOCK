/** @type {import('next').NextConfig} */
const nextConfig = {
  future: {
    webpack5: true, // by default, if you customize webpack config, they switch back to version 4. 
      // Looks like backward compatibility approach.
  },
  reactStrictMode: false,
  webpack(config, {nextRuntime}) {
    config.module.rules.push({
      test: /\.svg$/,
      use: '@svgr/webpack',
    })
    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
        // by next.js will be dropped. Doesn't make much sense, but how it is
      crypto: false, // the solution
    };
    
    return config
  },
  /**
   * 
   */
  
}

module.exports = nextConfig
