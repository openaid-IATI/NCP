
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
			} else if(this.current_project.id < (projects_data.projects.length -1)) {
				this.current_project.id = this.current_project.id + 1;
			} else {

				// animate everything away and start over
				$(".col-md-60, #project-slider-block, .flippant-back").animate({ 
					top: "-2000px" 
				}, { 
					duration: 2300, 
					easing: "easeOutQuart", 
					complete: function(){
						
						setTimeout( function(){
							window.location = "index.html";	
						}, 3000);
					}
				});

				return false;
					
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

		// }
			

	}

};





function Project(){
	this.id = null;
	this.data = null;
	this.html = "";
	this.left = {};
	this.left.front = document.getElementById('project-left-block');
	this.left.back = null;
	this.left.is_back = false;
	this.middle = {};
	this.middle.front = document.getElementById('project-middle-block');
	this.middle.back = null;
	this.middle.is_back = false;
	this.right = {};
	this.right.front = document.getElementById('project-right-block');
	this.right.back = null;
	this.right.is_back = false;
	this.slider = {};
	this.slider.front = document.getElementById('project-right-slider-inner-block');
	this.slider.back = null;
	this.slider.bxslider = null;

}

Project.prototype.set_data = function() {

	this.data = projects_data.projects[this.id];
}

Project.prototype.set_left_bar_html = function() {

	var count_ups = [];
	var front_back = "back";
	// reversed, slide still has to change
	if (this.left.is_back == true){ front_back = "front"; }

	var html = '<div class="feature-image">'
           +'<div class="project-image-wrapper">'
           +'<img src="'+this.data.image.url+'"/>'
           +'</div>'
           +'</div>'
           +'<div class="white-tile bottom-shadow">'
           +'<div class="row">'
           +'<div class="col-md-6">'
           +'<h1>'+this.data.title+'</h1>'
           +'<p>'+this.data.summary+'</p>'
           +'</div>'
           +'<div class="col-md-6">'
           +'<br/>'
           +'<div class="progress">'
           +'<div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="'+this.data.funded+'" aria-valuemin="0" aria-valuemax="100" style="width: 100%">'
           +'</div>'
           +'</div>'
           +'<h5>FUNDED</h5>'
           +'<p class="number"><span id="'+front_back+'-left-count-up-0"></span>%</p>'
           +'<br/>'
           +'<h5>RAISED</h5>'
           +'<p class="number">&euro; <span id="'+front_back+'-left-count-up-1"></span></p>'
           +'<br/>'
           +'<h5>FOCUS AREA</h5>'
           +'<p class="number">Water and sanitation</p>'
           +'</div>'
           +'</div>'
           +'</div>'
           +'</div>';

    count_ups.push(this.data.funded);
    count_ups.push(this.data.raised);


    if (this.left.back == null){
    	// we are on the overview page, load first project
    	this.left.back = flippant.flip(this.left.front, html, 'card', 'flip-right');
    	this.left.is_back = true;
    } else if(this.left.is_back){

    	// change data on front
    	this.left.front.innerHTML = html;
    	this.left.back.close();
    	this.left.is_back = false;
    } else {
    	this.left.is_back = true;
    	this.left.back = flippant.flip(this.left.front, html, 'card', 'flip-right');
    }


    var options = {
	  useEasing : true, 
	  useGrouping : true, 
	  separator : ',', 
	  decimal : '.', 
	  prefix : '' ,
	  suffix : '' 
	}



	for (var i = 0;i < count_ups.length;i++){
		var demo = new countUp(front_back + "-left-count-up-" + i, 0, count_ups[i], 0, 2.5, options);
		demo.start();
	}
}


Project.prototype.set_middle_bar_html = function() {

	var count_ups = [];

	var front_back = "back";
	// reversed, slide still has to change
	if (this.left.is_back == true){ front_back = "front"; }

    var html = '<div class="white-tile bottom-shadow">'
                +'<h3>Who will benefit?</h3>'
                +'<div class="row">'
                +'<div class="col-md-4">'
                +'<h4>Sanitation</h4>'
                +'<img src="img/ncp_icons/icon-02.png" />'
                +'</div>'
                +'<div class="col-md-8">';


    for(var i = 0;i < this.data.who_will_benefit.length;i++){
    	if (this.data.who_will_benefit[i].category == "sanitation"){
    		html += '<h5>'+this.data.who_will_benefit[i].name+'</h5>';
    		html += '<p class="number" id="'+front_back+'-middle-count-up-'+count_ups.length+'"></p>';
    		count_ups.push(this.data.who_will_benefit[i].amount);
    	}
    }

    
        html +='</div>'
                +'</div>'
              	+'</div>'
              	+'<div class="white-tile bottom-shadow">'
                +'<div class="row">'
                +'<div class="col-md-4">'
				+'<h4>Water</h4>'
                +'<img src="img/ncp_icons/icon-03.png" />'
                +'</div>'
                +'<div class="col-md-8">';

    for(var i = 0;i < this.data.who_will_benefit.length;i++){
    	if (this.data.who_will_benefit[i].category == "water"){
    		html += '<h5>'+this.data.who_will_benefit[i].name+'</h5>';
    		html += '<p class="number" id="'+front_back+'-middle-count-up-'+count_ups.length+'"></p>';
    		count_ups.push(this.data.who_will_benefit[i].amount);
    	}
    }

    html        +='</div>'
                +'</div>'
              +'</div>';

	html += '<div class="white-tile bottom-shadow">'
                +'<h3>Goals</h3>'
                +'<ul class="list-unstyled icon-list checkmark">';


    for(var i = 0;i < this.data.goals.length;i++){
    	html += '<li>'+this.data.goals[i]+'</li>';
    }
    
    html += '</ul>'
    +'</div>';




    

    if (this.middle.back == null){
    	// we are on the overview page, load first project
    	this.middle.back = flippant.flip(this.middle.front, html, 'card', 'flip-right');
    	this.middle.is_back = true;
    } else if(this.middle.is_back){
    	this.middle.front.innerHTML = html;
    	this.middle.back.close();
    	this.middle.is_back = false;
    } else {
    	this.middle.is_back = true;
    	this.middle.back = flippant.flip(this.middle.front, html, 'card', 'flip-right');
    }


    var options = {
	  useEasing : true, 
	  useGrouping : true, 
	  separator : ',', 
	  decimal : '.', 
	  prefix : '' ,
	  suffix : '' 
	}

	var demo = null;
	for (var i = 0;i < count_ups.length;i++){
		demo = new countUp(front_back + "-middle-count-up-" + i, 0, count_ups[i], 0, 2.5, options);
		demo.start();
	}
	

}



Project.prototype.set_right_bar_html = function() {

    var html =  '<div class="white-tile bottom-shadow">'
                +'<h3>Project partners</h3>'
                +'<div class="row">'
                  +'<div class="col-md-12">'
                    +'<h4>Field partners</h4>'
                  +'</div>'
                +'</div>';

    for(var i = 0;i < this.data.field_partners.length;i++){

		html +='<div class="row"><div class="col-md-12"><p>'+this.data.field_partners[i].name+'<br/><span style="" class="thin">'+this.data.field_partners[i].location+'</span></p></div></div>';
	}
    
	html +='</div>';

               
    html +='<div class="white-tile bottom-shadow">'
        +'<h3>Location</h3>'
        +'<h4>'+this.data.location+'</h4>'
        +'<img src="img/ncp_images/NCP_image_04.png" />'
      +'</div>';

    if (this.right.back == null){
    	// we are on the overview page, load first project
    	this.right.back = flippant.flip(this.right.front, html, 'card', 'flip-right');
    	this.right.is_back = true;
    } else if(this.right.is_back){
    	this.right.back.close();
    	this.right.front.innerHTML = html;
    	this.right.is_back = false;
    } else {
    	this.right.is_back = true;
    	this.right.back = flippant.flip(this.right.front, html, 'card', 'flip-right');
    }

}


Project.prototype.set_slider_html = function() {

	var html = '<div id="menu">'
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
      	+'</div>';

    if (this.slider.back == null){
    	this.slider.back = flippant.flip(this.slider.front, html, 'card', 'flip-left');
    }

}

Project.prototype.set_slider = function(){

	if (this.slider.bxslider == null){
		this.slider.bxslider = $('.bxslider').bxSlider({
		  mode: 'vertical',
		  startSlide: 0,
		  slideMargin: 0,
		  maxSlides: 7,
		  minSlides: 7,
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

	this.slider.bxslider.goToSlide(this.id - 1);
	$(".menu-item").removeClass("active");
 	$(".slide-" + this.id + " .menu-item").addClass("active");
}





















function HomepageSlider(){
	this.slides = [];
	this.current_slide = 0;
	this.slide_amount = 4;
	this.bxslider = null;
}


HomepageSlider.prototype.init = function(){

	// this.create_listeners();


	// if (this.bxslider == null){
	// 	this.bxslider = $('.hp-main-area').bxSlider({
	// 	  slideMargin: 0,
	// 	  maxSlides: 1,
	// 	  minSlides: 1,
	// 	  infiniteLoop: true,
	// 	  moveSlides: 1,  
	// 	  pager: false,
	// 	  controls: false,
	// 	  auto: true,
	// 	  responsive: false,
	// 	  adaptiveHeight: false
	// 	});

	// }
}


HomepageSlider.prototype.next = function(){

	var previous_slide = this.current_slide;

	// set next slide as current slide
	if ((this.current_slide + 1) > this.slide_amount){
		// this.current_slide = 0;
		
	} else {
		this.current_slide = this.current_slide + 1;
	}

	// reset current slide
	if (this.slides[previous_slide].out){
		// will also trigger going to the next slide
		this.slides[previous_slide].out();
	}

}

HomepageSlider.prototype.go_to = function(slide_number){

	// To do: make animation
	$(".hp-slide-content").show();


	// $(".hp-slide-content[data-id='0']").show();

	this.slides[this.current_slide].refresh();
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



function delAnimDurationClass(id){
	$(id).removeClass("three-seconds two-and-half-seconds two-seconds one-and-half-seconds");
}

function delAnimClass(id){
	$(id).removeClass("bounceOutLeft bounceInDown bounceInLeft bounceInUp zoomIn zoomInLeft zoomInUp zoomInUpDown zoomInRight zoomOut zoomOutLeft zoomOutUp zoomOutDown zoomOutRight");
}