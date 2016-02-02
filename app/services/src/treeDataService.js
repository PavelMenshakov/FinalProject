"use strict";

var tn = namespace('ajsApp.services.TreeData');
tn.$module = angular.module('ajsApp.services.TreeData',[
]).service('TreeData',[
    '$http',
    function($http){
    var treeData = {};
    treeData.getData = function () {
        var path = 'api/tree';
        var data = $http({
            method: 'GET',
            url: path
        }).then(function (resp) {
            return resp.data;
        });

        return data;
    };

    return treeData;
}]);