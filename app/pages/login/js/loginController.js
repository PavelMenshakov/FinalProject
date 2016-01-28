"use strict";

angular.module('ajsApp.login', [
    'ajsApp.directives',
    'ajsApp.services',
    'ajsApp.services.data'
])
    .controller('loginCtrl', [ '$scope', '$state','Authorization', '$rootScope',
        function($scope, $state, Authorization, $rootScope) {
            $scope.login = function(user) {
                Authorization.login(user);
            };
        }
    ]);


                