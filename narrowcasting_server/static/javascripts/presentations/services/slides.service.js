/**
* Slides
* @namespace ncs.Slides.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.presentations.services')
        .factory('Slides', Slides);

    Slides.$inject = ['$http'];

    /**
    * @namespace Presentations
    * @returns {Factory}
    */
    function Slides($http) {

        var m = this;
        m.currentSlide = 0;
        m.saveSlide = false;
        m.slideNr = 1;

        var Slides = {
            all: all,
            create: create,
            update: update,
            get: get,
            getSingle: getSingle,
            deleteSlide: deleteSlide,
            currentSlide: m.currentSlide,
            saveSlide: m.saveSlide,
            slideNr: m.slideNr
        };

        return Slides;

        ////////////////////

        /**
        * @name all
        * @desc Get all Presentations
        * @returns {Promise}
        * @memberOf ncs.presentations.services.NcpActivities
        */
        function all() {
            return $http.get('/api/v1/slides/');
        }

        function update(slide) {
            // console.log(slide.slideContent.title);
            // slide.slideContent = JSON.stringify(slide.slideContent);
            return $http.put('/api/v1/slides/'+slide.id+'/', slide);
        }

        /**
        * @name create
        * @desc Create a new Presentation
        * @param {string} name The name of the new Presentation
        * @param {string} projects The projects of the new Presentation
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Presentations
        */
        function create(slide) {
            return $http.post('/api/v1/slides/', slide);
        }

        /**
         * @name get
         * @desc Get the Presentations of a given user
         * @param {string} username The username to get Presentations for
         * @returns {Promise}
         * @memberOf ncs.presentations.services.Presentations
         */
         function get(presentation_id) {
            return $http.get('/api/v1/presentation/' + presentation_id + '/activities/');
         }

         /**
         * @name get
         * @desc Get the Presentations of a given user
         * @param {string} username The username to get Presentations for
         * @returns {Promise}
         * @memberOf ncs.presentations.services.Presentations
         */
         function getSingle(id) {
            return $http.get('/api/v1/slides/' + id + '/');
         }

         /**
        * @name create
        * @desc Create a new Presentation
        * @param {string} name The name of the new Presentation
        * @param {string} projects The projects of the new Presentation
        * @returns {Promise}
        * @memberOf ncs.presentations.services.Presentations
        */
        function deleteSlide(id) {
            return $http.delete('/api/v1/slides/' + id + '/');
        }
    }
})();