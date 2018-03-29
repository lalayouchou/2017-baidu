function menu(){
	// 获得元素节点
var box=document.getElementsByTagName('div')[0];
var ul=document.getElementsByTagName('ul')[0];
// 保证兼容性：
var all={
	getEvent:function(evevt){
	return 	event? event : window.event;
	},
	getTarget:function(event){
		return event.target? event.target : event.srcElement
	},
	preventDefault: function (event) {
		if(event.preventDefault){
			event.preventDefault();
		}else{
			event.returnValue=flase;
		}
	}
}

var divX=box.offsetLeft;/*获得相对于offsetParent的偏移量*/
var divY=box.offsetTop;

box.addEventListener('click', function(e) {
	var tar=all.getTarget(event);
	if(tar===box)
	{ul.className="hide";}/*添加事件处理程序，在黄色区域点击，重写class，隐藏自定义菜单*/
});

box.addEventListener('contextmenu', function(e) {
	var ev=all.getEvent(event);
	ul.className="show";
	all.preventDefault(ev);/*阻止默认事件发生*/

	var thisx=ev.clientX,thisy=ev.clientY;/*获得鼠标位置*/
	if(thisy-divY>500-207){
		ul.style.top=(thisy-divY-207)+"px";//计算自定义菜单位置，注意top，left是相对于box来说的
		/*也可以尝试一下offsetX,和offsetY*/
	}else{
		ul.style.top=thisy-divY+"px";
	}

	if(thisx-divX>1200-152){
		ul.style.left=(thisx-divX-152)+"px";
	}else{
		ul.style.left=thisx-divX+"px";
	}

});




}
window.onload=menu;