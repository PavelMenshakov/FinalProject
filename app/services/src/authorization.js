"use strict";

var an = namespace('ajsApp.services.Authorization');
an.$module = angular.module('ajsApp.services.Authorization',[
]).service('Authorization', [
    '$http', '$q', '$window', 'md5',
        function($http, $q, $window, md5) {
            var authServ = {};

            var getPass = function (user) {
                    var path = 'api/auth';
                    return $http({
                        method: 'GET',
                        url: path,
                        params: {"name": user}
                    }).then(function (resp) {
                        return resp.data;
                    });
            },
                getData = function (user) {
                    var path = 'api/users';
                    return $http({
                        method: 'GET',
                        url: path,
                        params: {"name": user}
                    }).then(function (resp) {
                        return resp.data;
                    });
                };

            authServ.login = function (user) {
                var pass = getPass(user.login);
                return pass.then(function (pass) {
                    return $q(function(resolve, reject){
                        if (pass && user.password && pass === md5.createHash(user.password)) {
                            var data = getData(user.login);

                            resolve(data.then(function(data){
                                $window.localStorage.user = JSON.stringify(data);
                                return true;
                            }));
                        } else {
                            resolve(false);
                        }
                    });
                });
            };

            authServ.isAccepted = function () {
                return !!$window.localStorage.user;
            };

            authServ.logout = function () {
                return $q(function (resolve, reject) {
                    if ($window.localStorage.user) {
                        $window.localStorage.removeItem("user");
                        resolve(true);
                    } else {
                        reject('User already logout');
                    }

                });
            };

            return authServ;
        }
]);