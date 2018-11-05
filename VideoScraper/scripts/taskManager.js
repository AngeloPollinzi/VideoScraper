const puppeteer = require('puppeteer');
//task manager crea tutti i tipi di estrattori. 
var estractor1=require("./videosrc.js");
var estractor2=require("./youtube.js");
var estractor3=require("./httplog.js");

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
	'https://www.ft.com/video/818d6b08-093f-4a0a-bd10-17a4089cafed?playlist-name=editors-picks&playlist-offset=0',
	'https://www.ktvz.com/news/national-world/bernie-sanders-stumps-for-democrat-in-san-diego/828128075',
	'http://www.channel4000.com/videos',
	'https://www.quotidiano.net/cronaca/video/maltempo-a-venezia-transformer-su-una-vasca-da-bagno-naviga-in-citt%C3%A0-1.4268442',
	
];

//mi metto in ascolto 
(async () => {
	const width = 1024;
	const height = 1600;
	
	//creo un'istanza di un browser chrome
	const browser = await puppeteer.launch({
		headless: false,
		defaultViewport : { 'width' : width, 'height' : height },
	});
	
	//creo una nuova pagina nel browser
	const page = await browser.newPage();
	
	//man mano passo i miei url agli estrattori che mi restituiranno il risultato
	for (let i = 0; i < urls.length; i++) {
		const url = urls[i];
		var result=await estractor1.estract(url,page);
	}
	// quando ho finito chiudo il browser
	await browser.close();
})();