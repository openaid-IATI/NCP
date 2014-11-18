<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Narrowcasting</title>

    <!-- Bootstrap -->
    <link href="bootstrap-3.2.0/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom css -->
    <link href="css/style.css" rel="stylesheet">
    <link href="css/flippant.css" rel="stylesheet">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- loads project data -->
	<script src="js/projects_data.js"></script>
  </head>
  <body>
    <!-- <h1>Hello, world!</h1> -->
    <div id="logo-container-bottom" class="centered">
      <!-- <p>Logo BuZa</p> -->
      <img src="img/logo-buza.png" alt="Buitenlandse Zaken"/>

      <div class="header-blue-line"></div>
    </div>

    <div class="row" id="overview-main-wrapper">
	    <div class="col-md-60">
	    	<div class="row">
	    		<div class="col-md-6 flip-right" id="project-left-block">
			        
			        <div class="row" style="position: relative;">
			        	<div class="col-md-6" id="project-0-wrapper"></div>
			        	<div class="col-md-6" id="project-1-wrapper"></div>
			        </div>
			        <div class="row" style="height: 15px"></div>
			        <div class="row" style="position: relative;">
			        	<div class="col-md-6" id="project-5-wrapper"></div>
			        	<div class="col-md-6" id="project-6-wrapper"></div>
			        </div>

			    </div>

			    <div id="project-middle-block" class="col-md-3 flip-right">
			    	<div class="row">
			    		<div class="col-md-12" id="project-2-wrapper"></div>
				    </div>
				    <div class="row" style="height: 15px"></div>
				    <div class="row">
			    		<div class="col-md-12" id="project-7-wrapper"></div>
				    </div>
				</div>

				<div id="project-right-block" class="col-md-3 flip-right">
			    	<div class="row">
			    		<div class="col-md-12" id="project-3-wrapper"></div>
				    </div>
					<div class="row" style="height: 15px"></div>
				    <div class="row">
			    		<div class="col-md-12" id="project-8-wrapper"></div>
				    </div>
				</div>

			</div>
	    </div>
	    <div id="project-right-slider-block" class="col-md-15 flip-left">
	    	<div class="row">
	    		<div class="col-md-12">
			    	<div class="row">
			    		<div class="col-md-12" id="project-4-wrapper"></div>
				    </div>
				    <div class="row" style="height: 15px"></div>
				    <div class="row">
			    		<div class="col-md-12" id="project-9-wrapper"></div>
				    </div>
				</div>
	    	</div>
	    </div>
    </div>




    <footer>
    	<div class="footer-blue-line"></div>
    	<div class="container">
    		
    		<div class="footer-text">
    			<img src="img/rfid.png" width="43" height="43" />
    			Meer informatie over deze projecten? www.webadres.nl
    		</div>

			<!-- <div class="ccounter">
				<input class="knob second" data-width="80" data-min="0" data-max="20" data-displayPrevious=true data-fgColor="#01689b" data-readOnly="true" value="20" data-bgcolor="#eee">
			</div> -->
		</div>
    </footer>




     <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="js/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="bootstrap-3.2.0/js/bootstrap.min.js"></script>
    <!-- bxSlider Javascript file -->
	<script src="js/jquery.bxslider.min.js"></script>


	<!-- countdown clock -->
	<script src="js/jquery.knob.js"></script>
	<script src="js/jquery.ccountdown.js"></script>
	<script src="js/init.js"></script>
	
	<!-- counter for detail pages -->
	<script src="js/countUp.min.js"></script>

	<!-- flip effect -->
	<script src="js/flippant.min.js"></script>


	<script>
	// fill static data

	for (var i =0;i < 10;i++){

		var html = '';
		html += '<div class="tile overview-project" data-id="'+i+'">';
		html += '<div class="pin-left"></div><div class="pin-right"></div>';
		html += '<h3>'+projects_data.projects[i].title+'</h3>';
		html += '<div class="overview-project-image-wrapper">';
		html += '<img src="'+projects_data.projects[i].image.url+'" alt="NCP image"/>';
		html += '</div>';
		html += '</div>';
		$("#project-"+i+"-wrapper").html(html);
	}

	</script>

	<!-- main ncp js -->
	<script src="js/narrowcasting.js"></script>

<script>

	var ncp = new NarrowCasting();
	ncp.page = "overview";
  
	(function($) {
	$.fn.ccountdown = function(_s) {
		var $this = this;
		var _secondsleft = _s;
		var _zerocount = 0;
		// calling function first time so that it wll setup remaining time
		var _changeTime = function() {

			if (_secondsleft > 0){
				_secondsleft = _secondsleft - 1;
			}

			if (_secondsleft == 0){

				_zerocount++; 
				if(_zerocount == 2){
					ncp.load_next();
					_zerocount = 0;
					_secondsleft = _s - 1;
				}
			}

			var el = $($this);
			var $ss = el.find(".second");
			$ss.val(_secondsleft).trigger("change");
		};
		
		_changeTime();
		setInterval(_changeTime, 1000);
	};
})(jQuery);

	//enter the count down date using seconds
	$(".ccounter").ccountdown(5);

</script>


  </body>
</html>