/**
* iatiSelectSectors
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.iati.directives')
    .directive('iatiSelectSectors', iatiSelectSectors);

  /**
  * @namespace iatiSelectSectors
  */
  function iatiSelectSectors() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.iati.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/iati/iatiSelectSectors.html'
    };

    return directive;
  }
})();