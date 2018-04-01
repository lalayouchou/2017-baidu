// 动态添加内容函数
function eidt(val,num,node) {
		// 这里一定要引入变量，不然获取不到
		var textarea=$('#eidt'),
			eidtNum=$('.eidt-num'),
			eidtText=$('.eidt-text'),
			preview=$('#preview');


		var Reg={
			'h1':/^#\s$/,
			'h2':/^#{2}\s$/,
			'h3':/^#{3}\s$/,
			'h4':/^#{4}\s$/,
			'h5':/^#{5}\s$/,
			'h6':/^#{6}\s$/,
		}

		var html;
		var oldLength=preview.children().length;
		// 如果节点不存在，就新建一个节点
		if(!oldLength||node.toLowerCase()==="enter"){
			html='<p id="'+num+'">'+'</p>'
			preview.append(html);
		}
		if(val){
			var fin='#'+num;
			preview.find(fin).text(val);
		}
	}

	// 判断并移动文本框函数
	function A(num,val) {
		var textarea=$('#eidt'),
			eidtNum=$('.eidt-num'),
			eidtText=$('.eidt-text'),
			preview=$('#preview');

		var html = '<div class="eidt-texts" data-num="' + num+ ' ">' + val+ '</div>'
			eidtText.append(html);

			textarea.val('');

		textarea.animate({
			top: "+=20px"},0);
		textarea.focus();

	}


