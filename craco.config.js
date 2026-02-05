const path=require('path')

module.exports = {
    devServer: {
        port:8000,  // B端前端端口
        proxy: {
            '/api': 'http://localhost:3001'
        }
    },
    webpack: {
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    }
}