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

	start(interval){
		if(this.start === START_START){
			return;
		}
		this.start = START_START;

		this.interval = interval || TASK_INTERVAL;

		_startTimeline(this,+new Date());

	}

	stop(){
		if(this.start !==START_START){
			return;
		}
		this.start = START_STOP;

		cancelAnimationFrame(this.timer);
		this.timer = null;

		if(this.timeline){
		this.dur = +new Date() - this.startTime;}
		
	}

	restart(){
		if(this.start != START_STOP){
			return;
		}

		this.start = START_START;

		_startTimeline(this,+new Date()-this.dur);
	}

	//
	/**
	 * 真正在时间线上执行的函数
	 * @param  {number} time 动画从开始到现在的持续时间
	 */
	do(time){

	}

	_startTimeline(timeline,startTime){

		timeline.startTime = startTime;

		lastTime = +new Date();

		timeline.timer = requestAnimationFrame(_nextTick);


		function _nextTick(){
			now = +new Date();
			if(now-lastTime>=timeline.interval){
				timeline.dur=now - timeline.startTime;
				timeline.do(timeline.dur);
				lastTime = now;
			}

		}

	}


}

module.exports = timeline;