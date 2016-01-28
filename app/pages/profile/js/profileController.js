"use strict";

var app = angular.module('ajsApp.profile',['ajsApp.services'])
    .controller('profileCtrl', ['$rootScope', '$scope', 'Authorization','$state', '$window', function($rootScope, $scope, Authorization, $state, $window) {

        if($window.localStorage.userInfo) {
            $scope.user = JSON.parse($window.localStorage.userInfo);
        }
        $scope.update = function(user) { //form update method
            $window.localStorage.userInfo = JSON.stringify(user);
        };

        $scope.reset = function() {
            $scope.user = {};
        };

        if(!Authorization.isAccepted()){
            $rootScope.$broadcast('accessDecline');
            $state.go('navigation.home');
        }
}]);

