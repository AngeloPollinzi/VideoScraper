var videoplayer=require("./videoplayer.js");

// Tenta di trovare l'url cercando nel tag <video>
var estract= async function estract(url,page){
	
	await videoplayer.play(url,page);
	
	const video = await page.evaluate(() => {
		const videoElem=document.querySelector('video');
		if(videoElem)
			return videoElem.src ? videoElem.src: null;
		else return null;
	});
	if(video!==null){
		console.log(video);
		return video;
	}else{
		await page.waitFor(7000);
		for (const frame of page.mainFrame().childFrames()){
			const videourl=await frame.evaluate(() => {
				const node=document.querySelector('video');
				if(node)
					return node.src ? node.src: null;
				else return null;
			});
			if(videourl){
				console.log(videourl)
				return videourl;
			}
		}
	}
}

module.exports.estract = estract;

 
