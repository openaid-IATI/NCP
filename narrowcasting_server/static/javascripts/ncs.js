(function () {
    'use strict';

    angular
        .module('ncs', [
            'ncs.config',
            'ncs.routes',
            'angularUtils.directives.dirPagination',
            'checklist-model',
            'ui.bootstrap-slider',
            'ngDragDrop',
            'ngFileUpload',
            'ngCookies',
            'minicolors',
            'ncs.authentication',
            'ncs.layout',
            'ncs.presentations',
            'ncs.iati',
            'ncs.rsr',
            'ncs.displays',
            'ncs.users',
            'ncs.utils'
        ]);

    angular
        .module('ncs.config', []);

    angular
        .module('ncs.routes', ['ui.router']);

    angular
        .module('ncs')
        .run(run);

    run.$inject = ['$http', '$rootScope', 'djangoAuth', '$state'];

    function run($http, $rootScope, djangoAuth, $state) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';

        $rootScope.$on( '$stateChangeStart', function(e, toState, toParams, fromState, fromParams) {

            if(['home', 'login', 'learn'].indexOf(toState.name) > -1){
               return; // no need to redirect 
            }

            if(!djangoAuth.authenticated){
                djangoAuth.authenticationStatus(true).then(function(){
                    // does resolve, user is logged in
                }, function(){
                    // does not resolve, redirect
                    e.preventDefault();
                    $state.go('login');
                });
            }
        });
    }

})();

(function () {

    angular
    .module('ncs')
    .directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
})();

