/**
* rsrSelectLocation
* @namespace ncs.rsr.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.rsr.directives')
    .directive('rsrSelectLocation', rsrSelectLocation);

  /**
  * @namespace rsrSelectLocation
  */
  function rsrSelectLocation() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.rsr.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/rsr/rsrSelectLocation.html'
    };

    return directive;
  }
})();