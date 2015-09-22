(function () {
    'use strict';

    angular
      .module('ncs.routes')
      .config(config);

    config.$inject = ['$stateProvider', '$locationProvider', '$urlRouterProvider' ];

    /**
    * @name config
    * @desc Define valid application routes
    */
    function config($stateProvider, $locationProvider, $routeProvider){

      $locationProvider.html5Mode(true);
      $routeProvider.otherwise('/');

      $stateProvider
        .state({
            name:         'home',
            url:          '/',
            controller:   'IndexController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/layout/index.html'
        })
        .state({
            name:         'login',
            url:          '/login/',
            controller:   'LoginController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/authentication/login.html'
        })
        .state({
            name:         'new-presentation',
            url:          '/presentations/new/',
            controller:   'NewPresentationController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/presentations/new-presentation.html'
        })
        .state({
            name:         'edit-presentation',
            url:          '/presentations/edit/:presentation_id/',
            controller:   'EditPresentationController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/presentations/edit-presentation.html'
        })
        .state({
            name:         'preview-presentation',
            url:          '/presentations/preview/:presentation_id/',
            controller:   'PreviewPresentationController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/presentations/preview-presentation.html'
        })
        .state({
            name:         'presentations',
            url:          '/presentations/',
            controller:   'PresentationsController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/presentations/presentations.html'
        })
        .state({
            name:         'learn',
            url:          '/learn/',
            templateUrl:  '/static/templates/learn/learn.html'
        })
        .state({
            name:         'users',
            url:          '/users/',
            controller:   'UsersController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/authentication/users.html'
        })
        .state({
            name:         'new-display',
            url:          '/display/new/',
            controller:   'NewDisplayController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/displays/new-display.html'
        })
        .state({
            name:         'displays',
            url:          '/displays/',
            controller:   'DisplaysController',
            controllerAs: 'vm',
            templateUrl:  '/static/templates/displays/displays.html'
        });
     
    }
})();
