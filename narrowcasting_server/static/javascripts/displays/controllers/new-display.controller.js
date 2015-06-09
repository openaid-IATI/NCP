/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.displays.controllers')
    .controller('NewDisplayController', NewDisplayController);

  NewDisplayController.$inject = ['Authentication', 'Snackbar', 'Displays'];

  /**
  * @namespace NewDisplayController
  */
  function NewDisplayController(Authentication, Snackbar, Displays) {
    var vm = this;
    vm.displayName = '';
    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Display
    * @memberOf ncs.displays.controllers.NewDisplayController
    */
    function submit() {

      Displays.create(vm.displayName).then(createDisplaySuccessFn, createDisplayErrorFn);

      /**
      * @name createDisplaySuccessFn
      * @desc Show snackbar with success message
      */
      function createDisplaySuccessFn(data, status, headers, config) {
        // get display id, go to display edit
        Snackbar.show('Display created.');
        window.location = '/displays/';
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