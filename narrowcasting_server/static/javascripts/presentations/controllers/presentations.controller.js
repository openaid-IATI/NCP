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
      Snackbar.show('Duplicate presentation not implemented yet');
    }

    vm.deletePresentation = function(id){

      Presentations.deletePresentation(id).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        Presentations.all().then(presentationsSuccessFn, errorFn);
      }
    }

    function presentationsSuccessFn(data, status, headers, config) {
      vm.presentations = data.data;
    }

    function errorFn(data, status, headers, config) {
      Snackbar.error(data.error);
    }

    function activate() {

      Presentations.all().then(presentationsSuccessFn, errorFn);    
    }
  }
})();