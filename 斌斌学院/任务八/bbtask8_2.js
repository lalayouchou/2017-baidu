window.onload=function(){

function $(value){
return document.getElementsByClassName(value);
}

var one1=$("one")[0],two2=$("two")[0],three3=$("three")[0];
var box1=$("box1")[0];
var arr=[];
var text=document.getElementById('search');
var submit=document.querySelector('input[type="submit"]');//利用css选择器选择节点

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

	if(i === arr.length){arr = []; i=0;return}//初始化变量，退出动画函数
	arr[i].classList.add("boxcolor");/*增加class类名*/
	setTimeout(function() {animation(num);} , 300);/*使用匿名函数，传入参数，调用自身*/
	i++;
}


// 检测函数：
function searchname() {
	if (k===0) {alert("没有找到");}
}

one1.addEventListener("click",function(){
	one(box1);
	setTimeout(animation , 300);
});


three3.addEventListener("click",function(){
	three(box1);
	setTimeout(animation , 300);
});

submit.addEventListener('click', function(e) {
	if(!text.value){alert("请输入内容！");return false;}//搜索内容初始值检测
	one(box1);
	animation(1);
	setTimeout( searchname ,300*26);/*等动画执行完毕后加入执行队列*/
});
}