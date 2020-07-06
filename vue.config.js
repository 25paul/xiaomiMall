module.exports = {
    devServer:{
        host:'localhost',
        port:8080,
        proxy:{
            '/api':{
                target:'https://mock.yonyoucloud.com/mock/10225',
                changeOrigin:true,
                pathRewrite:{
                '/api':''
                }
            }
        }
    },
    productionSourceMap: false,
    chainWebpack:(config)=>{
        config.plugins.delete('prefetch');
    }
}