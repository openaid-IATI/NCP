/**
* NavbarController
* @namespace ncs.layout.controllers
*/
(function () {
	'use strict';

	angular
		.module('ncs.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', '$state', 'Authentication'];

	/** 
	* @namespace NavBarController
	*/
	function NavbarController($scope, $state, Authentication){
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();

		vm.logout = logout;

		vm.stateName = '';
	    vm.state = $state;

		$scope.$watch('vm.state.current.name', function(name){
	        if (['displays','new-display'].indexOf(name) >= 0) { vm.stateName = 'displays'; }
	        else if (['presentations','edit-presentation'].indexOf(name) >= 0) { vm.stateName = 'presentations'; }
	        else if (['learn'].indexOf(name) >= 0) { vm.stateName = 'learn'; }
	        else { vm.stateName = 'home'; }
	    }, true);

		/**
	    * @name logout
	    * @desc Log the user out
	    * @memberOf ncs.layout.controllers.NavbarController
	    */
		function logout(){
			Authentication.logout();
		}
	}

})();