/**
* iatiSelectSectors
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.rsr.directives')
    .directive('rsrSelectTextSearch', rsrSelectTextSearch);

  function rsrSelectTextSearch() {
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/rsr/rsrSelectTextSearch.html'
    };

    return directive;
  }
})();