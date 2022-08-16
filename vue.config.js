const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    lintOnSave: false,
    pwa: {
        iconPaths: {//图标设置
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            // appleTouchIcon: 'favicon.ico',
            // maskIcon: 'favicon.ico',
            // msTileImage: 'favicon.ico',
        }
    },
    // devServer: {
        // open: true,
        // host: '0.0.0.0',
        // port: 8888,
        // https: false,
        // proxy: {
        //   '/music': {
        //     target: 'https://cloud-music-isntafzhs-wachtgo.vercel.app/',
        //     // ws: true,
        //     changeOrigin: true,
        //     pathRewrite: {
        //         '^/music': ''   //请求的时候使用这个api就可以
        //       }
        //   },
        // }
    //   }
})
