"use strict";

var cn = namespace('ajsApp.services.ChartData');
cn.$module = angular.module('ajsApp.services.ChartData',[
]).service('ChartData',[
    '$http',
    function($http){
    var chartData = {};
    chartData.getData = function (id) {
        var path = 'api/dots';
        var data = $http({
            method: 'GET',
            url: path,
            params: {"id": id}
        }).then(function (resp) {
            return resp.data;
        });

        return data;
    };

    return chartData;
}]);