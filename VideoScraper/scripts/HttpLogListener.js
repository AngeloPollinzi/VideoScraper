
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
							saveVideoInfo(output,json);
							console.log(output);
						}else if(containsJSON(responseText)){
							var jsonArray=responseText.match(/\{.*(?:\{.*\}).*\}/g);
							for (let i = 0; i < jsonArray.length; i++) {
								var content=JSON.parse(jsonArray[i]);
								saveVideoInfo(output,content);
								console.log(output);
							}
						}
					}
			}catch(err){}
		}
	});
}

function isVideoContent(text){
	return (text.includes(".mp4") || text.includes(".m3u8") || text.includes(".webm") || text.includes(".ogg"));
}

function isJSON(text){
	return text.match(/(?:(^\{.*\}$))/);
}

function containsJSON(text){
	return text.match(/\{.*(?:\{.*\}).*\}/);
}

function saveVideoInfo(output,obj){
	for(var key in obj){
		if(obj.hasOwnProperty(key) && typeof obj[key] == "object" && obj[key] !== null) 
			saveVideoInfo(output,obj[key]);
		else{
			if(obj.hasOwnProperty(key) && typeof obj[key] != "object" && obj[key]!== null) {
				if(key.match(/url|source|src|link/i) && obj[key].match(/.*\.mp4|\.m3u8|\.webm|\.ogg.*/)){
					output["url"]=obj[key];
				}else if(key === "name"){
					output["name"]=obj[key];
				}else if(key === "duration"){
					output["duration"]=obj[key];
				}else if(key.match(/width/i)){
					output["width"]=obj[key];
				}else if(key.match(/height/i)){
					output["height"]=obj[key];
				}else if(key.match(/type|mime/i) && obj[key].match(/(?:application\/|video\/)/)){
					output["mime"]=obj[key];
				}else if(key === "description"){
					output["description"]=obj[key];
				}
			}
		}
	}

}

module.exports.listen = listen;
