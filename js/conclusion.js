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

		const handleWindowResize = () => {
			var width = document.getElementById('slideshow').clientWidth;
			var height = document.getElementById('slideshow').clientHeight;
			var windowWidth = document.getElementById('main').clientWidth;
			var windowHeight = document.getElementById('main').clientHeight;
			var r = 1;
			r = Math.min(windowWidth / width, windowHeight / height, 1)
			$("#slideshow").style.transform = `scale(${r})`;
		}
		handleWindowResize();
		window.addEventListener('resize', handleWindowResize, true);

		// Slideshow
		slideshow = new Slideshow({
			dom: $("#slideshow"),
			slides: SLIDES
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
		).then(()=>{
			Scratcher.scratch('conclusion');
		});
	});

};