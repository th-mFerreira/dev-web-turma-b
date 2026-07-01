const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api-camara': {
        target: 'https://dadosabertos.camara.leg.br',
        changeOrigin: true,
        pathRewrite: { '^/api-camara': '' }
      }
    }
  }
})