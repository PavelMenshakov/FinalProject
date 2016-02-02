"use strict";

var dn = namespace('ajsApp.directives.tree');
dn.$module = angular.module('ajsApp.directives.tree',[
        'ajsApp.services'
]).directive('treeView',['TreeRecursionFix',function(TreeRecursionFix) {
        return {
            restrict: 'E',
            scope: {
                treeModel: '=',
                searchModel: '='
            },
            templateUrl: 'app/directives/src/tree/src/tpl/tree.tpl.html',
            compile: function (element) {
                return TreeRecursionFix.compile(element, function (scope, element) {
                    scope.selectNodeHead = function (selectedNode) {
                        if (selectedNode.children !== undefined && selectedNode.children.length) {
                            selectedNode.opened = !selectedNode.opened;
                        }
                    };
                });
            }
        };
    }]);