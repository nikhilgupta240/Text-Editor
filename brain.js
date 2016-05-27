var linkColor = ["red","blue"];
var currentLinkColor;
var linkCount;
function init () {
	linkCount = 0;
	currentLinkColor = 0;
	var editor = document.getElementById("editor");
	startPara();
	closeTooltip();
	$("#editor").dblclick(function(){
		showToolTip();
	});
	$("#editor").click(function(){
		if(window.getSelection().toString().length < 1){
			closeTooltip();
		}
	});
}

// starts A new Paragraph every time on hitting enter
function startPara(){						
	document.execCommand('formatBlock',false,'p');
	$("#editor > p").attr("draggable","true");
}

function newPara(e){
	var code = (e.keyCode ? e.keyCode : e.which);
	if(code == 13){
		startPara();
	}
}

// ToolTip function on double click
function showToolTip(){
	createTooltip();
	if(window.getSelection().toString().length>0)
		$("#tool").show();
}

function createTooltip(){
	var selection = window.getSelection();
	var range = selection.getRangeAt(0);
	var rect = range.getBoundingClientRect();
	var tool = document.getElementById("tool");
	tool.style.marginLeft = rect.left + "px";
	var topMargin = 72 - parseInt(rect.top) - rect.height - 5;
	topMargin = Math.abs(topMargin);
	tool.style.marginTop = topMargin + "px";
}

function closeTooltip(){
	$("#tool").hide();
}

function bold(){
	document.execCommand("bold", false, null);
}

function underline(){
	document.execCommand("underline", false, null);
}

function changeColor(){
	var initialColor = document.queryCommandValue("foreColor");
	if(initialColor == 'rgb(255, 0, 0)'){
		document.execCommand("foreColor", false, "black");
	}else{
		document.execCommand("foreColor", false, "red");
	}
}

function deleteLinks(){
	for(var i = 0;i<linkCount;i++){
		var id = i+1;
		var linkId = "link" + id;
		var a = document.getElementById(linkId);
		if(a){
			document.body.removeChild(a);
		}
	}
}

function checkLink(){
	deleteLinks();
	linkCount = 0;
	var text = $("#editor").text().toString();
	var startPos = text.search("<a>");
	var linkId = "link";
	var i=1;
	while(startPos>=0 && startPos<text.length){
		var endPos = text.substring(startPos).search("</a>");
		endPos += text.substring(0,startPos).length;
		if(endPos >=startPos){
			var linkText = text.substring(startPos+3,endPos);
			var a = document.createElement("a");
			a.href = "#";
			a.id = linkId + i;
			linkCount++;
			i++;
			if(currentLinkColor == 0){
				a.style.color = linkColor[currentLinkColor];
				currentLinkColor = 1;
			}else{
				a.style.color = linkColor[currentLinkColor];
				currentLinkColor = 0;
			}

			a.innerHTML = linkText;
			document.body.appendChild(a);
		}
		startPos = text.substring(endPos).search("<a>");
		if(startPos >=0)
			startPos+= text.substring(0,endPos).length;
	}
}