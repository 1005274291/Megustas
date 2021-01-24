import $ from "jquery"
import url from "url"
import "./demo.css"
import './demo.less'
import photo from "./1.jpg"
import printme from "./print"
var component =function(){
    var el = $("<div></div>")
    el.html("hello webpack!!!")
    el.addClass("text")
    var img =new Image()
    img.src=photo
    el.append(img)
    el.on("click",printme)
    return el
}
$("#root").append(component())
console.log(
    url.parse("https://baidu.com")
)
