window.onload=function(){
var num=document.getElementById("num");
var submit=document.getElementById("submit");
var p=document.getElementById("pname");
var aaa=/[^\u4e00-\u9fa5A-Za-z0-9]/;
submit.onclick=function(){
	var value=num.value;
	var value2=value.replace(/[\u4e00-\u9fa5]/g,"ab");//将中文全部设置为两个字符
	if((aaa.test(value)===false)&&(/[A-Za-z0-9]{4,16}/.test(value2))){//4<=value2.length&&value2.length<=16不能直接连续比较
		addclass("green");
		ptext("yes");
		return false;
	}else if((value==="")||(value===null)){
		addclass("red");
		ptext("no1");
		return false;
	}else{
		addclass("red");
		ptext();
		return false;
	}
}
function addclass(color){
	num.className="";//class名字重置
	p.className="";
	num.className=color;
	p.className=color;
}
function ptext(one){//设置文字表述
	if(one==="yes"){
		p.innerText="名称格式正确";
	}else if(one==="no1"){
		p.innerText="姓名不能为空";
	}else{
		p.innerText="名称格式不正确" 
	}

}
}