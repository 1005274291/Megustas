const fs=require("fs")
const path=require("path")
fs.appendFile("./1.txt","我也想啊",{encoding:"utf-8"},function(err){
    if(err){
        console.log(err)
        return
    }
    console.log("异步文件追加")
})
fs.appendFileSync("./1.txt","谁都想",{encoding:"utf-8"})//同步文件追加
fs.copyFile("./1.txt","./3.txt",function(err){
    if(err){
        console.log(err)
        return
    }
    console.log("文件复制成功")
})
fs.readFile("./2.txt",{encoding:"utf-8"},function(err,data){
    if(err) return
    console.log(data,"读取成功")
})
fs.writeFile("./1.txt","写入文件成功覆盖",{encoding:"utf-8"},function(err){
    if(err){
        console.log(err)
        return
    }
})
fs.open("./1.txt","r",function(err,fd){
    console.log(fd)//获取文件的id
})
fs.readdir("./",function(err,files){//获取文件夹中的全部文件
    files.forEach(function(e){
        if(path.parse(e).ext==".js"){
            console.log(e)
        }
    })
})
fs.mkdir("./test",function(err){
    if(err) return
    console.log("文件夹创建成功")
})
fs.rmdir("./test",function(err){
    if(err) return
    console.log("文件夹删除成功")//文件夹下有文件不允许被删除
})
var result=fs.existsSync("./1.txt")//判断文件是否存在
if(result){
    console.log("文件存在")
}
fs.stat("./1.txt",function(err,stats){//查看文件的状态
    console.log(stats)
})
// fs.rename("./2.txt","./3.txt",function(err){//重命名
    // console.log("文件更名成功")
// })
fs.unlink("./3.txt",function(err){//删除文件
    console.log("文件删除成功")
})
fs.watch("./1.txt",function(event,filename){//监听文件的改变
    console.log(event,filename)
})
fs.watchFile("./1.txt",function(curr,prev){//监听文件名的改变
    console.log(curr,prev)
})