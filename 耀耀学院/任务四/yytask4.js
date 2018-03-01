window.onload=function(){
function $(value){
		if(!document.getElementById){
			return false;
		}
		return document.getElementById(value);
	}
var box=$("box");
var button=$("button");
var text=$("text");
var arr=["GO","TUN LEF","TUN RIG","TUN BAC"];//命令数组
var i=0;//
var j=0;//控制方向，0为上，1为右，顺时针，和旋转角度对应


(function(){	
	box.style.top="152px";
	box.style.left= "152px";})();//自执行函数



button.addEventListener("click",but);//为按钮添加监听事件
// 事件函数：
function but(){
	var value=text.value;
	if(arr.indexOf(value)===-1){
		alert("输入错误");
	}if(value==="GO"){
		go(j);
	}
	else{
		num(value);
		cla(i);
	}
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
		if(i===0){i++;}
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