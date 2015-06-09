(function () {
    'use strict';

    angular
        .module('ncs.iati.services')
        .factory('Budget', Budget);

    Budget.$inject = ['$http'];

    function Budget($http) {
        var m = this;
        m.budget = {
          on: false,
          value: []
        };
        m.toReset = false;
        

        var Budget = {
            budget: m.budget,
            toReset: m.toReset,
            all: all 
        };

        return Budget;

        function all() {
            return m.budget;
        }
    }
})();