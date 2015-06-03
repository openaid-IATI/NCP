/**
* Presentation
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('iatiSelect', iatiSelect);

  /**
  * @namespace ncs
  */
  function iatiSelect() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.iatiSelect
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/presentations/iati-select.html'
    };

    return directive;
  }
})();