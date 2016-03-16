/// <reference path="../../../angular/angular.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("LoginController", ["$scope", "$location", "GoogleAuthService", "UrlStore", function ($scope, $location, GoogleAuthService, UrlStore) {

            $scope.googleSignIn = function () {
                GoogleAuthService.authorize()
                    .then(function (success) {
                        if (success) {
                            var url = UrlStore.getUrl() || "/projects";
                            $location.path(url);
                        }
                    });
            };
        }]);
})();