(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('Countries', Countries);

    Countries.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    function Countries($http, oipaUrl, reportingOrganisationId) {
        console.log('countries called')
        var m = this;

        var Countries = {
            all: all,
        };

        return Countries;

        function all() {
            var url = oipaUrl + '/aggregate/?format=json&group_by=recipient-country&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }
    }
})();