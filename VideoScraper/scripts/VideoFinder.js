const puppeteer = require('puppeteer');
const url = 'https://www.channel3000.com/news/wednesday-morning-sprint-70/808620380';
	
(async () => {
	 const width = 1024;
	 const height = 1600;

	const browser = await puppeteer.launch({
		'headless': false,
		'timeout': 0,
		'executablePath' : "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
		'defaultViewport' : { 'width' : width, 'height' : height }
			
	});
	
	const page = await browser.newPage();
	await page.goto(url, { 'waitUntil' : 'networkidle0'} );
	
	await page.evaluate(() => {
		let video=document.querySelector('video');
		if(video!==null){
			video.click();
		}
		else{
			let videoDiv=document.querySelector("div[class*='video']");
            videoDiv.click();
		}
	});
	await page.waitFor(6000);
	for (const frame of page.mainFrame().childFrames()){
	    if (await frame.title()==='Syndicaster'){
	    	let htmlContent=await frame.content();
	    	page.setContent(htmlContent);
	    	break;
	    }
	}
	await page.evaluate(() => {
		let elem=document.querySelector('video');
		console.log(elem!==null)
	});
	
	await browser.close();
})();



// else{
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
// }
