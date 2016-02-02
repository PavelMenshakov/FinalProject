"use strict";

var dn = namespace('ajsApp.directives');
dn.$module = angular.module('ajsApp.directives', [
    'ajsApp.directives.tree',
    'ajsApp.directives.chart',
    'ajsApp.directives.ageValidation',
    'ajsApp.directives.userName',
    'ajsApp.directives.emailValidation',
    'ajsApp.directives.dateValidation'
]);