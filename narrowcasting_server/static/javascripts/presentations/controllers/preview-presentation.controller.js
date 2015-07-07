/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('PreviewPresentationController', PreviewPresentationController);

  PreviewPresentationController.$inject = ['$state', '$stateParams', 'Snackbar', 'Presentations'];

  /**
  * @namespace EditPresentationController
  */
  function PreviewPresentationController($state, $stateParams, Snackbar, Presentations) {
    
    var vm = this;
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};

    function activate(){
        
    }

    activate();
  }
})();