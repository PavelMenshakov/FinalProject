"use strict";
var pn = namespace('ajsApp.pages.profile');
pn.$module = angular.module('ajsApp.pages.profile',[
    'ajsApp.services',
    'ui.bootstrap'
])
    .controller('profileCtrl', ['$uibModal', '$scope', 'Authorization','$state', '$window',
        function($uibModal, $scope, Authorization, $state, $window) {

        if(!Authorization.isAccepted()){
            var errorModal = $uibModal.open({
                templateUrl: 'app/common/modal/src/tpl/modal-error.tpl.html',
                controller: 'modalCtrl',
                size: 'sm'
            });
            $state.go('navigation.home');
        }

        if($window.localStorage.user) {
            $scope.user = JSON.parse($window.localStorage.user);
        }
        $scope.update = function(user) { //form update method
            $window.localStorage.user = JSON.stringify(user);
        };

        $scope.reset = function() {
            $scope.user = {};
        };
}]);

