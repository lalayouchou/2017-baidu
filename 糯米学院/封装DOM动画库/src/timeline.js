'use strict'

//默认动画持续时间
const TASK_DURATION = 1000;

//默认动画每一帧间隔
const TASK_INTERVAL = 1000/60;

//动画初始状态
const START_INITIAL = 0;
// 动画开始状态
const START_START = 1;
// 动画停止状态
const START_STOP = 2;

let requestAnimationFrame=(function(){
	return window.requestAnimationFrame||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame||
	window.oRequestAnimationFrame ||
	function (callback) {
		return window.setInterval(callback,interval||TASK_INTERVAL);
	}
}());


let cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame||
	window.webkitCancelAnimationFrame ||
	window.mozCancelAnimationFrame||
	window.oCancelAnimationFrame ||
	function (id) {
		return window.clearInterval(id);
	}
})();

class timeline{

	constructor(){
		this.start = START_INITIAL;

	}

	start(){

	}

	stop(){

	}

	restart(){

	}




}