//funzione ricorsiva che va a visitare la struttura di obj(JSON) per eventualmente salvare le informazioni utili nel campo output
var getOutput=function saveVideoInfo(output,obj){
	
	for(var key in obj){
		if(obj.hasOwnProperty(key) && typeof obj[key] == "object" && obj[key] !== null){
			saveVideoInfo(output,obj[key]);
		}
		else if(obj.hasOwnProperty(key) && typeof obj[key] != "object" && obj[key] !== null){
			if(key.match(/url|source|src|link/i) && obj[key].match(/.*\.mp4|\.m3u8|\.webm|\.ogg.*/)){
				output["url"]=obj[key];
			}else if(key === "datePublished" || key === "uploadDate" || key.match(/uploaddate|datepublished|date/i)){
				output["uploadDate"]=obj[key];
			}else if(key.match(/name|title/)){
				output["name"]=obj[key];
			}else if(key === "duration"){
				output["duration"]=obj[key];
			}else if(key.match(/width/i)){
				output["width"]=obj[key];
			}else if(key.match(/height/i)){
				output["height"]=obj[key];
			}else if(key.match(/mime|type/i) && typeof obj[key] == "string" && (obj[key].startsWith("application/") || obj[key].startsWith("video/"))){
				output["mime"]=obj[key];
			}else if(key === "description"){
				output["description"]=obj[key];
			}
		}
	}

}


module.exports.getOutput = getOutput;
