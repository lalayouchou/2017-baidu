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
				preview.children().eq(num).remove();
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
					if(preview.children()[i]['id']===num.toString()){
						return;
					}
				}

				D(num);
			}
	}
	//动态修改内容函数
	function C(val,num,value){
		var val= value ? val.replace(value , '') : val;
		var fin='#'+num;
		preview.find(fin).text(val);
		}

	//预览区设置节点函数
	function D(num,name) {
		var html;
		var name=name ? name : 'p';
		if(preview.find(name+"[id='"+num+"']").length!==0){return;}
		if(preview.find('#'+num).length!==0){preview.find('#'+num).remove();}
		html=$('<'+ name+' id="'+num+'">'+'</' + name + '>');

		if(name==='p'){html.css('height','21px');}

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
			}]

		var arr=Object.getOwnPropertyNames(Reg[0]);

		for (var i = 0; i < arr.length; i++) {
				var name=arr[i];
				// 如果有匹配的，就执行节点创建函数，节点动态显示函数(去除匹配到的内容);
				if(Reg[0][name].test(val)){
					var value=Reg[0][name];
					D(num,name);
					C(val,num,value);
					return;
					// 不执行接下去的内容
				}
		}



		// 一般情况下，执行动态显示函数
		D(num);
		C(val,num);
	}



})(jQuery);