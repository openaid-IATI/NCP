(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('EditPresentationController', EditPresentationController);

  EditPresentationController.$inject = [
    '$rootScope', 
    '$scope',
    '$window', 
    '$location',
    '$state', 
    '$stateParams', 
    'Authentication', 
    'Snackbar', 
    'Presentations', 
    'IatiActivities', 
    'Slides', 
    'Countries', 
    'Regions', 
    'Sectors', 
    'FilterSelection', 
    'RsrProjects', 
    'RsrActivityStatuses', 
    'RsrFilterSelection', 
    'Upload'
  ];

  /**
  * @namespace EditPresentationController
  */
  function EditPresentationController($rootScope, $scope, $window, $location, $state, $stateParams, Authentication, Snackbar, Presentations, IatiActivities, Slides, Countries, Regions, Sectors, FilterSelection, RsrProjects, RsrActivityStatuses, RsrFilterSelection, Upload) {
    
    var vm = this;
    vm.view = 'rsr-select'; // options: iati-select / rsr-select / slide-wysiwyg / iati-select-regions / iati-select-countries / iati-select-sectors / iati-select-budget
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};
    vm.selectedProjects = [{id:'dummy'},{id:'dummy'},{id:'dummy'},{id:'dummy'},{id:'dummy'}];
    vm.saving = false;
    vm.backgroundImage = null;

    vm.editSlide = function(id, slideNr){
        Slides.currentSlide = vm.selectedProjects[id].id;
        Slides.slideNr = slideNr;
        Slides.saveSlide = true;
        vm.view = 'slide-wysiwyg';
    }

    vm.hoverProject =function(e){
        $(e.target).addClass('hoveredProject');
    }

    vm.hoverOutProject = function(e){
        $(e.target).removeClass('hoveredProject');
    }

    vm.goToProjects = function(){
        vm.saveSlide();
        vm.selectView('rsr-select');
    }

    vm.saveSlide = function(){
        if(vm.view = 'slide-wysiwyg'){
            Slides.saveSlide = true;
        }
    }

    vm.preview = function(){
        vm.saveSlide();
        setTimeout(function() {
            $window.open('preview/'+vm.presentationId+'/', '_blank');
        }, 500);
    }

    vm.onDropProjects = function(index){
        if(vm.saving){
            return false;
        }

        vm.save('change-slide');
        vm.addDummies();
    }

    vm.addDummies = function(){
        var dummyCount = 0;
        for(var i = 0;i < vm.selectedProjects.length;i++){
            if (vm.selectedProjects[i].id == 'dummy'){
                dummyCount++;
            }
        }

        for(var i = 0;i < (5 - dummyCount);i++){
            vm.selectedProjects.push({id:'dummy'});
        }
    }

    vm.selectView = function(view){
      vm.view = view;
    }

    vm.isSource = function(project, source){
        if(project.previewData != undefined){
           return (project.previewData.source == source) ? true: false; 
        } else {
            return false;
        }
    }
    
    vm.deleteSlide = function(index){

        var id = vm.selectedProjects[index]['id'];
        Slides.deleteSlide(id).then(succesFn, errorFn);

        function succesFn(data, status, headers, config){
            vm.selectedProjects[index] = {id:'dummy'}
        }
    }

    function errorFn(data, status, headers, config) {
        Snackbar.error(data.error);
    }

    function activate(){

        if (!Authentication.isAuthenticated()) {
            $location.url('/');
        }

        Presentations.getSingle(vm.presentationId).then(presentationSuccessFn, errorFn);

        function presentationSuccessFn(data, status, headers, config) {
            vm.presentation = data.data;
            
            for(var i = 0;i < vm.presentation.slide_set.length;i++){
                vm.presentation.slide_set[i]['previewData'] = JSON.parse(vm.presentation.slide_set[i]['previewData']);
                vm.selectedProjects[vm.presentation.slide_set[i]['position']] = vm.presentation.slide_set[i];
            }

            vm.addDummies();
        }
        vm.rsrActivate();
        vm.iatiActivate();
    }

    vm.publishToDisplay = function(){
        vm.saveSlide();
        vm.save('save-presentation');
    }

    vm.save = function(caller){

        if(vm.saving){
            return false;
        }

        vm.saving = true;

        vm.presentation.slide_set = [];

        for(var i = 0;i < vm.selectedProjects.length;i++){
            if (vm.selectedProjects[i]['previewData'] !== undefined){
                vm.presentation.slide_set.push({
                    'activity_id': vm.selectedProjects[i]['previewData']['id'],
                    'position': i,
                    'slideContent': '{}',
                    'previewData': JSON.stringify(vm.selectedProjects[i]['previewData']),
                    'source': vm.selectedProjects[i]['previewData']['source'],
                    'presentation': vm.presentationId
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

        if(caller == 'save-draft'){
            vm.presentation.status = 'draft';
        }

        if(caller == 'save-presentation'){
            vm.presentation.status = 'published';
        }

        Presentations.update(vm.presentation).then(successFn, errorFn);
        
        function successFn(data, status, headers, config){
            
            // set slide id in vm.selectedProjects
            var actSlideIdMap = {};

            for (var i = 0;i < data.data.slide_set.length;i++){
                actSlideIdMap[data.data.slide_set[i]['activity_id']] = data.data.slide_set[i]['id'];
            }

            for (var i = 0;i < vm.selectedProjects.length;i++){
                if(vm.selectedProjects[i]['id'] != 'dummy'){
                    vm.selectedProjects[i]['id'] = actSlideIdMap[vm.selectedProjects[i]['previewData']['id']];
                }
            }

            vm.saving = false;

            if(caller == 'save-draft'){
                $state.go('presentations');
            }
            
            if(caller == 'edit-presentation'){
                $state.go('presentations');
            }

            if(caller == 'save-presentation'){
                $state.go('displays');
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

        if(vm.saving){
            return false;
        }

        var added = false;
        var id = 0;
        var newSlide = {
            'activity_id': 'content-slide',
            'position': 0,
            'content': '{"title":"Empty content slide","subtitle":""}',
            'previewData': {
                'id': 'content-slide',
                'title': "Empty content slide",
                'source': 'content'
            },
            'source': 'content',
            'isPreviewed': true,
            'presentation': vm.presentationId,
        };

        for(var i = 0;i < vm.selectedProjects.length;i++){
            if(vm.selectedProjects[i]['id'] == 'dummy'){
                // make this the new content slide
                newSlide['position'] = i;
                newSlide['activity_id'] = newSlide['activity_id'] + '-' + newSlide['position'];
                newSlide['previewData']['id'] = newSlide['activity_id'];
                id = i;
                vm.selectedProjects[i] = newSlide;
                added = true;
                break;
            }
        }

        if(!added){
            newSlide['position'] = vm.selectedProjects.length;
            newSlide['activity_id'] = newSlide['activity_id'] + '-' + newSlide['position'];
            newSlide['previewData']['id'] = newSlide['activity_id'];
            // make new slide
            vm.selectedProjects[vm.selectedProjects.length] = newSlide;
            id = vm.selectedProjects.length;
        }

        vm.save('change-slide');
    }
    



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

    vm.iatiTextSearch = '';

    vm.iatiFilterSelection = FilterSelection;

    vm.iatiProjects = {
        'offset': 0,
        'activities': [],
        'totalActivities': 0,
        'orderBy': 'start_actual',
        'perPage': 6,
        'currentPage': 0,
        'loading': true
    };

    vm.iatiPageChanged = function(newPageNumber) {
        vm.iatiProjects.offset = ((newPageNumber * vm.iatiProjects.perPage) - vm.iatiProjects.perPage);
        IatiActivities.list(FilterSelection.selectionString, vm.iatiProjects.perPage, vm.iatiProjects.orderBy, vm.iatiProjects.offset).then(activitiesSuccessFn, errorFn);
    }

    function activitiesSuccessFn(data, status, headers, config) {
        for(var i = 0; i < data.data.objects.length; i++){
            data.data.objects[i] = {'previewData': {
                'id': data.data.objects[i]['id'],
                'title': data.data.objects[i]['titles'][0]['title'],
                'countries': data.data.objects[i]['countries'],
                'sectors': data.data.objects[i]['sectors'],
                'totalBudget': data.data.objects[i]['totalBudget'],
                'start_actual': data.data.objects[i]['start_actual'],
                'source': 'iati'
            }};
        }
        vm.iatiProjects.totalActivities = data.data.meta.total_count;
        vm.iatiProjects.activities = data.data.objects;

        vm.iatiProjects['loading'] = false;
    }

    vm.iatiActivate = function(){

        IatiActivities.list(FilterSelection.selectionString, vm.iatiProjects.perPage, vm.iatiProjects.orderBy, vm.iatiProjects.offset).then(activitiesSuccessFn, errorFn);

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
    }

    vm.showIatiProjects = function(){
        vm.view = 'iati-select';
        // check if filters changed, if so filter projects
        if(vm.updateSelectionString()){
            IatiActivities.list(FilterSelection.selectionString, vm.iatiProjects.perPage, vm.iatiProjects.orderBy, vm.iatiProjects.offset).then(activitiesSuccessFn, errorFn);
        }
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

      if(vm.iatiTextSearch != ''){
        selectList.push('&query='+vm.iatiTextSearch);
      }

      if(FilterSelection.selectionString != selectList.join('')){
        FilterSelection.selectionString = selectList.join('');

        vm.iatiProjects['loading'] = true;
        return true;
      } else {
        return false;
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


    /******** 
    RSR SPECIFIC

    TO DO: Move this to a separate controller 
    ********/ 


    vm.rsrActivityStatuses = [];
    vm.rsrSelectedActivityStatuses = [];
    vm.rsrTextSearch = '';
    vm.rsrFilterSelection = RsrFilterSelection;

    vm.rsrProjects = {
        'offset': 0,
        'activities': [],
        'totalActivities': 0,
        'orderBy': 'title',
        'perPage': 6,
        'currentPage': 1,
        'loading': true
    };

    vm.showRsrProjects = function(){
        vm.view = 'rsr-select';
        // check if filters changed, if so filter projects
        if(vm.updateRsrSelectionString()){
            vm.rsrProjects.currentPage = 1;
            RsrProjects.list(RsrFilterSelection.selectionString, vm.rsrProjects.perPage,  vm.rsrProjects.currentPage, vm.rsrProjects.orderBy).then(rsrProjectsSuccessFn, errorFn);
        }
    }

    vm.updateRsrSelectionString = function(){

      var selectList = [
        vm.selectArrayToString('status', 'id', vm.rsrSelectedActivityStatuses),
      ];

      if(vm.rsrTextSearch != ''){
        selectList.push('&title__icontains='+vm.rsrTextSearch);
      }

      if(RsrFilterSelection.selectionString != selectList.join('')){
        RsrFilterSelection.selectionString = selectList.join('').replace("status__in", "status");
        vm.rsrProjects['loading'] = true;
        return true;
      } else {
        return false;
      }
    }

    vm.rsrPageChanged = function(newPageNumber) {
        vm.rsrProjects.currentPage = newPageNumber;
        RsrProjects.list(RsrFilterSelection.selectionString, vm.rsrProjects.perPage,  vm.rsrProjects.currentPage, vm.rsrProjects.orderBy).then(rsrProjectsSuccessFn, errorFn);
    }

    function rsrProjectsSuccessFn(data, status, headers, config) {
        for(var i = 0; i < data.data.results.length; i++){
            data.data.results[i] = {'previewData': {
                'id': data.data.results[i]['id'],
                'title': data.data.results[i]['title'],
                'source': 'rsr'
            }};
        }

        vm.rsrProjects.totalActivities = data.data.count;
        vm.rsrProjects.activities = data.data.results;
        vm.rsrProjects['loading'] = false;
    }

    vm.rsrActivate = function(){

        RsrProjects.list(RsrFilterSelection.selectionString, vm.rsrProjects.perPage,  vm.rsrProjects.currentPage, vm.rsrProjects.orderBy).then(rsrProjectsSuccessFn, errorFn);
        vm.rsrActivityStatuses = RsrActivityStatuses.all();
    }

    activate();
  }
})();