"use strict";

var sn = namespace('ajsApp.services');
sn.$module = angular.module('ajsApp.services', [
    'ajsApp.services.routing',
    'ajsApp.services.TreeData',
    'ajsApp.services.recursion',
    'ajsApp.services.ChartData',
    'ajsApp.services.Authorization'
]);