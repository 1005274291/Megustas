//可以扩展webpack配置
const{override,fixBabelImports,addDecoratorsLegacy}=require("customize-cra")

module.exports=override(
    fixBabelImports("import",{//实现按需加载
        libraryName:"antd",
        libraryDirectory:"es",
        style:"css",
    }),
    addDecoratorsLegacy()//配置装饰器
)