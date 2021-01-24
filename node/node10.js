var express=require("express")
var app=express()
var path=require("path")
var cookieparser=require("cookie-parser")
var bodyparser=require("body-parser")
var urlencodeparser=bodyparser.urlencoded({extended:false})
// app.use(express.static("./public"))//静态目录
app.use(cookieparser())
app.get("/",function(req,res){
    // console.log(req.query)
    res.cookie("a",1)
    console.log(req.cookies)
    res.sendFile(path.resolve("./public/node2.html"))
})
app.post("/login",urlencodeparser,function(req,res){
    console.log(req.body)
    res.status(200).redirect("/")
})
app.listen(3000)