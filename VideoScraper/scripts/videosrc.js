const puppeteer = require('puppeteer');
const urls = [
	'http://video.denverpost.com/',
	'https://www.channel3000.com/news/wednesday-morning-sprint-70/808620380',
	'https://www.quotidiano.net/politica/video/di-maio-giorni-difficili-dobbiamo-essere-compatti-1.4266930',
	'https://www.news8000.com/news/new-horizons-advocates-explain-importance-of-domestic-violence-awareness-month/808364336',
	'http://www.ilgiornale.it/news/sport/leicester-video-choc-cos-precipita-lelicottero-1595341.html',
	'https://www.wsls.com/news/national/mexico-beach-residents-begin-returning-after-michael',
	'https://www.georgianewsday.com/video/460067-busted-package-thief-caught-after-her-getaway-driver-flees.html',
	'http://www.tuttosport.com/video/calcio/2018/10/31-49408121/copa_libertadores_gremio-river_plate_1-2/',
	'http://video.startribune.com/',
	'http://video.italiaoggi.it/classcnbc/tg-flash/Indici-positivi-in-avvio-di-seduta-a-Wall-Street-81542/',
	'https://tv.liberoquotidiano.it/video/politica/13313985/anni-dopo-la-bomba-di-eleonora-giorgi-cosa-mi-chiese-giulio-andreotti.html',
	'http://www.thevalleydispatch.com/',
	'https://www.ft.com/video/818d6b08-093f-4a0a-bd10-17a4089cafed?playlist-name=editors-picks&playlist-offset=0',
	'https://www.ktvz.com/news/national-world/bernie-sanders-stumps-for-democrat-in-san-diego/828128075',
	'http://www.channel4000.com/videos',
	'https://www.quotidiano.net/cronaca/video/maltempo-a-venezia-transformer-su-una-vasca-da-bagno-naviga-in-citt%C3%A0-1.4268442',
	
];

// Tenta di trovare l'url cercando nel tag <video>
var estract= function estract(){
	(async () => {
	    const datadir = 'C:/Users/Angelo/AppData/Local/Google/Chrome/User Data/Default';
		const width = 1024;
		const height = 1600;
		const browser = await puppeteer.launch({
//			headless: false,
			defaultViewport : { 'width' : width, 'height' : height },
		});
		const page = await browser.newPage();

		for (let i = 0; i < urls.length; i++) {
			const url = urls[i];
			await page.goto(`${url}`,{waitUntil:'networkidle0',timeout: 0});
			
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
			}else{
				let videodiv = await page.$("div[class*='video'], div[class*='player']");
				let videofigure = await page.$("figure[class*='video'], figure[class*='player']");
				if(videodiv){
					videodiv.click();
				}else if(videofigure){
					videofigure.click();
				}
				await page.waitFor(6500);
				for (const frame of page.mainFrame().childFrames()){
					const videourl=await frame.evaluate(() => {
						const node=document.querySelector('video');
						if(node)
							return node.src ? node.src: null;
						else return null;
					});
					if(videourl){
						console.log(videourl);
						break;
					}
				}
			}
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
