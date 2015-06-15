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

        function displaySuccessFn(data, status, headers, config) {
          vm.displays = data.data;
        }

        function displayErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }

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

    vm.updateDisplay = function(display){
      Displays.update(display).then(updateDisplaySuccessFn, updateDisplayErrorFn);

      function updateDisplaySuccessFn(data, status, headers, config){
        Snackbar.show('Display updated');

      }

      function updateDisplayErrorFn(data, status, headers, config){
        Snackbar.error(data.error);
      }
    }

    activate();

  }
})();