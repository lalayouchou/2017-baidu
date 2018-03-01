
var songjie=function(){
	//设置变量
	var taxt=document.getElementById("taxt");
	var le=document.getElementById("le");
	var ri=document.getElementById("ri");
	var leGo=document.getElementById("le-go");
	var riGo=document.getElementById("ri-go");
	var taxtsearch=document.getElementById("taxtsearch");
	var search=document.getElementById("search");
	var neirong=document.getElementsByClassName("neirong")[0];
	var bijiao=/((\d)|([a-zA-Z])|([\u4e00-\u9fa5]))+/g ;//正则表达式，表示数字，英文字符，中文至少有一个，是全局搜索
	var qingkong=function(){
		taxt.value="";//初始化化文本框
	}
	le.onclick=function(){
		var taxtValue=taxt.value;
		var arr=taxtValue.match(bijiao);
		for(var i=arr.length-1;i>=0;i--){
			var li=document.createElement("li");
			li.innerHTML=arr[i];
			neirong.insertBefore(li,neirong.firstChild);
		}
		qingkong();
	}
	ri.onclick=function(){
		var taxtValue=taxt.value;
		var arr=taxtValue.match(bijiao);
		for(var i=0;i<arr.length;i++){
			var li=document.createElement("li");
			li.innerHTML=arr[i];
			neirong.appendChild(li);
		}
		qingkong();
	}
	leGo.onclick=function(){
		neirong.removeChild(neirong.firstChild);
	}
	riGo.onclick=function(){
		neirong.removeChild(neirong.lastChild);
	}
	search.onclick=function(){
		var taxtsearchValue=taxtsearch.value;
		var li=document.getElementsByTagName("li");
		var x=0;
		for(var j=0;j<li.length;j++){//循环遍历比对是否该节点的文本值和搜索关键词相等
			var litext=li[j].innerText;
			if(litext.indexOf(taxtsearchValue) === -1){//如果该循环未找到关键词，继续下一次循环
				continue;
			}else{
				li[j].className="green";//寻找到关键词，把该关键词的class变成"green";
				x++;
			}
		}
		taxtsearch.value="";
		if(x===0){
			alert("未找到该关键词！");
		}
	}

}
window.onload=songjie;