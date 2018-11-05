var youtubedl = require('youtube-dl');

var estract= async function estract(url,page){
	
	await page.goto(url,{waitUntil:'networkidle0',timeout: 0});

	//cerco il link alla pagina youtube 
	var youtubeLink = await page.evaluate(() => {
		const node=document.querySelector("link[href*='https://www.youtube.com/watch?v=']");
		if(node)
			return node.href ? node.href: null;
		else return null;
	});
	//se lo trovo nell'html root lo passo all'API
	if(youtubeLink===null){
		for (const frame of page.mainFrame().childFrames()){
			youtubeLink=await frame.evaluate(() => {
				const node=document.querySelector("link[href*='https://www.youtube.com/watch?v=']");
				if(node)
					return node.href ? node.href: null;
				else return null;
			});
			if(youtubeLink){
				break;
			}
		}
	}
	
	youtubedl.getInfo(youtubeLink, function(err, info) {
		if (err) throw err;
		console.log(info.url);
//		return info.title+" "+info.url+" "+info.duration+" "+info.upload_date+" "+info.resolution;
	});
}	
	
module.exports.estract = estract;

