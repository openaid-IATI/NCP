/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('NewPresentationController', NewPresentationController);

  NewPresentationController.$inject = ['$rootScope', '$scope', '$state', 'Authentication', 'Snackbar', 'Presentations'];

  /**
  * @namespace NewPresentationController
  */
  function NewPresentationController($rootScope, $scope, $state, Authentication, Snackbar, Presentations) {
    var vm = this;

    vm.submit = submit;
    vm.submitted = false;

    /**
    * @name submit
    * @desc Create a new Post
    * @memberOf ncs.presentations.controllers.NewPresentationController
    */
    function submit() {
      if (vm.submitted) return;
      vm.submitted = true;

      $rootScope.$broadcast('presentation.created', {
        projects: vm.projects,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        }
      });

      Presentations.create(vm.projects).then(createPresentationSuccessFn, createPresentationErrorFn);


      /**
      * @name createPresentationSuccessFn
      * @desc Show snackbar with success message
      */
      function createPresentationSuccessFn(data, status, headers, config) {
        // get presentation id, go to presentation edit
        Snackbar.show('Presentation created.');
        $state.go('edit-presentation', { presentation_id: data.data.id });
      }

      /**
      * @name createPresentationErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createPresentationErrorFn(data, status, headers, config) {
        console.log(data);
        console.log(data.data);
        $rootScope.$broadcast('presentation.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();