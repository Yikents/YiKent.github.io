const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy:{
      '/api':{
        target:'http://m.msckeji.com',
        changeOrigin: true,
        ws:false,
        pathRewrite: { '^/api': '' }
      },
      '/':{
        target:'http://112.126.69.9',
        ws:false,
        changeOrigin: true
      }
    }
  }
})
