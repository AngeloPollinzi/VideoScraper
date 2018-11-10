var youtubedl = require('youtube-dl');

var estract= async function estract(url,page){
	
	//cerco il link alla pagina youtube 
	var youtubeLink = await page.evaluate(() => {
		const node=document.querySelector("link[href*='https://www.youtube.com/watch?v=']");
		if(node)
			return node.href ? node.href: null;
		else return null;
	});

	if(youtubeLink){
		//se lo trovo lo passo all'API
		youtubedl.getInfo(youtubeLink, function(err, info) {
			if (err) throw err;
			return info.url;
//		return info.title+" "+info.url+" "+info.duration+" "+info.upload_date+" "+info.resolution;
		});
	}
}	
	
module.exports.estract = estract;

