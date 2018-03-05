"use strict"
window.onload=function(){

function $(value){
return document.getElementsByClassName(value);
}

var one1=$("one")[0],two2=$("two")[0],three3=$("three")[0];
var box1=$("box1")[0];
var arr=[];
var text=document.getElementById('search');
var addText=document.getElementById('add');
var submit=document.querySelectorAll('input[type="submit"]');//利用css选择器选择节点
var submitSearch=submit[0];
var submitAdd=submit[1];
var submitDel=submit[2];
// 前序搜索，根-左-右
function one(node){
	if(!!node){/*如果节点存在，就把节点存入arr数组*/
		arr.push(node);
		for (var i = 0; i < node.children.length; i++) {
			one(node.children[i]);
		}//所有子元素节点调用自身，children是子元素节点合集
	}
}

/*后序遍历，左-右-根*/
function three(node){
	if(!!node){
		for (var i = 0; i < node.children.length; i++) {
			one(node.children[i]);
		}
		arr.push(node);
	}
}

var i=0;//节点索引号变量
var k=0;/*搜索匹配次数变量*/

// 动画函数：
function animation(num){
	var text1=text.value;
	if (i!==0) {/*第一个节点不用执行下面这个语句*/
	arr[i-1].classList.remove('boxcolor');/*将上一个节点的类名“boxcolor”删除*/

// 只是遍历用不到下面的for语句：如果传入参数，执行for语句，下面调用自身语句同样要传入参数

	if(!!num){for (var j = 0; j < arr[i-1].childNodes.length; j++) {
		// 循环遍历上一个节点的子节点，存储该子节点的nodeValue,注意元素子节点的nodeValue为null
		var nodevalue=arr[i-1].childNodes[j].nodeValue;
		// 如果子节点的nodeValue存在，去除左右空格字符串方法trim()后，与搜索框字符串相等
		if(!!nodevalue&&text1===nodevalue.trim()){
			arr[i-1].classList.add("boxcolor");/*添加类名*/
			k++;//搜索匹配次数变量自增
		}
	}
}
}

	if(i === arr.length){return}//初始化变量，退出动画函数
	arr[i].classList.add("boxcolor");/*增加class类名*/
	setTimeout(function() {animation(num);} , 300);/*使用匿名函数，传入参数，调用自身*/
	i++;
}


// 检测函数：
function searchname() {
	if (k===0) {alert("没有找到");}
}

// 初始化函数：
function start() {
	for (var x = 0; x < arr.length; x++) {
		arr[x].classList.remove("boxcolor");
	}
	arr = []; i=0;
}
// 增加和删除函数
function all(value) {
	var arrclick=[];//创建局部变量
	arr=[];/*初始化*/
	one(box1);/*遍历*/
	// 找出带有boxcolor类名的节点，存在arrclick数组中
	for (var i = 0; i < arr.length; i++) {
		if (arr[i].classList.contains("boxcolor")) {
			arrclick.push(arr[i]);
		}
	}
	// 如果参数值为del,执行删除函数，返回一个闭包函数，函数自执行
	if(value==="del"){return (function() {	
		for (var j = 0; j < arrclick.length; j++) {
		arrclick[j].parentNode.removeChild(arrclick[j]);/*删除该节点*/
	}})();
	}
	// 如果参数值为add,执行删除函数，返回一个闭包函数，函数自执行
	if(value==="add"){return function() {
		var addvalue=addText.value;/*获得文本框值*/
		for (var j = 0; j < arrclick.length; j++) {
			var div=document.createElement("div");/*创建div节点*/
			div.innerHTML=addvalue;
			arrclick[j].appendChild(div);/*加入到该节点的子节点*/
		}
	}();}
}



one1.addEventListener("click",function(){
	start();
	one(box1);
	setTimeout(animation , 300);
});


three3.addEventListener("click",function(){
	start();
	three(box1);
	setTimeout(animation , 300);
});

submitSearch.addEventListener('click', function(e) {
	if(!text.value){alert("请输入内容！");return false;}//搜索内容初始值检测
	start();
	one(box1);
	animation(1);
	setTimeout( searchname ,300*26);/*等动画执行完毕后加入执行队列*/
});

submitDel.addEventListener("click",function(){
	all("del");
});

submitAdd.addEventListener("click",function(){
	all("add");
});
//事件代理：

document.body.addEventListener('click', function(e) {
	if(event.target.nodeName.toLowerCase()==="div"){
		event.target.classList.toggle("boxcolor");
	}
});
}