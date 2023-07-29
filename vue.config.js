const {defineConfig} = require('@vue/cli-service')
module.exports = defineConfig({
    // 上线配置路径访问路径
    publicPath: '/',
    transpileDependencies: true,
    // 关闭ESLint的校验工具的关闭 上线前进行开启检查
    lintOnSave: false,
    devServer: {
        port: 80,
        open: true,
        // 配置跨域的代理设置
        proxy: {
            '/api': {
                target: "http://sph-h5-api.atguigu.cn",
                ws:true,
                changeOrigin:true,
            },
        },
    },
    // 如果你不需要生产环境的 source map，可以将其设置为false以加速生产环境构建。
    productionSourceMap: false,
})
