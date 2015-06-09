/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('FilterSelection', FilterSelection);

    FilterSelection.$inject = ['$http', 'reportingOrganisationId'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function FilterSelection($http, reportingOrganisationId) {
        var m = this;
        m.selectionString = '';
        m.toSave = false;
        m.toReset = false;
        
        var FilterSelection = {
            toSave: m.toSave,
            toReset: m.toReset,
            selectionString: m.selectionString
        };

        return FilterSelection;
    }
})();