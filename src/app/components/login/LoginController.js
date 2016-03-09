/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("LoginController", ["$scope", "$location", "LoginService", function ($scope, $location, LoginService) {

            var idToken = window.localStorage["id_token"];

            if (idToken) {
                $location.path("/projects");
                return;
            }

            $scope.googleSignIn = function () {
                LoginService.getToken();
            };

        }]);
})();