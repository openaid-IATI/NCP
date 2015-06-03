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

  NewDisplayController.$inject = ['Authentication', 'Snackbar', 'Presentations'];

  /**
  * @namespace NewDisplayController
  */
  function NewDisplayController(Authentication, Snackbar, Presentations) {
    var vm = this;
    vm.submit = submit;

    /**
    * @name submit
    * @desc Create a new Display
    * @memberOf ncs.displays.controllers.NewDisplayController
    */
    function submit() {

      Displays.create(vm.projects).then(createPresentationSuccessFn, createPresentationErrorFn);

      /**
      * @name createPresentationSuccessFn
      * @desc Show snackbar with success message
      */
      function createDisplaySuccessFn(data, status, headers, config) {
        // get display id, go to display edit
        console.log(data);
        Snackbar.show('Display created.');
      }

      /**
      * @name createPresentationErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createDisplayErrorFn(data, status, headers, config) {
        Snackbar.error(data.error);
      }
    }
  }
})();