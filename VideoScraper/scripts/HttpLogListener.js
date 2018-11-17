
var listen= async function listen(page){

	page.on('response', async (response)=> {
		const status = response.status()
		var output={};
		if ( status && !(status > 299 && status < 400)&& !(status === 204)){
			try{
//				const headers=response.headers();
				var responseText=await response.text();
				if (responseText && responseText.match(/^{.*\}$/) && isVideoContent(responseText)){
					var json=await response.json();
					saveVideoInfo(output,json);
				}
			}catch(err){}
			
		}
//		if(output)
//			return output;
	});
}

var stop= function stop(page){
	page.removeListener('response',()=> {
		console.log("Listener removed!!!");
	});
}

function isVideoContent(text){
	return (text.includes(".mp4") || text.includes(".m3u8") || text.includes(".webm") || text.includes(".ogg"));
	
}

function saveVideoInfo(output,obj){
	for(var key in obj){
		if(obj.hasOwnProperty(key) && typeof obj[key] != "object" &&  obj[key] !== null &&
			key.match(/url|source|src|link/i) && obj[key].match(/.*\.mp4|\.m3u8|\.webm|\.ogg.*/)){
			output["url"]=obj[key];
		}
		
		if(obj.hasOwnProperty(key) && typeof obj[key] == "object" && obj[key] !== null) 
			saveVideoInfo(output,obj[key]);
	}

}

module.exports.listen = listen;
module.exports.stop = stop;