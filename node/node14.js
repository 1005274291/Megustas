const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const unlencodedparser = bodyparser.urlencoded({ extended: false })
const jsonparser = bodyparser.json()
const mongocontrol = require("./node12.js").mongocotrol
const user = new mongocontrol("test", "contact")
const path=require("path")

app.use(express.static("./static",{
    index:"node14.html"
}))

var handle500 = function (res) {
    res.status(500).send("数据库查询错误")
}
app.get("/getallcontact", (req, res) => {
    user.find({}, function (err, result) {
        if (err) {
            handle500(res)
            return
        }
        res.send(result)
    })
})
app.get("/search", (req, res) => {
    var wd=req.query.wd
    var reg=new RegExp(wd,"i")
    user.find({
        $or:[
            {name:{$regex:reg}},
            {phonenumber:{$regex:reg}}
        ]
    },(err,result)=>{
        if(err) return handle500(res)
        res.send(result)
    })
})
app.post("/addcontact", unlencodedparser, (req, res) => {
    var {name,phonenumber}=req.body
    user.insert({name:name,phonenumber:phonenumber},(err,result)=>{
        if(err){
            handle500(res)    
            return
        }else{
            res.send("添加成功")
        }
    })
})
app.post("/updatecontact", unlencodedparser, (req, res) => {
    var {_id,name,phonenumber}=req.body
    console.log(_id)
    user.updatebyid(_id,{name:name,phonenumber:phonenumber},(err,result)=>{
        if(err) return handle500(res)
        res.send("更新成功")
    })
})
app.get("/remove", (req, res) => {
    var _id=req.query._id
    user.removebyid(_id,(err,result)=>{
        if(err) return handle500(res)
        res.send("删除成功")
    })
})
app.listen(3000)