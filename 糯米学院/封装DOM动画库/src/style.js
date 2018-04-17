'use strict'

class style{
/**
 * 传入节点
 * @param   ele DOM对象
 */
	constructor(ele){
		this.ele = ele;
		this.css = window.getComputedStyle(this.ele);
		this.easing = _easing();
	}

// 对颜色转换，转成rbga(),这里注意透明度opacity的叠加
	color(attr){
		
	}

	initial(args){
		//取得数字的值，这里可以传入多个数字
		let index =0,
		me = this,
		args = [...args].slice(0, 4);

		//默认值
		let initial = {
			attr:null,
			duration:1000,
			easing:'linear',
			delay :0
		};

		function num(key) {
			if(index = 0){
				initial.duration=key;
				index++;
			}else if (index=1) {
				initial.delay = key;
				index++;
			}
		}


		function str(key) {
			// 将使用字符串类型的时间转换，如5s,5000ms;
			if(/^\d+\.?\d*m?s$/.test(key)){
				if(/ms/.test(key)){
					key= parseInt(key);
					return num(key);
				}
				key = (1000*parseFloat(key) | 0);
				return num(key);
			}
		if(me.easing.indexOf(key.toLowerCase()) !== -1)
			initial.easing = key;
		}


//如果第一个值不是对象，直接返回默认值，是对象设为initial.attr属性
		if(!args.length||typeof args[0] !== 'object'){
			return initial;
		}else{
			initial.attr = args[0];
		}

		// 去除数组第一个值
		args.shift();

		for(keys of args){
			if(typeof keys === 'number'){
				num(keys);
			}else if(typeof keys === 'string'){
				str(keys);
			}
		}

		return initial;
	}

		_easing(){
			let a = ['linear'],
			b=['quad','cubic','quart','quint','sine','expo','circ','elastic','back','bounce'],
			c=['easein','easeout','easeinout'];

			for (b_key of b) {
				for (c_key of c) {
					a.push(b_key+'.'+c_key);
				}
			}
			return a;
		}
}