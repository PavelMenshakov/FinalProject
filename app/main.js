"use strict";

var namespace = function(namespace) {
    var parts = namespace.split('.'),
        parent = window;

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (parent[part] === undefined) {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
};

namespace('ajsApp');

ajsApp.$module = angular.module('ajsApp',[
    'ui.bootstrap',
    'ngSanitize',
    'ui.router',
    'angular-md5',
    'pascalprecht.translate',
    'ngAnimate',
    'ajsApp.directives',
    'ajsApp.modal',
    'ajsApp.services',
    'ajsApp.routing',
    'ajsApp.pages'
]);


