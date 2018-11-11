const puppeteer = require('puppeteer');
// task manager crea tutti i tipi di estrattori.
var estractor1=require("./find_url_by_selector.js");
var estractor2=require("./youtube.js");
var estractor3=require("./httpsniffer.js");
var videoplayer=require("./videoplayer.js");

const estractors=[];
estractors.push(estractor1);
estractors.push(estractor2);
estractors.push(estractor3);

const urls = [
// 'https://www.wsj.com/video/what-the-election-of-jair-bolsonaro-means-for-brazil/4F79BD86-F2D4-4DB6-A105-10AE9255C5F3.html',
// 'https://www.ilmessaggero.it/politica/m5s_decreto_sicurezza_nugnes_m5s_di_maio-4074284.html',
// 'https://www.myrtlebeachonline.com/news/local/article217455180.html#storylink=mainstage',
// 'http://www.journalgazette.net/sports/colleges/purdue/20181017/boilers-think-big-against-buckeyes',
// 'https://triblive.com/home/video/'
	'https://www.channel3000.com/news/wednesday-morning-sprint-70/808620380',
	'http://www.channel4000.com/videos',
	'http://video.denverpost.com/',
	'https://www.aspendailynews.com/multimedia/video-th-annual-aspen-ski-swap/video_6db4e22e-d0d0-11e8-9e76-3fc73a380369.html',
	'http://www.vindy.com/videos/2018/oct/12/4827/',
	'http://video.startribune.com/',
	'https://www.ft.com/video/818d6b08-093f-4a0a-bd10-17a4089cafed?playlist-name=editors-picks&playlist-offset=0',
	'http://video.italiaoggi.it/classcnbc/tg-flash/Indici-positivi-in-avvio-di-seduta-a-Wall-Street-81542/',
	'https://www.quotidiano.net/cronaca/video/maltempo-a-venezia-transformer-su-una-vasca-da-bagno-naviga-in-citt%C3%A0-1.4268442',
	'https://www.wsls.com/news/national/mexico-beach-residents-begin-returning-after-michael',
	'https://www.quotidiano.net/politica/video/di-maio-giorni-difficili-dobbiamo-essere-compatti-1.4266930',
	'https://www.news8000.com/news/new-horizons-advocates-explain-importance-of-domestic-violence-awareness-month/808364336',
	'http://www.ilgiornale.it/news/sport/leicester-video-choc-cos-precipita-lelicottero-1595341.html',
	'https://www.georgianewsday.com/video/460067-busted-package-thief-caught-after-her-getaway-driver-flees.html',
	'http://www.tuttosport.com/video/calcio/2018/10/31-49408121/copa_libertadores_gremio-river_plate_1-2/',
	'https://tv.liberoquotidiano.it/video/politica/13313985/anni-dopo-la-bomba-di-eleonora-giorgi-cosa-mi-chiese-giulio-andreotti.html',
	'https://www.ktvz.com/news/national-world/bernie-sanders-stumps-for-democrat-in-san-diego/828128075',
	'http://blog.masslive.com/patriots/2018/10/josh_gordon_rewards_new_englan.html'
];

const selectAttr={
		"video":"src",
		"video>source":"src",
		"object[data*='.swf'],object[data*='.mp4'],object[data*='.ogg'],object[data*='.webm']":"data",
		"iframe[src*='.mp4'],iframe[src*='.webm'],iframe[src*='.swf'],iframe[src*='.ogg']":"src",
		"embed[src*='.mp4'],embed[src*='.webm'],embed[src*='.swf'],embed[src*='.ogg']":"src"
};

// mi metto in ascolto
(async () => {
	const width = 1024;
	const height = 1600;
	
	// creo un'istanza di un browser chrome
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport : { 'width' : width, 'height' : height },
	});
	
	// creo una nuova pagina nel browser
	const page = await browser.newPage();
	
	// man mano passo i miei url agli estrattori che mi restituiranno il
	// risultato
	for (let i = 0; i < urls.length; i++) {
		var result;
		const url = urls[i];
		
		await page.goto(url,{waitUntil:'domcontentloaded',timeout: 0});
		
		// analisi statica sul dom e i child frames
		result = await analysis(url,page,true);
		
		// se il controllo statico fallisce provo ad avviare il video e a ripetere l'operazione
		if(result == null){
			await videoplayer.play(url,page);
			await page.waitFor(10000);
			
			for (const frame of page.mainFrame().childFrames()){
				result = await analysis(url,frame,false);
				
				if(result != null)
					break;
			}
		}
		
		console.log(result);
		
		console.log("--------------------------------")
	}
	// quando ho finito chiudo il browser
	await browser.close();
})();


async function analysis(url,doc,isMainFrame){
	let res;
	for (let i = 0; i < estractors.length; i++) {
		if(i === 0){
			for (key in selectAttr) {
				res = await estractors[i].estract(url,doc,key,selectAttr[key]);
				if(res!=null)
					break;
			}
		}
		
		if(isMainFrame){
			res= await estractors[i].estract(url,doc);
		}else if(i === estractors.length -1){
			continue;
		}
		if(res!=null)
			break;
	}
	return res;
}

