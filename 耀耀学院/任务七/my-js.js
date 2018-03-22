/*window.onload=function() {
	var data={
		name:
		[
		["姓名","语文","英语","数学","总分"],
		["小明",80,90,70,240],
		["小明",90,60,90,240],
		["小明",60,100,90,230]
		],
		sort:"ODN",//按降序，按升序OUP,默认为all
		isSort:[2,3]//第二,三列进行排序
	};
	var table1= new Table(data);
}*/

(function() {

	var Table=function (node,data) {
		// 保存this值
		var _this=this;
		//保存存入数据
		this.data=data;
		//保存存入节点
		this.node=node;

		// 默认配置参数,
		this.config={
			"name":null,
			"sort":"all",//默认升序和降序
			"isSort":"all"//默认所有列都执行升序和降序,当然不包括第一列
		};

	
		this.getConfig();//使用getConfig()方法，重置默认参数

		this.createTable(this.node);//使用createTable()方法，生成表格,同时生成隐藏的按钮

		this.show(this.node);//使用show方法，根据排序方式的不同，设置不同的按钮

		this.table(this.node);//绑定点击事件,执行排序方法,重画表格

	}

	Table.prototype={

		"getConfig":function() {
			if(this.data){
				try{var data=JSON.parse(this.data);}//如果传入的不是josn对象，会抛出错误
				catch(error){
					var data=this.data;
				}
			}
			if(data.name instanceof Array&&data.name.every(function(x){return x instanceof Array})){
				this.config.name=data.name;
			}
			if(data.sort==="ODN"||data.sort==="OUP"){
				this.config.sort=data.sort;
			}
			if (data.isSort&&data.isSort.every(function(x){return typeof x==="number";})) {
				this.config.isSort=data.isSort;
			}
		},

		"createTable":function(node) {
			var config=this.config;
			var table=document.createElement("table");
			// 取数组中最长的，保证数据不对时数据的完整性
			var maxLength=Math.max.apply(Math,config.name.map(function(x){return x.length;}));//使用apply()方法，把this指向Math；

			for (let i = 0; i < config.name.length; i++) {
				let tr=document.createElement("tr");
				if(i===0){
					for (let j = 0; j < maxLength; j++) {
						let th=document.createElement("th");
						if(config.name[0][j]){
						th.innerHTML = config.name[0][j];
						}else{
						th.innerHTML =" ";}	
						tr.appendChild(th);
					}
				}
				if(i!==0){
					for (let k = 0; k < maxLength; k++) {
						let td=document.createElement("td");
						if(config.name[i][k]){
						td.innerHTML = config.name[i][k];
						}else{
						td.innerHTML =" ";}	
						tr.appendChild(td);
					}
				}
				table.appendChild(tr);
			}

			node.appendChild(table);


			//添加排序按钮
			//判断是数组还是默认all值
			if(config.isSort instanceof Array&&config.isSort.every(function(x){return (typeof x==="number"&&0<x<=config.name[0].length);})){
				try{for (var f = 0; f < config.isSort.length; f++) {
					let index=config.isSort[f];
					let th=node.getElementsByTagName('th');
					let iUp=document.createElement("i");
					iUp.classList.add("i-up")
					th[index].appendChild(iUp);
					let iDn=document.createElement("i");
					iDn.classList.add("i-dn")
					th[index].appendChild(iDn);
				}}catch(error){return alert('请检查输入的数据的isSort属性');}
			}else{
				for (var f = 1; f < config.name[0].length; f++) {
					let th=node.getElementsByTagName('th');
					let iUp=document.createElement("i");
					iUp.classList.add("i-up")
					th[f].appendChild(iUp);
					let iDn=document.createElement("i");
					iDn.classList.add("i-dn")
					th[f].appendChild(iDn);}
			}

		},

		"show":function(node){
			if (this.config.sort==="ODN") {
				let iDn=node.querySelectorAll('i.i-dn');
				for (var i = 0; i < iDn.length; i++) {
					iDn[i].classList.add('show');
					iDn[i].style.bottom="0";
				}
			}else if (this.config.sort==="OUP") {
				let iUp=node.querySelectorAll('i.i-up');
				for (var i = 0; i < iUp.length; i++) {
					iUp[i].classList.add('show');
					iUp[i].style.top="0";
				}
			}else{
				let i=node.getElementsByTagName('i');
				for (var j = 0; j < i.length; j++) {
					i[j].classList.add('show');
				}
			}
		},

		"tosort":function(index,target) {
			if(target.classList.contains('i-up')){
				this.config.name.sort(function(x,y){
					if(x[index]<y[index]){
						return -1;
					}else if(x[index]>y[index]){
						return 1;
					}else{
						return 0;
					}
				});
			}else{
				this.config.name.sort(function(x,y){
					if(x[index]<y[index]){
						return 1;
					}else if(x[index]>y[index]){
						return -1;
					}else{
						return 0;
					}
				});
			}

		},

		"table":function(node) {
			var _this=this;
			let th=node.getElementsByTagName('th');
			for (let j = 0; j < th.length; j++) {
				th[j].addEventListener('click', function(e) {
					var index=j;
					if(e.target.nodeName.toLowerCase()==="i"){
					_this.tosort(index,e.target);//将数据进行排序

					// 删除原表格，重画数据变化后的表格
					let table=this.parentNode.parentNode;
					table.parentNode.removeChild(table);


					_this.createTable(_this.node);

					_this.show(_this.node);

					_this.table(_this.node);//重画以后，就没有事件绑定了，所以要重新绑定；
				}
				});
			}
		}

	}

	Table.init=function(data) {
		var div=document.querySelectorAll('div.my-table-js');

		if (div.length<data.length) {return alert('div数量不足');}

		else{
			for (var i = 0; i < data.length; i++) {
				new Table(div[i],data[i]);
			}
		}


	}

	window.Table=Table;
})();

