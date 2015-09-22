/**
* Presentations
* @namespace ncs.presentations.services
*/
(function () {
	'use strict';

	angular
		.module('ncs.presentations.services')
		.factory('Presentations', Presentations);

	Presentations.$inject = ['$http'];

	/**
	* @namespace Presentations
	* @returns {Factory}
	*/
	function Presentations($http) {

		var Presentations = {
			all: all,
			create: create,
			get: get,
			getSingle: getSingle,
			deletePresentation: deletePresentation,
			update: update
		};

		return Presentations;

		////////////////////

	    /**
	    * @name all
	    * @desc Get all Presentations
	    * @returns {Promise}
	    * @memberOf ncs.presentations.services.Presentations
	    */
	    function all(filters) {
	    	var url = '/api/v1/presentations/?format=json';
	    	if(filters != undefined){
	    		url += filters;
	    	}
	    	return $http.get(url);
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
	    	return $http.post('/api/v1/presentations/', {
                name: content,
                projects: '',
                slide_set: []
            });
	    }

	    function update(presentation) {
            return $http.put('/api/v1/presentations/'+presentation.id+'/', presentation);
        }

	    /**
	     * @name get
	     * @desc Get the Presentations of a given user
	     * @param {string} username The username to get Presentations for
	     * @returns {Promise}
	     * @memberOf ncs.presentations.services.Presentations
	     */
	     function get(username) {
	     	return $http.get('/api/v1/accounts/' + username + '/presentations/');
	     }

	     /**
	     * @name get
	     * @desc Get the Presentations of a given user
	     * @param {string} username The username to get Presentations for
	     * @returns {Promise}
	     * @memberOf ncs.presentations.services.Presentations
	     */
	     function getSingle(id) {
	     	return $http.get('/api/v1/presentations/' + id + '/');
	     }

	     function deletePresentation(id){
	     	return $http.delete('/api/v1/presentations/' + id + '/');
	     }
	}
})();