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
		// 对于特殊数据的，先描述一下
		this.sty = {
			'C':['background-color','opacity'],
			/* transform系列 */
			'T':['rotateX','rotateY','translateX','translateY','scaleX','scaleY','skewX','skewY']
		}
		// 保存初始值，算法中需要
		this.start = null;
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
			easing:['Linear'],
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
		for(name of me.easing){
			if(name.toLowerCase()===key.toLowerCase()){
				if(/\-/.test(name)){
					initial.easing = name.split('-');
				}
			}
		}
		}


//如果第一个值不是对象，直接返回默认值，是对象设为initial.attr属性
		if(!args.length||typeof args[0] !== 'object'){
			return initial;
		}else{
			initial.attr = args[0];
			this.color(initial.attr);
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

	// 对颜色转换，转成rbga(),这里注意透明度opacity的叠加
	color(attr){
		let keys=Object.keys(attr);
		for(key of keys){
			//暂时只支持背景颜色，以后可以增加
			if(this.sty['C'].indexOf(key)===0){
				try {

					// 将输入的颜色转换为rgb或ragb字符串
					let div = createElement('div');
					div.style.backgroundColor = attr[key];
					document.body.appendChild(div);
					let color = window.getComputedStyle(div)[key] ;
					attr[key] = color;
					document.body.removeChild(div);
				} catch(e) {
					console.error('颜色输入格式有误');
				}
				//统一装换成rgba();
				if(/rgba/.test(attr[key])){
					continue;
				}else{
					attr[key]=attr[key].replace(/^rgb\((.+)\)/,'rgba($1,1)');
				}
			}
		}	
	}

	_easing(){
		let a = ['Linear'],
		b=['Quad','Cubic','Quart','Quint','Sine','Expo','Circ','Elastic','Back','Bounce'],
		c=['easeIn','easeOut','easeInout'];

		for (b_key of b) {
			for (c_key of c) {
				a.push(b_key+'-'+c_key);
			}
		}
		return a;
	}


}