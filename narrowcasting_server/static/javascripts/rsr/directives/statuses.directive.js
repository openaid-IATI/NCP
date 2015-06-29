/**
* iatiSelectCountries
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.iati.directives')
    .directive('iatiSelectCountries', iatiSelectCountries);

  /**
  * @namespace iatiSelectCountries
  */
  function iatiSelectCountries() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.iati.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/iati/iatiSelectCountries.html'
    };

    return directive;
  }
})();