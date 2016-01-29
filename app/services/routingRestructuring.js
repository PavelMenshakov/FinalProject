"use strict";

angular.module('ajsApp.services.routing', [
    'ui.router'
]).provider('routingRestructuring', ['$stateProvider',function($stateProvider){

    var me = this;

    me.$get = angular.noop;

    me.state = function(states){
        var restructStates = function(state){
            var restructedStates = [];
            if(state.children && state.children.length){
                state.children.forEach(function(state){
                    restructedStates = restructedStates.concat(restructStates(state));
                });
                delete state.children;
            }
            restructedStates.push(state);
            return restructedStates;
        };

        var newStates = restructStates(states),
            lastState;

        newStates.forEach(function(state){
            lastState = lastState ? lastState.state(state) : $stateProvider.state(state);
        });
        return me;
    };
}]);