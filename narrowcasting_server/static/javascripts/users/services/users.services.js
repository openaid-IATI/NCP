/**
* Presentations
* @namespace ncs.presentations.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.presentations.services')
        .factory('Users', Users);

    Users.$inject = ['$http'];

    /**
    * @namespace Presentations
    * @returns {Factory}
    */
    function Users($http) {

        var Users = {
            all: all,
            create: create,
            getSingle: getSingle
        };

        return Users;

        ////////////////////

        /**
        * @name all
        * @desc Get all Presentations
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Presentations
        */
        function all() {
            return $http.get('/api/v1/users/');
        }

        /**
        * @name create
        * @desc Create a new Presentation
        * @param {string} name The name of the new Presentation
        * @param {string} projects The projects of the new Presentation
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Presentations
        */
        function create(content) {
            return $http.post('/api/v1/users/', {
                name: content,
                projects: '',
            });
        }

         /**
         * @name get
         * @desc Get the Presentations of a given user
         * @param {string} username The username to get Presentations for
         * @returns {Promise}
         * @memberOf ncs.presentations.services.Presentations
         */
         function getSingle(id) {
            return $http.get('/api/v1/users/' + id + '/');
         }
    }
})();