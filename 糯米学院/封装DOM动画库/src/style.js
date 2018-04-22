'use strict'

class style{
/**
 * ����ڵ�
 * @param   ele DOM����
 */
	constructor(ele){
		this.ele = ele;
		this.css = window.getComputedStyle(this.ele);
		this.easing = this._easing();
		// �����������ݵģ�������һ��
		this.sty = {
			'_color':['background-color','color'],
			/* transformϵ�� */
			'_transform':['rotateX','rotateY','rotateZ','translateX','translateY','translateZ','scaleX','scaleY','scaleZ','skewX','skewY','skewZ']
		}
	}

/**
 * ��ʼ�������������
 * @param  {[type]} args ����Ĳ���ֵ
 */
	initial(args){
		//ȡ�����ֵ�ֵ��������Դ���������
		let index =0,
		me = this,
		args = [...args].slice(0, 4);

		//Ĭ��ֵ
		let initial = {
			attr:null,
			duration:1000,
			easing:['Linear'],
			delay :0,
			frist:true
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
			// ��ʹ���ַ������͵�ʱ��ת������5s,5000ms;
			if(/^\d+\.?\d*m?s$/.test(key)){
				if(/ms/.test(key)){
					key= parseInt(key);
					return num(key);
				}
				key = (1000*parseFloat(key) | 0);
				return num(key);
			}
		for(let name of me.easing){
			if(name.toLowerCase()===key.toLowerCase()){
				if(/\-/.test(name)){
					initial.easing = name.split('-');
				}
			}
		}
		}


//�����һ��ֵ���Ƕ���ֱ�ӷ���Ĭ��ֵ���Ƕ�����Ϊinitial.attr����
		if(!args.length||typeof args[0] !== 'object'){
			return initial;
		}else{
			initial.attr = args[0];
		}

		// ȥ�������һ��ֵ
		args.shift();

		for(let keys of args){
			if(typeof keys === 'number'){
				num(keys);
			}else if(typeof keys === 'string'){
				str(keys);
			}
		}

		return initial;
	}

	_easing(){
		let a = ['Linear'],
		b=['Quad','Cubic','Quart','Quint','Sine','Expo','Circ','Elastic','Back','Bounce'],
		c=['easeIn','easeOut','easeInout'];

		for (let b_key of b) {
			for (let c_key of c) {
				a.push(b_key+'-'+c_key);
			}
		}
		return a;
	}
/**
 * ʹ�ò���ģʽ��
 * @param  attrs [�û���������Զ���]
 */
	attributes = function(){
			let me = this;
			const  sty = me.sty;

			let styleFn = {};
//������
			styleFn['defalut'] = function(attr,value){
			return 	me._defalut(attr,value);
			}

			for(let color of sty['_color']) {
				styleFn[color] = function(color,value){
				return 	me._color(color,value);
				}
			}

			for(let transform of sty['_transform']) {
				styleFn[transform] = function(transform,value){
				return 	me._transform(transform,value);
				}
			
// �û�ִ�к���
			return function(attr,value){
				if(styleFn[attr]){
				return 	styleFn[attr](attr,value);
				}else{
				return 	styleFn['defalut'](attr,value);
				}
			}

	}();


	// ����ɫת����ת��rbga()
	_color(attr,value){
		let config = {},
		me = this;
		config.JsName = _JsName(attr);
		config.unit = '';

		config.begin = toRgba(me.css[config.JsName]);

		try {
			let JsName = config.JsName;
			// ���������ɫת��Ϊrgb��ragb�ַ���
			let div = createElement('div');
			div.style.[JsName] = value;
			document.body.appendChild(div);
			let color = window.getComputedStyle(div)[JsName] ;
			config.end = toRgba(color);
			document.body.removeChild(div);
		} catch(e) {
			console.error('��ɫ�����ʽ����');
		}



		//ͳһװ����rgba();
		function toRgba(value){
			if(!/rgba/.test(value)){
				return value.replace(/^rgb\((.+)\)/,'rgba($1,1)')
			}
		}

		return config;

	}

	_transform(){

	}

	_defalut(attr,value){
		let config = {};
		config.JsName = _JsName.call(this,attr);
		config.end = parseFloat(value);
		config.begin = this.css[config.JsName];
		config.unit = this._unit(value,config.end);

		return config;

	}
//��õ�λ
	_unit(value,Float){
		let unit = value.replace(Float, "");
		return unit;
	}

//ת���շ�ʽд��
	_JsName(attr){
		if(/\-/.test(attr)){
			attr = attr.replace(/\-[a-zA-Z]{1}/g,(match)=>{
				return match.replace(/\-/,'').toUpperCase();
			});
		}
		return attr;
	}



/**
 * ȷ��css���Ե�ֵ
 * @param  timeFn  �㷨����
 * @param  time    ��������ʱ��
 * @param  key     �ı�����ֵ������ֵ
 * @param  obj     �����Ե����ݶ���
 * 
 */
	getChangeStyle = function(){
			let me = this;
			const  sty = me.sty;

			let changeStyleFn = {};
//������
			changeStyleFn['defalut'] = function(timeFn,thim,obj){
				me._changeDefalut(timeFn,thim,obj);
			}

			for(let color of sty['_color']) {
				changeStyleFn[color] = function(timeFn,thim,obj){
					me._changeColor(timeFn,thim,obj);
				}
			}

			for(let transform of sty['_transform']) {
				changeStyleFn[transform] = function(timeFn,thim,obj){
					me._changeTransform(timeFn,thim,obj);
				}
			
// �û�ִ�к���
			return function(timeFn,time,key,obj){
				if(changeStyleFn[key]){
				return 	changeStyleFn[key](timeFn,thim,obj);
				}else{
				return 	changeStyleFn['defalut'](timeFn,thim,obj);
				}
			}

	}();

	_changeDefalut(timeFn,time,obj){
		let b,c;
		b= obj.begin;
		c = obj.end - b;
		return timeFn(time,b,c) + obj['unit'];
	}

	_changeColor(timeFn,thim,obj){
		let change  = [],//��Ϊ��ɫ���ĸ����֣�����Ҫ��һ����������һ��
		let begin = obj.begin.match(/\d+\.?\d{0,2}/g);
		let end = obj.end.match(/\d+\.?\d{0,2}/g);
		for(let i =0,b,c ; i<4;i++){
			b = begin[i];
			c = end[i] - b;
			change[i] = timeFn(time,b,c);
		}
		return 'rgba('+ change.join(',') +')';
	}

}