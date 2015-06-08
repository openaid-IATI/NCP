/**
* Collection
* @namespace oipa.filters
*/
(function () {
  'use strict';

  angular
    .module('oipa.filters')
    .directive('filterBar', filterBar);

  filterBar.$inject = ['templateBaseUrl'];

  /**
  * @namespace Collection
  */
  function filterBar(templateBaseUrl) {

    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.collections.Collection
    */
    var directive = {
      controller: 'FiltersController',
      controllerAs: 'vm',
      restrict: 'E',
      scope: {
        'excludeFilter': '@',
        'excludeDashboard': '@'
      },
      templateUrl: templateBaseUrl + '/templates/filters/filter-bar.html'
    };

    return directive;
  }
})();