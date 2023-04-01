var slideshow, slideSelect;
window.onload = function(){

	// PRELOADER
	Q.all([
		Loader.loadAssets(Loader.manifestPreload),
		Words.convert("words.html")
	]).then(function(){

		// CHANGE DOM
		document.body.removeChild($("#preloader"));
		$("#main").style.display = "block";

		// Slideshow
		slideshow = new Slideshow({
			dom: $("#slideshow"),
			slides: SLIDES
		});

		subscribe("start/game", function(){
			// slideSelect.dom.style.display = "block";
			// $("#translations").style.display = "none";

			// [FOR DEBUGGING]
			publish("slideshow/next");
			//publish("slideshow/scratch", ["credits"]);
		});

		// LOAD REAL THINGS
		Loader.loadAssets(
			Loader.manifest,
			function(){
				publish("preloader/done");
			},
			function(ratio){
				publish("preloader/progress", [ratio]);
			}
		);

		// First slide!
		slideshow.nextSlide();

	});

};