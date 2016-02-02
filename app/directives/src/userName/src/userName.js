"use strict";

var vn = namespace('ajsApp.directives.userName');
vn.$module = angular.module('ajsApp.directives.userName', [
]).directive('userName', function () {		//create directive for user name validation
    var USER_REGEXP = new RegExp('([A-Z]{1}[a-z]{2,20}$)|(([A-Z]{1}[a-z]{2,20})\s+([A-Z]{1}[a-z]{2,20}$))'),
        isValid = function(s) {
            return (USER_REGEXP.test(s));
        };

    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ngModelCtrl) {

            ngModelCtrl.$validators.userName =  function(modelValue, viewValue) {
                return ngModelCtrl.$isEmpty(viewValue) || isValid(viewValue);
            };

        }
    };
});