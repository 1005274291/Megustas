const path=require("path")
const HtmlWebpackPlugin=require("html-webpack-plugin")
const CleanwebpackPlugin=require("clean-webpack-plugin").CleanWebpackPlugin
const Vueloaderplugin =require("vue-loader/lib/plugin")
module.exports={
    entry:path.resolve(__dirname,"./src/index.js"),
    output:{
        filename:"bundle.js",
        path:path.resolve(__dirname,"./dist")
    },
    devtool: "inline-source-map",
    plugins:[
        // new CleanwebpackPlugin(),
        new HtmlWebpackPlugin({
            title:"vue",
            template:"./public/index.html"
        }),
        new Vueloaderplugin()
    ],
    module:{
        rules:[
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.vue$/,
                use:[
                    "vue-loader"
                ]
            }
        ]
    }
}