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

  EditPresentationController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Presentations', '$stateParams', 'Countries', 'Regions', 'Sectors', 'FilterSelection'];

  /**
  * @namespace EditPresentationController
  */
  function EditPresentationController($rootScope, $scope, Authentication, Snackbar, Presentations, $stateParams, Countries, Regions, Sectors, FilterSelection) {
    
    var vm = this;
    vm.view = 'iati-select'; // options: iati-select / rsr-select / presentation-wysiwyg
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};
    vm.iatiRegions = [];
    vm.iatiCountries = [];
    vm.iatiSectors = [];
    vm.iatiBudget = [];

    vm.iatiRecipientRegions = [];
    vm.iatiSelectedRegions = Regions.selectedRegions;

    vm.iatiRecipientCountries = [];
    vm.iatiSelectedCountries = Regions.selectedCountries;

    vm.iatiRecipientSectors = [];
    vm.iatiSelectedSectors = Regions.selectedSectors;

    vm.iatiBudgetOn = false;
    vm.iatiBudgetValue = [];

    vm.selectedProjects = [];

    vm.copiedProject = function(index){
        var project = vm.projects[index];
        // find in left list
        for(var i = 0;i < vm.selectedProjects.length;i++){
            if(project['id'] == vm.selectedProjects[i]['id']){
                vm.selectedProjects[i]['status'] = 'loading';
                vm.loadProjectData(project['id']);
                break;
            }
        }
    }

    vm.loadProjectData = function(){
        // get single project from call (by type)

        // put it in the object, change object status, map to presentation
    }

    function activate(){
        Presentations.getSingle(vm.presentationId).then(presentationSuccessFn, errorFn);
        Regions.all().then(regionsSuccessFn, errorFn);
        Countries.all().then(countriesSuccessFn, errorFn);
        Sectors.all().then(sectorsSuccessFn, errorFn);

        function errorFn(data, status, headers, config) {
            Snackbar.error("call failed");
            console.log(status);
            console.log(data);
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





    // temp to fill template
    vm.projects = [
        {
            'id': 'abc1',
            'title': 'DHA STD/leg. empowerment women',
            'country': 'Bangladesh',
            'sector': "Women's equality organisations and institutions",
            'budget': 'EUR 1.842.328',
            'start_date': '2002-04-30'
        },
        {
            'id': 'abc2',
            'title': 'DVB SF Afghanistan - ASP',
            'country': 'Afghanistan',
            'sector': "Post-conflict peace-building (UN)",
            'budget': 'EUR 4.000.000',
            'start_date': '2004-07-01'
        },
        {
            'id': 'abc4',
            'title': 'DSI Subsidie CNV 2005-2008',
            'country': '',
            'sector': "Multisector aid",
            'budget': 'EUR 21.723.189',
            'start_date': '2004-09-01'
        },
        {
            'id': 'abc5',
            'title': 'HAR Block Human Rights',
            'country': 'Zimbabwe',
            'sector': "Human rights",
            'budget': 'EUR 938.000',
            'start_date': '2004-07-01'
        },
        {
            'id': 'abc1fef',
            'title': 'MNG broad access fin serv',
            'country': 'Nicaragua',
            'sector': "Formal sector financial intermediaries",
            'budget': 'EUR 749.047',
            'start_date': '2005-08-01'
        },
        {
            'id': 'aabc1',
            'title': 'DAR Health sector co-funding',
            'country': 'Tanzania, united republic of',
            'sector': "Basic health care",
            'budget': 'EUR 21.926.263',
            'start_date': '2004-07-01'
        },
        {
            'id': 'abcaa1',
            'title': 'MNG broad access fin serv',
            'country': 'Nicaragua',
            'sector': "Formal sector financial intermediaries",
            'budget': 'EUR 749.047',
            'start_date': '2005-08-01'
        },
        {
            'id': 'abwefc1',
            'title': 'DAR Health sector co-funding',
            'country': 'Tanzania, united republic of',
            'sector': "Basic health care",
            'budget': 'EUR 21.926.263',
            'start_date': '2004-07-01'
        },
    ];

  }
})();