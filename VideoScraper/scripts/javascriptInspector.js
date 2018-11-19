var outputGenerator=require("./outputGenerator.js");

var estract= async function estract(page){
	const scripts=await page.$$('script');
	var output={};
	
	for (const script of scripts) {
	    var textContent = await page.evaluate(el => el.innerText, script);
//	    var results=textContent.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/g);
	    if(textContent.match(/\{.*(?:\{.*\}).*\}/)){
			var jsonArray=textContent.match(/\{.*(?:\{.*\}).*\}/g);
			for (let i = 0; i < jsonArray.length; i++) {
				try{
					var content=JSON.parse(jsonArray[i]);
				}catch(err){}
				outputGenerator.getOutput(output,content);
				return output;
			}
	    }
	}

}

module.exports.estract = estract;
