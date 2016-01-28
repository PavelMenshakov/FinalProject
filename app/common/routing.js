"use strict";

angular.module('ajsApp.routing', ['ui.router'])
    .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('navigation',{
        abstract: true,
        url: '',
        templateUrl: 'app/pages/navigation/tpl/navigation.tpl.html',
        controller: 'navigationCtrl'
    }).state('navigation.home', {
        url: '/home',
        templateUrl: 'app/pages/home/tpl/home.tpl.html'
    }).state('navigation.chart', {
        url: '/chart',
        templateUrl: 'app/pages/chart/tpl/chart.tpl.html'
    }).state('navigation.tree', {
        url: '/tree',
        templateUrl: 'app/pages/tree/src/tpl/tree.tpl.html',
        controller: 'treeCtrl'
    }).state('navigation.login', {
        url: '/login',
        templateUrl: 'app/pages/login/tpl/login.tpl.html',
        controller: 'loginCtrl'
    }).state('navigation.login.remind', {
        url: '/remind',
        templateUrl: 'app/pages/login/tpl/login-remind.tpl.html'
    }).state('navigation.profile', {
        url: '/profile',
        templateUrl: 'app/pages/profile/tpl/profile.tpl.html',
        controller: 'profileCtrl'
    }).state('navigation.profile.view', {
        url: '/view',
        parent: 'navigation.profile',
        templateUrl: 'app/pages/profile/tpl/profile-view.tpl.html'
    }).state('navigation.profile.edit', {
        url: '/edit',
        parent: 'navigation.profile',
        templateUrl: 'app/pages/profile/tpl/profile-edit.tpl.html'
    });
});