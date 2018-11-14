
var estract= async function estract(page){

	const scripts=await page.$$('script');
	
	for (const script of scripts) {
	    var textContent = await page.evaluate(el => el.innerText, script);
	    var results=textContent.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/g);
	    if(results)
	    	return results[0];
	}

}

module.exports.estract = estract;
