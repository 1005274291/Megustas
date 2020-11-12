
var get=function(url,data,callback){
    var xhr=new XMLHttpRequest()
    var param="?"
    for(var key in data){
        if(data.hasOwnProperty(key)){
            param +=key+"="+data[key]+"&"
        }
    }
    param=param.slice(0,param.length-1)
    xhr.open("GET",url+param,true)
    xhr.send()
    xhr.onreadystatechange=function(){
        if(xhr.status==200 &&xhr.readyState==4){
           if(callback){
               callback(JSON.parse(xhr.response))
           }
        }
    }
}

var search=function(keywords,callback){
    get("http://localhost:3000/search",{keywords:keywords},function(res){
        if(callback){
            callback(res.result.songs)
        }
    })
}
var getsongurl=function(id,callback){
    get("http://localhost:3000/song/url",{id:id},function(res){
        if(callback){
            callback(res.data[0].url)
        }
    })
}
var getlrc=function(id,callback){
    get("http://localhost:3000/lyric",{id:id},function(res){
    var lrcstring=res.lrc.lyric
    if(callback){
        callback(lrcstring)
    }
    })
}
var html=""
var lrcwrap=document.getElementsByClassName("lrc-wrap")[0]
var audio=document.getElementById("audio")
var nowlrcobjarr=[]
var index=0
var marginTop=250
var lrcitems=null
var resetlrc=function(){
    index=0
    marginTop=250
    html=""
}
var comparelrc=function(){
    console.log(nowlrcobjarr[index])
    if(nowlrcobjarr[index].time - audio.currentTime*1000<300){
        lrcitems[index].style.color="red"
        lrcitems[index].style.fontSize="1.2em"
        marginTop-=30
        lrcwrap.style.marginTop=marginTop+"px"
        if(index-1>-1){
            lrcitems[index-1].style.color=""
            lrcitems[index-1].style.fontSize="1em"
        }
        index++
    }
}
audio.addEventListener("timeupdate",function(){
    comparelrc()
})
var fillrc=function(lrcobjarr){
    var tpl="<li class='lrc-item pure-menu-item'>{content}</li>"
    for(var i=0;i<lrcobjarr.length;i++){
        html+=tpl.replace("{content}",lrcobjarr[i].content)
    }
    lrcwrap.innerHTML=html
    nowlrcobjarr = lrcobjarr
    console.log(nowlrcobjarr)
    lrcitems=document.getElementsByClassName("lrc-item")

}
// search("123",function(res){
//     console.log(res)
//     var firstsongid=res.result.songs[0].id
//     console.log(firstsongid)
//     getsongurl(firstsongid,function(res){
//         var url=res.data[0].url
//         document.getElementById("audio").src=url
//     })
// })
var paeselrc=function(lrcstring){
    var parsetime=function(timestring){
        var timestringarr=timestring.split(":")
        var min=parseInt(timestringarr[0])
        var s=parseFloat(timestringarr[1])
        var totaltime=(min*60+s)*1000
        return parseInt(totaltime)
    }
    var lrcarr=[]
    var lrcobjarr=[]
    lrcarr=lrcstring.split("\n")
    lrcarr.forEach(function(item){
        var lines=item.split("]")
        var time=parsetime(lines[0].slice(1,lines[0].length))
        var content=lines[1]
        if(content ==undefined || isNaN(time)){
            
        }else{
            lrcobjarr.push(
                {
                    time:time,
                    content:content
                }
            )
        }
    })
    return lrcobjarr
}
var addEventListener=function(){
    var songs=document.getElementsByClassName("songs")
    for(var i =0;i<songs.length;i++){
        songs[i].addEventListener("click",function(){
            var id=this.getAttribute("data-id")
            resetlrc()
            getsongurl(id,function(url){
                audio.src=url
                audio.play()
                searchlist.className="search-list"
            })
            getlrc(id,function(res){
                // var custom= document.getElementsByClassName("custom-restricted")[0]
                // custom.style.display="block"
                var lrc= paeselrc(res)
                fillrc(lrc)
            })
        })
    }
}
var searchbutton=document.getElementById("search-button")
var keywordinput=document.getElementById("keyword")
var resultlist=document.getElementById("result-list")
var searchlist=document.getElementsByClassName("search-list")[0]
var rendersearchlist=function(key){
    search(key,function(res){
        // console.log(res)
        var tpl='<li class="songs pure-menu-item" data-id={id}>'+
        '<a class="pure-menu-link">'+
        '<h3>musicname</h3>'+
        '<h5><span>musicaticle</span>-专辑<span>musicalbum</span></h5>'+
        '<hr></a></li>'
        var htm=""
        for(var i=0;i<res.length;i++){
            htm+=tpl.replace("musicname",res[i].name)
            .replace("musicaticle",res[i].artists[0].name)
            .replace("musicalbum",res[i].album.name)
            .replace("{id}",res[i].id)
        }
        resultlist.innerHTML=htm
        // console.log(searchlist.className)
        searchlist.className="search-list active"
        addEventListener()
    })
}
searchbutton.addEventListener("click",function(){
    var value=keywordinput.value
    rendersearchlist(value)
})