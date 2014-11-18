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
    <!-- <link href="css/fonts.css" rel="stylesheet"> -->
    <link href="css/style.css" rel="stylesheet">

	<!-- bxSlider CSS file -->
	<link href="lib/jquery.bxslider.css" rel="stylesheet" />


    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    <!-- <h1>Hello, world!</h1> -->
    <div id="logo-container-bottom" class="centered">
      <!-- <p>Logo BuZa</p> -->
      <img src="img/logo-buza.png" alt="Buitenlandse Zaken"/>

      <div class="header-blue-line"></div>
    </div>
    <div class="row">
      <div class="centered" id="headline">


        	<div class="row">
        		<div class="col-md-12">
    				<div class="hp-slide-title">
    					
    				</div>
        		</div>
        	</div>
        	<div class="row">
        		<div class="col-md-12">

        			<div class="hp-main-area">

        				<div class="hp-slide-content" data-id="0">
        					<img src="img/ncp_intro.jpg" width="1920" height="868" />
        				</div>

        				<div class="hp-slide-content" data-id="1">
        					<canvas id="slide-1-canvas" width="1000" height="440" style="margin-top: 40px"></canvas>
        				</div>

        				<div class="hp-slide-content" data-id="2">
        					<canvas id="slide-2-canvas" width="1000" height="440" style="margin-top: 40px"></canvas>
        				</div>

        				<v class="hp-slide-content" data-id="3">
        					<canvas id="slide-3-canvas" width="1000" height="440" style="margin-top: 40px"></canvas>
        				</div>

        				<div class="hp-slide-content" data-id="4">
        					<canvas id="slide-4-canvas" width="1000" height="440" style="margin-top: 40px"></canvas>
        				</div>
        				
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

	<script src="js/jquery.knob.js"></script>
	<script src="js/jquery.ccountdown.js"></script>
	<script src="js/init.js"></script>
	<script src="js/Chart.js"></script>

	<script src="js/narrowcasting.js"></script>


<script>


	(function($) {
		$.fn.ccountdown = function(_s) {
			var $this = this;
			var _secondsleft = 5;
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


	//enter the count down date using the format year, month, day, time:time
	$(".ccounter").ccountdown(5);

</script>

<script>

var ncp = new NarrowCasting();
var hps = new HomepageSlider();
hps.init();

for (var i = 0;i < 6;i++){
	hps.slides.push(new Slide());	
}


// hps.slides[1].chart_data = {
// 	labels : ["2004 ","2005","2006","2007","2008","2009","2010","2011","2012","2013"],
// 	datasets : [
// 		{
// 			fillColor : "rgba(1,86,129,0.75)",
// 			strokeColor : "rgba(220,220,220,0.8)",
// 			highlightFill: "rgba(1,104,155,0.5)",
// 			highlightStroke: "rgba(220,220,220,1)",
// 			data: [996135, 1052247, 1052247, 5138451, 6013343, 5884215, 5055593, 5642100, 2011723, 2193495]
// 		}
// 	]
// }

// hps.slides[1].callback = function(){
// 	var ctx = document.getElementById("slide-1-canvas").getContext("2d");
// 	this.chart = new Chart(ctx).Bar(this.chart_data, {
// 		// responsive : true,
// 		invertXY: false
// 	});
// }
// hps.slides[1].redraw = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = data[i];
// 	}
// 	this.chart.update();
// }

// hps.slides[1].out = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = 0;
// 	}
// 	this.chart.update();
// }










// hps.slides[2].chart_data = {
// 	labels : ["2004","2005","2006","2007","2008","2009","2010","2011","2012","2013"],
// 	datasets : [
// 		{
// 			fillColor : "rgba(1,86,129,0.75)",
// 			strokeColor : "rgba(220,220,220,0.8)",
// 			highlightFill: "rgba(1,104,155,0.5)",
// 			highlightStroke: "rgba(220,220,220,1)",
// 			data: [62425, 655758, 1183946, 2951376, 3270528, 4267340, 3290312, 2301784, 2296961, 4020185]
// 		}
// 	]
// }

// hps.slides[2].callback = function(){
// 	var ctx = document.getElementById("slide-2-canvas").getContext("2d");
// 	this.chart = new Chart(ctx).Bar(this.chart_data, {
// 		// responsive : true,
// 		invertXY: false
// 	});
// }
// hps.slides[2].redraw = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = data[i];
// 	}
// 	this.chart.update();
// }

// hps.slides[2].out = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = 0;
// 	}
// 	this.chart.update();
// }









// hps.slides[3].chart_data = {
// 	labels : ["Programma’s ","Multilateraal generieke bijdragen","Multilateraal programma’s","ORET/ORIO/FMO","PPP","NGO’s", "Structurele Macrosteun Sanitair"],
// 	datasets : [
// 		{
// 			fillColor : "rgba(1,86,129,0.75)",
// 			strokeColor : "rgba(220,220,220,0.8)",
// 			highlightFill: "rgba(1,104,155,0.5)",
// 			highlightStroke: "rgba(220,220,220,1)",
// 			data: [415211095, 162029000, 190064456, 73336594, 168500000, 110943023, 16526700]
// 		}
// 	]
// }

// hps.slides[3].callback = function(){
// 	var ctx = document.getElementById("slide-3-canvas").getContext("2d");
// 	this.chart = new Chart(ctx).Bar(this.chart_data, {
// 		// responsive : true,
// 		invertXY: false
// 	});
// }
// hps.slides[3].redraw = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = data[i];
// 	}
// 	this.chart.update();
// }

// hps.slides[3].out = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = 0;
// 	}
// 	this.chart.update();
// }







// hps.slides[4].chart_data = {
// 	labels : ["Bilaterale programma’s ","Multilateraal generieke bijdragen","Multilateraal programma’s","ORET/ORIO/FMO","PPP","NGO’s", "Structurele Macrosteun Sanitair"],
// 	datasets : [
// 		{
// 			fillColor : "rgba(1,86,129,0.75)",
// 			strokeColor : "rgba(220,220,220,0.8)",
// 			highlightFill: "rgba(1,104,155,0.5)",
// 			highlightStroke: "rgba(220,220,220,1)",
// 			data: [593110543, 162029000, 114205656, 554433715, 185862346, 102489411, 24790050]
// 		}
// 	]
// }

// hps.slides[4].callback = function(){
// 	var ctx = document.getElementById("slide-4-canvas").getContext("2d");
// 	this.chart = new Chart(ctx).Bar(this.chart_data, {
// 		// responsive : true,
// 		invertXY: false
// 	});
// }
// hps.slides[4].redraw = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = data[i];
// 	}
// 	this.chart.update();
// }

// hps.slides[4].out = function(){
// 	var data = this.chart_data.datasets[0].data;
// 	for (var i = 0;i < data.length;i++){
// 		this.chart.datasets[0].bars[i].value = 0;
// 	}
// 	this.chart.update();
// }





hps.go_to(0);



</script>
  </body>
</html>