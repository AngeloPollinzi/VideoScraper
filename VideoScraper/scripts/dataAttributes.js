
var extract = async function extract(page){
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
		var jsonformat= item.match(/\{.*\}/); //se il contenuto matcha con un formato json
		if(jsonformat){
			try{
				var json=JSON.parse(jsonformat);
				
				if(json.playlist){
					return json.playlist[0];
				}
				if(json.video){
					return json.video;
				}
				if(json.player){
					return json.player;
				}
			}catch(err){
				console.log("Data-Attribute Inspection Error: Errore durante la fase di parserizzazione di un JSON")
			}
		}
	}
	
}

module.exports.extract = extract;
