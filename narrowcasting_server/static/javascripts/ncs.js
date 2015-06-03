(function () {
    'use strict';

    angular
        .module('ncs', [
            'ncs.config',
            'ncs.routes',
            'angularUtils.directives.dirPagination',
            'ncs.authentication',
            'ncs.layout',
            'ncs.presentations',
            'ncs.displays',
            'ncs.utils'
        ]);

    angular
        .module('ncs.config', []);

    angular
        .module('ncs.routes', ['ui.router']);

    angular
        .module('ncs')
        .run(run);

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }

})();

