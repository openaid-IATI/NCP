/**
* Presentation WYSIWYG
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('slideWysiwyg', slideWysiwyg);

  /**
  * @namespace ncs
  */
  function slideWysiwyg() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.presentationWysiwyg
    */
    var directive = {
      controller: 'WysiwygController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {},
      templateUrl: '/static/templates/presentations/slide-wysiwyg.html'
    };

    return directive;
  }
})();