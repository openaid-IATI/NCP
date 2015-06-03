/**
* Presentation
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.presentations.directives')
    .directive('rsrSelect', rsrSelect);

  /**
  * @namespace ncs
  */
  function rsrSelect() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.iatiSelect
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/presentations/rsr-select.html'
    };

    return directive;
  }
})();