const path=require("path")
var querystring=require("querystring")
var url=require("url")
var pathobject=path.parse("C:/Users/10052/Desktop/VScode/就业复习/node/node4.js")
console.log(pathobject)//把路径分解成对象
var pathstring=path.format(pathobject)
console.log(pathstring)//把对象拼接成路径
console.log(path.resolve("../","js","demo1.html"))//把路径转换成绝对路径
console.log(path.join("../","js","demo2.html"))//把路径转换成相对路径
var qs="name=1&age=20"
console.log(querystring.parse(qs))//把url的参数转化成对象格式
console.log(querystring.stringify((querystring.parse(qs))))//把url对象序列化成字符串
var url1="https://www.baidu.com/s?wd=%E5%AE%B6"
console.log(querystring.unescape(url1))//对编码进行解码 escape是对中文进行编码
var a="http://skipper.fun:80/pb/getAllContact?id=8"
console.log(url.parse(a))//把网址解析成对象
//format把对象拼接成网址
console.log(url.resolve("https://douyu.com/12457","2486"))
//以浏览器打开超链接的方式拼接url字符串
