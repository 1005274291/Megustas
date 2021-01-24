const express = require("express")
const app = express()
const bodyparser = require("body-parser")
const unlencodedparser = bodyparser.urlencoded({ extended: false })
const jsonparser = bodyparser.json()
const mongocontrol = require("./node12.js").mongocotrol
const user = new mongocontrol("test", "blog")
const fs = require("fs")
const ejs = require("ejs")

// app.use(express.static("./static",{
//     index:"node15.html"
// }))
app.get("/", function (req, res) {
    // fs.readFile("./static/node15.html", { encoding: "utf-8" }, (err, data) => {
    //     if (err) {
    //         res.status(500)
    //         return
    //     }
    //     console.log(data)
    //     var tpl = data
    //     var html = ""
    //     user.find({}, function (err, result) {
    //         result.forEach(item => {
    //             html += `<li><a href="/p?_id=${item._id}">${item.title}</a></li>
    //             `
    //         })
    //         tpl = tpl.replace("<!-- htmltpl -->", html)
    //         res.send(tpl)
    //     })
    // })
    user.find({}, function (err, result) {
        ejs.renderFile("./static/node15.ejs", { data: result }, function (err, html) {
            res.send(html)
        })
    })
})
app.get("/p", function (req, res) {
    var _id = req.query._id
    //     fs.readFile("./static/page/page1.html",{encoding:"utf-8"},function(err,data){
    //         // user.findbyid(_id,function(err,result){
    //         //     // console.log(result)
    //         //     var json=result[0]
    //         //     var html=""
    //         //     html=data.replace("<!-- title -->",json.title)
    //         //     .replace("<!-- content -->",json.content)
    //         //     res.send(html)
    //         // })
    //     })
    user.findbyid(_id, function (err, result) {
        data=result[0]
        ejs.renderFile("./static/page/page.ejs", { data: data }, function (err, html) {
            res.send(html)
        })
    })
})
app.listen(3000)