
window.onload=function(){
function $(value){
	return	document.getElementById(value);
}
var school=$("school");
var city=$("city");
var box=$("box");
var box3=$("box3");
var select=$("sch");
var sch1=$("sch1");
var sch2=$("sch2");
var sch3=$("sch3");

// 点击事件函数

school.onclick=function(){
 onclickFunction(box,box3);
}
city.onclick=function(){
	onclickFunction(box3,box);
}
select.onchange=function(){//select的事件不能用点击事件,要使用onchange事件
	start();//初始化
	var index=select.selectedIndex;//找到下拉列表代表的索引值，从0开始
	if(index===0){
		onclickFunction(sch1);
	}else if(index===1){
		onclickFunction(sch2);
	}else{
		onclickFunction(sch3);
	}
}
//通过改变类名改变显示效果
function onclickFunction(show){
for(var i=0;i<arguments.length;i++){
	if(arguments[i].className===false){
		arguments[i].setAttribute("class" , "");
	}
	arguments[i].className="hidden";}
	show.className="show";
}
// 初始化
function start(){
	sch1.className="hidden";
	sch2.className="hidden";
	sch3.className="hidden";
}

}