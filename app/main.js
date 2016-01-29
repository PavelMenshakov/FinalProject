"use strict";

var app = angular.module('ajsApp',[
    'ajsApp.recFix',
    'ajsApp.services.routing',
    'ajsApp.services.data',
    'pascalprecht.translate',
    'angular-md5',
    'ngAnimate',
    'ui.bootstrap',
    'ajsApp.routing',
    'ajsApp.directives',
    'ajsApp.services',
    'ajsApp.login',
    'ajsApp.profile',
    'ajsApp.navigation',
    'ajsApp.modal',
    'ajsApp.directives.chart',
    'ajsApp.pages.chart',
    'ajsApp.tree'
]).config(['$translateProvider', function ($translateProvider) {
    $translateProvider.useStaticFilesLoader({
        prefix: 'lang/lang_',
        suffix: '.json'
    });
    $translateProvider.preferredLanguage('en');
}]);