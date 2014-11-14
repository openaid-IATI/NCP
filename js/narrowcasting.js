
function NarrowCasting(){
	this.page = "homepage";
}

NarrowCasting.prototype.load_next = function() {
	if (this.page == "homepage"){
		hps.next();
	}

	if(this.page == "overview"){
		ovs.next();
	}


};




function HomepageSlider(){
	this.slides = [];
	this.current_slide = 0;
	this.slide_amount = 5;
}


HomepageSlider.prototype.init = function(){

	this.create_listeners();
}

HomepageSlider.prototype.create_listeners = function(){

	$(".hp-button").click(function(e){
		e.preventDefault();
		var id = $(this).data("id");
		$(".hp-slide-title").hide();
		$(".hp-slide-content").hide();

		$(".hp-slide-title[data-id='"+id+"']").show();
		$(".hp-slide-content[data-id='"+id+"']").show();

		// window["hp_slide_"+id+"_click"]();
	});

}

HomepageSlider.prototype.next = function(){

	// reset current slide
	if (this.slides[this.current_slide].out){
		this.slides[this.current_slide].out();
	}
	
	// set next slide as current slide
	if ((this.current_slide + 1) > this.slide_amount){
		// this.current_slide = 0;
		window.location = "overzicht.php";
	} else {
		this.current_slide = this.current_slide + 1;
	}

	// show new slide
	$(".hp-slide-title").hide();
	$(".hp-slide-content").hide();
	$(".hp-slide-title[data-id='"+this.current_slide+"']").show();
	$(".hp-slide-content[data-id='"+this.current_slide+"']").show();

	// load visuals (if necessary)
	this.slides[this.current_slide].refresh();

}

HomepageSlider.prototype.go_to = function(slide_number){
	$(".hp-slide-title").hide();
	$(".hp-slide-content").hide();

	$(".hp-slide-title[data-id='"+slide_number+"']").show();
	$(".hp-slide-content[data-id='"+slide_number+"']").show();
}



function Slide(){
	this.chart_data = null;
	this.chart = null;
	this.initialized = false;
	this.callback = null;
	this.redraw = null;

}

Slide.prototype.refresh = function(){
	
	if (this.initialized == false){
		this.initialized = true;
		if(this.callback){
			this.callback();
		}
	} else {
		if (this.redraw){
			this.redraw();
		}
	}
}















function OverviewSlider(){
	this.slides = [];
	this.current_slide = 0;
	this.slide_amount = 5;
	this.zoomed_in = false;
}


OverviewSlider.prototype.init = function(){

	this.create_listeners();
}

OverviewSlider.prototype.create_listeners = function(){

}

OverviewSlider.prototype.next = function(){

	if(this.zoomed_in){
		this.out(this.current_slide);

		// set next slide as current slide
		if ((this.current_slide + 1) > this.slide_amount){
			// this.current_slide = 0;
			window.location = "index.html";
		} else {
			this.current_slide = this.current_slide + 1;
		}
		this.zoomed_in = false;
	} else {

		this.in(this.current_slide);
		this.zoomed_in = true;
	}
}

OverviewSlider.prototype.out = function(id){
	// move highlighted box to back
	$(".overview-small[data-id='"+id+"']").css("background", "#f3f5f6");
	$(".overview-small[data-id='"+id+"']").css("position", "relative");
	$(".overview-small[data-id='"+id+"']").css("z-index", 0);
	$(".overview-small[data-id='"+id+"']").css("top", "auto");

	$(".overview-small[data-id='"+id+"']").animate({
	    width: "33.3%",
	    height: "354px",
	    left: "0",
	    bottom: "0",
	}, 1000, function(){
		$(".overview-small[data-id='"+id+"']").css("height", "auto");
	});

	$(".overview-small[data-id='"+id+"'] .tile h3").animate({
	    "font-size": "8px",
	    "margin-top": "1px",
	    "padding-bottom": "1px"
	}, 1000);

	$(".overview-small[data-id='"+id+"'] .tile p").animate({
	    "font-size": "6px",
	    "margin-top": "6px",
	    "margin-bottom": "6px"
	}, 1000);

	$(".overview-small[data-id='"+id+"'] .tile").animate({
	    "min-height": "145px",
	}, 1000);


}

OverviewSlider.prototype.in = function(id){

	$(".overview-small[data-id='"+id+"']").css("background", "#ccc");
	$(".overview-small[data-id='"+id+"']").css("position", "absolute");
	$(".overview-small[data-id='"+id+"']").css("z-index", 99);
	$(".overview-small[data-id='"+id+"']").css("top", 0);

	$(".overview-small[data-id='"+id+"']").animate({
	    width: "100%",
	    height: 900,
	    left: "15px",
	    bottom: "90px",
	}, 1000);

	$(".overview-small[data-id='"+id+"'] .tile h3").animate({
	    "font-size": "21px",
	    "margin-top": "20px",
	    "padding-bottom": "20px"
	}, 1000);


	$(".overview-small[data-id='"+id+"'] .tile p").animate({
	    "font-size": "16px",
	    "margin-top": "20px",
	    "margin-bottom": "10px"
	}, 1000);

	$(".overview-small[data-id='"+id+"'] .tile").animate({
	    "min-height": "464px",
	}, 1000);

}





// $(".hp-button").click(function(){

// 	var id = $(this).data("id");

// 	$(".hp-button-"+id+"-clone").css("overflow", "visible");
// 	$(".hp-button-"+id+"-clone").css("position", "absolute");
// 	$(".hp-button-"+id+"-clone").css("background-color", "red");
// 	$(".hp-button-"+id+"-clone").css("display", "block");

// 	console.log($(".hp-main-area"));
// 	var width = $(".hp-main-area").width();
// 	var height = $(".hp-main-area").height();


// 	console.log(width);
// 	console.log(height);
// 	$(".hp-button-"+id+"-clone").animate({
// 	    width: width,
// 	    height: height,
// 	    left: "15px",
// 	    bottom: "90px",
// 	}, 200, function() {
// 	// Animation complete.
// 	});




// });