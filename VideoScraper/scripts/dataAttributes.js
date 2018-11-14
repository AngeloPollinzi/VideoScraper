
var estract= async function estract(page){
//vado a selezionare tutti i div nella pagina e succesivamente analizzo gli attributi di
// ognuno alla ricerca di un attributo che inizi con "data-", caratteristica dei data attributes.
	const data=await page.evaluate(() => {
		let divs = Array.from(document.querySelectorAll('div'));
		let values=[];
		divs.map(div => {
				Array.prototype.slice.call(div.attributes).forEach(function(item) {
					if(item.name.startsWith('data-')){
						values.push(item.value);
					}
				});
	    });
		return values;
	});

	for(const item of data){
		var result=item.match(/https?[:/]+(www\.)?[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]+\.(mp4|m3u8|webm|ogg)[-\]_\.~!\*'();:@&=+$,\/?%#\[A-z0-9]*/g);
		if(result){
			return result[0];
		}
	}
	
}

module.exports.estract = estract;
