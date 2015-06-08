/**
* Presentation
* @namespace ncs.presentations.directives
*/
(function () {
  'use strict';

  angular
    .module('ncs.users.directives')
    .directive('user', user);

  /**
  * @namespace Presentation
  */
  function user() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf ncs.presentations.directives.Presentation
    */
    var directive = {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: '/static/templates/users/user.html'
    };

    return directive;
  }
})();