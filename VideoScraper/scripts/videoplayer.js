//analizza la pagina e cerca di trovare il video per farlo partire
var play = async function play(page){

	const video=await page.$('video');
	if(video){
		video.click();
		return;
	}

	const selectors=[];
	selectors.push("[class*='video']");
	selectors.push("[class*='player']");
	
	await page.evaluate((selectors) => {
		var largestElem;  // l'elemento piu' grande
		try{ 
			//funzione che va a restituire un array ordinato in modo crescente in base alle dimensioni
			function scanSizes(root) {
				return [].map.call(root, function(node) {
					var bounds = node.getBoundingClientRect();
					return node;
				}).sort(function(x, y) {
					var a = x.area, b= y.area;
					return a > b ? -1 : a < b ? 1 : 0;
				});
			}
			for (let i = 0; i < selectors.length; i++) {
				var elements=document.querySelectorAll(selectors[i]);
				var sizes;
				if(elements){
					sizes=scanSizes(elements);
					largestElem = sizes[sizes.length-1];
					if(largestElem){
						largestElem.click();
						return ;
					}
				}
			}
		}catch(err){
			console.log(err);
		}
	}, selectors );
}

module.exports.play= play;

