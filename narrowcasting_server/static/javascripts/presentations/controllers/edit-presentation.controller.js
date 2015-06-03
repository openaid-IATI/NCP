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

  EditPresentationController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Presentations', '$stateParams'];

  /**
  * @namespace EditPresentationController
  */
  function EditPresentationController($rootScope, $scope, Authentication, Snackbar, Presentations, $stateParams) {
    
    var vm = this;
    vm.view = 'iati-select'; // options: iati-select / rsr-select / presentation-wysiwyg
    vm.presentationId = $stateParams.presentation_id;
    vm.presentation = {};

    // temp to fill template
    vm.projects = [
        {
            'title': 'DHA STD/leg. empowerment women',
            'country': 'Bangladesh',
            'sector': "Women's equality organisations and institutions",
            'budget': 'EUR 1.842.328',
            'start_date': '2002-04-30'
        },
        {
            'title': 'DVB SF Afghanistan - ASP',
            'country': 'Afghanistan',
            'sector': "Post-conflict peace-building (UN)",
            'budget': 'EUR 4.000.000',
            'start_date': '2004-07-01'
        },
        {
            'title': 'DSI Subsidie CNV 2005-2008',
            'country': '',
            'sector': "Multisector aid",
            'budget': 'EUR 21.723.189',
            'start_date': '2004-09-01'
        },
        {
            'title': 'HAR Block Human Rights',
            'country': 'Zimbabwe',
            'sector': "Human rights",
            'budget': 'EUR 938.000',
            'start_date': '2004-07-01'
        },
        {
            'title': 'MNG broad access fin serv',
            'country': 'Nicaragua',
            'sector': "Formal sector financial intermediaries",
            'budget': 'EUR 749.047',
            'start_date': '2005-08-01'
        },
        {
            'title': 'DAR Health sector co-funding',
            'country': 'Tanzania, united republic of',
            'sector': "Basic health care",
            'budget': 'EUR 21.926.263',
            'start_date': '2004-07-01'
        },
        {
            'title': 'MNG broad access fin serv',
            'country': 'Nicaragua',
            'sector': "Formal sector financial intermediaries",
            'budget': 'EUR 749.047',
            'start_date': '2005-08-01'
        },
        {
            'title': 'DAR Health sector co-funding',
            'country': 'Tanzania, united republic of',
            'sector': "Basic health care",
            'budget': 'EUR 21.926.263',
            'start_date': '2004-07-01'
        },
    ];


    function activate(){
        // get presentation
        Presentations.getSingle(vm.presentationId).then(presentationSuccessFn, presentationErrorFn);

        function presentationSuccessFn(data, status, headers, config) {
          vm.presentation = data.data;
          console.log(vm.presentation);
        }

        function presentationErrorFn(data, status, headers, config) {
          Snackbar.error(data.error);
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