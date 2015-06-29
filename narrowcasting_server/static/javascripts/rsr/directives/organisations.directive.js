/**
* iatiSelectRegions
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.iati.directives')
    .directive('iatiSelectRegions', iatiSelectRegions);

  /**
  * @namespace iatiSelectRegions
  */
  function iatiSelectRegions() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.iati.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/iati/iatiSelectRegions.html'
    };

    return directive;
  }
})();