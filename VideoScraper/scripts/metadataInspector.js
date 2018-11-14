
var estract= async function estract(page){

	
	const result=await page.evaluate(() => {
		let res;
		let metas= Array.from(document.querySelectorAll('meta'));
		
		metas.map(meta => {
			Array.prototype.slice.call(meta.attributes).forEach(function(item) {
				if(item.name === 'property' && item.value === 'og:video:url'){
					res=item.value
				}
			});
		});
			
			if(prop === "og:video:url" || prop === "og:video:secure_url" ){
				return res;
			}
		
	});
	console.log(result);
//	return result;
}

module.exports.estract = estract;
