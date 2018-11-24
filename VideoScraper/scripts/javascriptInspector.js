var jsonHandler=require("./jsonHandler.js");

var extract= async function extract(page){
	const scripts=await page.$$('script');

	var output={};
	
	for (const script of scripts) {
	    var textContent = await page.evaluate(el => el.innerText, script);
	    try{
		    if(textContent && containsVideoURL(textContent)){
				var content=jsonHandler.extractJSON(textContent);
				console.log(content);
				jsonHandler.getOutput(output,content);
				return output;
		    }
	    }catch(err){
//	    	console.log("----------------Javascript Inspector ERROR-------------------------");
//	    	console.log(err);
	    }
	}
	return output;
}

function containsVideoURL(text){
	return text.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(?:mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/);
}

module.exports.extract = extract;