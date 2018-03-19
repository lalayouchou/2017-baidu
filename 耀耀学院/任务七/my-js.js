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

	var Table=function (data) {
		// 保存this值
		var _this=this;
		//保存存入数据
		this.data=data;

		// 默认配置参数,
		this.config={
			"name":null,
			"sort":"all",//默认升序和降序
			"isSort":"all"//默认所有列都执行升序和降序,当然不包括第一列
		};

	
		this.getConfig();//使用getConfig()方法，重置默认参数

		console.log(this.config);

		this.createTable();//使用createTable()方法，生成表格




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

		"createTable":function() {
			var config=this.config;
			var div=document.querySelectorAll('div.my-table-js');
			var table=document.createElement("table");

			for (var i = 0; i < config.name.length; i++) {
				var tr=document.createElement("tr");
				if(i===0){
					for (var j = 0; j < config.name[0].length; j++) {
						var th=document.createElement("th");
						th.innerHTML = config.name[0][j];
						tr.appendChild(th);
					}
				}
				if(i!==0){
					for (var k = 0; k < config.name[i].length; k++) {
						var td=document.createElement("td");
						td.innerHTML = config.name[i][k];
						tr.appendChild(td);
					}
				}
				table.appendChild(tr);
			}

			div[0].appendChild(table);

			console.log(div);

		}

	}


	window.Table=Table;
})();

