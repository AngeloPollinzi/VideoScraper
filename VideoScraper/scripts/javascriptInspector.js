var outputGenerator=require("./outputGenerator.js");

var estract= async function estract(page){
	console.log("javascript");
	const scripts=await page.$$('script');

	var output={};
	
	for (const script of scripts) {
	    var textContent = await page.evaluate(el => el.innerText, script);
	    try{
		    if(containsVideoJson(textContent)){
				var content=extractJSON(textContent);
				outputGenerator.getOutput(output,content);
				return output;
		    }
	    }catch(err){
	    	console.log("----------------Javascript Inspector ERROR-------------------------");
	    	console.log(err);
	    }
	}
	return output;
}

function containsVideoJson(content){
	var result=content.match(/{.*{.*}}/) != null && content.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/) != null;
	return result; 
}

module.exports.estract = estract;


function extractJSON(str) {
    var firstOpen, firstClose, candidate;
    firstOpen = str.indexOf('{', firstOpen + 1);
    do {
        firstClose = str.lastIndexOf('}');
        if(firstClose <= firstOpen) {
            return null;
        }
        do {
            candidate = str.substring(firstOpen, firstClose + 1);
            try {
                var res = JSON.parse(candidate);
                return [res, firstOpen, firstClose + 1];
            }
            catch(e) {
            }
            firstClose = str.substr(0, firstClose).lastIndexOf('}');
        } while(firstClose > firstOpen);
        firstOpen = str.indexOf('{', firstOpen + 1);
    } while(firstOpen != -1);
}
