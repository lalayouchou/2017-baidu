window.onload=function() {
var button=document.getElementsByTagName('button')[0];
var win=document.querySelector('body>div');
var window=document.getElementsByClassName('window')[0];
var btn1=document.getElementById('yes');

button.addEventListener('click', function(e) {
	win.classList.add("show");
});

win.addEventListener('click' ,function(e) {
	if(event.target===win){//判断点击对象是不是背景层
	win.classList.remove('show');}});

	btn1.addEventListener('click', function(e) {
	win.classList.remove('show');
	});
}