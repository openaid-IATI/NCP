(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('Regions', Regions);

    Regions.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    function Regions($http, oipaUrl, reportingOrganisationId) {
        var m = this;
        m.selectedRegions = [];
        
        var Regions = {
            selectedRegions: m.selectedRegions,
            all: all
        };

        return Regions;

        function all() {

            var url = oipaUrl + '/activity-aggregate-any/?format=json&group_by=recipient-region&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }
    }
})();