const puppeteer = require('puppeteer');
const url = 'http://www.ilgiornale.it/news/sport/leicester-video-choc-cos-precipita-lelicottero-1595341.html';

// Tenta di trovare l'url cercando nel tag <video>
var estract= function estract(){
	(async () => {
		const width = 1024;
		const height = 1600;
		
		const browser = await puppeteer.launch({
			'headless': false,
			'timeout': 0,
			'defaultViewport' : { 'width' : width, 'height' : height }
		});
		
		const page = await browser.newPage();
		await page.goto(url, { 'waitUntil' : 'networkidle0'} );
		
//		 Provo a cercare un tag video da cliccare per far partire la riproduzione
		const video = await page.evaluate(() => {
			const video=document.querySelector('video');
			if(video!==null){
				video.click();
			}
			else{
				const videoContainer=document.querySelector("div[class*='video']");
				videoContainer.click();
			}
			return video;
		});
		
//		Se il tag video non si trova nel documento html principale cerco nei frame figli
		if(video===null){
			await page.waitFor(6000);
			var pages=[];
			for (const frame of page.mainFrame().childFrames()){
				pages.push(await frame.content());
			}
			
			for (let i = 0; i < pages.length; i++) {
			    const newpage = pages[i];
			    await page.goto(`data:text/html,${newpage}`, { 'waitUntil': 'networkidle0' });
			    const videourl=await page.evaluate(() => {
					const node=document.querySelector('video');
					if(node!==null)
						return node.src ? node.src: null;
					else return null;
				});
			    if(videourl!==null){
			    	console.log(videourl);
			    	break;
			    }
			}
		}else{		//altrimenti posso prendere direttamente l'url
			const videourl=await page.evaluate(() => {
				const node=document.querySelector('video');
				return node.src ? node.src: null;
			});
			console.log(videourl);
		}
		
		await browser.close();
	})();
}

module.exports.estract = estract;


//		
// //inizio a cercare l'url del video mettendomi in ascolto delle request http
// await page.setRequestInterception(true);
// page.on('request', interceptedRequest => {
// if (interceptedRequest.url().endsWith('.mp4') ||
// interceptedRequest.url().endsWith('.mpg')){
// console.log(interceptedRequest.url());
// interceptedRequest.abort();
// }
// else{
// interceptedRequest.continue();
// }
// });
// }
