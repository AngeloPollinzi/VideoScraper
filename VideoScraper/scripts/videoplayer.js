//analizza la pagina e cerca di trovare il video per farlo partire
var play= async function play(url,page){

	let videoElem1= await page.$("div[class*='video']");
	
	let videoElem2= await page.$("div[class*='play']");
	
	if(videoElem1){
		await videoElem1.click();
	}else if(videoElem2){
		await videoElem2.click();
	}
}

module.exports.play= play;

