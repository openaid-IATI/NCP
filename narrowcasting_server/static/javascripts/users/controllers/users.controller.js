/**
* PresentationsController
* @namespace ncs.presentations.controllers
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('UsersController', UsersController);

  UsersController.$inject = ['$scope', 'Authentication', 'Users', 'Snackbar'];

  /**
  * @namespace PresentationsController
  */
  function UsersController($scope, Authentication, Presentations, Snackbar) {
    var vm = this;
    vm.presentations = [];
    vm.isAuthenticated = Authentication.isAuthenticated();

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf ncs.presentations.controllers.PresentationsController
    */
    function activate() {

      Presentations.all().then(presentationsSuccessFn, presentationsErrorFn);

      $scope.$on('presentation.created', function (event, presentation) {
        vm.presentations.unshift(presentation);
      });

      $scope.$on('presentation.created.error', function () {
        vm.presentations.shift();
      });

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