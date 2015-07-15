/**
* Posts
* @namespace ncs.collections.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.rsr.services')
        .factory('RsrFilterSelection', RsrFilterSelection);

    RsrFilterSelection.$inject = ['$http'];

    /**
    * @namespace Filters
    * @returns {Factory}
    */
    function RsrFilterSelection($http) {
        var m = this;
        m.selectionString = '';
        m.toSave = false;
        m.toReset = false;
        
        var RsrFilterSelection = {
            toSave: m.toSave,
            toReset: m.toReset,
            selectionString: m.selectionString
        };

        return RsrFilterSelection;
    }
})();