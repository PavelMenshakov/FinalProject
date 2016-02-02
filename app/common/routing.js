"use strict";

var rn = namespace('ajsApp.routing');
rn.$module = angular.module('ajsApp.routing', [
    'ajsApp.services'
])
    .config(function(routingRestructuringProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');

        var states = {
            abstract: true,
            name: 'navigation',
            templateUrl: 'app/pages/src/navigation/src/tpl/navigation.tpl.html',
            controller: 'navigationCtrl',
            children: [
                {
                    name: 'navigation.home',
                    url: '/home',
                    templateUrl: 'app/pages/src/home/src/tpl/home.tpl.html'
                },
                {
                    name: 'navigation.chart',
                    url: '/chart',
                    controller: 'chartCtrl',
                    templateUrl: 'app/pages/src/chart/src/tpl/chart.tpl.html'
                },
                {
                    name: 'navigation.tree',
                    url: '/tree',
                    templateUrl: 'app/pages/src/tree/src/tpl/tree.tpl.html',
                    controller: 'treeCtrl'
                },
                {
                    name: 'navigation.login',
                    url: '/login',
                    templateUrl: 'app/pages/src/login/src/tpl/login.tpl.html',
                    controller: 'loginCtrl',
                    children: [{
                        name: 'navigation.login.remind',
                        url: '/remind',
                        templateUrl: 'app/pages/src/login/src/tpl/login-remind.tpl.html'
                    }]
                },
                {
                    name: 'navigation.profile',
                    url: '/profile',
                    abstract: true,
                    templateUrl: 'app/pages/src/profile/src/tpl/profile.tpl.html',
                    controller: 'profileCtrl',
                    children: [
                        {
                            name: 'navigation.profile.view',
                            url: '/view',
                            parent: 'navigation.profile',
                            templateUrl: 'app/pages/src/profile/src/tpl/profile-view.tpl.html'
                        },
                        {
                            name:'navigation.profile.edit',
                            url: '/edit',
                            parent: 'navigation.profile',
                            templateUrl: 'app/pages/src/profile/src/tpl/profile-edit.tpl.html'
                        }
                    ]
                }

            ]
        };

        routingRestructuringProvider.state(states);

});