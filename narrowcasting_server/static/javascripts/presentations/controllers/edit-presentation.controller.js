/**
* NewPresentationController
* @namespace ncs.presentations.controllers
*/

var test = '';

(function () {
  'use strict';

  angular
    .module('ncs.presentations.controllers')
    .controller('EditPresentationController', EditPresentationController);

  EditPresentationController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Presentations', '$stateParams', 'Activities', 'Countries', 'Regions', 'Sectors', 'FilterSelection'];

  /**
  * @namespace EditPresentationController
  */
  function EditPresentationController($rootScope, $scope, Authentication, Snackbar, Presentations, $stateParams, Activities, Countries, Regions, Sectors, FilterSelection) {
    
    var vm = this;
    vm.view = 'iati-select'; // options: iati-select / rsr-select / presentation-wysiwyg / iati-select-regions / iati-select-countries / iati-select-sectors / iati-select-budget
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};
    vm.iatiRegions = [];
    vm.iatiCountries = [];
    vm.iatiSectors = [];
    vm.iatiBudget = [];
    vm.iatiProjects = [];

    vm.iatiRecipientRegions = [];
    vm.iatiSelectedRegions = Regions.selectedRegions;

    vm.iatiRecipientCountries = [];
    vm.iatiSelectedCountries = Regions.selectedCountries;

    vm.iatiRecipientSectors = [];
    vm.iatiSelectedSectors = Regions.selectedSectors;

    vm.iatiBudgetOn = false;
    vm.iatiBudgetValue = [];

    vm.selectedProjects = [0,1,2,3,4];

    vm.slideId = 0;

    vm.slide = {
        header: {
            text: 'Accountability and transparency in Kenya',
            style: {
                'font-size': '27px',
                'color': '#000',
                'font-weight': 'bold', // normal, bold
                'font-style': 'normal', // normal, italic
                'text-decoration': 'none' // none, underline, uppercase
            }
        },
        hashtag: '#AKVO',
        subHeader: 'For a transparent and corruption free kenya',
        mainImage: '/static/images/mainimage.png',
        backgroundImage: '',
        goals: 'Institutions that are efficient and deliver quality services. A society that upholds and promotes integrity.',
        description: 'Support to transparency international (TI) as they implement their priorities in six key areas (water, education, humanitarian aid, climate finance governance, police & extractive industries)',
        startDate: '01 DEC 2012',
        endDate: '30 NOV 2017',
        projectUpdates: [
            {
                postDate: '11 MAY 2015',
                by: 'Collins Baswony',
                title: 'Egislative advocacy in kenya',
                image: ''
            },
            {
                postDate: '16 JAN 2015',
                by: 'Collins Baswony',
                title: 'TI-Kenya, Partners conduct public awareness drive',
                image: ''
            },
        ],
    };

    vm.bold = function(){
        vm.slide.header.style['font-weight'] = vm.slide.header.style['font-weight'] == 'normal' ? 'bold' : 'normal'; 
    }

    vm.italic = function(){
        vm.slide.header.style['font-style'] = vm.slide.header.style['font-style'] == 'normal' ? 'italic' : 'normal'; 
    }

    vm.underline = function(){
        vm.slide.header.style['text-decoration'] = vm.slide.header.style['text-decoration'] == 'none' ? 'underline' : 'none'; 
    }

    vm.editSlide = function(id){
        vm.slide.header.text = vm.selectedProjects[id].titles[0].title;
        vm.view = 'slide-wysiwyg';

    }



    vm.copiedProject = function(i, project){
        // check if empty or a real project
        if(typeof project == 'object'){
            vm.selectedProjects[i]['status'] = 'loading-data';
            vm.loadProjectData(i, vm.selectedProjects[i]);
        }
    }

    vm.loadProjectData = function(i, project){
        // get single project from call (by type)
        Activities.get(project.id).then(succesFn, errorFn);

        function succesFn(data, status, headers, config){
            setTimeout(function(){ 
                $scope.$apply(function () {
                    vm.selectedProjects[i]['mapping_data'] = data.data;
                    vm.selectedProjects[i]['status'] = 'mapping-data';
                    vm.mapProjectData(i);
                });
            }, 500);
        }

        function errorFn(){
            Snackbar.error("Mapping data failed");
        }
        // put it in the object, change object status, map to presentation
    }

    vm.mapProjectData = function(i){
        setTimeout(function(){ 
            $scope.$apply(function () {
                vm.selectedProjects[i]['status'] = 'preview-data';
            });
        }, 1000);
    }

    function activate(){
        Presentations.getSingle(vm.presentationId).then(presentationSuccessFn, errorFn);
        Regions.all().then(regionsSuccessFn, errorFn);
        Countries.all().then(countriesSuccessFn, errorFn);
        Sectors.all().then(sectorsSuccessFn, errorFn);
        Activities.list('', '6').then(activitiesSuccessFn, errorFn);

        function errorFn(data, status, headers, config) {
            Snackbar.error(data.error);
        }

        function presentationSuccessFn(data, status, headers, config) {
            vm.presentation = data.data;
        }

        function regionsSuccessFn(data, status, headers, config) {
            vm.recipientRegions = data.data;
        }

        function countriesSuccessFn(data, status, headers, config) {
            vm.recipientCountries = data.data;
        }

        function sectorsSuccessFn(data, status, headers, config) {
            vm.recipientSectors = data.data;
        }

        function activitiesSuccessFn(data, status, headers, config) {
            vm.iatiProjects = data.data.objects;
        }
    }

    activate();

    function save(){
        // check if all projects have been checked on the preview mode

        // save data

        // to do: check out how we'll save images
    }

    vm.selectView = function(view){
      vm.view = view;
    }

  }
})();