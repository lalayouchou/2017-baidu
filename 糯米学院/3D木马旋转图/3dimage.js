	(function() {
			var button=document.getElementsByTagName("input");
			var content=document.querySelector(".content");
			var btn=document.querySelector(".button");
			var previous =button[0],
			next=button[1],
			play=button[2],
			pause=button[3];

			//控制轮播的角度
			var index=0
			var on=true;
			// 轮播函数
			function F() {
				index-=40;
				content.style.transform="rotateY("+index+"deg)";
				setTimeout(F, 2500);
			}

			F();

			btn.addEventListener("click", function(e) {
				if (e.target===pause) {
					if(on=true){clearTimeout(setTimeout(F, 2500));
						on=false;
					}
				}
				if (e.target===play) {
					if(on=false){
						F();
						on=true;
					}
				}

			});

	})();