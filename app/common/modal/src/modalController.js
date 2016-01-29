"use strict";

angular.module('ajsApp.modal',[
]).controller('modalCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.close = function () {
        $uibModalInstance.close();
    };
}]);
