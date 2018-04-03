(function($) {
	// 获取需要修改的区域
	var textarea=$('#eidt'),
		eidtNum=$('.eidt-num'),
		eidtText=$('.eidt-text'),
		preview=$('#preview');

	var num=0;
	
		// 打开文件，直接获取焦点
	textarea.focus();


	textarea.on('keyup', function(event) {
		// 获取抬起按钮的文本值
		var val=textarea.val();

		eidt(val,num,event.key);

		fun(val,num);

		if(event.key.toLowerCase()==="backspace"){

			if(!val){
				// 如果该层文本域值为空，则把该层文本删除
				eidtText.children().eq(num).remove();
			}
		}
		if(event.key.toLowerCase()==="enter"){
				textarea.val("");//删除换行符
				eidtText.children().each(function(index, el) {
					var t=$(el).text().replace("\n","")
					$(el).text(t);
				});
		}


	});

// 这里要进行优化，设置函数防抖，控制触发的频率
	textarea.on('keydown',function(event){
		var val=textarea.val();

		// 判断函数
		fun(val,num);

		// var timer=function(){
		// 获取按下按钮的文本值
		if(event.key.toLowerCase()==="enter"){

		// 这里删除换行符不起作用，因为按下时还没有换行符，抬起来之前才加上换行符
			textarea.val("");
			eidt(val,num,event.key);
			A(num,val);
			// 前往下一层，num加1
			num++;
			}


		if(event.key.toLowerCase()==="backspace"){
			if(!val){
				// 如果该层文本域值为空，则把该层文本删除
				if(num>34){eidtNum.children().eq(num).remove();}
				eidtText.children().eq(num).remove();
				preview.find('#'+num).remove();


				// 回到上一层,num减一，最多只能回退到第一层
				if(num>0){
				num--;
				B();
				// 清除默认行为，这样子回到上一层就不会立刻把末尾的词给删除
				return false;}
			}
		}
		// };
	// 	if(setTimeout(timer,100)){
	// 		return;
	// 	}
	// 	setTimeout(timer,100);
	});



	// 判断并移动文本框函数，编辑区设置函数
	function A(num,val) {
		if(eidtText.find('[data-num="'+num+'"]')!==0){eidtText.find('[data-num="'+num+'"]').remove();}
			var html = '<div class="eidt-texts" data-num="' + num+ '">' + val+ '</div>'
				eidtText.append(html);

				textarea.val('');

			textarea.css('top',function(index,value){
				return value=parseInt(value)+20+'px';
			});

			if(num>=34){
				var nums='<div class="eidt-nums">'+(num+2)+'</div>'
				eidtNum.append(nums);
			}

			// 自动获取焦点
			textarea.focus();
	}

	//删除回退文本框函数
	function B(val) {
			textarea.css('top',function(index,value){
				return value=parseInt(value)-20+'px';
			});

			var text=eidtText.children().eq(num).text();
			textarea.val(text);
			textarea.focus();
	}
	// 由于keydown事件是可以连续触发的，而keyup是不连续的

	// 预览区域动态添加内容函数
	function eidt(val,num,node) {

			var oldLength=preview.children().length;
			// 如果节点不存在，就新建一个节点
			if(!oldLength){
			// D为新建节点函数
				D(num);
			}
			if(oldLength&&node.toLowerCase()==="enter"){

				// 如果这里已经设置了该id的节点，就直接返回，不要用each方法，each方法是不按顺序来的
				for (var i = 0; i < oldLength; i++) {
					if(preview.children()[i]['id']===num.toString()||preview.find("li[id='"+num+"']").length!==0){
						return;
					}
				}

				D(num);
			}
	}
	//动态修改内容函数
	function C(val,num,value,type,name){
		var val,fin;
		var type =type ? type : 0;
		if(type===0){
			val= value ? val.replace(value , '') : val;
		}

		if(type===1){
			val = val.replace(value,'<'+name+'>$1</'+name+'>');
		fin='#'+num;
		preview.find(fin).html(val);
		return;
		}

		if(type===2){
		if(name==='a'){
			 val = val.replace(value,'$1<a href= "$3">$2</a>');}
		else{
			val = val.replace(value,'<img src= "$2" title="$1">');
			}
		fin='#'+num;
		preview.find(fin).html(val);
		return;
		}

		if(type===3){
			val= value ? val.replace(value , '') : val;
		}
		fin='#'+num;
		preview.find(fin).text(val);
		}

	//预览区设置节点函数
	function D(num,name) {
		var html;
		var name=name ? name : 'p';

		if(name==='ul'||name==="ol"){
			if(preview.find("li[id='"+num+"']").length!==0){return;}
			if(preview.find('#'+num).length!==0){preview.find('#'+num).remove();}
			if(preview.find("li[id='"+(num-1)+"']").length===0||preview.find("li[id='"+(num-1)+"']").parent(name).length===0){
				html=$('<'+ name+'><li id="'+num+'"></li>'+'</' + name + '>');
				preview.append(html);
			}else{
				html=$('<li id="'+num+'"></li>');
				preview.find("li[id='"+(num-1)+"']").parent(name).append(html);
			}
			return;
		}

		if(preview.find(name+"[id='"+num+"']").length!==0){return;}
		if(preview.find('#'+num).length!==0){preview.find('#'+num).remove();}


		html=$('<'+ name+' id="'+num+'">'+'</' + name + '>');

		preview.append(html);
	}

	function fun(val,num) {
		var val=val ,num=num;
		// 匹配正则表达式
		// 这些需要独占一行
			var Reg=[{
				'h1':/^#\s/,
				'h2':/^#{2}\s/,
				'h3':/^#{3}\s/,
				'h4':/^#{4}\s/,
				'h5':/^#{5}\s/,
				'h6':/^#{6}\s/,
				'hr':/^---$/
			},
		// 这些不需要独占一行
			{
				'strong':/\*{2}(.+?)\*{2}/g,
				'del':/~~(.+?)~~/g,
				'i':/\*(.+?)\*/g,
				'ins':/\+{2}(.+?)\+{2}/g,
				'code':/\`(.+?)\`/g,
			},{
				'a':/([^!]|^)\[(.+)\]\((.+)\)/g,
				'img':/\!\[(.+)\]\((.+)\)/g
			},
				{
					'ul':/^\-\s/,
					'ol':/^\d\.\s/
				}
			]

		var arr=Object.getOwnPropertyNames(Reg[0]);

		for (var i = 0; i < arr.length; i++) {
				var name=arr[i];
				// 如果有匹配的，就执行节点创建函数，节点动态显示函数(去除匹配到的内容);
				if(Reg[0][name].test(val)){
					var value=Reg[0][name];
					D(num,name);//0表示独占一行元素
					C(val,num,value);
					return;
					// 不执行接下去的内容
				}
		}

		var arr2=Object.getOwnPropertyNames(Reg[1]);

		for (var i = 0; i < arr2.length; i++) {
			var name=arr2[i];
			if(Reg[1][name].test(val)){

				var value=Reg[1][name];

				// 这里不改变节点类型，只是在该节点下添加子节点，相当于改变内容了
				C(val,num,value,1,name);//1表示正则对象数组中检索值为1的值
				return ;
			}
		}

		var arr3=Object.getOwnPropertyNames(Reg[2]);

		for (var i = 0; i < arr3.length; i++) {
			var name=arr3[i];
			if(Reg[2][name].test(val)){

				var value=Reg[2][name];

				// 这里不改变节点类型，只是在该节点下添加子节点，相当于改变内容了
				C(val,num,value,2,name);
				return ;
			}
		}

		var arr4=Object.getOwnPropertyNames(Reg[3]);

		for (var i = 0; i < arr4.length; i++) {
			var name=arr4[i];
			if(Reg[3][name].test(val)){

				var value=Reg[3][name];

				D(num,name);
				C(val,num,value,3);
				return ;
			}
		}
		// 一般情况下，执行动态显示函数
		D(num);
		C(val,num);
	}
// 删除函数
	function E() {
		// 针对ul和ol
		var ul=preview.find('ul');
		var ol=preview.find('ol');
		for (var i = 0; i < ul.length; i++) {
			if($(ul[i]).children().length===0){
				$(ul[i]).remove();
			}
		}
		for (var j = 0; j < ol.length; j++) {
			if($(ol[j]).children().length===0){
				$(ol[j]).remove();
			}
		}
	}

/*4.2要解决的问题，在其他节点模式下，em等节点特殊显示
em节点可以使用，而不是显示的代码
*/
})(jQuery);