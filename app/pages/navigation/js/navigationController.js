"use strict";

angular.module('ajsApp.navigation', [
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

        $scope.isAutorised = function () {
            return Authorization.isAccepted();
        };

        $scope.isLoading = function () {
            return $http.pendingRequests.length > 0;
        }

        $scope.logout = function () {
            Authorization.logout();
        };

        $scope.$on('userAccepted', function () {
            $state.go('navigation.profile.view');
        });


        $scope.$on('userLogout', function () {
            var logoutModal = $uibModal.open({
                templateUrl: 'app/common/modal/tpl/modal-logout.tpl.html',
                controller: 'modalCtrl',
                size: 'sm'
            });
            $state.go('navigation.home');
        });

        $scope.$on('accessDecline', function () {
            var errorModal = $uibModal.open({
                templateUrl: 'app/common/modal/tpl/modal-error.tpl.html',
                controller: 'modalCtrl',
                size: 'sm'
            });
        });

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


                