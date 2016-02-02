"use strict";

var tn = namespace('ajsApp.pages.tree');
tn.$module = angular.module('ajsApp.pages.tree', [
    'ajsApp.services',
    'ajsApp.directives'
]).controller('treeCtrl',[
    '$scope','TreeData',
    function($scope, TreeData) {
        TreeData.getData().then(function(data){
            $scope.treeData = data;
        })
    }]);