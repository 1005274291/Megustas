var https = require("https")
var fs = require("fs")
// var server=http.createServer(function(req,res){
//     if(req.url="/guabi"){
//         res.writeHead(302,{Location:"http://douyu.tv"})//重定向
//         res.write("123s")
//         res.end()
//     }
// })
// server.listen(3000)
//https://i5.mmzztt.com/2019/03/09b01.jpg
// "Referer": "https://www.mzitu.com/174947",
var imgnum=0
var request_web=function(path,i){
    var request = https.request({
        protocol: "https:",
        host: "i5.mmzztt.com",
        port: 443,
        method: "get",
        path: path,
        headers: {
            "Referer": "https://www.mzitu.com/",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
        }
    })
    request.end()
    request.on("response", function (res) {
        console.log("响应被收到")
        var arr = []
        // console.log(res.headers)
        res.on("data", function (chunk) {
            arr.push(chunk)
        })
        res.on("end", function () {
            fs.writeFile("./public/jpg/"+i+".jpg", Buffer.concat(arr), function (err) {
                console.log("写入完成")
            })
        })
    })
}
for(var i=1;i<40;i++){
    imgnum++
    if(imgnum<10){
        imgnum="0"+imgnum
    }
    var realimgnum=imgnum+".jpg"
    var path="/2019/03/09b"+realimgnum
    console.log(path)
    request_web(path,i)
}