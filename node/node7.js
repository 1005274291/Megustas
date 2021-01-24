const http = require("http")
const fs = require("fs")
const path = require("path")
const url = require("url")
const querystring = require("querystring")
const static = "./public"
const mime = require("./静态目录")
var parsecookie = function (req) {
    var cookie = req.headers.cookie
    if (typeof cookie == "string") {
        var cookiearr = cookie.split("; ")
        // console.log(cookiearr)
        var cookieobj = {}
        cookiearr.forEach(function (e, index) {
            var onecookie = querystring.parse(e)
            // console.log(onecookie)
            var key, value
            key = Object.keys(onecookie)[0]
            value = onecookie[key]
            cookieobj[key] = value
            req.cookie = cookieobj
        })
    } else {
        return req.cookie = {}
    }
}
var checkUser = function (cookie) {
    if (cookie.u == "admin" && cookie.p == "admin") {
        return true
    }
    return false
}

var server = http.createServer(function (req, res) {
    // console.log(req.url)
    parsecookie(req)
    if (req.method.toLocaleLowerCase() == "get") {
        var urlobj = url.parse(req.url)
        if (urlobj.pathname == "/pages") {
            var query = urlobj.query
            var page = querystring.parse(query).page
            var filepath = path.join("./pages", (page + ".txt"))
            fs.readFile(filepath, { encoding: "utf-8" }, function (err, data) {
                if (err) {
                    res.writeHead(404)
                    res.write("not found!")
                    res.end()
                    return
                }
                res.writeHead(200, { "Content-Type": mime.getType(filepath)+";charset=UTF-8" })
                res.write(data)
                res.end()
            })
        }
        if (req.url.indexOf(".") > -1) {
            var realpath = path.join(static, req.url)
            fs.readFile(realpath, function (err, data) {
                if (err && err.code == "ENOENT") {
                    res.writeHead(404)
                    res.end()
                    return
                }
                res.writeHead(200, { "Content-Type": mime.getType(req.url) +";charset=UTF-8"})
                res.write(data)
                res.end()
            })
        }
        if (urlobj.pathname == "/") {
            // console.log(req.cookie)
            if (checkUser(req.cookie)) {
                res.writeHead(200, { "Content-Type": "text/plain" })
                res.write("You are login")
                res.end()
            } else {
                fs.readFile("./public/node2.html", { encoding: "utf-8" }, function (err, data) {
                    res.setHeader("Access-Control-Allow-Origin", "*")//解决跨域问题
                    res.writeHead(200, { "Content-Type": mime.getType("./public/node2.html") })
                    res.write(data)
                    res.end()
                })
            }
        }
    }
    if (req.method.toLocaleLowerCase() == "post") {
        // console.log(req.headers["content-type"])
        if (req.url == "/login") {
            var data = ""
            req.on("data", function (chunk) {
                data += chunk.toString()
            })
            req.on("end", function () {
                var querys
                if (req.headers["content-type"] == "text/json") {
                    querys = JSON.parse(data)
                } else {
                    querys = querystring.parse(data)
                }
                var u = querys.username
                var p = querys.password
                res.setHeader("Set-Cookie", ["u=" + u ,"p=" + p])
                res.writeHead(302, { Location: "/" })
                res.end()
            })
        }
    }
})
server.listen(3000)