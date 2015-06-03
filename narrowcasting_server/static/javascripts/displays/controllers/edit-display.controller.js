/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('EditDisplayController', EditDisplayController);

  EditDisplayController.$inject = ['Authentication', 'Snackbar', 'Displays', '$stateParams'];

  /**
  * @namespace EditDisplayController
  */
  function EditDisplayController(Authentication, Snackbar, Displays, $stateParams) {
    
    var vm = this;
    vm.displayId = $stateParams.display_id;
    vm.currentDisplay = {};

    function activate(){
        // get presentation
        Displays.getSingle(vm.presentationId).then(presentationSuccessFn, presentationErrorFn);

        function presentationSuccessFn(data, status, headers, config) {
          vm.currentDisplay = data.data;
        }

        function presentationErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
        }        
    }

    activate();

    function save(){

    }

  }
})();