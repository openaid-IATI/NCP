/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('EditPresentationController', EditPresentationController);

  EditPresentationController.$inject = ['$rootScope', '$scope', '$stateParams', 'Authentication', 'Snackbar', 'Presentations', 'IatiActivities', 'Slides', 'Countries', 'Regions', 'Sectors', 'FilterSelection'];

  /**
  * @namespace EditPresentationController
  */
  function EditPresentationController($rootScope, $scope, $stateParams, Authentication, Snackbar, Presentations, IatiActivities, Slides, Countries, Regions, Sectors, FilterSelection) {
    
    var vm = this;
    vm.view = 'iati-select'; // options: iati-select / rsr-select / slide-wysiwyg / iati-select-regions / iati-select-countries / iati-select-sectors / iati-select-budget
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};
    vm.selectedProjects = [{id:'dummy'},{id:'dummy'},{id:'dummy'},{id:'dummy'},{id:'dummy'}];

    vm.editSlide = function(id){
        Slides.currentSlide = vm.selectedProjects[id].id;
        Slides.saveSlide = true;
        vm.view = 'slide-wysiwyg';
    }

    vm.onDropProjects = function(index){
        vm.save('change-slide');
    }

    vm.selectView = function(view){
      vm.view = view;
    }

    function errorFn(data, status, headers, config) {
        Snackbar.error(data.error);
    }

    function activate(){
        Presentations.getSingle(vm.presentationId).then(presentationSuccessFn, errorFn);

        function presentationSuccessFn(data, status, headers, config) {
            vm.presentation = data.data;
            
            for(var i = 0;i < vm.presentation.slide_set.length;i++){
                vm.presentation.slide_set[i]['previewData'] = JSON.parse(vm.presentation.slide_set[i]['previewData']);
                vm.selectedProjects[vm.presentation.slide_set[i]['position']] = vm.presentation.slide_set[i];
            }
        }

        vm.iatiActivate();
    }

    vm.save = function(caller){

        vm.presentation.slide_set = [];

        for(var i = 0;i < vm.selectedProjects.length;i++){
            if (vm.selectedProjects[i]['previewData'] !== undefined){
                vm.presentation.slide_set.push({
                    'activity_id': vm.selectedProjects[i]['previewData']['id'],
                    'position': i,
                    'content': 'unused',
                    'previewData': JSON.stringify(vm.selectedProjects[i]['previewData']),
                    'source': vm.selectedProjects[i]['previewData']['source'],
                });
            }
        }

        var throwError = false;
        if(caller == 'edit-presentation'){
            // check if all projects have been checked on the preview mode
            for(var i = 0;i < vm.presentation.slide_set.length;i++){
                if (typeof vm.presentation.slide_set[i] == 'object'){
                    if(vm.presentation.slide_set[i]['isPreviewed'] != true){
                        // show warning; not all slides have been previewed, are you sure you want to continue? 
                        throwError = true;
                    }
                }
            }
        }
        // if on a slide, save the slide first
        if(vm.view == 'slide-wysiwyg'){
            Slides.saveSlide = true;
        }

        Presentations.update(vm.presentation).then(successFn, errorFn);
        
        function successFn(data, status, headers, config){
            // set slide id in vm.selectedProjects
            console.log(data);

            var actSlideIdMap = {};

            for (var i = 0;i < data.data.slide_set.length;i++){
                actSlideIdMap[data.data.slide_set[i]['activity_id']] = data.data.slide_set[i]['id'];
            }

            for (var i = 0;i < vm.selectedProjects.length;i++){
                console.log(vm.selectedProjects[i]);
                if(vm.selectedProjects[i]['id'] != 'dummy'){
                    vm.selectedProjects[i]['id'] = actSlideIdMap[vm.selectedProjects[i]['previewData']['id']];
                }
            }

            if(caller == 'edit-presentation'){
                window.location = '/presentations/';
            }
        }

        function errorFn(data, status, headers, config){
            console.log(data);
            console.log(data.data);
            console.log(status);
        }
    }

    /********
    
    ********/

    vm.addEmptySlide = function(){

        var added = false;
        var newSlide = {
            'id': 'shouldthisbeset',
            'title': '',
            'description': '',
            'source': 'content'
        }

        for(var i = 0;i < vm.selectedProjects.length;i++){
            if(vm.selectedProjects[i]['id'] == 'dummy'){
                // make this the new content slide
                added = true;
                break;
            }
        }

        if(!added){
            // make new slide
            vm.selectedProjects[vm.selectedProjects.length] = {

            }
        }

    }

    vm.create



    /******** 
    IATI SPECIFIC

    TO DO: Move this to a separate controller 
    ********/ 
    vm.iatiRecipientRegions = [];
    vm.iatiSelectedRegions = [];

    vm.iatiRecipientCountries = [];
    vm.iatiSelectedCountries = [];

    vm.iatiRecipientSectors = [];
    vm.iatiSelectedSectors = [];

    vm.iatiBudgetOn = false;
    vm.iatiBudgetValue = [];

    vm.iatiFilterSelection = FilterSelection;

    vm.iatiProjects = {
        'offset': 0,
        'activities': [],
        'totalActivities': 0,
        'orderBy': 'start_actual',
        'perPage': 6,
        'currentPage': 0
    }

    vm.iatiPageChanged = function(newPageNumber) {
        vm.iatiProjects.offset = ((newPageNumber * vm.iatiProjects.perPage) - vm.iatiProjects.perPage);
        IatiActivities.list(FilterSelection.selectionString, vm.iatiProjects.perPage, vm.iatiProjects.orderBy, vm.iatiProjects.offset).then(activitiesSuccessFn, errorFn);
    };

    function activitiesSuccessFn(data, status, headers, config) {
        for(var i = 0; i < data.data.objects.length; i++){
            data.data.objects[i] = {'previewData': data.data.objects[i]};
            data.data.objects[i]['previewData']['source'] = 'iati';
        }
        vm.iatiProjects.totalActivities = data.data.meta.total_count;
        vm.iatiProjects.activities = data.data.objects;
    }

    vm.iatiActivate = function(){

        Regions.all().then(regionsSuccessFn, errorFn);
        Countries.all().then(countriesSuccessFn, errorFn);
        Sectors.all().then(sectorsSuccessFn, errorFn);

        function regionsSuccessFn(data, status, headers, config) {
            vm.iatiRecipientRegions = data.data;
        }

        function countriesSuccessFn(data, status, headers, config) {
            vm.iatiRecipientCountries = data.data;
        }

        function sectorsSuccessFn(data, status, headers, config) {
            vm.iatiRecipientSectors = data.data;
        }

        $scope.$watch("vm.iatiSelectedCountries", function (){
            vm.updateSelectionString();
        }, true);

        $scope.$watch("vm.iatiSelectedRegions", function (){
            vm.updateSelectionString();
        }, true);

        $scope.$watch("vm.iatiSelectedSectors", function (){
            vm.updateSelectionString();
        }, true);

        $scope.$watch("vm.currentSelection", function (currentSelection) {
            console.log('watch current selection');
            IatiActivities.list(FilterSelection.selectionString, vm.iatiProjects.perPage, vm.iatiProjects.orderBy, vm.iatiProjects.offset).then(activitiesSuccessFn, errorFn);
        }, true);
        
    }

    vm.updateSelectionString = function(){
      
      var selectList = [
        vm.selectArrayToString('countries', 'country_id', vm.iatiSelectedCountries),
        vm.selectArrayToString('regions', 'region_id', vm.iatiSelectedRegions),
        vm.selectArrayToString('sectors', 'sector_id', vm.iatiSelectedSectors),
      ];

      if(vm.iatiBudgetOn){
        selectList.push('&total_budget__gt='+vm.iatiBudgetValue[0]+'&total_budget__lt='+vm.iatiBudgetValue[1]);
      }
      if(FilterSelection.selectionString != selectList.join('')){
        FilterSelection.selectionString = selectList.join('');
      }
    }

    vm.selectArrayToString = function(header, id_slug, arr){

      var headerName = '';
      var list = [];

      if(arr.length > 0){
        headerName = '&' + header + '__in=';
        for(var i = 0; i < arr.length; i++){
            list.push(arr[i][id_slug]);
        }
      }

      return headerName + list.join(',');
    }


    activate();
  }
})();