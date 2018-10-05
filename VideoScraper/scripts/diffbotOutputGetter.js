/**
 * http://usejsdoc.org/
 */
// gli url da visitare dati in input
const urls = ['https://www.lemonde.fr/videos/','https://edition.cnn.com/videos','https://www.bbc.com/news/video_and_audio/headlines',
	'https://www.repubblica.it/','http://video.lefigaro.fr/','https://elpais.com/','https://www.theguardian.com/video'
	,'https://www.nytimes.com/video','http://www.spiegel.de/video/horrorhaus-von-hoexter-landgericht-paderborn-verhaengt-lange-haftstrafen-video-99021308.html'
	,'https://www.huffingtonpost.it/'];


/* script di analisi automatizzata delle pagine tramite diffbot,che fornisce
in output una lista dei json estratti da diffbot stesso*/
const puppeteer = require('puppeteer');
(async () => {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	const difUrl="https://www.diffbot.com/products/automatic/video/";
	await page.goto(difUrl, { 'waitUntil' : 'networkidle0' } );
	await page.waitForSelector('input');
	
	for (let i = 0; i < urls.length; i++) {
		const url=urls[i];
		const a=url;
		await page.evaluate((a) => {
		      document.querySelector('input').value = a;
		    }, a);
		await page.click('.btn.testdrive-submit');
		await page.waitFor(2000);
		let pages = await browser.pages();
		const page2=pages[2];
		await page2.waitForSelector('.tab-content');
		const textContent = await page2.evaluate(() => document.querySelector('span.js-object').textContent);
		console.log(textContent);
		page2.close();
		await page.waitFor(3000);
	}
	await browser.close();
})();

