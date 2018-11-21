//funzione ricorsiva che va a visitare la struttura di obj(JSON) per eventualmente salvare le informazioni utili nel campo output
var getOutput=function saveVideoInfo(output,obj){
	console.log("outputGenerator");
	for(var key in obj){
		
		if(obj.hasOwnProperty(key) && typeof obj[key] == "object" && obj[key] !== null){
			saveVideoInfo(output,obj[key]);
		}else if(obj.hasOwnProperty(key) && typeof obj[key] != "object" && obj[key] !== null){
			if(typeof obj[key] == "string" && obj[key].match(/(https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*)/)){
				output["url"]= obj[key].match(/(https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*)/);
			}else if(key === "datePublished" || key === "uploadDate" || key.match(/uploaddate|datepublished|date/i)){
				output["uploadDate"]=obj[key];
			}else if(key.match(/name|title/i)){
				output["name"]=obj[key];
			}else if(key === "duration"){
				output["duration"]=obj[key];
			}else if(key.match(/width/i) && isValid(obj[key])){
				output["width"]=obj[key];
			}else if(key.match(/height/i) && isValid(obj[key])){
				output["height"]=obj[key];
			}else if(key.match(/mime|type/i) && typeof obj[key] == "string" && (obj[key].startsWith("application/") || obj[key].startsWith("video/"))){
				output["mime"]=obj[key];
			}else if(key === "description"){
				output["description"]=obj[key];
			}
		}
		
	}

}

function isValid(value){
	if(typeof value == "int")
		return value >= 320 && value <= 1920;
	
	if(typeof value == "string"){
		var num = parseInt(value );
		return num >= 320 && num <= 1920;
	}
}

module.exports.getOutput = getOutput;
