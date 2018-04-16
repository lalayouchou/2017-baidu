'use strict'
//动画中心思想：在指定的时间内，从一个状态，变化为另一个状态

let tween = require('./Tween.js');

//任务初始状态
const START_INITIAL = 0;
// 任务开始状态
const START_START = 1;
// 任务停止状态
const START_STOP = 2;
//任务类型，同步任务
const TASK_SNYC = 0;
//任务类型，异步任务
const TASK_ASNYC = 1;

//创建动画库类
class aSong{
/**
 * 构造函数
 * @param  ele DOM对象
 */
	constructor(ele){
		// 保存节点
		this.ele=ele;
		// 任务队列
		this.taskQuere=[];
		// 任务执行索引
		this.index = 0;
		// 任务执行状态
		this.start = START_INITIAL;
		//默认赛贝尔曲线
		this.easing = tween.Linear;
	}

/**
 * 	增加动画任务，add animation
 * @param  {object} attr  变化的css属性
 * @param 	duration      动画持续时间
 * @param 	easing        赛贝尔曲线
 * @param 	delay         延迟时间
 */
	add(attr,duration,easing,delay){


	}

	// 需要执行的函数
	fn(callback){
		let taskFn= (next) => {
			callback();
			next();
		};

		let type = TASK_SNYC;

		this._add(taskFn,type);

		return this;
	}

	/**
	 * 重复次数，没有参数表示无限重复
	 * @param  	 num 重复次数
	 */
	repeat(num){
		if (!this.taskQuere.length||this.start !== this.START_START) {
			return;
		}

		if(typeof num ==='undefined'){
			this.index--;
			this._runtask();
		}else if (typeof num ==='number'&&num !==0) {
			num--;
			this.index--;
			this._runtask();	
		}else{
			this._next();
		}
	}

	//开始动画,这里的动画间隔是指动画每帧间隔，暂时没有实现
	start(interval){
		if(this.start===START_START){
			return;
		}
		if (!this.taskQuere.length) {
			return;
		}

		this.start = START_START;

		this._runtask();
		return this;
	}

	// 暂停动画
	pause(){

	}

	// 重新开始动画
	restart(){

	}

	// 直接结束动画
	finish(){

	}

	//反向运动动画
	reverse(){

	}

	//后续增加内容

	// 增加任务链	
	_add(taskFn,type){
		this.taskQuere.push({
			taskFn:taskFn,
			type :type
		});
	}

	// 真正执行任务链任务函数
	_runtask(){

		if(!this.taskQuere || this.start !== START_START){
			return;
		}

		if(index ===taskQuere.length){
			this.dispose();
		}

		let task = this.taskQuere[this.index];

		if(task.type === TASK_SNYC){
			this._tasksnyc(task.taskFn);
		}else {
			this._taskasnyc();
		}

	}

	//执行同步任务
	_tasksnyc(taskFn){
		let me = this;

		let next =me._next;
		
		//使用回调函数
		taskFn(next);

	}
	// 切换任务链任务
	_next(){

		this.index++;
		this._runtask();

	}
	//执行异步任务
	_taskasnyc(){

	}

}

module.exports = aSong;
