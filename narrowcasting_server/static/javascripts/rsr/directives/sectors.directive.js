/**
* rsrSelectSector
* @namespace ncs.rsr.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.rsr.directives')
    .directive('rsrSelectSector', rsrSelectSector);

  /**
  * @namespace rsr
  */
  function rsrSelectSector() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.rsr.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/rsr/rsrSelectSector.html'
    };

    return directive;
  }
})();