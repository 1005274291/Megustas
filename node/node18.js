var express = require("express")
var router = express.Router()
const bodyparser = require("body-parser")
const urlencodedparser = bodyparser.urlencoded({ extended: false })
const moment = require("moment")
const mongocontrol = require("./node12.js").mongocotrol
const page = new mongocontrol("blog", "page")
const comment=new mongocontrol("blog","comment")
const path = require("path")

class cookiecontrol {
    constructor() {
        this.tokenarr = []
    }
    gettoken() {
        var token = ""
        var str = "123456789qwertyuiopasdfghjklzxcvbnmZXCVBNM,LKJHGFFDSAQWERTYTYUIOP"
        for (var i = 0; i < 16; i++) {
            if (i % 5 == 0 && i != 0) {
                token += "-"
            }
            token += str[parseInt(Math.random() * str.length)]
        }
        this.tokenarr.push(token)
        return token
    }
    checktoken(token) {
        for (var i = 0; i < this.tokenarr.length; i++) {
            if (this.tokenarr[i] == token) {
                return true
            }
        }
        return false
    }
    removetoken(token) {
        for (var i = 0; i < this.tokenarr.length; i++) {
            if (this.tokenarr[i] == token) {
                this.tokenarr.splice(i, 1)
                return true
            }
        }
        return false
    }
}
var admin = new cookiecontrol()
//上传文章
router.get("/", function (req, res) {
    console.log(req.cookies)
    if (admin.checktoken(req.cookies.tok)) {
        res.sendFile(path.resolve("./static/page/page1.html"))
    } else {
        res.redirect("/admin/login")
        return
    }
})

router.get("/login", function (req, res) {
    res.sendFile(
        path.resolve("./static/page/page2.html")
    )
})
router.get("/getcomment",function(req,res){
    // var origin=req.headers.origin
    res.setHeader("Access-Control-Allow-Origin",origin)
    if(admin.checktoken(req.cookies.tok)){

    }else{
        res.redirect("/admin/login")
        return
    }
    comment.find({state:0},function(err,data){
        if(data.length==0){
            res.send([])
            return
        }
        var count=0
        for(var i=0;i<data.length;i++){
            var nowdata=data[i]
            var nowdatafid=nowdata.fid
            page.findbyid(nowdatafid,function(err,result){
                var page=result[0]
                nowdata.f_title=page.title
                nowdata.f_intro=page.intro
                count++
                if(count ==data.length){
                    res.send(data)
                }
            })
        }
    })
})
router.get("/passcomment",function(req,res){
    if(admin.checktoken(req.cookies.tok)){

    }else{
        res.redirect("/admin/login")
        return
    }
    var _id=req.query._id
    comment.updatebyid(_id,{state:1},function(e,result){
        res.redirect("/admin")
    })
})
router.get("/nopasscomment",function(req,res){
    if(admin.checktoken(req.cookies.tok)){

    }else{
        res.redirect("/admin/login")
        return
    }
    var _id=req.query._id
    comment.updatebyid(_id,{state:2},function(e,result){
        res.redirect("/admin")
    })
})
router.post("/login", urlencodedparser, function (req, res) {
    if (req.body.username == "admin" && req.body.password == "admin") {
        res.cookie("tok",admin.gettoken())
        // res.writeHead(200,{
        //     "Set-Cookie":[`tok=${admin.gettoken()};Expires=Wed, 13-Jan-2021 22:23:01 GMT;HttpOnly`,"ccc=ddd"]
        // })
        //new Date().toGMTString()  Expires 采用GMT时间
        res.redirect("/admin")
    } else {
        res.status(403).send("登录失败")
    }
})

router.post("/uploadpage", urlencodedparser, function (req, res) {
    if (admin.checktoken(req.cookies.tok)) {
        var { sort, title, author, content, intro } = req.body
        var date = moment().format("YYYY-MM-DD HH-mm-ss")
        page.insert({
            sort: sort,
            title: title,
            author: author,
            content: content,
            intro: intro,
            date: date
        }, () => {
            res.redirect("/")
        })
    } else {
        res.redirect("/admin/login")
        return
    }
})
module.exports = router