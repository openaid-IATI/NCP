/**
* LoginController
* @namespace ncs.authentication.controllers
*/
(function() {
	'use strict';

	angular
		.module('ncs.authentication')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$state', '$scope', 'djangoAuth', 'Validate', 'Snackbar'];

	/**
	* @namespace LoginController
	*/
	function LoginController($state, $scope, djangoAuth, Validate, Snackbar){

		$scope.model = {'email':'','password':''};
	  	$scope.complete = false;

	    $scope.login = function(formData){
	      $scope.errors = [];
	      Validate.form_validation(formData,$scope.errors);
	      if(!formData.$invalid){
	        djangoAuth.login($scope.model.email, $scope.model.password)
	        .then(function(data){
	        	$state.go("presentations");
	        },function(data){
  				Snackbar.error(data.non_field_errors);
	        });
	      }
	    }

		activate();

	
		function activate() {
			// If the user is authenticated, they should not be here.
			// if (Authentication.isAuthenticated()) {
			// 	$location.url('/');
			// }
		}
	}
})();