const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: '/Users/djinii/Desktop/Final_dutchOrder/backend/src/main/resources/static', // Build Directory
  devServer: {
    proxy: 'http://localhost:8899' // Spring Boot Server
  }
})
