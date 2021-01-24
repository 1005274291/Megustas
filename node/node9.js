const path = require("path")
const request = require("request")
const cheerio = require("cheerio")
const fs = require("fs")
// var url="https://i5.mmzztt.com/2019/03/09b01.jpg"
// console.log(path.parse(url))
//"data-original"
request("https://www.mzitu.com", {
    headers: {
        "Referer": " https://www.mzitu.com/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
    }
}, function (err, res, body) {
    var $ = cheerio.load(body)
    $("img").each(function (index, item) {
        var url = $(item).attr("data-original")
        if (typeof url == "string") {
            request(url, {
                headers: {
                    "Referer": " https://www.mzitu.com/",
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
                }
            }, function (err, res, body) {
                // console.log(typeof body)
                // let buffer=Buffer.from(body)
                // fs.writeFile("./public/jpg/" + index + "a.jpg",buffer, function (err) {
                //     console.log("写入完成")
                // })
            }).pipe(fs.createWriteStream("./public/jpg/a" + index + ".jpg"))
        }
    })
})
// request("https://i.mmzztt.com/thumb/2020/02/221939_236.jpg",{
//     headers: {
//         "Referer": " https://www.mzitu.com/",
//         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
//     }
// },function(err,res,body){
//     console.log(body)
// })