var videoplayer=require("./videoplayer.js");

var estract= async function estract(url,page){
	
	page.on('response', async response => {
		const status = response.status()
		if ( status && !(status > 299 && status < 400)&& !(status === 204)){
			var result;
			try{
				const headers=response.headers();
				var responseText=await response.text();
				if (headers['content-type'].includes("application/json") && videoContent(responseText)){
					var jsonResponse=await response.json();
					result=getVideoInfo(jsonResponse);
				}else if(!(headers['content-type'].includes("application/json")) && videoContent(responseText)){
					try{
						var jsonResponse=await response.json();
						result=getVideoInfo(jsonResponse);
					}catch(err){
					}
				}
			}catch(err){}
			
			if(result)
				console.log(result);
		}
	});
	
	await page.goto(url,{timeout: 0});
	await videoplayer.play(url,page);
}

module.exports.estract = estract;

function videoContent(text){
	
	if(text.includes(".mp4") || text.includes(".m3u8") || text.includes(".webm") || text.includes(".avi"))
		return true;
	
	return false;
	
}

function getVideoInfo(obj){
	
	for(var key in obj){
		if(obj.hasOwnProperty(key) && typeof obj[key] != "object" &&  obj[key] !== null &&
			key.match(/url|source|src|link/i)!==null && obj[key].match(/.*\.mp4|\.m3u8|\.webm|\.avi.*/)!==null ){
			return obj[key];
		}
		
		if(obj.hasOwnProperty(key) && typeof obj[key] == "object" && obj[key] !== null) 
			return getVideoInfo(obj[key]);
	}

}