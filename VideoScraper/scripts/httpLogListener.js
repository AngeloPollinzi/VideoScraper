const jsonHandler=require("./jsonHandler.js");
const fs = require('fs');

var listen= async function listen(page,outputs){
	page.on('response', capture);
}

var stop = async function stop(page,outputs){
	page.removeListener('response', capture);
}

async function capture(response){
	var output={};
	const status = response.status()

	if ( status && !(status > 299 && status < 400) && !(status === 204) ){
		try{
			var responseText=await response.text();
				if (responseText && containsVideoURL(responseText)){
					var content=jsonHandler.extractJSON(responseText);
					jsonHandler.getOutput(output,content);
					var jsonToString=JSON.stringify(output);
					if(jsonToString && !jsonHandler.isEmpty(output)){
						fs.appendFile("../log/outputs",jsonToString+"\n", function(err) {
							if(err) {
								return console.log(err);
							}
						}); 
					}
				}
		}catch(err){
//			console.log("----------------HTTP-LOG-ERROR-------------------------");
//			console.log(err);
		}
	}
	
}

function containsVideoURL(text){
	return text.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(?:mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/);
}

module.exports.listen = listen;
module.exports.stop = stop;