window.onload=function(){
var num1=document.getElementById("num1");
var num2=document.getElementById("num2");
var num3=document.getElementById("num3");
var num4=document.getElementById("num4");
var num5=document.getElementById("num5");
var submit=document.getElementById("submit");
var name1 =document.getElementById("name1");
var name2 =document.getElementById("name2");
var name3 =document.getElementById("name3");
var name4 =document.getElementById("name4");
var name5=document.getElementById("name5");
var aaa=/[^\u4e00-\u9fa5A-Za-z0-9]/;
var bbb=/^[0-9]{8,16}$/;
var ccc=/^\w+@[A-Za-z0-9]+\.[A-Za-z]+$/;
var ddd=/^1[0-9]{10}$/;



// 初始聚焦时显示文字；
function pStart1(){name1.innerText="必填，请输入4-16个字符,只能是中文，数字和英文字母";}
function pStart2(){name2.innerText="请输入8-16位数字密码";}
function pStart3(){name3.innerText="请再次输入密码";}
function pStart4(){name4.innerText="请输入邮箱";}
function pStart5(){name5.innerText="请输入手机号码";}

//正确输入显示文字：
function pYes1(){name1.innerText="名称输入正确";}
function pYes2(){name2.innerText="密码输入正确";}
function pYes3(){name3.innerText="密码输入一致";}
function pYes4(){name4.innerText="邮箱输入正确";}
function pYes5(){name5.innerText="手机输入正确";}

//错误时显示文字
function pNo1(){name1.innerText="名称输入错误";}
function pNo2(){name2.innerText="密码输入错误";}
function pNo3(){name3.innerText="密码输入不一致";}
function pNo4(){name4.innerText="邮箱输入错误";}
function pNo5(){name5.innerText="手机输入错误";}

//设置class类名函数；
function addclass(node1,node2,color){
	node1.className="";//class名字重置
	node2.className="";
	node1.className=color;
	node2.className=color;
}

// 添加事件监听，聚焦事件
num1.addEventListener("focus",function(){pStart1();});
num2.addEventListener("focus",function(){pStart2();});
num3.addEventListener("focus",function(){pStart3();});
num4.addEventListener("focus",function(){pStart4();});
num5.addEventListener("focus",function(){pStart5();});

// 添加事件监听，失去聚焦时的事件，进行判断

num1.addEventListener("blur",function(){
	var value=num1.value;
	var value2=value.replace(/[\u4e00-\u9fa5]/g,"ab");//将中文全部设置为两个字符
	if((aaa.test(value)===false)&&(/[A-Za-z0-9]{4,16}/.test(value2))){//4<=value2.length&&value2.length<=16不能直接连续比较
		addclass(num1,name1,"green");
		pYes1();
	}else{
		addclass(num1,name1,"red");
		pNo1();
	}
});

num2.addEventListener("blur",function(){
	var value=num2.value;
	if(bbb.test(value)){
		addclass(num2,name2,"green");
		pYes2();
	}else{
		addclass(num2,name2,"red");
		pNo2();		
	}
});

num3.addEventListener("blur",function(){
	var value1=num2.value;
	var value2=num3.value;
	if(value1===value2&&value2!==""){
		addclass(num3,name3,"green");
		pYes3();
	}else if(value2===""){
		addclass(num3,name3,"red");
		name3.innerText="密码输入错误";	
	}
	else{
		addclass(num3,name3,"red");
		pNo3();		
	}
});
num4.addEventListener("blur",function(){
	var value=num4.value;
	if(ccc.test(value)){
		addclass(num4,name4,"green");
		pYes4();
	}else{
		addclass(num4,name4,"red");
		pNo4();		
	}
});
num5.addEventListener("blur",function(){
	var value=num5.value;
	if(ddd.test(value)){
		addclass(num5,name5,"green");
		pYes5();
	}else{
		addclass(num5,name5,"red");
		pNo5();		
	}
});

//为提交按钮添加事件监听：

submit.addEventListener("click",function(){
	var red=document.getElementsByClassName("red");
	var green=document.getElementsByClassName("green");
	if(red.length===0&&green.length===10){
		alert("提交成功");
		return false;	
	}else{
		alert("信息有误");
		return false;
	}
});

}