var mongodb=require("mongodb")
var mongoclient=mongodb.MongoClient
var objectid=mongodb.ObjectId
const mongodburl="mongodb://127.0.0.1:27017"
mongoclient.connect(mongodburl,{useNewUrlParser:true},function(err,client){
    if(err){
        console.log(err)
        return
    }
    var db=client.db("test")
    db.collection("user").insert({
        name:"无敌小旋风"
    },function(err,res){
        console.log(res)
        client.close
    })
    db.collection("user").remove({
        _id:objectid("5e52538601964d5178d1e963")
    },function(err,res){
        console.log(res.result)
        client.close()
    })
    db.collection("user").update({
        name:"无敌肺活量"
    },{
        $set:{name:"无敌飞火轮"}
    },function(err,res){
        console.log(res.result)
        client.close()
    })
    db.collection("user").find({}).toArray(function(err,res){
        console.log(res)
        client.close()
    })
})