var http=require("http")
var fs=require("fs")
var querstring=require("querystring")
http.createServer(function(req,res){
    var method=req.method
    var cookie=req.headers.cookie
    var cookieArray=cookie.split("; ")
    var newcookie={}
    cookieArray.forEach(function(item,index){
        var p=querstring.parse(item)
        var key=Object.keys(p)[0]
        var val=p[key]
        newcookie[key]=val
    })
    // console.log(cookie)
    // console.log(newcookie)
    req.cookies=newcookie
    res.writeHead(200,{"from":"jiangzong"})
    switch(method){
        case "GET":
            // res.write("this is get!")
            var staticpath="../js"+req.url
            var ex=fs.existsSync(staticpath)
            if(ex){
                var data=fs.readFileSync(staticpath,{encoding:"utf-8"})
                res.write(data)
                return
            }
            console.log(req.url)
            break
        case "POST":
            res.write("this is post!")
            break
    }
    res.end()
}).listen(3000)