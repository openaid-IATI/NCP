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

  DisplaysController.$inject = ['Authentication', 'Snackbar', 'Displays', 'Presentations', '$stateParams'];

  /**
  * @namespace EditPresentationController
  */
  function DisplaysController(Authentication, Snackbar, Displays, Presentations, $stateParams) {
    
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
    }

    activate();

  }
})();