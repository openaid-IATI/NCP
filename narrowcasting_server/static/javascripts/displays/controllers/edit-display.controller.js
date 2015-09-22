/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.displays.controllers')
    .controller('EditDisplayController', EditDisplayController);

  EditDisplayController.$inject = ['$state', '$stateParams', 'Authentication', 'Snackbar', 'Displays'];

  /**
  * @namespace EditDisplayController
  */
  function EditDisplayController($state, $stateParams, Authentication, Snackbar, Displays) {
    var vm = this;
    vm.display = null;
    vm.displayId = $stateParams.display_id;
    vm.submit = submit;

    activate();

    function activate(){
        Displays.getSingle(vm.displayId).then(
            function(data){
                vm.display = data.data;}, 
            function(){
                Snackbar.error(data.error);});
    }

    /**
    * @name submit
    * @desc Create a new Display
    * @memberOf ncs.displays.controllers.EditDisplayController
    */
    function submit() {

      Displays.update(vm.display).then(createDisplaySuccessFn, createDisplayErrorFn);

      /**
      * @name createDisplaySuccessFn
      * @desc Show snackbar with success message
      */
      function createDisplaySuccessFn(data, status, headers, config) {
        // get display id, go to display edit
        Snackbar.show('Display updated.');
        $state.go('displays');
      }

      /**
      * @name createDisplayErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createDisplayErrorFn(data, status, headers, config) {
        console.log(data);
        console.log(data.data);
        console.log(status);
        Snackbar.error(data.error);
      }
    }
  }
})();