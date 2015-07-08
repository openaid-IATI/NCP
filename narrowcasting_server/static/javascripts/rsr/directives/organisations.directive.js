/**
* rsrSelectRegions
* @namespace ncs.rsr.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.rsr.directives')
    .directive('rsrSelectOrganisation', rsrSelectOrganisation);

  /**
  * @namespace rsrSelectRegions
  */
  function rsrSelectOrganisation() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.rsr.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/rsr/rsrSelectOrganisation.html'
    };

    return directive;
  }
})();