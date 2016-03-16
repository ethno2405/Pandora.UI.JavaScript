/// <reference path="../auth/google/google-oauth2-api.js" />

(function () {
    'use strict';

    angular.module("pandoraApp")
        .controller("ProjectsController", ["$scope", "$http", "GoogleAuthService", function ($scope, $http, GoogleAuthService) {
            //$http.get("http://api.pandora.com:5000/api/projects")
            //    .success(function (data) {

            //    });

            $scope.signOut = function () {
                gapi.auth.signIn(function (asdf) {
                    debugger;
                });
            }
        }]);
})();