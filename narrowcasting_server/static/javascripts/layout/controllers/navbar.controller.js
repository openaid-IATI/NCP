/**
* NavbarController
* @namespace ncs.layout.controllers
*/
(function () {
	'use strict';

	angular
		.module('ncs.layout.controllers')
		.controller('NavbarController', NavbarController);

	NavbarController.$inject = ['$scope', 'Authentication'];

	/** 
	* @namespace NavBarController
	*/
	function NavbarController($scope, Authentication){
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();

		vm.logout = logout;

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