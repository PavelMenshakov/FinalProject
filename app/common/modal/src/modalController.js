"use strict";

var mn = namespace('ajsApp.modal');
mn.$module = angular.module('ajsApp.modal',[
]).controller('modalCtrl', ['$scope', '$uibModalInstance', function ($scope, $uibModalInstance) {
    $scope.close = $uibModalInstance.close;
}]);
