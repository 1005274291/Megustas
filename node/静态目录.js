var fs = require("fs")
var http = require("http")
var url =require("url")
var path =require("path")
var querystring =require("querystring")
http.createServer((req,res)=>{
    console.log(req.url)
    var next=function(){
        var handle=function(){
        res.writeHead(404,{
            "Content-Type":"text/plain"
        })
        }
        handle()
    }
    var getType=function(requrl){
        var txt=path.parse(requrl).ext
        switch(txt){
            case ".css":return "text/css"
            case ".js" :return "x-application/javascript"
            case ".html":return "text/html"
            default : return 'text/plain'
        }
    }
    fs.readFile(
        path.join("./static",req.url),
        (err,data)=>{
            if(err){
                next()
                return
            }
            var contentType =getType(req.url)
            res.writeHead(200,{
                "Content-Type":contentType
            })
            res.end(data)
        }
    )
}).listen(5000)
var getType=function(requrl){
    var txt=path.parse(requrl).ext
    switch(txt){
        case ".css":return "text/css"
        case ".js" :return "x-application/javascript"
        case ".html":return "text/html"
        default : return 'text/plain'
    }
}
exports.getType=getType