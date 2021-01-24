var fs= require("fs")
var express=require("express")
var app=express()
var data=[]
data=JSON.parse(fs.readFileSync("./user.json",{encoding:"utf-8"}))
console.log(data)
app.get("/",function(req,res){
    fs.readFile("./node1.html",{encoding:"utf-8"},function(err,data){
        res.send(data)
    })
})
app.get("/login",function(req,res){
    var{username,password}=req.query
    for(var i=0;i<data.length;i++){
        if(username==data[i].username && password==data[i].password){
            res.send("登录成功")
            return
        }
    }
    res.send("没有这个用户")
})
app.listen(3000)