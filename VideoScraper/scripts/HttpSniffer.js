/*script che naviga nella pagina dove si trova il video e tenta di estrapolare
informazioni sul video intercettando il traffico di rete*/
const puppeteer = require('puppeteer');
var url="https://edition.cnn.com/videos";

(async () => {
	const browser = await puppeteer.launch({headless:false});
	const page = await browser.newPage();
	const response=await page.goto(url, { 'waitUntil' : 'networkidle0','timeout' : 0 } );
	page.once('load', () => console.log('Page loaded!'));
//	await page.click('div>video');
//	console.log(response.headers);
	await browser.close();
})();