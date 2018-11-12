
var estract= async function estract(page){

	const scripts=await page.$$('script');
	
	for (const script of scripts) {
	    var textContent = await page.evaluate(el => el.innerText, script);
//	    console.log(textContent);
	    var results=textContent.match(/(http|https)\:\/\/.*\.mp4|\.m3u8|\.webm|\.ogg/g);
	    if(results)
	    	return results[0];
	}

}

module.exports.estract = estract;
