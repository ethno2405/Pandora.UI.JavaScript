/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("LoginController", ["$scope", "$location", "GoogleAuthService", "UrlStore", function ($scope, $location, GoogleAuthService, UrlStore) {

            if (GoogleAuthService.getToken()) {
                $location.path("/projects");
            }

            $scope.googleSignIn = function () {
                GoogleAuthService.authorize()
                    .then(function (success) {
                        if (success) {
                            $location.path(UrlStore.getUrl());
                        }
                    });
            };
        }]);
})();