/**
* PresentationsController
* @namespace ncs.presentations.controllers
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('PresentationsController', PresentationsController);

  PresentationsController.$inject = ['$scope', 'Authentication', 'Presentations', 'Snackbar'];

  /**
  * @namespace PresentationsController
  */
  function PresentationsController($scope, Authentication, Presentations, Snackbar) {
    var vm = this;
    vm.presentations = [];
    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.presentationsOrderBy = 'updated_at';
    vm.presentationsOrderByReversed = true;

    activate();

    vm.orderBy = function(key){
      if(key == 'draft'){
        vm.presentationsOrderBy = 'status';
        vm.presentationsOrderByReversed = false;
      } else if(key == 'published'){
        vm.presentationsOrderBy = 'status';
        vm.presentationsOrderByReversed = true;
      } else if(key == 'most_recent'){
        vm.presentationsOrderBy = 'updated_at';
        vm.presentationsOrderByReversed = true;
      }
    }

    vm.duplicatePresentation = function(id){
      console.log('clicked');
      Snackbar.show('Duplicate presentation not implemented yet');
    }

    vm.deletePresentation = function(id){
      Snackbar.show('Delete presentation not implemented yet');
    }

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