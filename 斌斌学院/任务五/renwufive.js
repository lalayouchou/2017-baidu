function left(){
		var an=document.createElement("span");
		var div=document.getElementsByTagName("div")[0];
		var number=/[^0-9]+/;//正则表达式，表示至少有一个不是数字的字符;
		var text=document.getElementById("text");
		var lue=text.value;
		var an_b=document.getElementsByTagName("span");
		if(an_b.length>60){
			alert("不能再输入了")
		}
		else if(number.test(lue)===true||lue===""){//true不要加字符，test()方法语法：RegExpObject.test(string)
		alert("请输入数字");
		}
		else if(lue<10||lue>100){
		alert("请输入10-100的数字！")		
		}
		else {
		an.style.height=lue+'px';
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
	var an_b=document.getElementsByTagName("span");
	if(an_b.length>60){
			alert("不能再输入了")
	}
	if(number.test(lue)||lue===""){
		alert("请输入数字");
	}
	else if(lue<10||lue>100){
		alert("请输入10-100的数字！")		
	}
	else{
		an.style.height=lue+'px';
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
/*window.onload=function(){
var paixu=document.getElementById("paixu");
paixu.addEventListener("click" ,maopao);
function maopao(){
	var span=document.getElementsByTagName("span");
	var arr=[];
	for(i=0; i<span.length;i++){
		var abc=span[i].style.height.slice(0,2);
		arr.push(abc);
	}
	for(var x=0;x<arr.length;x++){
		for(var y=0;y<arr.length-1-x;y++){
			if(arr[y+1]<arr[y]){
				var t=arr[y+1];
				arr[y+1]=arr[y];
				arr[y]=t;
				span[y].style.height=arr[y]+"px";
				span[y+1].style.height=arr[y+1]+"px"
			}
		}
	}
}
}*//*可以实现排序功能，但是没有可视化效果*/

window.onload=function(){
var paixu=document.getElementById("paixu");
paixu.addEventListener("click" ,maopao);
function maopao(){
	var span=document.getElementsByTagName("span");
	var arr=[];
	for(i=0; i<span.length;i++){
		var abc=span[i].style.height.slice(0,2);//分割字符串，把高度输入arr数组
		arr.push(abc);
	}
	var x=0,y=0;
	// 利用setInterval方法不断调用该函数达到for循环语句的功能
	var time=function(){
		if(x===arr.length){
			clearInterval(con);
			return false;
		}//如果外层x循环结束，清除计时器，退出函数
		if(y===arr.length-1-x){
			y=0;
			x++;
		}//如果内层y循环结束，初始y值，x值加1；
		if(arr[y+1]<arr[y]){
				var t=arr[y+1];
				arr[y+1]=arr[y];
				arr[y]=t;
				span[y].style.height=arr[y]+"px";
				span[y+1].style.height=arr[y+1]+"px";
		}
	y++;//每调用一次该函数，y值加一；
	}
	var con=setInterval(time,1000);
}
}