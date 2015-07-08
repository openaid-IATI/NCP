/**
* rsrSelectStatus
* @namespace ncs.rsr.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.rsr.directives')
    .directive('rsrSelectStatus', rsrSelectStatus);

  /**
  * @namespace rsrSelectStatus
  */
  function rsrSelectStatus() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.rsr.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/rsr/rsrSelectStatus.html'
    };

    return directive;
  }
})();