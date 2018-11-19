const puppeteer = require('puppeteer');
// task manager crea tutti i tipi di estrattori.
var estractor1=require("./tagInspector.js");
var estractor2=require("./youtube.js");
var estractor3=require("./javascriptInspector.js");
var estractor4=require("./dataAttributes.js");
var estractor5=require("./metadataInspector.js");
var HttpLogListener=require("./HttpLogListener.js");
var videoplayer=require("./videoplayer.js");

const estractors=[];
estractors.push(estractor2);
estractors.push(estractor3);
estractors.push(estractor4);
estractors.push(estractor5);

const urls = [
	/*Youtube*/'http://mynorthwest.com/1144863/medved-first-man-review/',
	/*data-attributes*/ 'https://www.cnet.com/cnet-top-5/',
	/*json+ld*/'https://wnyt.com/news/st-johnsville-michaela-macvilla-missing-woman-found-dead/5110737/',
	/*json+ld*/'https://www.cbssports.com/live/should-jose-altuve-been-called-out-due-to-fan-interference/1332758/?ftag=SHQ-16-10aaa0c/',
	/*json+ld*/'https://www.popsugar.co.uk/fitness/Advanced-Full-Body-HIIT-Workout-44952188',
	/*json+ld*/'https://timesofindia.indiatimes.com/videos/news/ease-of-doing-business-india-jumps-23-spots-now-ranks-77/videoshow/66448603.cms',
	/*microdata*/'https://abc7news.com/video/',
	/*facebookOG*/'http://brainerddispatch.com/video/Tr3SJXNe',
	/*javascript*/ 'http://www.espn.com/nfl/story/_/id/25206920/week-11-2018-nfl-power-rankings-season-defining-stats-every-defense', 
	/*javascript*/ 'https://www.washingtonpost.com/video/entertainment/how-to-be-a-journalist/reporting-on-fashion-in-the-instagram-age-with-robin-givhan--how-to-be-a-journalist/2018/09/14/b984aa80-b83f-11e8-ae4f-2c1439c96d79_video.html?utm_term=.dbe0408d678f',
	/*javascript*/ 'http://wqow.com/news/top-stories/2018/10/23/watch-live-search-for-evidence-in-barron-county/', 
	/*javascript*/ 'https://www.ilfattoquotidiano.it/2018/10/31/savona-incendio-nel-porto-il-parcheggio-diventa-un-cimitero-di-auto-piu-di-1000-veicoli-tra-cui-molte-maserati-distrutte/4733636/', 
	/*javascript*/ 'http://www.thevalleydispatch.com/',
	/*javascript*/ 'https://video.corriere.it/rapallo-crolla-diga-foranea-spazzata-via-una-mareggiata/e2e47248-dba3-11e8-a9c5-62cf8efd543f?intcmp=pastiglione_lato_hp&vclk=pastiglione_lato%7Crapallo-crolla-diga-foranea-spazzata-via-una-mareggiata', 
	/*javascript*/ 'https://video.gazzetta.it/liga-parla-presidente-javier-tebas-noi-piu-amati-senza-cr7/f7ad373c-dc48-11e8-a48f-8de672fea597?intcmp=VideoBar&vclk=VideoBar%7Cliga-parla-presidente-javier-tebas-noi-piu-amati-senza-cr7',
	/*javascript*/ 'http://www.pireport.org/articles/2017/03/14/grappling-bomb-britain%E2%80%99s-nuclear-testing-kiribati',
	/*javascript*/ 'https://www.keyt.com/video', 
	/*http-log*/'https://triblive.com/home/video/',
	/*http-log*/'https://www.ilmessaggero.it/politica/m5s_decreto_sicurezza_nugnes_m5s_di_maio-4074284.html',
	/*http-log*/'http://www.journalgazette.net/sports/colleges/purdue/20181017/boilers-think-big-against-buckeyes',
	/*http-log*/'https://www.wsj.com/video/what-the-election-of-jair-bolsonaro-means-for-brazil/4F79BD86-F2D4-4DB6-A105-10AE9255C5F3.html',
	/*http-log*/'https://www.myrtlebeachonline.com/news/local/article217455180.html#storylink=mainstage',
	'http://video.italiaoggi.it/classcnbc/tg-flash/Indici-positivi-in-avvio-di-seduta-a-Wall-Street-81542/',
	'https://www.wsls.com/news/national/mexico-beach-residents-begin-returning-after-michael',
	'http://www.channel4000.com/videos',
	'http://video.denverpost.com/',
	'https://www.ktvz.com/news/national-world/bernie-sanders-stumps-for-democrat-in-san-diego/828128075',
	'https://www.channel3000.com/news/wednesday-morning-sprint-70/808620380',
	'https://www.aspendailynews.com/multimedia/video-th-annual-aspen-ski-swap/video_6db4e22e-d0d0-11e8-9e76-3fc73a380369.html',
	'http://www.vindy.com/videos/2018/oct/12/4827/',
	'http://video.startribune.com/',
	'http://www.tuttosport.com/video/calcio/2018/10/31-49408121/copa_libertadores_gremio-river_plate_1-2/',
	'https://www.ft.com/video/818d6b08-093f-4a0a-bd10-17a4089cafed?playlist-name=editors-picks&playlist-offset=0',
	'https://www.quotidiano.net/cronaca/video/maltempo-a-venezia-transformer-su-una-vasca-da-bagno-naviga-in-citt%C3%A0-1.4268442',
	'https://www.quotidiano.net/politica/video/di-maio-giorni-difficili-dobbiamo-essere-compatti-1.4266930',
	'https://www.news8000.com/news/new-horizons-advocates-explain-importance-of-domestic-violence-awareness-month/808364336',
	'http://www.ilgiornale.it/news/sport/leicester-video-choc-cos-precipita-lelicottero-1595341.html',
	'https://www.georgianewsday.com/video/460067-busted-package-thief-caught-after-her-getaway-driver-flees.html',
	'https://tv.liberoquotidiano.it/video/politica/13313985/anni-dopo-la-bomba-di-eleonora-giorgi-cosa-mi-chiese-giulio-andreotti.html',
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

	// mi metto in ascolto del traffico
	HttpLogListener.listen(page);
	
	// man mano passo i miei url agli estrattori che mi restituiranno il
	// risultato
	for (let i = 0; i < urls.length; i++) {
		var result;
		const url = urls[i];
		
		await page.goto(url,{waitUntil:'domcontentloaded',timeout: 0});
		
		// analisi statica sul DOM e i child frames
		result = await analysis(page);
		
		// se il controllo statico fallisce provo faccio play e ripeto il controllo su DOM e child frames
		if(!result){
			await videoplayer.play(page);
			await page.waitFor(10000);
			result = await analysis(page);
			if(!result){
				for (const frame of page.mainFrame().childFrames()){
					result = await analysis(frame);
					if(result)
						break;
				}
			}
		}
		
		console.log(result);
		
		console.log("-----------------------------------------------------------------------------");
		console.log("-----------------------------------------------------------------------------");
	}
	// quando ho finito chiudo il browser
	await browser.close();
})();


async function analysis(doc){
	await Promise.all([
		estractor1.estract(doc,"video","src"),
		estractor1.estract(doc,"video>source","src"),
		estractor1.estract(doc,"object[data*='.swf'],object[data*='.mp4'],object[data*='.ogg'],object[data*='.webm']","data"),
		estractor1.estract(doc,"iframe[src*='.mp4'],iframe[src*='.webm'],iframe[src*='.swf'],iframe[src*='.ogg']","src"),
		estractor1.estract(doc,"embed[src*='.mp4'],embed[src*='.webm'],embed[src*='.swf'],embed[src*='.ogg']","src"),
		estractor2.estract(doc), 
		estractor3.estract(doc),
		estractor4.estract(doc),
		estractor5.estract(doc)
	]).then(result => { 
		  console.log(result);
	});
	
}

