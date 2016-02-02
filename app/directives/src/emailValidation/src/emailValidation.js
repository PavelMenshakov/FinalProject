"use strict";

var vn = namespace('ajsApp.directives.emailValidation');
vn.$module = angular.module('ajsApp.directives.emailValidation', [
]).directive('emailValidation', function() {  // email validation
    var EMAIL_REGEXP = new RegExp('[a-zA-Z]@epam\.com$'),
        isValid = function(s) {
            return (EMAIL_REGEXP.test(s));
        };
    return {
        require:'ngModel',
        link:function (scope, elm, attrs, ngModelCtrl) {

            ngModelCtrl.$validators.emailValidation =  function(modelValue, viewValue) {
                return ngModelCtrl.$isEmpty(modelValue) || isValid(modelValue);
            };
        }
    };
});