
// Tenta di trovare l'url cercando nel tag <video>
var estract= async function estract(url,page,selector,attribute){

	const video = await page.evaluate((selector,attribute) => {
		const videoElem=document.querySelector(selector);
		
		if(videoElem){
			if(attribute === 'src')
				return videoElem.src ? videoElem.src: null;
			else if(attribute === 'data'){
				return videoElem.data ? videoElem.data: null;
			}
		}
		else return null;

	},selector,attribute);
	
	return video;

}

module.exports.estract = estract;

 
