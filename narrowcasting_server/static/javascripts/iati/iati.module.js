(function () {
    'use strict';

    angular
        .module('ncs.iati', [
            'ncs.iati.controllers',
            'ncs.iati.directives',
            'ncs.iati.services',
            'ncs.iati.constants'
        ]);
    
    angular
        .module('ncs.iati.controllers', []);

    angular
        .module('ncs.iati.directives', []);

    angular
        .module('ncs.iati.services', []);

    angular
        .module('ncs.iati.constants', []);

    angular
        .module('ncs.iati.constants')
        .constant('oipaUrl', 'http://149.210.176.175/api/v3')
        .constant('reportingOrganisationId', 'NL-1');

})();
