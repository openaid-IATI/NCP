(function () {
    'use strict';

    angular
        .module('ncs.rsr.services')
        .factory('RsrActivityStatuses', RsrActivityStatuses);

    RsrActivityStatuses.$inject = ['$http'];

    function RsrActivityStatuses($http) {
        var m = this;

        var RsrActivityStatuses = {
            all: all,
        };

        return RsrActivityStatuses;

        function all() {

            var activity_statuses = [];
            activity_statuses.push({'id': 'N', 'name': 'None'});
            activity_statuses.push({'id': 'H', 'name': 'Needs funding'});
            activity_statuses.push({'id': 'A', 'name': 'Active'});
            activity_statuses.push({'id': 'C', 'name': 'Complete'});
            activity_statuses.push({'id': 'L', 'name': 'Cancelled'});
            activity_statuses.push({'id': 'R', 'name': 'Archived'});

            return activity_statuses;
        }
    }
})();
