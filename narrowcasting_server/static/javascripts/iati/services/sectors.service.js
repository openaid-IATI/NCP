(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('Sectors', Sectors);

    Sectors.$inject = ['$http', 'oipaUrl', 'reportingOrganisationId'];

    function Sectors($http, oipaUrl, reportingOrganisationId) {
        this.selectedSectors = [];
        var Sectors = {
            selectedSectors: this.selectedSectors,
            all: all
        };

        return Sectors;

        function all() {

            var url = oipaUrl + '/activity-aggregate-any/?format=json&group_by=sector&aggregation_key=iati-identifier';
            if(reportingOrganisationId){
                url += '&reporting_organisation__in=' + reportingOrganisationId;
            }
            return $http.get(url, { cache: true });
        }
    }
})();