const puppeteer = require('puppeteer');

var estract= async function estract(url,page){
	await page.goto(url,{waitUntil:'networkidle0',timeout: 0});
	
	 await page.setRequestInterception(true);
	 page.on('request', interceptedRequest => {
	 if (interceptedRequest.url().endsWith('.mp4') ||
		 interceptedRequest.url().endsWith('.mpg')){
		 console.log(interceptedRequest.url());
		 interceptedRequest.abort();
	 }
	 else{
		 interceptedRequest.continue();
	 }
 });
}

module.exports.estract = estract;