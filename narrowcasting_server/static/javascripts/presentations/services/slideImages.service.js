/**
* Slides
* @namespace ncs.Slides.services
*/
(function () {
    'use strict';

    angular
        .module('ncs.presentations.services')
        .factory('SlideImages', SlideImages);

    SlideImages.$inject = ['$http'];

    /**
    * @namespace Presentations
    * @returns {Factory}
    */
    function SlideImages($http) {

        var m = this;
        m.currentSlide = 0;
        m.saveSlide = false;
        m.slideNr = 1;

        var SlideImages = {
            get: get,
            deleteImage: deleteImage
        };

        return SlideImages;

        ////////////////////

        /**
        * @name get
        * @desc Get all images of a slide
        * @returns {Promise}
        * @memberOf ncs.presentations.services.NcpActivities
        */
         function get(slide_id) {
            return $http.get('/api/v1/slideImages/?slide=' + slide_id);
         }

         function deleteImage(id){
            return $http.delete('/api/v1/slideImages/'+id+'/');
         }
    }
})();