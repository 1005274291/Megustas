const fs=require("fs")
const path=require("path")

var readdir=function(dir){
    fs.readdir(dir,function(err,files){
        files.forEach(function(e){
            var newDir=path.join(dir,e)
            var stats=fs.statSync(newDir)
            if(stats.isDirectory()){
                readdir(newDir)
            }else{
                console.log(newDir);
                
            }
        })
    })
}
readdir("./node_modules")

var result=[]
var readDir=function(dir){
    try{
        var files=fs.readdirSync(dir)
        files.forEach(function(e){
            if(e.indexOf("$")>-1 || e== "node_modules") return
            readdirSync(path.join(dir,e))
        })
    }catch(err){
        if(err.code =="ENOTDIR"  && path.parse(dir).base=="Overwatch.exe"){
            result.push(dir)
        }
    }
}