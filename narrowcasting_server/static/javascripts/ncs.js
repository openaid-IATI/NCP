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

    run.$inject = ['$http'];

    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
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

