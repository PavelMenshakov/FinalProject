"use strict";

var vn = namespace('ajsApp.directives.dateValidation');
vn.$module = angular.module('ajsApp.directives.dateValidation', [
]).directive('dateValidation', function () {   //create directive for date validation
    var DATE_REGEXP = new RegExp('[0-9]{2,4}-[0-1]{1}[0-9]{1}-[0-3]{1}[0-9]{1}'),
        isValid = function(s) {
            return (DATE_REGEXP.test(s));
        };

    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ngModelCtrl) {

            ngModelCtrl.$validators.dateValidation =  function(modelValue, viewValue) {
                return ngModelCtrl.$isEmpty(modelValue) || isValid(modelValue);
            };
        }
    };
});