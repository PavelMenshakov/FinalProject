"use strict";

var cn = namespace('ajsApp.services.routing');
cn.$module = angular.module('ajsApp.services.routing',[
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

        var newStates = [],
            lastState;

        if(states.length){
            states.forEach(function(value){
                newStates = newStates.concat(restructStates(value));
            });
        } else {
            newStates = restructStates(states);
        }

        newStates.forEach(function(state){
            lastState = lastState ? lastState.state(state) : $stateProvider.state(state);
        });
        return me;
    };
}]);