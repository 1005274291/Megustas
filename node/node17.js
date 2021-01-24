const mongocontrol = require("./node12.js").mongocotrol
const page = new mongocontrol("blog", "page")
const comment=new mongocontrol("blog","comment")
const moment=require("moment")
// page.insert({
//     sort:"新闻",
//     title:"疫情速递",
//     author:"军少",
//     date:moment().format("YYYY-MM-DD HH-mm-ss"),
//     content:"黑龙江人民终于挺过去了",
//     intro:"这是一条有关于疫情的新闻"
// },()=>{})
comment.insert({
    fid:"5e5521f5a8d0d16f94d5b797",
    content:"长得帅的人写文章是好哈",
    author:"1005274291@qq.com",
    date:moment().format("YYYY-MM-DD HH-mm-ss")
},()=>{})