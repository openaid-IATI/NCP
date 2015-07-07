/**
* RsrProjects
* @namespace ncs.rsr.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.rsr.services')
        .factory('RsrProjects', RsrProjects);

    RsrProjects.$inject = ['$http'];

    /**
    * @namespace IatiActivities
    * @returns {Factory}
    */
    function RsrProjects($http) {

        var RsrProjects = {
            list: list
        };

        return RsrProjects;

        function list(filters, per_page, page, order_by){
            
            filters = '';
            if(filters !== undefined){
                filters += filters;
            }
            if(order_by !== undefined){
                filters += '&order_by=' + order_by;
            }
            if(page !== undefined){
                filters += '&page=' + page;
            }

            if(per_page !== undefined){
                filters += '&limit=' + per_page;
            }

            var url = '/rsr/?call=project&filters=' + encodeURIComponent(filters);

            return $http.get(url, { cache: true });
        }
    }
})();