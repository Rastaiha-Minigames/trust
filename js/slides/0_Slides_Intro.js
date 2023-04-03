/********************

0. Introduction
1. One Game
2. Repeated Game
3. One Tournament
4. Repeated Tournament
5. Making Mistaeks
6. Sandbox
7. Conclusion
X. Credits

Labels should be in the en.html folder

*********************/

SLIDES.push({

	//id: "preloader",
	onstart: function(self){

		var o = self.objects;

		// Splash in background
		self.add({ id:"splash", type:"Splash" });

		// TITLE TEXT
		self.add({
			id:"title", type:"TextBox",
			x:130, y:80, width:700,
			size:100, lineHeight:0.9, align:"center",
			text_id:"title"
		});
		self.add({
			id:"subtitle", type:"TextBox",
			x:267, y:344, width:420,
			align:"center", color:"#aaa", size:15,
			text_id:"subtitle"
		});

		// Button
		self.add({
			id:"loading_button", type:"Button", x:382, y:410,
			text_id:"loading",
			active:false
		});
		var _loadingWords = function(ratio){
			ratio = Math.round(ratio*100);
			o.loading_button.setText2(Words.get("loading")+" "+ratio+"%");
		};

		// PRELOADER
		listen(self,"preloader/progress", function(ratio){
			_loadingWords(ratio);
		});
		listen(self,"preloader/done", function(){
			o.loading_button.setText("loading_done");
			o.loading_button.activate();
			o.loading_button.config.onclick = function(){
				publish("start/game");
				Loader.sounds.bg_music.volume(0.75).loop(true).play(); // play music!
			};
		});

	},
	onend: function(self){
		unlisten(self);
		self.remove("title");
		self.remove("subtitle");
		self.remove("loading_button");
	}

});

SLIDES.push({
	id: "intro",
	onjump: function(self){
		// Splash in background
		self.add({ id:"splash", type:"Splash" });
	},
	onstart: function(self){

		var o = self.objects;
		
		// Circular Wordbox
		self.add({
			id:"intro_text", type:"TextBox",
			x:130, y:50, width:700, height:500, align:"center",
			text_id:"intro"
		});
		_hide(o.intro_text); _fadeIn(o.intro_text, 200);

	},
	onend: function(self){
		self.clear();
	}

});
