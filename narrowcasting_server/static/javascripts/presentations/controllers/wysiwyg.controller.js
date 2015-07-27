/**
* WysiwygController
* @namespace ncs.presentations.controllers
*/

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('WysiwygController', WysiwygController);

  WysiwygController.$inject = ['$scope', 'Authentication', 'Snackbar', 'Slides', 'SlideImages', 'Upload'];

  /**
  * @namespace WysiwygController
  */
  function WysiwygController($scope, Authentication, Snackbar, Slides, SlideImages, Upload) {
    
    var vm = this;
    vm.slideType = 'iati'; // options; loading, content, iati, rsr
    vm.slide = {};
    vm.selectedField = '';
    vm.Slides = Slides;
    vm.optionFontSize = '18px';
    vm.optionColor = "#969696";
    vm.backgroundImage = [];
    vm.slideImages = {};

    vm.fontSize = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['font-size'] = vm.optionFontSize; 
    }

    vm.bold = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['font-weight'] = vm.slide.slideContent[vm.selectedField].cssStyle['font-weight'] == 'normal' ? 'bold' : 'normal'; 
    }

    vm.italic = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['font-style'] = vm.slide.slideContent[vm.selectedField].cssStyle['font-style'] == 'normal' ? 'italic' : 'normal'; 
    }

    vm.underline = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['text-decoration'] = vm.slide.slideContent[vm.selectedField].cssStyle['text-decoration'] == 'none' ? 'underline' : 'none'; 
    }

    vm.removeBackgroundImage = function(){
        SlideImages.deleteImage(vm.slideImages.mainImage.id);
        vm.slideImages.mainImage = null;
    }

    function activate(){

        $scope.$watch("vm.Slides.saveSlide", function (saveSlide) {
            if(saveSlide == true){
                vm.save();
                Slides.saveSlide = false;
            } 
        }, true);

        $scope.$watch("vm.Slides.currentSlide", function (slideId) {

            vm.slideType = 'loading';

            if(slideId > 0){
                Slides.getSingle(slideId).then(successFn, errorFn);
                SlideImages.get(slideId).then(imageSuccessFn, errorFn);
            }

            function successFn(data, status, headers, config) {
                data.data.slideContent = JSON.parse(data.data.slideContent);
                vm.slide = data.data;
                vm.slideType = data.data.source;
                vm.afterSlideLoad();
            }

            function imageSuccessFn(data, status, headers, config){
                var slideImages = {};
                for(var i = 0; i < data.data.length;i++){
                    slideImages[data.data[i].image_type] = data.data[i];
                }

                vm.slideImages = slideImages;
            }

            function errorFn(data, status, headers, config) {
                Snackbar.error(data.error);
            }

        }, true);

        $scope.$watch('vm.backgroundImage', function (backgroundImage) {
            if(backgroundImage != null){
                vm.uploadImage(backgroundImage);
            }
        });
    }

    activate();

    vm.afterSlideLoad = function(){
        // select first field of the slide and adjust editor to it
        
    }

    vm.changeFontSize = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['font-size'] = vm.optionFontSize;
    }

    vm.changeColor = function(){
        vm.slide.slideContent[vm.selectedField].cssStyle['color'] = vm.optionColor;
    }

    vm.selectField = function(fieldName){
        vm.selectedField = fieldName;
        vm.optionFontSize = vm.slide.slideContent[vm.selectedField].cssStyle['font-size'];
        vm.optionColor = vm.slide.slideContent[vm.selectedField].cssStyle['color'];
    }

    vm.save = function(){

        if(vm.slide.id != undefined){
            var previewData = JSON.parse(vm.slide.previewData);
            previewData.title = vm.slide.slideContent.title.text;
            vm.slide.previewData = JSON.stringify(previewData);
            Slides.update(vm.slide).then(succesFn, errorFn);
        }
        
        function succesFn(data, status, headers, config){
            Snackbar.show('Slide saved.');
        }

        function errorFn(data, status, headers, config){
            console.log(data);
            console.log(data.data);
        }
    }

    /********
    UPLOAD
    ********/
    vm.uploadImage = function (files) {
        if (files.length > 0){
            var file = files[0];
            Upload.upload({
                url: 'api/v1/slideImages/',
                fields: {
                    'slide': vm.slide.id,
                    'image_type': 'mainImage',
                },
                file: file,
                data: file,
            }).progress(function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            }).success(function (data, status, headers, config) {
                vm.slideImages[data.image_type] = data;
            }).error(function (data, status, headers, config) {
                console.log(data);
                console.log('error status: ' + status);
            });
        }
    }

  }
})();