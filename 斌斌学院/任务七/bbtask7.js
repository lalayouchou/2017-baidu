window.onload=function(){
	// 获取节点
function $(value){
return document.getElementsByClassName(value);
}

var one1=$("one")[0],two2=$("two")[0],three3=$("three")[0];
var box1=$("box1")[0];
var arr=[];

function one(node){//先序遍历，把节点储存在数组中
	if(!!node){
		arr.push(node);
		if(node.firstElementChild){
			one(node.firstElementChild);
		}
		if(node.lastElementChild){
			one(node.lastElementChild);
		}
	}
}

function two(node){//中序遍历，把节点储存在数组中
if(!!node){
		if(node.firstElementChild){
			two(node.firstElementChild);
		}
		arr.push(node);
		if(node.lastElementChild){
			two(node.lastElementChild);
		}
	}
}

function three(node){//后序遍历，把节点储存在数组中
	if(!!node){
		if(node.firstElementChild){
			three(node.firstElementChild);
		}
		
		if(node.lastElementChild){
			three(node.lastElementChild);
		}
		arr.push(node);
	}
}
// 动画函数
var i=0;
function animation(){
	arr.map(function(x){
	if(x.classList.contains("boxcolor")){
	x.classList.remove("boxcolor")};
	});//去除数组中所有boxColor类名
	// 退出循环，恢复变量初始化：
	if(i === arr.length){arr = []; i=0;return}
	arr[i].classList.add("boxcolor");//为arr[i]添加类名
	setTimeout(animation , 500);//调用自身函数
	i++;
}


one1.addEventListener("click",function(){
	one(box1);
	setTimeout(animation , 500);
});

two2.addEventListener("click",function(){
	two(box1);
	setTimeout(animation , 500);
});

three3.addEventListener("click",function(){
	three(box1);
	setTimeout(animation , 500);
});

}