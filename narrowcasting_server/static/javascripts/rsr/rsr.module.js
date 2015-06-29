(function () {
    'use strict';

    angular
        .module('ncs.rsr', [
            'ncs.rsr.controllers',
            'ncs.rsr.directives',
            'ncs.rsr.services',
            'ncs.rsr.constants'
        ]);
    
    angular
        .module('ncs.rsr.controllers', []);

    angular
        .module('ncs.rsr.directives', []);

    angular
        .module('ncs.rsr.services', []);

    angular
        .module('ncs.rsr.constants', []);

    angular
        .module('ncs.rsr.constants')
        .constant('oipaUrl', 'http://149.210.176.175/api/v3')
        .constant('reportingOrganisationId', 'NL-1');

})();
