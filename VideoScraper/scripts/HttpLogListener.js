var outputGenerator=require("./outputGenerator.js");

var listen= async function listen(page){
	page.on('response', async (response)=> {
		var output={};
		const status = response.status()
		if ( status && !(status > 299 && status < 400) && !(status === 204) ){
			try{
				var responseText=await response.text();
					if (responseText && isVideoContent(responseText)){
						if(isJSON(responseText)){
							var json=await response.json();
							outputGenerator.getOutput(output,json);
							console.log(output);
						}else if(containsJSON(responseText)){
							var jsonArray=responseText.match(/\{.*(?:\{.*\}).*\}/g);
							for (let i = 0; i < jsonArray.length; i++) {
								var content=JSON.parse(jsonArray[i]);
								outputGenerator.getOutput(output,content);
								console.log(output);
							}
						}
					}
			}catch(err){
//				console.log("ERROR-############################");
//				console.log(err);
//				console.log("ERROR-############################");
			}
		}
	});
}

function isVideoContent(text){
	return (text.includes(".mp4") || text.includes(".m3u8") || text.includes(".webm") || text.includes(".ogg"));
}

function isJSON(text){
	return text.match(/(?:(?:^\{.*\}$))/);
}

function containsJSON(text){
	return text.match(/\{.*(?:\{.*\}).*\}/);
}


function isArray(o) {
	  return Object.prototype.toString.call(o) === '[object Array]';
}

module.exports.listen = listen;
