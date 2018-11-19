const { getInfo } = require('ytdl-getinfo')

var estract= async function estract(page){
	//cerco il link alla pagina youtube 
	var youtubeLink = await page.evaluate(() => {
		const node=document.querySelector("link[href*='https://www.youtube.com/watch?v=']");
		if(node)
			return node.href ? node.href: null;
		else return null;
	});

	if(youtubeLink){
		var output={}
		getInfo(youtubeLink).then(info => {
			output["title"]=info.items[0].title;
			output["duration"]=info.items[0].duration;
			output["upload_date"]=info.items[0].upload_date;
			output["resolution"]=info.items[0].resolution;
			output["url"]=info.items[0].url;
		});
		await page.waitFor(10000);
		return output;
	}
}	
	
module.exports.estract = estract;

