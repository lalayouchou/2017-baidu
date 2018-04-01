(function($) {
	// 获取需要修改的区域
	var textarea=$('#eidt'),
		eidtNum=$('.eidt-num'),
		eidtText=$('.eidt-text'),
		preview=$('#preview');

	var num=1;
	var on=true;
	
		// 打开文件，直接获取焦点
		textarea.focus();

		// 这里要进行优化，设置函数防抖，控制触发的频率
	textarea.on('keyup', function(event) {
		var val=textarea.val();
		eidt(val,num,event.key);
	});

	textarea.on('keydown',function(event){
		var val=textarea.val();
		if(event.key.toLowerCase()==="enter"){
			A(num,val);
			num++;
		}

	})



})(jQuery);