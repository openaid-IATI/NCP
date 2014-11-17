
function NarrowCasting(){
	this.page = "homepage";
	this.count = 0;
	this.current_project = new Project();
}

NarrowCasting.prototype.load_next = function() {
	if (this.page == "homepage"){
		hps.next();
	}

	if(this.page == "overview"){
		

		this.count++;

		if (this.current_project.id == null){
			this.current_project.id = 0;
		} else if(this.current_project.id < projects_data.projects.length) {
			this.current_project.id = this.current_project.id + 1;
		}

		this.current_project.set_data();
		this.current_project.set_left_bar_html();

		setTimeout(
		  function(){
		    ncp.current_project.set_middle_bar_html();

		    setTimeout(
			  function(){
			    ncp.current_project.set_right_bar_html();


			    setTimeout(
				  function(){
				    ncp.current_project.set_slider_html();

				    setTimeout(
					  function(){
					    ncp.current_project.set_slider();
					  }, 800);

				  }, 600);

			  }, 600);

		  }, 600);

			

	}

};





function Project(){
	this.id = null;
	this.data = null;
	this.html = "";
	this.left = {};
	this.left.front = document.getElementById('project-left-block');
	this.left.back = null;
	this.left.is_first_back = false;
	this.middle = {};
	this.middle.front = document.getElementById('project-middle-block');
	this.middle.back = null;
	this.middle.is_first_back = false;
	this.right = {};
	this.right.front = document.getElementById('project-right-block');
	this.right.back = null;
	this.right.is_first_back = false;
	this.slider = {};
	this.slider.front = document.getElementById('project-right-slider-block');
	this.slider.back = null;
	this.slider.bxslider = null;

}

Project.prototype.set_data = function() {

	this.data = projects_data.projects[this.id];
}

Project.prototype.set_left_bar_html = function() {

	var html = '<div class="buza-top-border feature-image">'
           +'<img src="img/ncp_images/NCP_image_03.png"/>'
           +'</div>'
           +'<div class="white-tile bottom-shadow">'
           +'<div class="row">'
           +'<div class="col-md-6">'
           +'<h1>'+this.data.title+'</h1>'
           +'<h2>Water, sanitation, and fuel-efficient stoves for cost of water alone</h2>'
           +'<p>'+this.data.content+'</p>'
           +'</div>'
           +'<div class="col-md-6">'
           +'<br/>'
           +'<div class="progress">'
           +'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
           +'</div>'
           +'</div>'
           +'<h4>Funded</h4>'
           +'<p class="number">100%</p>'
           +'<br/>'
           +'<h4>Raised</h4>'
           +'<p class="number">'+this.data.raised+'</p>'
           +'<br/>'
           +'<h4>Focus area</h4>'
           +'<p class="number">Water and sanitation</p>'
           +'</div>'
           +'</div>'
           +'</div>';
    if (this.left.back == null){
    	// we are on the overview page, load first project
    	this.left.back = flippant.flip(this.left.front, html, 'card', 'flip-right');
    	this.left.is_first_back = true;
    } else if(this.left.is_first_back){
    	// go to second back
    	this.left.second_back = flippant.flip(this.left.back, html, 'card', 'flip-right');
    	this.left.is_first_back = false;
    } else {
    	// go to first back
    	// load data into first back
    	// close second back
    	this.left.second_back.close();
    }
}


Project.prototype.set_middle_bar_html = function() {

    var html = '<div class="col-md-3 project-middle-block">'
              	+'<div class="white-tile bottom-shadow buza-top-border">'
                +'<h3>Who will benefit?</h3>'
                +'<div class="row">'
                +'<div class="col-md-4">'
                +'<h4>Sanitation</h4>'
                +'<img src="img/ncp_icons/icon-02.png" />'
                +'</div>'
                +'<div class="col-md-8">';


    for(var i = 0;i < this.data.who_will_benefit.length;i++){
    	html += '<h5>'+this.data.who_will_benefit[i]+'</h5>';
    }

    html += '<p class="number">31360</p>'
                +'</div>'
                +'</div>'
              	+'</div>'
              	+'<div class="white-tile bottom-shadow buza-top-border">'
                +'<div class="row">'
                +'<div class="col-md-4">'
				+'<h4>Water</h4>'
                +'<img src="img/ncp_icons/icon-03.png" />'
                +'</div>'
                +'<div class="col-md-8">'
                +'<h5>People reached</h5>'
                +'<p class="number">53750</p>'
                +'</div>'
                +'</div>'
              +'</div>';

	html += '<div class="white-tile bottom-shadow buza-top-border">'
                +'<h3>Goals</h3>'
                +'<ul class="list-unstyled icon-list checkmark">';


    for(var i = 0;i < this.data.goals.length;i++){
    	html += '<li>'+this.data.goals[i]+'</li>';
    }
    
    html += '</ul>'
              +'</div>'
            +'</div>';




    html = '<div class="white-tile bottom-shadow buza-top-border">'
           +'<h3>Who will benefit?</h3>'
           +'<div class="row">'
           +'<div class="col-md-4">'
           +'<h4>Sanitation</h4>'
           +'<img src="img/ncp_icons/icon-02.png" />'
           +'</div>'
           +'<div class="col-md-8">'
           +'<h5>People use improved sanitation facilities</h5>'
           +'<p class="number">31360</p>'
           +'</div>'
           +'</div>'
           +'</div>'
           +'<div class="white-tile bottom-shadow buza-top-border">'
           +'<div class="row">'
           +'<div class="col-md-4">'
           +'<h4>Water</h4>'
           +'<img src="img/ncp_icons/icon-03.png" />'
           +'</div>'
           +'<div class="col-md-8">'
           +'<h5>People reached</h5>'
           +'<p class="number">53750</p>'
           +'</div>'
           +'</div>'
           +'</div>'
           +'<div class="white-tile bottom-shadow buza-top-border">'
           +'<h3>Goals</h3>'
           +'<ul class="list-unstyled icon-list checkmark">'
           +'<li>Complete 75 comprehensive base-line surveys</li>'
           +'<li>Complete 75 deep bore-holes (obtain carbon credits)</li>'
           +'<li>Create 75 CHCs & train 30 Community Health Workers ("CHWs") to train local CHCs</li>'
           +'</ul>'
           +'</div>'
    

    if (this.middle.back == null){
    	// we are on the overview page, load first project
    	this.middle.back = flippant.flip(this.middle.front, html, 'card', 'flip-right');
    	this.middle.is_first_back = true;
    } else if(this.middle.is_first_back){
    	// go to second back
    	this.middle.second_back = flippant.flip(this.middle.back, html, 'card', 'flip-right');
    	this.middle.is_first_back = false;
    } else {
    	// go to first back
    	// load data into first back
    	// close second back
    	this.middle.second_back.close();
    }


}



Project.prototype.set_right_bar_html = function() {

    var html =  '<div class="white-tile bottom-shadow buza-top-border">'
                +'<h3>Project partners</h3>'
                +'<div class="row">'
                  +'<div class="col-md-12">'
                    +'<h4>Field partners</h4>'
                  +'</div>'
                +'</div>'
                +'<div class="row">'
                  +'<div class="col-md-4">'
                    +'<img src="img/ncp_icons/icon-04.png" />'
                  +'</div>'
                  +'<div class="col-md-8">'
                    +'<p>Blue Planet Network<br/><span class="thin">Oakland, United States</span></p>'
                  +'</div>'
                +'</div>'
                +'<div class="row">'
                  +'<div class="col-md-4">'
                    +'<img src="img/ncp_icons/icon-05.png" />'
                  +'</div>'
                  +'<div class="col-md-8">'
                    +'<p>Lifeline<br/><span class="thin">Washington D.C., United States</span></p>'
                  +'</div>'
                +'</div>'
                +'<div class="row">'
                  +'<div class="col-md-4">'
                    +'<img src="img/ncp_icons/icon-06.png" />'
                  +'</div>'
                  +'<div class="col-md-8">'
                    +'<p>Africa AHEAD<br/><span class="thin">Cape Town, Western Cape, South Africa</span></p>'
                  +'</div>'
                +'</div>'
              +'</div>'
              
              +'<div class="white-tile bottom-shadow buza-top-border">'
                +'<div class="row">'
                  +'<div class="col-md-12">'
                    +'<h4>Support partners</h4>'
                  +'</div>'
                +'</div>'
                +'<div class="row">'
                  +'<div class="col-md-4">'
                    +'<img src="img/ncp_icons/icon-07.png" />'
                  +'</div>'
                  +'<div class="col-md-8">'
                    +'<p>Aqua for all<br/><span class="thin">Den Haag, Zuid-Holland, Netherlands</span></p>'
                  +'</div>'
                +'</div>'
            +'</div>'
               +'<div class="white-tile bottom-shadow buza-top-border">'
                +'<h3>Location</h3>'
                +'<p>Africa, Uganda</p>'
                +'<img src="img/ncp_images/NCP_image_04.png" />'
              +'</div>';

    if (this.right.back == null){
    	// we are on the overview page, load first project
    	this.right.back = flippant.flip(this.right.front, html, 'card', 'flip-right');
    	this.right.is_first_back = true;
    } else if(this.right.is_first_back){
    	// go to second back
    	this.right.second_back = flippant.flip(this.right.back, html, 'card', 'flip-right');
    	this.right.is_first_back = false;
    } else {
    	// go to first back
    	// load data into first back
    	// close second back
    	this.right.second_back.close();
    }

}


Project.prototype.set_slider_html = function() {

	var html = '<div id="menu" class="buza-top-border">'
        +'<div class="triangle">'
        +'<a href="#" class="previous-slide"><img src="img/pointers/pointer_up.png" /></a>'
        +'</div>'
        +'<ul class="bxslider">';

    var active_class = "";
    for(var i =0; i < projects_data.projects.length;i++){
      if (i == 0){
        active_class = " active";
      } else {
        active_class = "";
      }

      html += '<a class="slider-button slide-'+i+'" data-slide="'+i+'" href="#"><div class="menu-item bottom-shadow'+active_class+'">'+projects_data.projects[i].title+'</div></a>';

    }


    html +='</ul>'
        +'<div class="triangle">'
        +'<a href="#" class="next-slide"><img src="img/pointers/pointer_down.png" /></a>'
        +'</div>'
      	+'</div>';

    if (this.slider.back == null){
    	this.slider.back = flippant.flip(this.slider.front, html, 'card', 'flip-left');
    }

}

Project.prototype.set_slider = function(){

	if (this.slider.bxslider == null){
		this.slider.bxslider = $('.bxslider').bxSlider({
		  mode: 'vertical',
		  slideMargin: 5,
		  maxSlides: 6,
		  minSlides: 6,
		  infiniteLoop: true,
		  hideControlOnEnd: true,
		  moveSlides: 1,  
		  pager: false,
		  controls: false,
		  auto: false,
		  responsive: false,
		  adaptiveHeight: false
		});

		$(".next-slide").click(function(e){
		  e.preventDefault();

		  this.slider.bxslider.goToNextSlide();

		  var current = slider.getCurrentSlide();
		  $(".menu-item").removeClass("active");
		  $(".slide-"+current + " .menu-item").addClass("active");
		});

		$(".previous-slide").click(function(e){
		  e.preventDefault();

		  this.slider.bxslider.goToPrevSlide();

		  var current = slider.getCurrentSlide();
		  $(".menu-item").removeClass("active");
		  $(".slide-"+current + " .menu-item").addClass("active");
		});

	} 

	this.slider.bxslider.goToSlide(this.id);
	$(".menu-item").removeClass("active");
 	$(".slide-" + this.id + " .menu-item").addClass("active");
}





















function HomepageSlider(){
	this.slides = [];
	this.current_slide = 0;
	this.slide_amount = 4;
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
