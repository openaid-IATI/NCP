/**
* iatiSelectBudget
* @namespace ncs.iati.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.iati.directives')
    .directive('iatiSelectBudget', iatiSelectBudget);

  /**
  * @namespace iatiSelectBudget
  */
  function iatiSelectBudget() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.iati.directives
    */
    var directive = {
      restrict: 'E',
      scope: false,
      templateUrl: '/static/templates/iati/iatiSelectBudget.html'
    };

    return directive;
  }
})();