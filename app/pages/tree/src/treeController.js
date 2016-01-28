"use strict";
angular.module('ajsApp.tree', [
    'ajsApp.directives.tree',
    'ajsApp.services',
    'ajsApp.services.data'
])
    .controller('treeCtrl',['$scope','TreeData', function($scope, TreeData) {
        TreeData.getData().then(function(data){
            $scope.treeData = data;
        })
    }]);