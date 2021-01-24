const path = require("path")
const UglifyJSPlugin=require("uglifyjs-webpack-plugin")
const HtmlWebpackPlugin=require("html-webpack-plugin")
const CleanwebpackPlugin=require("clean-webpack-plugin").CleanWebpackPlugin
module.exports = {
    entry:{//可以配置多入口
        app:path.resolve(__dirname, "./src/index.js"),
        print:path.resolve(__dirname,"./src/print.js")
    },   
    output: {                              //出口
        filename: "[name].bundle.js",            //捆绑好的js
        path: path.resolve(__dirname, "./public")        //放到当前文件夹下的public文件夹 绝对路径
    },
    devServer:{
        port:3000,//服务端口
        contentBase:path.resolve(__dirname,"public"),//出口文件夹
        compress:true //是否做gzip压缩
    },
    devtool: "inline-source-map",         //显示错误具体在哪行
    plugins:[
        new CleanwebpackPlugin(),//清除以前的出口文件，保证每次出口目录都是最新的代码
        new HtmlWebpackPlugin({//创建出口的index.html并引入捆绑好的js文件
            title:"hello webpack",
            template:path.resolve(__dirname,"./static/index.html")//index.html的模板
        }),
        new UglifyJSPlugin()//压缩代码
    ],
    //其他类型文件的处理
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [//从后往前加载
                    "style-loader",//样式加载
                    "css-loader"//解析css
                ]
            },
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            // {
            //     test:/\.js$/,
            //     // exclude:/(node_modules|bower_components)/,//排除掉node_modules目录
            //     use:{
            //         loader:"babel-loader",
            //         options:{
            //             presets:["env"]//转码规则
            //         }
            //     }
            // }
        ]
    }
}   