/**
* PresentationsController
* @namespace ncs.presentations.controllers
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$scope', 'Authentication', 'Presentations', 'Snackbar'];

  /**
  * @namespace PresentationsController
  */
  function UsersController($scope, Authentication, Presentations, Snackbar) {
    var vm = this;
    vm.presentations = [];
    vm.users = [
      {username: 'user 1', email: 'user1@abc.com', role: 'admin'},
      {username: 'user 2', email: 'user2@abc.com', role: 'user'},
      {username: 'user 3', email: 'user3@abc.com', role: 'user'},
      {username: 'user 4', email: 'user4@abc.com', role: 'admin'},
    ];
    vm.isAuthenticated = Authentication.isAuthenticated();

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf ncs.presentations.controllers.PresentationsController
    */
    function activate() {

      Presentations.all().then(presentationsSuccessFn, presentationsErrorFn);

      /**
      * @name presentationsSuccessFn
      * @desc Update presentations array on view
      */
      function presentationsSuccessFn(data, status, headers, config) {
        vm.presentations = data.data;
        
      }

      /**
      * @name presentationsErrorFn
      * @desc Show snackbar with error
      */
      function presentationsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();