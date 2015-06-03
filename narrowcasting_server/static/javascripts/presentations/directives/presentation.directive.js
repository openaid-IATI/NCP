/**
* Presentation
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('presentation', presentation);

  /**
  * @namespace Presentation
  */
  function presentation() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.Presentation
    */
    var directive = {
      restrict: 'E',
      scope: {
        presentation: '='
      },
      templateUrl: '/static/templates/presentations/presentation.html'
    };

    return directive;
  }
})();