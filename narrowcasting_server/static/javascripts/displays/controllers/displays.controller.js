/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.displays.controllers')
    .controller('DisplaysController', DisplaysController);

  DisplaysController.$inject = ['$scope', 'Authentication', 'Snackbar', 'Displays', 'Presentations', '$stateParams'];

  /**
  * @namespace EditPresentationController
  */
  function DisplaysController($scope, Authentication, Snackbar, Displays, Presentations, $stateParams) {
    
    var vm = this;
    vm.displays = [];
    vm.presentations = [];


    function activate(){
        // get presentation
        Displays.all().then(displaySuccessFn, displayErrorFn);
        Presentations.all('&status=published').then(presentationsSuccessFn, presentationsErrorFn);


        $scope.$watch("vm.displays", function (newDisplays, oldDisplays) {
          if (oldDisplays == null || oldDisplays.length == 0){
            return false;
          } else {
            // check
            for(var i = 0;i < newDisplays.length;i++){

              if (newDisplays[i]['presentation'] != null){
                vm.updateDisplay(newDisplays[i]);
              } else if(oldDisplays[i]['presentation'] != null){
                vm.updateDisplay(newDisplays[i]);
              }
            }
          }
        }, true);
    }

    vm.deletePresentation = function(id){

      Presentations.deletePresentation(id).then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        Presentations.all('&status=published').then(presentationsSuccessFn, presentationsErrorFn);
        Displays.all().then(displaySuccessFn, displayErrorFn);

      }
    }

    vm.deleteDisplay = function(id){
      Displays.deleteDisplay(id).then(function(){
        Displays.all().then(displaySuccessFn, displayErrorFn);
      });
    }

    vm.updateDisplay = function(display){
      Displays.update(display).then(updateDisplaySuccessFn, updateDisplayErrorFn);

      function updateDisplaySuccessFn(data, status, headers, config){
        Snackbar.show('Display updated');

      }

      function updateDisplayErrorFn(data, status, headers, config){
        Snackbar.error(data.error);
      }
    }

    function presentationsSuccessFn(data, status, headers, config) {
        vm.presentations = data.data;
    }

    function presentationsErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
    }

    function displaySuccessFn(data, status, headers, config) {
      vm.displays = data.data;
    }

    function displayErrorFn(data, status, headers, config) {
      Snackbar.error(data.error);
    }

    function errorFn(data, status, headers, config) {
      Snackbar.error(data.error);
    }

    activate();

  }
})();