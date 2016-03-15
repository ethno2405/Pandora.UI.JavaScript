/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("LoginController", ["$scope", "$location", "GoogleAuthService", function ($scope, $location, GoogleAuthService) {
            $scope.googleSignIn = function () {
                GoogleAuthService.authorize()
                    .then(function (success) {
                        if (success) {
                            $location.path("/projects");
                        }
                    });
            };
        }]);
})();