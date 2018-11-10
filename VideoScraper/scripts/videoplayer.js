//analizza la pagina e cerca di trovare il video per farlo partire
var play= async function play(url,page){

	let videoElem1= await page.$("div[class*='video']");
	
	let videoElem2= await page.$("div[class*='player']");
	
	let videoElem3= await page.$("img[class*='video']");
	
	let videoElem4= await page.$("img[class*='player']");
	
	let videoElem5= await page.$("figure[class*='video']");
	
	let videoElem6= await page.$("figure[class*='player']");
	
	if(videoElem1){
		videoElem1.click();
	}
	if(videoElem2){
		videoElem2.click();
	}
	if(videoElem3){
		videoElem3.click();
	}
	if(videoElem4){
		videoElem4.click();
	}
	if(videoElem5){
		videoElem5.click();
	}
	if(videoElem6){
		videoElem6.click();
	}
}

module.exports.play= play;

