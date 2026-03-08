const path = require('path')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    devServer: {
        port: 8000,  // B端前端端口
        proxy: {
            '/api': 'http://localhost:3001'
        }
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        },
        plugins: [
            // 只有在运行 build 时才启用，你可以通过环境变量来控制
            process.env.ANALYZE === 'true' && new BundleAnalyzerPlugin({
                analyzerMode: 'static', // 生成一个静态 HTML 文件，而不是自动打开浏览器
                openAnalyzer: true,      // 构建完成后自动打开浏览器
            }),
        ].filter(Boolean), // 过滤掉 null 的插件
        // configure: {
        //     optimization: {
        //         concatenateModules: false, // 临时设置为 false
        //     },
        // },
        configure(webpackConfig){
            webpackConfig.optimization.concatenateModules= false
            if(webpackConfig.mode==='production'){
                // 在生产环境下抽离antd和react代码
                webpackConfig.optimization.splitChunks={
                    chunks:'all',
                    cacheGroups:{
                        antd:{
                            name:'antd-chunk',
                            test:/antd/,
                            priority:100
                        },
                        reactDom:{
                            name:'reactDom-chunk',
                            test:/react-dom/,
                            priority:99,
                        },
                        vendors:{
                            name: 'vendors-chunk',
                            test:/node_modules/,
                            priority:98
                        }
                    }
                }
            }

            return webpackConfig
        }
    }
}