function left(){
		var an=document.createElement("span");
		var div=document.getElementsByTagName("div")[0];
		var number=/[^0-9]+/;//正则表达式，表示至少有一个不是数字的字符;
		var text=document.getElementById("text");
		var lue=text.value;
		if(number.test(lue)===true||lue===""){//true不要加字符，test()方法语法：RegExpObject.test(string)
		alert("请输入数字");
		}
		else{
		an.innerText=lue;
		div.insertBefore(an, div.firstChild);
		text.value="";//insertBefore()方法，可以指定位置插入节点
		}		
}
function right(){
	var an=document.createElement("span");
	var div=document.getElementsByTagName("div")[0];
	var number=/[^0-9]+/;
	var text=document.getElementById("text");
	var lue=text.value;
	if(number.test(lue)||lue===""){
		alert("请输入数字");
	}
	else{
		an.innerText=lue
		div.appendChild(an);
		text.value='';//在最后面插入字节点;
	}
}
function left_down(){
	var div=document.getElementsByTagName("div")[0];
	div.removeChild(div.firstChild);
}
function right_down(){
	var div=document.getElementsByTagName("div")[0];
	div.removeChild(div.lastChild);
}
/*点击队列中任何一个元素，则该元素会被从队列中删除*/
//使用的是事件代理
window.onload=function(){//必须添加，不然在页面加载完成之前添加onclick事件会报错；
var div=document.getElementsByTagName("div")[0];
div.onclick=function(ev){
	//兼容处理;
	ev=ev||event;
	var target=ev.target||ev.srcElement;
	if(target.nodeName.toLowerCase()==="span") {
		div.removeChild(target);
	}
	/*div.addEventListener("click",function(e){//此处也可用ev或者event
    if(event.target.nodeName.toLowerCase()=="span"){
//                    console.log(event.target);
        div.removeChild(event.target);
    }
})*/
}
}