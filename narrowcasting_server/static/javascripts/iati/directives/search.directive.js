/**
* iatiSelectSectors
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.iati.directives')
    .directive('iatiSelectTextSearch', iatiSelectTextSearch);

  /**
  * @namespace iatiSelectSectors
  */
  function iatiSelectTextSearch() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.iati.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/iati/iatiSelectTextSearch.html'
    };

    return directive;
  }
})();