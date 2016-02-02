"use strict";

var nn = namespace('ajsApp.pages.navigation');
nn.$module = angular.module('ajsApp.pages.navigation', [
    'ajsApp.modal'
]).controller('navigationCtrl', ['$scope', '$translate', '$uibModal', 'Authorization', '$state','$http', '$timeout',
    function($scope, $translate, $uibModal, Authorization, $state, $http, $timeout) {
        var sessionTrack;
        $scope.changeLang = function (lang) {
            $translate.use(lang);
        };

        $scope.currentLang = function () {
            return $translate.use();
        };

        $scope.isAutorised = Authorization.isAccepted;

        $scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
        };

        $scope.logout = function () {
            Authorization.logout().then(function(resp){
                if(resp) {
                    var logoutModal = $uibModal.open({
                        templateUrl: 'app/common/modal/src/tpl/modal-logout.tpl.html',
                        controller: 'modalCtrl',
                        size: 'sm'
                    });
                    $state.go('navigation.home');
                }
            }, function(reason){
                console.log(reason);
            });
        };

        $scope.$on('$stateChangeSuccess', function () {
            if (sessionTrack) {
                $timeout.cancel(sessionTrack);
            }
            sessionTrack = $timeout(function () {
                if ($scope.isAutorised()) {
                    $scope.logout();
                }
            }, 20000);
        });
    }
]);


                