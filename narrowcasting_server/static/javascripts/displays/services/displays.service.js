/**
* Presentations
* @namespace ncs.presentations.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.displays.services')
        .factory('Displays', Displays);

    Displays.$inject = ['$http'];

    /**
    * @namespace Presentations
    * @returns {Factory}
    */
    function Displays($http) {

        var Displays = {
            all: all,
            create: create,
            get: get,
            getSingle: getSingle
        };

        return Displays;

        ////////////////////

        /**
        * @name all
        * @desc Get all Displays
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Displays
        */
        function all() {
            return $http.get('/api/v1/displays/');
        }

        /**
        * @name create
        * @desc Create a new Display
        * @param {string} name The name of the new Display
        * @param {string} projects The projects of the new Display
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Displays
        */
        function create(name) {
            return $http.post('/api/v1/displays/', {
                name: name,
                unlock_key: false,
                unlocked: false,
                presentation: null
            });
        }

        /**
         * @name get
         * @desc Get the Displays of a given user
         * @param {string} username The username to get Displays for
         * @returns {Promise}
         * @memberOf ncs.presentations.services.Displays
         */
         function get(username) {
            return $http.get('/api/v1/accounts/' + username + '/displays/');
         }

         /**
         * @name get
         * @desc Get the Displays of a given user
         * @param {string} username The username to get Displays for
         * @returns {Promise}
         * @memberOf ncs.presentations.services.Displays
         */
         function getSingle(id) {
            return $http.get('/api/v1/displays/' + id + '/');
         }
    }
})();