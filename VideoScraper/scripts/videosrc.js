
// Tenta di trovare l'url cercando nel tag <video>
var estract= async function estract(url,page){
		await page.goto(url,{waitUntil:'networkidle0',timeout: 0});
		const video = await page.evaluate(() => {
			const videoElem=document.querySelector('video');
			if(videoElem!==null){
				videoElem.click();
			}
			if(videoElem)
				return videoElem.src ? videoElem.src: null;
			else return null;
		});
		if(video!==null){
			console.log(video);
			return video;
		}else{
			let videoElem1= await page.$("[class*='video']");
			let videoElem2= await page.$("[class*='play']");
			if(videoElem1){
				videoElem1.click();
			}else if(videoElem2){
				videoElem2.click();
			}
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

 
