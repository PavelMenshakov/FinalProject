"use strict";

angular.module('ajsApp.services',[
    'angular-md5'
]).factory('Authorization', [ '$http', '$rootScope', '$window', 'md5',
        function($http, $rootScope, $window, md5) {
            var authServ = {};

            var getUsers = function () {
                    var path = 'data/users.json';
                    var users = $http.get(path).then(function (resp) {
                        return resp.data;
                    });
                    return users;
                },
                isDataCorrect = function (password, userData) {
                    return userData && userData.pass === md5.createHash(password);
                };

            authServ.login = function (user) {
                var users = getUsers();
                users.then(function (users) {
                    if (users[user.login]) {
                        var userInfo = users[user.login];
                        if (isDataCorrect(user.password, userInfo)) {
                            delete userInfo.pass;
                            $window.localStorage.userInfo = JSON.stringify(userInfo);
                            $rootScope.currentUser = userInfo;
                            $rootScope.$broadcast('userAccepted');
                        } else {
                            $rootScope.$broadcast('userDecline');
                        }
                    }
                });
            };

            authServ.isAccepted = function () {
                return !!$window.localStorage.userInfo;
            };

            authServ.logout = function () {
                $window.localStorage.removeItem("userInfo");
                $rootScope.$broadcast('userLogout');
            };

            return authServ;
        }
]);