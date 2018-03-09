// 存在问题，移动过快会导致鼠标移到外面
window.onload=function() {
var button=document.getElementsByTagName('button')[0];
var win=document.querySelector('body>div');
var window2=document.getElementsByClassName('wind')[0];
var btn1=document.getElementById('yes');
var header=document.getElementsByClassName('header')[0];



(function(){
	window2.style.left="50%";
	window2.style.top="50%";
})();//自执行函数，设置初始位置

button.addEventListener('click', function(event) {
	win.classList.add("show");/*绑定click事件*/
});

win.addEventListener('click' ,function(event) {
	if(event.target===win&&open===0){//判断点击对象是不是背景层，判断open开关是否打开
	win.classList.remove('show');}});

btn1.addEventListener('click', function(event) {
	win.classList.remove('show');

	});

var a=0,b=0,c=0,d=0,on=0,open=0;

header.addEventListener('mousedown', function(event) {
	a=event.clientX;/*取得鼠标位置，存入变量*/
	 b=event.clientY;/*;取得鼠标位置，存入变量*/
	 c=window2.offsetLeft-a;/*Chrome浏览器在设置position:fixed时不能获取到参数*/
	 d=window2.offsetTop-b;/*相对于offsetParent的坐标偏移量*/
	 on=1;/*打开on开关*/
});	

window2.addEventListener('mousemove', function(event) {
	if(on===1){
	var AX=event.clientX;/*记录偏移后的坐标位置*/
	var AY=event.clientY;
		window2.style.left=c+AX+"px";/*计算偏移后的位置*/
		window2.style.top=d+AY+"px";
	}
});

window2.addEventListener('mousedown',function (event) {
	return open=1;//打开开关open，防止鼠标移动到外面，触发win上的click事件
});
win.addEventListener('mouseup',function (event) {
	return on=0;/*关闭on开关，不再触发header的mousemove事件，事件代理*/
});
}
window.addEventListener('beforeunload', function(event) {
     var message='你真的要离开吗？ ';
    event.returnValue=message;//设置event.returnValue，对于IE和Opera
    return message;//对于Chrome和Firefox
    }); 