/**
* IatiActivities
* @namespace ncs.iati.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('IatiActivities', IatiActivities);

    IatiActivities.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    /**
    * @namespace IatiActivities
    * @returns {Factory}
    */
    function IatiActivities($http, oipaUrl, reportingOrganisationId) {

        var IatiActivities = {
            get: get,
            list: list
        };

        return IatiActivities;

        function list(filters, limit, order_by, offset){
            var url = oipaUrl + '/activity-list/?format=json&select_fields=titles,countries,iati_identifier,id,start_actual,total_budget,sectors'

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