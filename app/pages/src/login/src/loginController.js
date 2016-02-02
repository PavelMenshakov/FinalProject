"use strict";

var ln = namespace('ajsApp.pages.login');
ln.$module = angular.module('ajsApp.pages.login', [
        'ajsApp.directives',
        'ajsApp.services',

    ])
    .controller('loginCtrl', [ '$scope', '$state','Authorization', '$translate',
        function($scope, $state, Authorization, $translate) {
            $scope.login = function(user) {
                Authorization.login(user).then(function(data){
                    if(data) {
                        $state.go('navigation.profile.view');
                    } else {
                        alert($translate.instant('ACCESS_DECLINE_TEXT'));
                    }
                });
            };
        }
    ]);


