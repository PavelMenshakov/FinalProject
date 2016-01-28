"use strict";

var app = angular.module('ajsApp.directives.chart',[
    'ajsApp.services',
    'ngAnimate'
]);


app.directive('customChart', function ($window) {
    function Chart(width, height, strokes) {
        this.dots = [];
        this.padding = 30;
        this.meterageX = [];
        this.meterageY = [];
        this.distanceX = 0;
        this.distanceY = 0;
        this.minX = 0;
        this.minY = 0;
        this.strokes = [];
        this.width = width || 100;
        this.height = height || 100;
        this.setStrokes(strokes);
        this.arrows = this.setArrows();
    }

    Chart.prototype.setStrokes = function(strokes){
        this.strokes = strokes ? strokes : [
            new Stroke(this.padding, this.height - this.padding, this.width - this.padding, this.height - this.padding),
            new Stroke(this.padding, this.height - this.padding, this.padding, this.padding)
        ]};

    Chart.prototype.setArrows = function() {
        this.arrows = [new RightArrow(this.strokes[0]), new UpArrow(this.strokes[1])];
    };

    Chart.prototype.resize = function(width, height){
        this.width = width;
        this.height = height;
        this.setStrokes();
        this.setArrows();
    };

    Chart.prototype.setDots = function(dots) {
        if (dots.length > 0) {
            var tempDots = this.dots.concat(dots).slice(-25);
            var me = this, maxX = tempDots[0].x, maxY = tempDots[0].y,
                minX = tempDots[0].x,
                minY = tempDots[0].y;
            tempDots.forEach(function (dot) {
                if (dot.x > maxX) {
                    maxX = dot.x;
                }
                if (dot.y > maxY) {
                    maxY = dot.y;
                }
                if (dot.x < minX) {
                    minX = dot.x;
                }
                if (dot.y < minY) {
                    minY = dot.y;
                }
            });

            me.distanceX = maxX - minX === 0 ? maxX : maxX - minX;
            me.distanceY = maxY - minY === 0 ? maxY : maxY - minY;
            me.minX = minX;
            me.minY = minY;

            me.meterageX = [];
            me.meterageY = [];
            for(var i = 1; i<11; i++){
                me.meterageX.push(Math.round(((me.distanceX/10)*i + minX)*10)/10);
                me.meterageY.push(Math.round(((me.distanceY/10)*i + minY)*10)/10);
            }
            dots.forEach(function (dot) {
                me.dots.push(new Dot(me, dot.id, dot.x, dot.y, 3));
            });
        }
    };

    function Stroke(x1,y1,x2,y2, strokeStyle) {
        //TODO: check that coordinate params is exist
        this.x1 = x1;
        this.x2 = x2;
        this.y1 = y1;
        this.y2 = y2;
        this.strokeStyle = strokeStyle ? strokeStyle : {
            stroke: "green",
            "stroke-width": 2
        }
    }

    function UpArrow(stroke) {
        this.points = (stroke.x2 - 10) + ',' + (stroke.y2 + 10) + ' ' + stroke.x2 + ',' + stroke.y2 + ' ' + (stroke.x2 + 10) + ',' + (stroke.y2 + 10);
        this.strokeStyle = stroke.strokeStyle;
    }

    function RightArrow(stroke) {
        this.points = (stroke.x2 - 10) + ',' + (stroke.y2 - 10) + ' ' + stroke.x2 + ',' + stroke.y2 + ' ' + (stroke.x2 - 10) + ',' + (stroke.y2 + 10);
        this.strokeStyle = stroke.strokeStyle;
    }

    function Dot(chart, id, x, y, r, dotStyle) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.dotStyle = dotStyle ? dotStyle : {
            stroke: "blue",
            "stroke-width": 3,
            fill: "white"
        }
        this.getPreviousData = function(index) {
            return {
                x: 30 + ((chart.dots.slice(-25)[index - 1].x - chart.minX) * (chart.width - 60)) / chart.distanceX,
                y: chart.height - 30 - ((chart.dots.slice(-25)[index - 1].y - chart.minY) * (chart.height - 60)) / chart.distanceY
            };
        };

        this.getCurrentData = function(){
            return {
                x: 30 + ((this.x - chart.minX) * (chart.width - 60))/chart.distanceX,
                y: chart.height - 30 - ((this.y - chart.minY) * (chart.height - 60))/chart.distanceY
            }
        }
    }

    return {
        restrict: 'E',
        scope: {
            chartWtdth: '=width',
            chartHeight: '=height',
            chartStyle: '=style'
        },
        link: function(scope, element, attrs){
            var block = element[0];

            scope.getDimensions = function () {
                return {
                    'h': block.clientHeight,
                    'w': block.clientWidth
                };
            };
            scope.$watchCollection(scope.getDimensions,function(newvalue){
                scope.chart.resize(newvalue.w, newvalue.h);
            });
        },
        controller: ['$scope', 'ChartData', '$interval', function($scope, ChartData, $interval) {

            $scope.chart = new Chart($scope.chartWtdth ? $scope.chartWtdth : 1,
                $scope.chartHeight ? $scope.chartHeight : 1,
                $scope.chartStyle);

            angular.element(window).bind('resize',
                function(){
                    $scope.$apply();
                });

            var getData = function(){
                var dots = $scope.chart.dots,
                    lastId = dots.length > 0 ? dots[dots.length - 1].id : 0;

                ChartData.getData(lastId).then(function(data){
                    $scope.chart.setDots(data);
                });
            };

            getData();

            $interval(getData, 3000);
        }],
        templateUrl: 'app/directives/chart/src/tpl/chart.tpl.html'
    };
});