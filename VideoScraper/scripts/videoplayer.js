//analizza la pagina e cerca di trovare il video per farlo partire
var play= async function play(url,page){

	await page.goto(url,{waitUntil:'networkidle2',timeout: 0});
	
	const video = await page.evaluate(() => {
		const videoElem=document.querySelector('video');
		if(videoElem!==null){
			videoElem.click();
			return videoElem;
		}
		else return null;
	});

	if(video!==null){
		return video;
	}else{
		let videoElem1= await page.$("div[class*='video']");
		let videoElem2= await page.$("div[class*='play']");
		if(videoElem1){
			videoElem1.click();
		}else if(videoElem2){
			videoElem2.click();
		}
	}

}

module.exports.play= play;

