/**
* IndexController
* @namespace ncs.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('ncs.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Authentication'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Authentication) {
    var vm = this;

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf ncs.layout.controllers.IndexController
    */
    function activate() {
      
    }

  }
})();