$(document).foundation();

var ncpApp = angular.module('ncpApp', []);
var slideCount = 0;

(function () {
  'use strict';

ncpApp.filter('iaticurrency', function(numberFilter){

    return function(input, curSymbol, decPlaces, thouSep, decSep) {
      var curSymbol = curSymbol || "$";
      var decPlaces = decPlaces || 0;
      var thouSep = thouSep || ",";
      var decSep = decSep || ".";

      // Check for invalid inputs
      var out = isNaN(input) || input === '' || input === null ? 0.0 : input;

      //Deal with the minus (negative numbers)
      var minus = input < 0;
      out = Math.abs(out);
      out = numberFilter(out, decPlaces);

      // Replace the thousand and decimal separators.  
      // This is a two step process to avoid overlaps between the two
      if(thouSep != ",") out = out.replace(/\,/g, "T");
      if(decSep != ".") out = out.replace(/\./g, "D");
      out = out.replace(/T/g, thouSep);
      out = out.replace(/D/g, decSep);

      // Add the minus and the symbol
      if(minus){
        return "-" + curSymbol + out;
      }else{
        return curSymbol + out;
      }
    }
});

ncpApp.directive('preview', preview);

  function preview() {
    var directive = {
      controller: 'PresentationCtrl',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: '/static/preview/preview.html'
    };

    return directive;
  }

})();


(function () {
  'use strict';

	ncpApp.controller('PresentationCtrl', function ($scope, $http, $timeout) {
		var vm = this;
		vm.presentation = null;

		function activate(){

			$http.get('/api/v1/presentations/'+presentation_id+'/').then(successFn, errorFn);

			function successFn(data, status, headers, config) {

				for(var i = 0;i < data.data.slide_set.length;i++){
					data.data.slide_set[i].slideContent = JSON.parse(data.data.slide_set[i].slideContent);
				}

	            vm.presentation = data.data; 
	            slideCount = vm.presentation.slide_set.length;

	            $timeout(function(){
	            	vm.slideIn(0);

                    var $window = $(window);
                    var pane = jQuery('#slide-wysiwyg');
                    

                    function checkWidth() {
                        var windowsize = $window.width();
                        var fontsize = (windowsize / 70) + 'px';
                        pane.css('font-size', fontsize);
                    }
                    checkWidth();
                    $(window).resize(checkWidth);

	            });
	        }

	        function errorFn(data,status,headers,config){
	        	console.log(data);
	        }
		}

		vm.slideIn = function(slide_id){

			var type = vm.presentation.slide_set[slide_id].source;

			$('.slide-'+slide_id).removeClass('hide');

			$('.slide-'+slide_id+' .animated').each(function(index){
				$(this).css({'animation-delay':'.'+index+'s'});
			});

			vm.animate(slide_id, type, 8000);
		}

		vm.animate = function(slide_id, type, slidelength) {

			if(type == 'rsr'){
				setTimeout(function () {
			        $('.slide-'+slide_id+' .rsr-front-slide .animated').addClass('bounceOutRight');

			        setTimeout(function () {
			        	$('.slide-'+slide_id+' .rsr-front-slide').addClass('hide');
			        	$('.slide-'+slide_id+' .rsr-back-slide').removeClass('hide');
				    }, 1000);

			    }, slidelength);

				slidelength = slidelength * 2;
			}


			$('#timer .fill').css({'transition':'width '+slidelength/1000+'s linear'}).addClass('animate');  

		    setTimeout(function () {
		        $('.slide-'+slide_id+' .animated').addClass('bounceOutRight');

		        setTimeout(function () {
			        // after the bounce out, remove animation classes
			        $('.slide-'+slide_id).addClass('hide');
					$('.slide-'+slide_id+' .bounceOutRight').removeClass('bounceOutRight');

					if(type == 'rsr'){
						$('.slide-'+slide_id+' .rsr-front-slide').removeClass('hide');
			        	$('.slide-'+slide_id+' .rsr-back-slide').addClass('hide');
					}

					if(slide_id == (slideCount - 1)){
						vm.slideIn(0);
					} else {
						vm.slideIn(slide_id+1);
					}

			    }, 3000);

		    }, slidelength);
		}

		activate();
	});
})();
