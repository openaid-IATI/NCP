/**
* Presentation
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('projectBar', projectBar);

  /**
  * @namespace ncs
  */
  function projectBar() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.projectBar
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/presentations/project-bar.html'
    };

    return directive;
  }
})();