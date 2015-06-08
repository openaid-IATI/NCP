/**
* CountriesController
* @namespace oipa.countries
*/
(function () {
  'use strict';

  angular
    .module('oipa.sectors')
    .controller('SectorListController', SectorListController);

  SectorListController.$inject = ['$scope', 'Aggregations', 'FilterSelection'];

  /**
  * @namespace CountriesExploreController
  */
  function SectorListController($scope, Aggregations, FilterSelection) {
    var vm = this;
    vm.filterSelection = FilterSelection;
    vm.sectors = [];
    vm.order_by = 'total_disbursements';
    vm.page_size = 5;
    vm.offset = 0;
    vm.totalActivities = 0;
    vm.pagination = {
        current: 1
    };
    vm.hasToContain = $scope.hasToContain;

    $scope.pageChanged = function(newPage) {
        vm.offset = (newPage * vm.page_size) - vm.page_size;
    };

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf oipa.activityStatus.ActivityStatusController
    */
    function activate() {
      // use predefined filters or the filter selection
      $scope.$watch("vm.filterSelection.selectionString", function (selectionString) {
          vm.update(selectionString);
      }, true);
    }

    vm.maxShown = function(){
      if(vm.offset + vm.page_size > vm.totalActivities){
        return vm.totalActivities;
      } else{
        return (vm.offset + vm.page_size);
      }
    }

    vm.update = function(selectionString){

      if(vm.hasToContain !== undefined){
        if(selectionString.indexOf(vm.hasToContain) < 0){
          return false;
        }
      }

      Aggregations.aggregation('sector', 'disbursement', selectionString + '&order_by=-total_disbursements').then(succesFn, errorFn);

      function succesFn(data, status, headers, config){
        vm.sectors = data.data;
        vm.totalActivities = vm.sectors.length;
      }

      function errorFn(data, status, headers, config){
        console.warn('error getting data for activity.list.block');
      }
    }

    activate();
  }
})();