const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const unlencodedparser = bodyparser.urlencoded({ extended: false })
const mongocontrol = require("./node12.js").mongocotrol
const user = new mongocontrol("test", "user")

app.use(express.static("./public"))

app.post("/register", unlencodedparser, function (req, res) {
    var username = req.body.username
    var password = req.body.password
    if (username.length < 6 || password.length < 6) {
        res.status(403).send("账号名或密码过短")
        return
    }
    user.find({ username: username }, function (err, result) {
        if (err) {
            res.status(500).send("服务器错误")
            return
        }
        if (result.length > 0) {
            res.status(200).send("用户名已存在")
        } else {
            user.insert({ username: username, password: password }, (err, result) => {
                if (err) {
                    res.status(500).send("服务器错误")
                    return
                }
                res.send("注册成功")
            })
        }
    })
})


app.post("/login",unlencodedparser,function(req,res){
    var username = req.body.username
    var password = req.body.password
    user.find({username:username,password:password},(err,result)=>{
        if(err){
            res.status(500).send("服务器错误")
            return
        }
        if(result.length==0){
            res.status(403).send("账号密码错误")
        }else{
            res.send("登录成功")
        }
    })
})
app.post("/changepassword",unlencodedparser,function(req,res){
    var {username,oldpassword,newpassword}=req.body
    user.find({username:username,password:oldpassword},(err,result)=>{
        if(err){
            res.status(500).send("服务器错误")
            return
        }
        if(result.length==0){
            res.send("账号和密码不匹配")
        }else{
            user.update({username:username},{password:newpassword},(err,result)=>{
                if(err){
                    res.status(500).send("服务器错误")
                    return
                }
                res.send(`你的新账号密码是 ${username}- ${newpassword}`)
            })
        }
    })
})
app.listen(3000)