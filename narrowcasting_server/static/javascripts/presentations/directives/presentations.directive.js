/**
* Presentations
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('presentations', presentations);

  /**
  * @namespace Presentations
  */
  function presentations() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.Presentations
    */
    var directive = {
      controller: 'PresentationsController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        presentations: '='
      },
      templateUrl: '/static/templates/presentations/presentations.html'
    };

    return directive;
  }
})();