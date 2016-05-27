//Additional Task functions
function RandomWord() {
        var requestStr = "http://randomword.setgetgo.com/get.php";

        $.ajax({
            type: "GET",
            url: requestStr,
            dataType: "jsonp",
            jsonpCallback: 'RandomWordComplete'
        });
    }

function RandomWordComplete(data) {
    var text = $("#editor").html();
    var i = 0;
    while(i<text.length){
    	var startIndex;
    	if(text.charAt(i)!=' '){
    		startIndex = i;
    		var length = 1;
    		i++;
    		while(i<text.length){
    			if(text.charAt(i)!=' '){
    				length++;
    			}else{
    				break;
    			}
    			i++;
    		}
    		var endIndex = i;
    		if(length == 4){
    			console.log(text.substring(startIndex,endIndex));
    			var rtext = text.substring(startIndex,endIndex);
    			console.log(rtext);
    			text.replace(rtext,data.Word);
    		}
    	}else{
    		i++;
    	}
    }
    console.log(text);
}