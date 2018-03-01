function boxgo(){

function $(value){
		if(!document.getElementById){
			return false;
		}
		return document.getElementById(value);
	}
var box=$("box");
var button=$("button");
var text=$("text");
var arr=["GO","TUN LEF","TUN RIG","TUN BAC","TRA LEF","TRA TOP","TRA RIG","TRA BOT","MOV LEF","MOV TOP","MOV RIG","MOV BOT"];//命令数组
var i=0;//
var j=0;//控制方向，0为上，1为右，顺时针，和旋转角度对应


(function(){	
	box.style.top="152px";
	box.style.left= "152px";
	box.style.transition="transform 1s ,top 1s ,left 1s";
	})();//自执行函数



button.addEventListener("click",but2);//为按钮添加监听事件,由于动画初始化一定要在执行完函数以后执行，因此把两个函数封装在一个函数里

function but2(){
	but();
	setTimeout(animation,501);//延迟执行该函数;
}

// 事件函数：
function but(){
	var value=text.value;
	if(arr.indexOf(value)===-1){
		alert("输入错误");
	}
	switch(value){
		case "GO":
		go(j);
		break;

		case "TUN LEF" :
		case "TUN RIG" :
		case "TUN BAC" :
		num(value);
		cla(i);
		break;

		case "TRA LEF" :
		go(3);
		break;

		case "TRA TOP" :
		go(0);
		break;

		case "TRA RIG" :
		go(1);
		break;

		case "TRA BOT" :

		go(2);
		break;

		case "MOV LEF" :
		box.style.transition="transform .5s ,top .5s .5s,left .5s .5s";
		cla(-1);
		go(3);
		i=-1;
		j=3;
		break;

		case "MOV TOP" :
		box.style.transition="transform .5s ,top .5s .5s,left .5s .5s";
		cla(0);
		go(0);
		i=0;
		i=0;
		break;

		case "MOV RIG" :
		box.style.transition="transform .5s ,top .5s .5s,left .5s .5s";
		cla(1);
		go(1);
		i=1;
		j=1;
		break;.5
		case "MOV BOT" :
		box.style.transition="transform .5s ,top .5s .5s,left .5s .5s";
		cla(2);
		go(2);
		i=2;
		j=2;
		break;
	}
}
// 动画初始化函数
function animation(){
	box.style.transition="transform 1s ,top 1s ,left 1s";
}

// 旋转函数
function num(value){
	switch(value){
		case arr[1]:
		i--;
		j--;
		break;
		case arr[2]:
		i++;
		j++;
		break;
		case arr[3]:
		i=i+2;
		j=j+2;
		break;
	}
	if(j>=4){
		j=j-4;
	}if(j<=-4){
		j=j+4;
	}
}
// 控制旋转角度函数：
function cla(i){
		var direction=i*90;
		box.style.transform="rotate("+direction+"deg)";//将三个字符串连接起来,这是一个字符串
	}

//位置移动函数
function go(j){
	var to=parseInt(box.style.top.replace(/px/,""));
	var le=parseInt(box.style.left.replace(/px/,""));
	if((to<=32&&j==0)||(to>=302&&(j==2||j==-2))||(le<=32&&(j==3||j==-1))||(le>=302&&(j==1||j==-3))){
		alert("已经到边界了！");
		return false;
	}
	switch(j){
		case 0:
		box.style.top=(to-30)+"px";
		break;
		case 1:
		case -3:
		box.style.left=(le+30)+"px";
		break;
		case 2:
		case -2:
		box.style.top=(to+30)+"px";
		break;
		case 3:
		case -1:
		box.style.left=(le-30)+"px";
		break;
	}
}



}
window.onload=boxgo;