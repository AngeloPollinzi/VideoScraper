//analizza la pagina e cerca di trovare il video per farlo partire
var play= async function play(url,page){

	
	const selectors=[];
	selectors.push("div[class*='video']");
	selectors.push("div[class*='player']");
	selectors.push("img[class*='video']");
	selectors.push("img[class*='player']");
	selectors.push("figure[class*='video']");
	selectors.push("figure[class*='player']");
	
	await page.evaluate((selectors) => {
		let maxHeight=0; // l'altezza dell'elemento piu' alto
		let maxWidth=0;	// la larghezza dell'elemento piu' largo
		let largestElem;  // l'elemento piu' alto 
		for (let i = 0; i < selectors.length; i++) {
			$("*",selectors[i]).each(function () {
			    $this = $(this);
			    if ( $this.outerHeight() > maxHeight && $this.outerWidth() > maxWidth) {
			    	largestElem=this;
			        maxHeight=$this.outerHeight();
			        maxWidth=$this.outerWidth();
			    }
			});
			if(largestElem!=null){
				largestElem.click();
			}
		}
	},selectors);
}

module.exports.play= play;

