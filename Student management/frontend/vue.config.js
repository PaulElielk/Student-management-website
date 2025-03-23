const { defineConfig } = require('@vue/cli-service')
const path = require('path');
// module.exports = defineConfig({
//   transpileDependencies: true
// });

module.exports = {
  devServer: {
    port: 8080,
    proxy: {
      '/api': {
        target: 'http://localhost:8002',
        changeOrigin: true,
        ws: true
      },
      '/verify-student': {
        target: 'http://localhost:8002',
        changeOrigin: true
      },
      '/ws': {
        target: 'http://localhost:8002',
        ws: true
      }
    }
  },
  // Add cache-busting for build files
  configureWebpack: {
    output: {
      filename: '[name].[hash:8].js',
      chunkFilename: '[name].[hash:8].js'
    }
  }
}