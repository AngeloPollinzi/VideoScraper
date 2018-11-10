
// Tenta di trovare l'url cercando nel tag <video>
var estract= async function estract(url,page){
	
	const video = await page.evaluate(() => {
		const videoElem=document.querySelector('video');
		if(videoElem)
			return videoElem.src ? videoElem.src: null;
		else return null;
	});
	
	if(video)
		return video;
}

module.exports.estract = estract;

 
