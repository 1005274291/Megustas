
var trHead = document.createElement('tr')
var td_1 = document.createElement('th')
td_1.innerHTML = '名字'
var td_2 = document.createElement('th')
td_2.innerHTML = '号码'
var td_3 = document.createElement('th')
td_3.innerHTML = '操作' 
trHead.appendChild(td_1)
trHead.appendChild(td_2)
trHead.appendChild(td_3)

var tbody = document.getElementById('table-body')
tbody.appendChild(trHead)
var fillData = function (dataArr) {
    tbody.innerHTML = '' 
    tbody.appendChild(trHead) 
    dataArr.reverse()
    for (var i = 0; i < dataArr.length; i++) {
    	var item=dataArr[i]
    	var name=item.name
    	var phoneNumber=item.PhoneNumber
        var tr = document.createElement('tr')
        var td_1 = document.createElement('td')
        td_1.innerHTML = dataArr[i].name
        var td_2 = document.createElement('td')
        td_2.innerHTML = dataArr[i].phoneNumber
        var td_3 = document.createElement('td')
        var a = document.createElement('a') 
        a.href = 'tel:' + dataArr[i].phoneNumber 
        a.innerHTML = '拨号给 - ' + dataArr[i].name 
        var button=document.createElement("button")
        button.innerHTML="删除"
        td_3.appendChild(a)
        td_3.appendChild(button)
        button.setAttribute("data-_id",item._id)
        button.addEventListener("click",function(){
        	console.log(this.getAttribute("data-_id"))
        	remove(this.getAttribute("data-_id"))
        })
        
        
        tr.appendChild(td_1)
        tr.appendChild(td_2)
        tr.appendChild(td_3)
        tbody.appendChild(tr)
    }
}

var getAllContact = function () {
    var xhr = new XMLHttpRequest()
    xhr.open('GET', 'http://skipper.fun/pb/getAllContact', true)
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = xhr.response 
            var arr = JSON.parse(result)
            console.log(arr)
            fillData(arr)
        }
    }
}
getAllContact()

var addContactButton = document.getElementById('add-contact')
var addContactWrap = document.getElementById('add-contact-wrap')
var cancelButton = document.getElementById('cancel')
var confirmButton = document.getElementById('confirm')
var nameInput = document.getElementById('name')
var phoneNumberInput = document.getElementById('phoneNumber')

addContactButton.addEventListener('click', function () {
    addContactWrap.className = 'active'
})

cancelButton.addEventListener('click', function () {
    addContactWrap.className = ''
})


confirmButton.addEventListener('click', function () {

    var name = nameInput.value
    var phoneNumber = phoneNumberInput.value
    var url = 'http://skipper.fun/pb/addContact'
    url += '?name=' + name + '&' + 'phoneNumber=' + phoneNumber

    console.log(url)
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.send()
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.response)
            if (result.code == 200) {
      
                addContactWrap.className = ''
                getAllContact()
            } else {
                alert('添加失败,检查网络后重试!')
            }
        }
    }
})
var searchInput = document.getElementById('search')
        searchInput.addEventListener('input',function(){
            console.log(this.value)
            search(this.value)
        })


        var search = function(key){
            var xhr = new XMLHttpRequest()
            xhr.open('GET','http://skipper.fun/pb/search?key=' + key , true)
            xhr.send()
            xhr.onreadystatechange = function(){
                if(xhr.readyState == 4 && xhr.status == 200){
                    console.log(xhr.response)
                    var result = JSON.parse(xhr.response)
                    if(result.code == 200){

                        fillData(result.result)
                    }
                }
            }
        }
var remove=function(id){
	var xhr=new XMLHttpRequest()
	xhr.open("GET","http://skipper.fun/pb/removeContact?_id="+id,true)
	xhr.send()
	xhr.onreadystatechange=function(){
		if(xhr.readyState==4&&xhr.status==200){
			console.log(xhr.response)
			var result=JSON.parse(xhr.response)
			if(result.code==200){
				getAllContact()
			}
		}
	}
}
