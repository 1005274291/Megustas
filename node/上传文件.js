var express=require("express")
var app=express()
var fs=require("fs")
var formidable=require("formidable")
var path=require("path")
app.use(express.static("./public"))
app.post("/upload",function(req,res){
    var form=new formidable.IncomingForm()
    form.uploadDir="./public"
    form.parse(req,function(err,fields,files){
        console.log(files)
        var uploadimg=files.img
        fs.rename(
            path.join(uploadimg.path),
            path.join("./public",uploadimg.name),
            function(err){
                console.log("文件上传成功")
            }
        )
    })
    res.send("上传成功")
})
app.listen(3000)