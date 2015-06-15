/**
* Activities
* @namespace ncs.iati.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('Activities', Activities);

    Activities.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace Activities
    * @returns {Factory}
    */
    function Activities($http, oipaUrl, reportingOrganisationId) {

        var Activities = {
            get: get,
            list: list
        };

        return Activities;


        function list(filters, limit, order_by, offset){
            var url = oipaUrl + '/activity-list/?format=json&limit=6&select_fields=titles,countries,iati_identifier,id,start_actual,total_budget,sectors'

            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId
            }
            if(filters !== undefined){
                url += filters;
            }
            if(order_by !== undefined){
                url += '&order_by=' + order_by;
            }
            if(offset !== undefined){
                url += '&offset=' + offset;
            }
            if(limit !== undefined){
                url += '&limit=' + limit;
            }

            return $http.get(url, { cache: true });
        }

        /**
         * @name get
         * @desc Get a single Activity
         * @param {string} filter_type The type to get filter options for
         * @returns {Promise}
         * @memberOf oipa.filters.services.Filters
         */
        function get(code) {
            return $http.get(oipaUrl + '/activity-list/' + code + '/?format=json', { cache: true });
        }
    }
})();