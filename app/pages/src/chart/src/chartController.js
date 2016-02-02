"use strict";

var cn = namespace('ajsApp.pages.chart');
cn.$module = angular.module('ajsApp.pages.chart', [
        'ajsApp.directives',
        'ajsApp.services'
    ])
    .controller('chartCtrl', [ '$scope', '$state', '$rootScope', '$interval','ChartData',
        function($scope, $state, $rootScope,$interval, ChartData) {
            var getData = function () {
                if($scope.chart){
                    var lastId = $scope.chart.getLastDotId();

                    ChartData.getData(lastId).then(function (data) {
                        $scope.chart.setDots(data);
                    });
                }
            };
            getData();

            var dataChecker = $interval(getData, 3000);

            $scope.$on('$stateChangeStart', function(){
                $interval.cancel(dataChecker);
            });
        }
    ]);


