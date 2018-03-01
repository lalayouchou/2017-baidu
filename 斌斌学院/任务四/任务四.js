var text=document.getElementById("text");
var div=document.getElementsByTagName("div");
var span=document.createElement("span");
	span.innerText=text.value;
var left_go=function(){
	div.appendChild(span);
}