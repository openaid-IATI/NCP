/**
* NavbarController
* @namespace ncs.layout.controllers
*/
(function () {
	'use strict';

	angular
		.module('ncs.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', '$state', 'djangoAuth'];

	/** 
	* @namespace NavBarController
	*/
	function NavbarController($scope, $state, djangoAuth){
		var vm = this;

		// vm.isAuthenticated = Authentication.isAuthenticated();

		vm.logout = $scope.logout;

	    // $scope.$on("djangoAuth.logged_in", function(data){
	    // 	$scope.authenticated = true;
	    // });
	    // $scope.$on("djangoAuth.logged_out", function(data){
	    //   $scope.authenticated = false;
	    // });

		vm.stateName = '';
	    vm.state = $state;

		$scope.$watch('vm.state.current.name', function(name){
	        if (['displays','new-display'].indexOf(name) >= 0) { vm.stateName = 'displays'; }
	        else if (['presentations','edit-presentation'].indexOf(name) >= 0) { vm.stateName = 'presentations'; }
	        else if (['learn'].indexOf(name) >= 0) { vm.stateName = 'learn'; }
	        else { vm.stateName = 'home'; }
	    }, true);


	    $scope.login = function(){
	      djangoAuth.login(prompt('Username'),prompt('password'))
	      .then(function(data){
	        handleSuccess(data);
	      },handleError);
	    }
	    
	    $scope.logout = function(){
	      djangoAuth.logout()
	      .then(function(){
	      	$state.go("home");
	      },handleError);
	    }

	    var handleSuccess = function(data){
	      $scope.response = data;
	    }
	    
	    var handleError = function(data){
	      $scope.response = data;
	    }


	    $scope.test = function(){
	    	console.log($scope);
	    }
	}

})();