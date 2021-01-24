const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const urlencodedparser = bodyparser.urlencoded({ extended: false })
const mongocontrol = require("./node12.js").mongocotrol
const page = new mongocontrol("blog", "page")
const comment=new mongocontrol("blog","comment")
const fs = require("fs")
const ejs = require("ejs")
const cookieparser = require("cookie-parser")
const moment=require("moment")
const marked=require("marked")

app.use(cookieparser())

app.use(express.static("./static", {
    index: false
}))
app.use("/admin",express.static("./static"))
app.use("/admin",require("./node18"))//后台功能接口

app.get("/",function(req,res){
    page.find({},function(err,result){
        ejs.renderFile("./static/node16.ejs",{data:result},function(err,html){
            res.send(html)
        })
    })
})

app.get("/p",function(req,res){
    var _id=req.query._id
    page.findbyid(_id,function(err,result){
        if(result.length==0){
            res.status(404).send("文章没有找到")
            return
        }
        var data=result[0]
        data.content=marked(data.content)
        comment.find({fid:_id,state:1},function(err,result){
            ejs.renderFile("./static/page/page.ejs",{data:data,comment:result},function(err,html){
                html =html.replace("<!-- content -->",data.content)
                res.send(html)
            })
        })
    })
})

app.post("/submitcomment",urlencodedparser,function(req,res){
    var _id=req.query._id
    var {email,content}=req.body
    if(!_id){
        res.send("不允许评论")
        return
    } 
    if(!email || !comment){
        res.send("不允许评论")
        return
    }
    comment.insert({
        fid:_id,
        author:email,
        content:content,
        date:moment().format("YYYY-MM-DD HH-mm-ss"),
        state:0
    },(err,result)=>{
        if(err){
            res.status(500).send("你把我的服务器干崩了")
            return
        }
        res.redirect(
            "/p?_id="+_id
        )
    })
})
app.listen(3000)