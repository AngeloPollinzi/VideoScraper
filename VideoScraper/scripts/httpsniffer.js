var videoplayer=require("./videoplayer.js");
const http = require('http');

var estract= async function estract(url,page){
	
	await videoplayer.play(url,page);
	
	 await page.setRequestInterception(true);
	 page.on('request', interceptedRequest => {
		 if (interceptedRequest.url().endsWith('.mp4') ||
			 interceptedRequest.url().endsWith('.m3u8')){
			 console.log(interceptedRequest.url());
			 interceptedRequest.abort();
		 }
		 else{
			 interceptedRequest.continue();
		 }
	 });
}

module.exports.estract = estract;