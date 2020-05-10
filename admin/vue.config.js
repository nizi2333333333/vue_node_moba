const path = require('path');//引入path模块
function resolve(dir){
    return path.join(__dirname,dir)//path.join(__dirname)设置绝对路径
}
module.exports = {
    lintOnSave: true,
    chainWebpack: (config)=>{
        config.resolve.alias
        .set('@$', resolve('src'))
        .set('assets',resolve('src/assets'))
        .set('common',resolve('src/common'))
        .set('components',resolve('src/components'))
        .set('network',resolve('src/network'))
        .set('store',resolve('src/store'))
        .set('views',resolve('src/views')) 
    }
}