angular.module('ajsApp.services.data', []).factory('ChartData',['$http',function($http){
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
    }

    return chartData;
}]).factory('TreeData',['$http',function($http){
    var treeData = {};
    treeData.getData = function () {
        var path = 'api/tree';
        var data = $http({
            method: 'GET',
            url: path,
        }).then(function (resp) {
            return resp.data;
        });

        return data;
    }

    return treeData;
}])